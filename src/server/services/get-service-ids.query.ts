/**
 * Query to get only service IDs from the database
 * Used for checking if services exist without fetching full service data
 */

import { getDatabase } from "src/lib/database";
import type { ServiceStatus } from "./service.type";

/**
 * Get all service IDs from the database
 * @returns Promise that resolves to an array of service IDs
 */
export async function getServiceIds(): Promise<string[]> {
	try {
		const db = await getDatabase();
		const services = await db
			.collection("services")
			.find<{ id: string }>({}, { projection: { id: 1 } })
			.toArray();

		// Extract IDs from MongoDB documents
		return services.map((doc) => doc.id);
	} catch (error) {
		console.error("Error fetching service IDs:", error);
		throw new Error("Failed to fetch service IDs");
	}
}

/**
 * Get only active service IDs from the database
 * Used for displaying services on public pages
 * @returns Promise that resolves to an array of active service IDs
 */
export async function getActiveServiceIds(): Promise<string[]> {
	try {
		const db = await getDatabase();
		const services = await db
			.collection("services")
			.find<{ id: string }>({ status: "active" as ServiceStatus }, { projection: { id: 1 } })
			.toArray();

		// Extract IDs from MongoDB documents
		return services.map((doc) => doc.id);
	} catch (error) {
		console.error("Error fetching active service IDs:", error);
		throw new Error("Failed to fetch active service IDs");
	}
}
