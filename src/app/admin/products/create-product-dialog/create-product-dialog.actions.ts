"use server";

import { chunk } from "lodash";
import { nanoid } from "nanoid";
import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import type { S3UploadResult } from "src/lib/s3";
import { uploadToS3 } from "src/lib/s3";
import type { Product, ProductDocument, ProductImage } from "src/server/products/product.type";
import { ProductStatus } from "src/server/products/product.type";

/**
 * Generate a unique S3 key for product images
 * @param productName - The name of the product
 * @param fileName - The original file name
 * @param index - The index of the image (for multiple images)
 * @returns A unique S3 key
 */
function generateProductS3Key(productId: string, fileName: string, index: number = 0): string {
	const timestamp = Date.now();
	const fileExtension = fileName.split(".").pop();
	const uniqueKey = `${timestamp}-${index}`;

	return `products/${productId}/${uniqueKey}.${fileExtension}`;
}

/**
 * Server action to create a new product with image uploads to S3 and data storage in MongoDB
 * @param formData - Form data containing product information and images
 * @returns Promise that resolves to the creation result
 */
export async function createProduct(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const productNameEn = formData.get("productNameEn") as string;
		const productNameVi = formData.get("productNameVi") as string;
		const productDescriptionEn = formData.get("productDescriptionEn") as string;
		const productDescriptionVi = formData.get("productDescriptionVi") as string;
		const productStatus = formData.get("productStatus") as string;
		const productImages = formData.getAll("productImages") as File[];
		const selectedImageIndex = formData.get("selectedImageIndex") as string;

		// Validation phase
		if (productImages.length === 0) {
			return {
				success: false,
				error: "At least one product image is required",
			};
		}

		if (!selectedImageIndex) {
			return {
				success: false,
				error: "Select a main image",
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

		const productId = nanoid();

		// Upload images to S3 in batches of 10 using lodash chunk
		const batchSize = 10;
		const imageBatches = chunk(productImages, batchSize);
		const uploadedImages: ProductImage[] = [];

		// Process each batch
		for (const [batchIndex, batchImages] of imageBatches.entries()) {
			const startIndex = batchIndex * batchSize;

			// Create upload promises for current batch
			const batchUploadPromises = batchImages.map(async (file, i) => {
				const globalIndex = startIndex + i;
				const s3Key = generateProductS3Key(productId, file.name, globalIndex);

				const uploadResult: S3UploadResult = await uploadToS3(file, s3Key);

				// Check if this is the main image based on index
				const mainImageIndex = parseInt(selectedImageIndex, 10);
				const isMain = globalIndex === mainImageIndex;

				return {
					key: uploadResult.key,
					url: uploadResult.url,
					isMain,
					uploadedAt: new Date(),
					index: globalIndex,
				};
			});

			// Execute current batch uploads in parallel
			try {
				const batchResults = await Promise.all(batchUploadPromises);
				// Sort by original index to maintain order within batch
				const sortedBatchResults = batchResults
					.sort((a, b) => a.index - b.index)
					.map(({ index, ...image }) => image);

				uploadedImages.push(...sortedBatchResults);
			} catch {
				return {
					success: false,
					error: "Failed to upload images",
				};
			}
		}

		// Create product document for MongoDB
		const product: Product = {
			id: productId,
			name: {
				en: productNameEn,
				vi: productNameVi,
			},
			description: {
				en: productDescriptionEn,
				vi: productDescriptionVi,
			},
			status: productStatus as ProductStatus,
			gallery: uploadedImages,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Save to MongoDB
		const db = await getDatabase();
		const result = await db.collection<ProductDocument>("products").insertOne(product);

		if (!result.insertedId) {
			return {
				success: false,
				error: "Failed to save product to database",
			};
		}

		return {
			success: true,
			refresh: true,
		};
	} catch {
		return {
			success: false,
			error: "An unexpected error occurred while creating the product",
		};
	}
}
