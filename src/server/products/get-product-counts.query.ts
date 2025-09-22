/**
 * Query to get product counts by status
 */

import { getDatabase } from "src/lib/database";
import type { ProductDocument, ProductStatus } from "./product.type";

/**
 * Get product count by status
 * @returns Promise that resolves to an object with product counts by status
 */
export async function getProductCounts(): Promise<Record<ProductStatus, number>> {
	try {
		const db = await getDatabase();
		const pipeline = [
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 },
				},
			},
		];

		const results = await db.collection<ProductDocument>("products").aggregate(pipeline).toArray();

		const counts: Record<ProductStatus, number> = {
			active: 0,
			draft: 0,
			archived: 0,
		};

		results.forEach((result) => {
			if (result._id in counts) {
				counts[result._id as ProductStatus] = result.count;
			}
		});

		return counts;
	} catch (error) {
		console.error("Error fetching product counts:", error);
		throw new Error("Failed to fetch product counts");
	}
}
