"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import type { FormResult } from "src/components/form-state";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getDatabase } from "src/lib/database";
import type { Product, ProductDocument } from "src/server/products";
import { ProductStatus } from "src/server/products";

/**
 * Server action to update an existing product (without image handling)
 * @param formData - Form data containing product information
 * @returns Promise that resolves to the update result
 */
export async function updateProduct(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const productId = formData.get("productId") as string;
		const productNameEn = formData.get("productNameEn") as string;
		const productNameVi = formData.get("productNameVi") as string;
		const productDescriptionEn = formData.get("productDescriptionEn") as string;
		const productDescriptionVi = formData.get("productDescriptionVi") as string;
		const productStatus = formData.get("productStatus") as string;
		const productCategoryEn = (formData.get("productCategoryEn") as string) || "";
		const productCategoryVi = (formData.get("productCategoryVi") as string) || "";

		// Validation phase
		if (!productId) {
			return {
				success: false,
				error: "Product ID is required",
			};
		}

		// Validate required fields and collect missing field names
		const missingFields: string[] = [];

		if (!productNameEn) {
			missingFields.push("Product Name (English)");
		}
		if (!productNameVi) {
			missingFields.push("Product Name (Vietnamese)");
		}
		if (!productDescriptionEn) {
			missingFields.push("Product Description (English)");
		}
		if (!productDescriptionVi) {
			missingFields.push("Product Description (Vietnamese)");
		}
		if (!productStatus) {
			missingFields.push("Product Status");
		}

		if (missingFields.length > 0) {
			return {
				success: false,
				error: `Please fill in the following required fields: ${missingFields.join(", ")}`,
			};
		}

		// Validate status value, these are validated in the client already, no need to handle errors here
		if (!Object.values(ProductStatus).includes(productStatus as ProductStatus)) {
			throw new Error("Invalid product status");
		}

		// Create updated product document for MongoDB
		const updatedProduct: Partial<Product> = {
			name: {
				en: productNameEn,
				vi: productNameVi,
			},
			// Only include category in $set if a value was provided
			...(productCategoryEn || productCategoryVi
				? { category: { en: productCategoryEn, vi: productCategoryVi } }
				: {}),
			description: {
				en: productDescriptionEn,
				vi: productDescriptionVi,
			},
			status: productStatus as ProductStatus,
			updatedAt: new Date(),
		};

		// Update in MongoDB — set category if provided, unset if cleared
		const hasCategory = productCategoryEn || productCategoryVi;
		const db = await getDatabase();
		const result = await db.collection<ProductDocument>("products").updateOne(
			{ id: productId },
			{
				$set: updatedProduct,
				...(hasCategory ? {} : { $unset: { category: "" } }),
			},
		);

		if (result.matchedCount === 0) {
			return {
				success: false,
				error: "Product not found",
			};
		}

		// Revalidate products cache
		revalidateTag(CACHE_TAGS.PRODUCTS, "max");
		revalidatePath("/admin/products");

		return {
			success: true,
			refresh: true,
		};
	} catch {
		return {
			success: false,
			error: "An unexpected error occurred while updating the product",
		};
	}
}
