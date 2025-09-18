/**
 * Query to get a single product by ID
 */

import { getDatabase } from "@/lib/database";
import type { Product, ProductDocument, ProductStatus } from "./product.type";

/**
 * Get a single product by ID
 * @param id - The product ID
 * @returns Promise that resolves to the product or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
	try {
		const db = await getDatabase();
		const product = await db.collection<ProductDocument>("products").findOne({ id });

		if (!product) {
			return null;
		}

		return {
			id: product.id,
			name: product.name,
			description: product.description,
			status: product.status as ProductStatus,
			gallery: product.gallery,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		};
	} catch (error) {
		console.error(`Error fetching product with id ${id}:`, error);
		throw new Error(`Failed to fetch product with id ${id}`);
	}
}
