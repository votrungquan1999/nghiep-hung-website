"use server";

import { chunk } from "lodash";
import { nanoid } from "nanoid";
import { revalidatePath, revalidateTag } from "next/cache";
import type { FormResult } from "src/components/form-state";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getDatabase } from "src/lib/database";
import type { S3UploadResult } from "src/lib/s3";
import { uploadToS3 } from "src/lib/s3";
import type { Service, ServiceDocument, ServiceImage } from "src/server/services";
import { ServiceStatus } from "src/server/services";

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
 * Server action to create a new service with image uploads to S3 and data storage in MongoDB
 * @param formData - Form data containing service information and images
 * @returns Promise that resolves to the creation result
 */
export async function createService(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const serviceNameEn = formData.get("serviceNameEn") as string;
		const serviceNameVi = formData.get("serviceNameVi") as string;
		const serviceDescriptionEn = formData.get("serviceDescriptionEn") as string;
		const serviceDescriptionVi = formData.get("serviceDescriptionVi") as string;
		const serviceStatus = formData.get("serviceStatus") as string;
		const serviceImages = formData.getAll("serviceImages") as File[];
		const selectedImageIndex = formData.get("selectedImageIndex") as string;

		// Validation phase
		if (serviceImages.length === 0) {
			return {
				success: false,
				error: "At least one service image is required",
			};
		}

		if (!selectedImageIndex) {
			return {
				success: false,
				error: "Select a main image",
			};
		}

		// Validate required fields and collect missing field names
		const missingFields: string[] = [];

		if (!serviceNameEn) {
			missingFields.push("Service Name (English)");
		}
		if (!serviceNameVi) {
			missingFields.push("Service Name (Vietnamese)");
		}
		if (!serviceDescriptionEn) {
			missingFields.push("Service Description (English)");
		}
		if (!serviceDescriptionVi) {
			missingFields.push("Service Description (Vietnamese)");
		}
		if (!serviceStatus) {
			missingFields.push("Service Status");
		}

		if (missingFields.length > 0) {
			return {
				success: false,
				error: `Please fill in the following required fields: ${missingFields.join(", ")}`,
			};
		}

		// Validate status value, these are validated in the client already, no need to handle errors here
		if (!Object.values(ServiceStatus).includes(serviceStatus as ServiceStatus)) {
			throw new Error("Invalid service status");
		}

		const serviceId = nanoid();

		// Upload images to S3 in batches of 10 using lodash chunk
		const batchSize = 10;
		const imageBatches = chunk(serviceImages, batchSize);
		const uploadedImages: ServiceImage[] = [];

		// Process each batch
		for (const [batchIndex, batchImages] of imageBatches.entries()) {
			const startIndex = batchIndex * batchSize;

			// Create upload promises for current batch
			const batchUploadPromises = batchImages.map(async (file, i) => {
				const globalIndex = startIndex + i;
				const s3Key = generateServiceS3Key(serviceId, file.name, globalIndex);

				const uploadResult: S3UploadResult = await uploadToS3(file, s3Key);

				// Check if this is the main image based on index
				const mainImageIndex = parseInt(selectedImageIndex, 10);
				const isMain = globalIndex === mainImageIndex;

				return {
					key: uploadResult.key,
					url: uploadResult.url,
					isMain,
					uploadedAt: new Date(),
					index: globalIndex,
				};
			});

			// Execute current batch uploads in parallel
			try {
				const batchResults = await Promise.all(batchUploadPromises);
				// Sort by original index to maintain order within batch
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

		// Create service document for MongoDB
		const service: Service = {
			id: serviceId,
			name: {
				en: serviceNameEn,
				vi: serviceNameVi,
			},
			description: {
				en: serviceDescriptionEn,
				vi: serviceDescriptionVi,
			},
			status: serviceStatus as ServiceStatus,
			gallery: uploadedImages,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Save to MongoDB
		const db = await getDatabase();
		const result = await db.collection<ServiceDocument>("services").insertOne(service);

		if (!result.insertedId) {
			return {
				success: false,
				error: "Failed to save service to database",
			};
		}

		// Revalidate services cache
		revalidateTag(CACHE_TAGS.SERVICES);
		revalidatePath("/admin/services");

		return {
			success: true,
			refresh: true,
		};
	} catch {
		return {
			success: false,
			error: "An unexpected error occurred while creating the service",
		};
	}
}
