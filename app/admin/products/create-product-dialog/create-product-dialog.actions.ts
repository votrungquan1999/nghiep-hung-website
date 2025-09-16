"use server"

import { nanoid } from "nanoid"
import { getDatabase } from "@/lib/database"
import { uploadToS3 } from "@/lib/s3"
import type { CreateProductResult, Product, ProductImage } from "./create-product-dialog.type"
import { ProductStatus } from "./create-product-dialog.type"
import { generateProductS3Key } from "./create-product-s3.utils"

/**
 * Server action to create a new product with image uploads to S3 and data storage in MongoDB
 * @param formData - Form data containing product information and images
 * @returns Promise that resolves to the creation result
 */
export async function createProduct(formData: FormData): Promise<CreateProductResult> {
	try {
		// Extract form data
		const productName = formData.get("productName") as string
		const productDescription = formData.get("productDescription") as string
		const productImages = formData.getAll("productImages") as File[]

		// Validate required fields
		if (!productName || !productDescription) {
			return {
				success: false,
				error: "Product name and description are required",
			}
		}

		if (productImages.length === 0) {
			return {
				success: false,
				error: "At least one product image is required",
			}
		}

		const productId = nanoid()

		// Upload images to S3
		const uploadedImages: ProductImage[] = []

		for (let i = 0; i < productImages.length; i++) {
			const file = productImages[i]
			const s3Key = generateProductS3Key(productId, file.name, i)

			try {
				const uploadResult = await uploadToS3(file, s3Key)

				uploadedImages.push({
					key: uploadResult.key,
					url: uploadResult.url,
					isMain: i === 0, // First image is the main image
					uploadedAt: new Date(),
				})
			} catch (uploadError) {
				console.error(`Failed to upload image ${i + 1}:`, uploadError)
				return {
					success: false,
					error: `Failed to upload image ${i + 1}`,
				}
			}
		}

		// Create product document for MongoDB
		const product: Product = {
			id: productId,
			name: productName,
			description: productDescription,
			category: "Air Ducts", // Default category, can be made configurable later
			price: "Contact for pricing", // Default price, can be made configurable later
			status: ProductStatus.Active,
			gallery: uploadedImages,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		// Save to MongoDB
		const db = await getDatabase()
		const result = await db.collection("products").insertOne(product)

		if (!result.insertedId) {
			return {
				success: false,
				error: "Failed to save product to database",
			}
		}

		return {
			success: true,
			productId: result.insertedId.toString(),
		}
	} catch (error) {
		console.error("Error creating product:", error)
		return {
			success: false,
			error: "An unexpected error occurred while creating the product",
		}
	}
}

/**
 * Server action to get all products from MongoDB
 * @returns Promise that resolves to an array of products
 */
export async function getProducts(): Promise<Product[]> {
	try {
		const db = await getDatabase()
		const products = await db.collection<Product>("products").find({}).toArray()

		return products
	} catch (error) {
		console.error("Error fetching products:", error)
		return []
	}
}

/**
 * Server action to get a single product by ID from MongoDB
 * @param productId - The ID of the product to fetch
 * @returns Promise that resolves to the product or null if not found
 */
export async function getProductById(productId: string): Promise<Product | null> {
	try {
		const db = await getDatabase()
		const { ObjectId } = await import("mongodb")
		const product = await db
			.collection<Product>("products")
			.findOne({ _id: new ObjectId(productId) })

		if (!product) {
			return null
		}

		return product
	} catch (error) {
		console.error("Error fetching product:", error)
		return null
	}
}
