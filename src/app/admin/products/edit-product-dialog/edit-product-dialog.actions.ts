"use server";

import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import type { Product, ProductDocument } from "src/server/products/product.type";
import { ProductStatus } from "src/server/products/product.type";

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

		// Validation phase
		if (!productId) {
			return {
				success: false,
				error: "Product ID is required",
			};
		}

		// Validate required fields, these are validated in the client already, no need to handle errors here
		if (
			!productNameEn ||
			!productNameVi ||
			!productDescriptionEn ||
			!productDescriptionVi ||
			!productStatus
		) {
			throw new Error(
				"Product name (both languages), description (both languages), and status are required",
			);
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
			description: {
				en: productDescriptionEn,
				vi: productDescriptionVi,
			},
			status: productStatus as ProductStatus,
			updatedAt: new Date(),
		};

		// Update in MongoDB
		const db = await getDatabase();
		const result = await db
			.collection<ProductDocument>("products")
			.updateOne({ id: productId }, { $set: updatedProduct });

		if (result.matchedCount === 0) {
			return {
				success: false,
				error: "Product not found",
			};
		}

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
