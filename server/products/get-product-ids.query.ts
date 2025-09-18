/**
 * Query to get only product IDs from the database
 * Used for checking if products exist without fetching full product data
 */

import { getDatabase } from "@/lib/database";

/**
 * Get all product IDs from the database
 * @returns Promise that resolves to an array of product IDs
 */
export async function getProductIds(): Promise<string[]> {
	try {
		const db = await getDatabase();
		const products = await db
			.collection("products")
			.find<{ id: string }>({}, { projection: { id: 1 } })
			.toArray();

		// Extract IDs from MongoDB documents
		return products.map((doc) => doc.id);
	} catch (error) {
		console.error("Error fetching product IDs:", error);
		throw new Error("Failed to fetch product IDs");
	}
}
