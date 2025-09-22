"use server";

import { chunk } from "lodash";
import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import type { S3UploadResult } from "src/lib/s3";
import { uploadToS3 } from "src/lib/s3";
import type { ServiceDocument, ServiceImage } from "src/server/services/service.type";

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
 * Add new images to an existing service
 * @param formData - Form data containing the service ID and new images
 * @returns Promise that resolves to success/error result
 */
export async function addServiceImages(formData: FormData): Promise<FormResult> {
	try {
		const serviceId = formData.get("serviceId") as string;
		const serviceImages = formData.getAll("serviceImages") as File[];
		const selectedImageIndex = formData.get("selectedImageIndex") as string;

		if (!serviceId) {
			return {
				success: false,
				error: "Service ID is required",
			};
		}

		if (serviceImages.length === 0) {
			return {
				success: false,
				error: "At least one image is required",
			};
		}

		const db = await getDatabase();
		const servicesCollection = db.collection<ServiceDocument>("services");

		// Check if service exists
		const existingService = await servicesCollection.findOne({ id: serviceId });
		if (!existingService) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		// Upload new images to S3
		const batchSize = 10;
		const imageBatches = chunk(serviceImages, batchSize);
		const uploadedImages: ServiceImage[] = [];

		for (const [batchIndex, batchImages] of imageBatches.entries()) {
			const startIndex = batchIndex * batchSize;

			const batchUploadPromises = batchImages.map(async (file, i) => {
				const globalIndex = startIndex + i;
				const s3Key = generateServiceS3Key(serviceId, file.name, globalIndex);

				const uploadResult: S3UploadResult = await uploadToS3(file, s3Key);

				const mainImageIndex = selectedImageIndex ? parseInt(selectedImageIndex, 10) : 0;
				const isMain = globalIndex === mainImageIndex;

				return {
					key: uploadResult.key,
					url: uploadResult.url,
					isMain,
					uploadedAt: new Date(),
					index: globalIndex,
				};
			});

			try {
				const batchResults = await Promise.all(batchUploadPromises);
				const sortedBatchResults = batchResults
					.sort((a, b) => a.index - b.index)
					.map(({ index, ...image }) => image);

				uploadedImages.push(...sortedBatchResults);
			} catch {
				return {
					success: false,
					error: "Failed to upload images",
				};
			}
		}

		// Update service with new images
		const updatedGallery = [...existingService.gallery, ...uploadedImages];

		// If a main image was selected, update the main image
		if (selectedImageIndex) {
			const mainImageIndex = parseInt(selectedImageIndex, 10);
			updatedGallery.forEach((img, index) => {
				img.isMain = index === mainImageIndex;
			});
		}

		const result = await servicesCollection.updateOne(
			{ id: serviceId },
			{
				$set: {
					gallery: updatedGallery,
					updatedAt: new Date(),
				},
			},
		);

		if (result.matchedCount === 0) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Error adding service images:", error);
		return {
			success: false,
			error: "An unexpected error occurred while adding images",
		};
	}
}
