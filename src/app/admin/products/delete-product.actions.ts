"use server";

import { chunk } from "lodash";
import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import { deleteFromS3 } from "src/lib/s3";
import type { ProductDocument, ProductImageDocument } from "src/server/products/product.type";

/**
 * Delete a product by ID
 * @param formData - Form data containing the product ID
 * @returns Promise that resolves to success/error result
 */
export async function deleteProductAction(formData: FormData): Promise<FormResult> {
	try {
		const productId = formData.get("productId") as string;

		if (!productId) {
			return {
				success: false,
				error: "Product ID is required",
			};
		}

		const db = await getDatabase();
		const productsCollection = db.collection<ProductDocument>("products");

		// Check if product exists
		const existingProduct = await productsCollection.findOne({ id: productId });
		if (!existingProduct) {
			return {
				success: false,
				error: "Product not found",
			};
		}

		// Extract S3 keys from product gallery
		const s3Keys = existingProduct.gallery
			.map((image: ProductImageDocument) => image.key)
			.filter(Boolean);

		// Delete S3 images in chunks to avoid overwhelming the service
		if (s3Keys.length > 0) {
			try {
				const chunks = chunk(s3Keys, 5); // Process 5 images at a time
				for (const chunkKeys of chunks) {
					await Promise.all((chunkKeys as string[]).map((key: string) => deleteFromS3(key)));
				}
			} catch (s3Error) {
				console.error("Error deleting S3 images:", s3Error);
				// Continue with database deletion even if S3 deletion fails
				// This prevents orphaned database records
			}
		}

		// Delete the product from database
		const result = await productsCollection.deleteOne({ id: productId });

		if (result.deletedCount === 0) {
			return {
				success: false,
				error: "Failed to delete product",
			};
		}

		// Return success with refresh to update the UI
		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Error deleting product:", error);
		return {
			success: false,
			error: "An unexpected error occurred while deleting the product",
		};
	}
}
