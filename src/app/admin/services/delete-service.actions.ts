"use server";

import { chunk } from "lodash";
import type { FormResult } from "src/components/form-state";
import { getDatabase } from "src/lib/database";
import { deleteFromS3 } from "src/lib/s3";
import type { ServiceDocument, ServiceImageDocument } from "src/server/services";

/**
 * Delete a service by ID
 * @param formData - Form data containing the service ID
 * @returns Promise that resolves to success/error result
 */
export async function deleteServiceAction(formData: FormData): Promise<FormResult> {
	try {
		const serviceId = formData.get("serviceId") as string;

		if (!serviceId) {
			return {
				success: false,
				error: "Service ID is required",
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

		// Extract S3 keys from service gallery
		const s3Keys = existingService.gallery
			.map((image: ServiceImageDocument) => image.key)
			.filter(Boolean);

		// Delete S3 images in chunks to avoid overwhelming the service
		if (s3Keys.length > 0) {
			try {
				const chunks = chunk(s3Keys, 5); // Process 5 images at a time
				for (const chunkKeys of chunks) {
					await Promise.all((chunkKeys as string[]).map((key: string) => deleteFromS3(key)));
				}
			} catch (s3Error) {
				console.error("Error deleting S3 images:", s3Error);
				// Continue with database deletion even if S3 deletion fails
				// This prevents orphaned database records
			}
		}

		// Delete the service from database
		const result = await servicesCollection.deleteOne({ id: serviceId });

		if (result.deletedCount === 0) {
			return {
				success: false,
				error: "Failed to delete service",
			};
		}

		// Return success with refresh to update the UI
		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Error deleting service:", error);
		return {
			success: false,
			error: "An unexpected error occurred while deleting the service",
		};
	}
}
