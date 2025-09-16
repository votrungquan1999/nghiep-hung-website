/**
 * Product-specific S3 utilities for create product dialog
 */

/**
 * Generate a unique S3 key for product images
 * @param productName - The name of the product
 * @param fileName - The original file name
 * @param index - The index of the image (for multiple images)
 * @returns A unique S3 key
 */
export function generateProductS3Key(
	productId: string,
	fileName: string,
	index: number = 0,
): string {
	const timestamp = Date.now()
	const fileExtension = fileName.split(".").pop()
	const uniqueKey = `${timestamp}-${index}`

	return `products/${productId}/${uniqueKey}.${fileExtension}`
}
