"use server";

import type { FormResult } from "@/components/form-state/form-state.type";
import { getDatabase } from "@/lib/database";
import type { Product, ProductDocument } from "@/server/products/product.type";
import { ProductStatus } from "@/server/products/product.type";

/**
 * Server action to update an existing product (without image handling)
 * @param formData - Form data containing product information
 * @returns Promise that resolves to the update result
 */
export async function updateProduct(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const productId = formData.get("productId") as string;
		const productName = formData.get("productName") as string;
		const productDescription = formData.get("productDescription") as string;
		const productStatus = formData.get("productStatus") as string;

		// Validation phase
		if (!productId) {
			return {
				success: false,
				error: "Product ID is required",
			};
		}

		// Validate required fields, these are validated in the client already, no need to handle errors here
		if (!productName || !productDescription || !productStatus) {
			throw new Error("Product name, description, and status are required");
		}

		// Validate status value, these are validated in the client already, no need to handle errors here
		if (!Object.values(ProductStatus).includes(productStatus as ProductStatus)) {
			throw new Error("Invalid product status");
		}

		// Create updated product document for MongoDB
		const updatedProduct: Partial<Product> = {
			name: productName,
			description: productDescription,
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
