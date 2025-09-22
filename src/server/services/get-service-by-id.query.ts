/**
 * Query to get a single service by ID
 */

import { getDatabase } from "src/lib/database";
import type { Service, ServiceDocument, ServiceStatus } from "./service.type";

/**
 * Get a single service by ID
 * @param id - The service ID
 * @returns Promise that resolves to the service or null if not found
 */
export async function getServiceById(id: string): Promise<Service | null> {
	try {
		const db = await getDatabase();
		const service = await db.collection<ServiceDocument>("services").findOne({ id });

		if (!service) {
			return null;
		}

		return {
			id: service.id,
			name: service.name,
			description: service.description,
			status: service.status as ServiceStatus,
			gallery: service.gallery,
			createdAt: service.createdAt,
			updatedAt: service.updatedAt,
		};
	} catch (error) {
		console.error(`Error fetching service with id ${id}:`, error);
		throw new Error(`Failed to fetch service with id ${id}`);
	}
}
