/**
 * Query to get all products from the database
 */

import { getDatabase } from "src/lib/database";
import type { Product, ProductDocument, ProductStatus } from "./product.type";

/**
 * Get all products from the database
 * @returns Promise that resolves to an array of products
 */
export async function getAllProducts(): Promise<Product[]> {
	try {
		const db = await getDatabase();
		const products = await db.collection<ProductDocument>("products").find({}).toArray();

		// Convert MongoDB documents to Product interface
		return products.map((doc) => ({
			id: doc.id,
			name: doc.name,
			description: doc.description,
			status: doc.status as ProductStatus,
			gallery: doc.gallery || [],
			createdAt: doc.createdAt,
			updatedAt: doc.updatedAt,
		}));
	} catch (error) {
		console.error("Error fetching products:", error);
		throw new Error("Failed to fetch products");
	}
}
