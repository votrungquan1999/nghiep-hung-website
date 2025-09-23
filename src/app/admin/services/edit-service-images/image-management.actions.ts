"use server";

import { chunk } from "lodash";
import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import type { S3UploadResult } from "src/lib/s3";
import { deleteFromS3, uploadToS3 } from "src/lib/s3";
import { getServiceById } from "src/server/services";
import type { ServiceDocument, ServiceImage } from "src/server/services/service.type";
import type { ExistingImage } from "./image-management-dialog.type";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a unique S3 key for service images
 * @param serviceId - The ID of the service
 * @param fileName - The original file name
 * @param index - The index of the image (for multiple images)
 * @returns A unique S3 key
 */
function generateServiceS3Key(serviceId: string, fileName: string, index: number = 0): string {
	const timestamp = Date.now();
	const fileExtension = fileName.split(".").pop();
	const uniqueKey = `${timestamp}-${index}`;

	return `services/${serviceId}/${uniqueKey}.${fileExtension}`;
}

/**
 * Upload a batch of images to S3
 * @param images - Array of files to upload
 * @param serviceId - The service ID
 * @param startIndex - Starting index for this batch
 * @returns Promise that resolves to array of ServiceImage objects
 */
async function uploadImageBatch(
	images: File[],
	serviceId: string,
	startIndex: number,
): Promise<ServiceImage[]> {
	const uploadPromises = images.map(async (file, i) => {
		const globalIndex = startIndex + i;
		const s3Key = generateServiceS3Key(serviceId, file.name, globalIndex);
		const uploadResult: S3UploadResult = await uploadToS3(file, s3Key);

		return {
			key: uploadResult.key,
			url: uploadResult.url,
			isMain: false, // Will be set later based on main image selection
			uploadedAt: new Date(),
		};
	});

	return Promise.all(uploadPromises);
}

/**
 * Delete multiple images from S3
 * @param imageKeys - Array of S3 keys to delete
 * @returns Promise that resolves when all deletions are complete
 */
async function deleteImagesFromS3(imageKeys: string[]): Promise<void> {
	await Promise.all(imageKeys.map((key) => deleteFromS3(key)));
}

/**
 * Fetch existing service images from database
 * @param serviceId - The service ID
 * @returns Promise that resolves to existing ServiceImage array or null if service not found
 */
async function fetchExistingServiceImages(serviceId: string): Promise<ServiceImage[] | null> {
	try {
		const service = await getServiceById(serviceId);
		return service?.gallery || [];
	} catch {
		return null;
	}
}

/**
 * Set the main image for a collection of images using index-based approach
 * @param images - Array of ServiceImage objects
 * @param mainImageIndex - Index of the image to set as main
 */
function setMainImage(images: ServiceImage[], mainImageIndex: string): void {
	if (!mainImageIndex || images.length === 0) {
		// If no main image specified, set first image as main
		images[0].isMain = true;
		return;
	}

	// Reset all images to not main
	images.forEach((img) => {
		img.isMain = false;
	});

	// Parse the main image index
	const targetIndex = parseInt(mainImageIndex, 10);

	// Set the main image at the specified index
	if (targetIndex >= 0 && targetIndex < images.length) {
		images[targetIndex].isMain = true;
	} else {
		// If index is invalid, set first image as main
		images[0].isMain = true;
	}
}

/**
 * Update service images in the database
 * @param serviceId - The service ID
 * @param images - Array of ServiceImage objects to save
 * @returns Promise that resolves to the update result
 */
async function updateServiceInDatabase(
	serviceId: string,
	images: ServiceImage[],
): Promise<boolean> {
	const db = await getDatabase();
	const result = await db.collection<ServiceDocument>("services").updateOne(
		{ id: serviceId },
		{
			$set: {
				gallery: images,
				updatedAt: new Date(),
			},
		},
	);

	return result.matchedCount > 0;
}

// ============================================================================
// MAIN SERVER ACTIONS
// ============================================================================

/**
 * Server action to update service images with new uploads, deletions, and main image changes
 * @param formData - Form data containing service ID, new images, deleted images, and main image index
 * @returns Promise that resolves to the update result
 */
export async function updateServiceImages(formData: FormData): Promise<FormResult> {
	try {
		// Extract and validate input data
		const inputData = extractUpdateImageInputData(formData);
		if (!inputData.success || !inputData.data) {
			return inputData;
		}

		const { serviceId, newImagesFiles, deletedImages, mainImageIndex } = inputData.data;

		// Fetch existing images from database
		const existingImages = await fetchExistingServiceImages(serviceId);
		if (existingImages === null) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		// Upload new images to S3 in batches
		const uploadedNewImages = await uploadNewImagesInBatches(newImagesFiles, serviceId);
		if (!uploadedNewImages.success || !uploadedNewImages.data) {
			return uploadedNewImages;
		}

		// Delete removed images from S3
		if (deletedImages.length > 0) {
			const deleteResult = await deleteRemovedImages(deletedImages);
			if (!deleteResult.success) {
				return deleteResult;
			}
		}

		// Filter out deleted images from existing images
		const deletedImageIds = deletedImages.map((img) => img.id);
		const remainingExistingImages = existingImages.filter(
			(img) => !deletedImageIds.includes(img.key),
		);

		// Combine remaining existing images with new images
		const allImages = [...remainingExistingImages, ...uploadedNewImages.data];

		// Set the main image
		setMainImage(allImages, mainImageIndex);

		// Update service in database
		const updateResult = await updateServiceInDatabase(serviceId, allImages);
		if (!updateResult) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		return {
			success: true,
			refresh: true,
		};
	} catch {
		return {
			success: false,
			error: "An unexpected error occurred while updating service images",
		};
	}
}

// ============================================================================
// INPUT PROCESSING FUNCTIONS
// ============================================================================

interface UpdateImageInputData {
	serviceId: string;
	newImagesFiles: File[];
	deletedImages: ExistingImage[];
	mainImageIndex: string;
}

/**
 * Extract and validate input data from FormData
 * @param formData - Form data from the request
 * @returns Validation result with extracted data or error
 */
function extractUpdateImageInputData(
	formData: FormData,
): FormResult & { data?: UpdateImageInputData } {
	const serviceId = formData.get("serviceId") as string;
	const rawNewImagesFiles = formData.getAll("newImages") as File[];
	const deletedImagesJson = formData.get("deletedImages") as string;
	const mainImageIndex = formData.get("mainImageIndex") as string;

	if (!serviceId) {
		return {
			success: false,
			error: "Service ID is required",
		};
	}

	// Filter out empty files - check if file has content (size > 0 and name is not empty)
	const newImagesFiles = rawNewImagesFiles.filter(
		(file) => file.size > 0 && file.name.trim() !== "",
	);

	const deletedImages: ExistingImage[] = deletedImagesJson ? JSON.parse(deletedImagesJson) : [];

	return {
		success: true,
		refresh: true,
		data: {
			serviceId,
			newImagesFiles,
			deletedImages,
			mainImageIndex,
		},
	};
}

// ============================================================================
// IMAGE PROCESSING FUNCTIONS
// ============================================================================

/**
 * Upload new images to S3 in batches
 * @param newImagesFiles - Array of new image files
 * @param serviceId - The service ID
 * @returns Promise that resolves to upload result
 */
async function uploadNewImagesInBatches(
	newImagesFiles: File[],
	serviceId: string,
): Promise<FormResult & { data?: ServiceImage[] }> {
	if (newImagesFiles.length === 0) {
		return {
			success: true,
			refresh: true,
			data: [],
		};
	}

	const batchSize = 10;
	const imageBatches = chunk(newImagesFiles, batchSize);
	const uploadedNewImages: ServiceImage[] = [];

	for (const [batchIndex, batchImages] of imageBatches.entries()) {
		const startIndex = batchIndex * batchSize;

		try {
			const batchResults = await uploadImageBatch(batchImages, serviceId, startIndex);
			uploadedNewImages.push(...batchResults);
		} catch {
			return {
				success: false,
				error: "Failed to upload new images",
			};
		}
	}

	return {
		success: true,
		refresh: true,
		data: uploadedNewImages,
	};
}

/**
 * Delete removed images from S3
 * @param deletedImages - Array of images to delete
 * @returns Promise that resolves to deletion result
 */
async function deleteRemovedImages(deletedImages: ExistingImage[]): Promise<FormResult> {
	const keysToDelete = deletedImages.map((img) => img.id);

	try {
		await deleteImagesFromS3(keysToDelete);
		return { success: true, refresh: true };
	} catch {
		return {
			success: false,
			error: "Failed to delete removed images",
		};
	}
}
