"use server";

import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import type { Service, ServiceDocument } from "src/server/services/service.type";
import { ServiceStatus } from "src/server/services/service.type";

/**
 * Update a service by ID
 * @param formData - Form data containing the service information
 * @returns Promise that resolves to success/error result
 */
export async function updateService(formData: FormData): Promise<FormResult> {
	try {
		const serviceId = formData.get("serviceId") as string;
		const serviceNameEn = formData.get("serviceNameEn") as string;
		const serviceNameVi = formData.get("serviceNameVi") as string;
		const serviceDescriptionEn = formData.get("serviceDescriptionEn") as string;
		const serviceDescriptionVi = formData.get("serviceDescriptionVi") as string;
		const serviceStatus = formData.get("serviceStatus") as string;

		// Validation
		if (!serviceId) {
			return {
				success: false,
				error: "Service ID is required",
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

		// Validate status value
		if (!Object.values(ServiceStatus).includes(serviceStatus as ServiceStatus)) {
			return {
				success: false,
				error: "Invalid service status",
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

		// Update service document
		const updateData: Partial<Service> = {
			name: {
				en: serviceNameEn,
				vi: serviceNameVi,
			},
			description: {
				en: serviceDescriptionEn,
				vi: serviceDescriptionVi,
			},
			status: serviceStatus as ServiceStatus,
			updatedAt: new Date(),
		};

		// Update the service in database
		const result = await servicesCollection.updateOne({ id: serviceId }, { $set: updateData });

		if (result.matchedCount === 0) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		if (result.modifiedCount === 0) {
			return {
				success: false,
				error: "No changes were made to the service",
			};
		}

		// Return success with refresh to update the UI
		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Error updating service:", error);
		return {
			success: false,
			error: "An unexpected error occurred while updating the service",
		};
	}
}
