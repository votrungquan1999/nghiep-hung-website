import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export interface S3UploadResult {
	key: string
	url: string
}

/**
 * AWS S3 client configuration
 */
const s3Client = new S3Client({
	region: process.env.AWS_REGION || "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
	},
})

/**
 * Upload a file to AWS S3
 * @param file - The file to upload
 * @param key - The S3 object key (path)
 * @returns Promise that resolves to the upload result with key and URL
 */
export async function uploadToS3(file: File, key: string): Promise<S3UploadResult> {
	const buffer = Buffer.from(await file.arrayBuffer())
	const bucketName = process.env.AWS_S3_BUCKET_NAME

	if (!bucketName) {
		throw new Error("AWS_S3_BUCKET_NAME environment variable is required")
	}

	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: key,
		Body: buffer,
		ContentType: file.type,
		ACL: "public-read",
	})

	await s3Client.send(command)

	// Construct the public URL
	const url = `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`

	return {
		key,
		url,
	}
}
