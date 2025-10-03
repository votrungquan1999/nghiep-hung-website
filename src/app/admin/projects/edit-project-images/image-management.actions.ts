"use server";

import { chunk } from "lodash";
import { revalidatePath, revalidateTag } from "next/cache";
import type { FormResult } from "src/components/form-state";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getDatabase } from "src/lib/database";
import type { S3UploadResult } from "src/lib/s3";
import { deleteFromS3, uploadToS3 } from "src/lib/s3";
import type { ProjectDocument, ProjectImage } from "src/server/projects";
import { getProjectById } from "src/server/projects";
import type { ExistingImage } from "./image-management-dialog.type";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a unique S3 key for project images
 * @param projectId - The ID of the project
 * @param fileName - The original file name
 * @param index - The index of the image (for multiple images)
 * @returns A unique S3 key
 */
function generateProjectS3Key(projectId: string, fileName: string, index: number = 0): string {
	const timestamp = Date.now();
	const fileExtension = fileName.split(".").pop();
	const uniqueKey = `${timestamp}-${index}`;

	return `projects/${projectId}/${uniqueKey}.${fileExtension}`;
}

/**
 * Upload a batch of images to S3
 * @param images - Array of files to upload
 * @param projectId - The project ID
 * @param startIndex - Starting index for this batch
 * @returns Promise that resolves to array of ProjectImage objects
 */
async function uploadImageBatch(
	images: File[],
	projectId: string,
	startIndex: number,
): Promise<ProjectImage[]> {
	const uploadPromises = images.map(async (file, i) => {
		const globalIndex = startIndex + i;
		const s3Key = generateProjectS3Key(projectId, file.name, globalIndex);
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
 * Fetch existing project images from database
 * @param projectId - The project ID
 * @returns Promise that resolves to existing ProjectImage array or null if project not found
 */
async function fetchExistingProjectImages(projectId: string): Promise<ProjectImage[] | null> {
	try {
		const project = await getProjectById(projectId);
		return project?.gallery || [];
	} catch {
		return null;
	}
}

/**
 * Set the main image for a collection of images using index-based approach
 * @param images - Array of ProjectImage objects
 * @param mainImageIndex - Index of the image to set as main
 */
function setMainImage(images: ProjectImage[], mainImageIndex: string): void {
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
 * Update project images in the database
 * @param projectId - The project ID
 * @param images - Array of ProjectImage objects to save
 * @returns Promise that resolves to the update result
 */
async function updateProjectInDatabase(
	projectId: string,
	images: ProjectImage[],
): Promise<boolean> {
	const db = await getDatabase();
	const result = await db.collection<ProjectDocument>("projects").updateOne(
		{ id: projectId },
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
 * Server action to update project images with new uploads, deletions, and main image changes
 * @param formData - Form data containing project ID, new images, deleted images, and main image index
 * @returns Promise that resolves to the update result
 */
export async function updateProjectImages(formData: FormData): Promise<FormResult> {
	try {
		// Extract and validate input data
		const inputData = extractUpdateImageInputData(formData);
		if (!inputData.success || !inputData.data) {
			return inputData;
		}

		const { projectId, newImagesFiles, deletedImages, mainImageIndex } = inputData.data;

		// Fetch existing images from database
		const existingImages = await fetchExistingProjectImages(projectId);
		if (existingImages === null) {
			return {
				success: false,
				error: "Project not found",
			};
		}

		// Upload new images to S3 in batches
		const uploadedNewImages = await uploadNewImagesInBatches(newImagesFiles, projectId);
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

		// Update project in database
		const updateResult = await updateProjectInDatabase(projectId, allImages);
		if (!updateResult) {
			return {
				success: false,
				error: "Project not found",
			};
		}

		// Revalidate projects cache
		revalidateTag(CACHE_TAGS.PROJECTS);
		revalidatePath("/admin/projects");

		return {
			success: true,
			refresh: true,
		};
	} catch {
		return {
			success: false,
			error: "An unexpected error occurred while updating project images",
		};
	}
}

// ============================================================================
// INPUT PROCESSING FUNCTIONS
// ============================================================================

interface UpdateImageInputData {
	projectId: string;
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
	const projectId = formData.get("projectId") as string;
	const rawNewImagesFiles = formData.getAll("newImages") as File[];
	const deletedImagesJson = formData.get("deletedImages") as string;
	const mainImageIndex = formData.get("mainImageIndex") as string;

	if (!projectId) {
		return {
			success: false,
			error: "Project ID is required",
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
			projectId,
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
 * @param projectId - The project ID
 * @returns Promise that resolves to upload result
 */
async function uploadNewImagesInBatches(
	newImagesFiles: File[],
	projectId: string,
): Promise<FormResult & { data?: ProjectImage[] }> {
	if (newImagesFiles.length === 0) {
		return {
			success: true,
			refresh: true,
			data: [],
		};
	}

	const batchSize = 10;
	const imageBatches = chunk(newImagesFiles, batchSize);
	const uploadedNewImages: ProjectImage[] = [];

	for (const [batchIndex, batchImages] of imageBatches.entries()) {
		const startIndex = batchIndex * batchSize;

		try {
			const batchResults = await uploadImageBatch(batchImages, projectId, startIndex);
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
