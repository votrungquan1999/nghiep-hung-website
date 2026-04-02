/**
 * Query to get unique categories from active products
 * Products without a category return an implicit "Other" entry
 */

import { cache } from "react";
import { getDatabase } from "src/lib/database";
import type { MultilingualText, ProductDocument, ProductStatus } from "./product.type";

/**
 * Special sentinel value representing uncategorized products
 * Used as a filter key on the client side
 */
export const PRODUCT_OTHER_CATEGORY: MultilingualText = {
	en: "Other",
	vi: "Khác",
};

/**
 * Get unique categories from all active products.
 * Products without a category contribute to the implicit "Other" bucket
 * but are NOT included in this list — the section handles that itself.
 * @returns Array of unique MultilingualText category objects
 */
export const getActiveProductCategories = cache(async (): Promise<MultilingualText[]> => {
	try {
		const db = await getDatabase();
		const products = await db
			.collection<ProductDocument>("products")
			.find<{ category?: MultilingualText }>(
				{ status: "active" as ProductStatus },
				{ projection: { category: 1, _id: 0 } },
			)
			.toArray();

		const seen = new Set<string>();
		const categories: MultilingualText[] = [];

		for (const product of products) {
			if (!product.category) continue; // uncategorized — will be "Other"
			if (seen.has(product.category.en)) continue;
			seen.add(product.category.en);
			categories.push(product.category);
		}

		return categories;
	} catch (error) {
		console.error("Error fetching active product categories:", error);
		throw new Error("Failed to fetch active product categories");
	}
});
