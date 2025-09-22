/**
 * Query to get only service IDs from the database
 * Used for checking if services exist without fetching full service data
 */

import { getDatabase } from "src/lib/database";

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
