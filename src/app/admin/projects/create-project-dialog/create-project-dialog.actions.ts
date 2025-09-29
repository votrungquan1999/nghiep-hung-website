"use server";

import { chunk } from "lodash";
import { nanoid } from "nanoid";
import type { FormResult } from "src/components/form-state";
import { getDatabase } from "src/lib/database";
import { uploadToS3 } from "src/lib/s3";
import type { ProjectDocument, ProjectImageDocument } from "src/server/projects";
import { ProjectCompletionStatus, ProjectVisibilityStatus } from "src/server/projects";

/**
 * Generates a unique S3 key for project images
 * @param projectId - Unique identifier for the project
 * @param fileName - Original name of the uploaded file
 * @param index - Index of the image in the batch (defaults to 0)
 * @returns Unique S3 key for the image
 */
function generateProjectS3Key(projectId: string, fileName: string, index: number = 0): string {
	const fileExtension = fileName.split(".").pop() || "jpg";
	const uniqueKey = `${index}-${nanoid(8)}`;

	return `projects/${projectId}/${uniqueKey}.${fileExtension}`;
}

/**
 * Server action to create a new project with image uploads to S3 and data storage in MongoDB
 * @param formData - Form data containing project information and images
 * @returns Promise that resolves to the creation result
 */
export async function createProject(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const projectNameEn = formData.get("projectNameEn") as string;
		const projectNameVi = formData.get("projectNameVi") as string;
		const projectCategoryEn = formData.get("projectCategoryEn") as string;
		const projectCategoryVi = formData.get("projectCategoryVi") as string;
		const projectLocation = formData.get("projectLocation") as string;
		const projectYear = formData.get("projectYear") as string;
		const projectDescriptionEn = formData.get("projectDescriptionEn") as string;
		const projectDescriptionVi = formData.get("projectDescriptionVi") as string;
		const projectSpecsJson = formData.get("projectSpecs") as string;
		const visibilityStatus = formData.get("visibilityStatus") as string;
		const completionStatus = formData.get("completionStatus") as string;
		const projectImages = formData.getAll("projectImages") as File[];
		const selectedImageIndex = formData.get("selectedImageIndex") as string;

		// Validation phase
		if (projectImages.length === 0) {
			return {
				success: false,
				error: "At least one project image is required",
			};
		}

		if (!selectedImageIndex) {
			return {
				success: false,
				error: "Select a main image",
			};
		}

		// Parse specifications
		let projectSpecs: { en: string; vi: string }[] = [];
		if (projectSpecsJson) {
			try {
				projectSpecs = JSON.parse(projectSpecsJson);
			} catch {
				return {
					success: false,
					error: "Invalid specifications format",
				};
			}
		}

		// Validate required fields - check for empty strings after trimming
		const trimmedNameEn = projectNameEn?.trim() || "";
		const trimmedNameVi = projectNameVi?.trim() || "";
		const trimmedCategoryEn = projectCategoryEn?.trim() || "";
		const trimmedCategoryVi = projectCategoryVi?.trim() || "";
		const trimmedLocation = projectLocation?.trim() || "";
		const trimmedYear = projectYear?.trim() || "";
		const trimmedDescriptionEn = projectDescriptionEn?.trim() || "";
		const trimmedDescriptionVi = projectDescriptionVi?.trim() || "";

		// Check for missing required fields and provide specific error messages
		const missingFields: string[] = [];

		if (!trimmedNameEn) missingFields.push("Project Name (English)");
		if (!trimmedNameVi) missingFields.push("Project Name (Vietnamese)");
		if (!trimmedCategoryEn) missingFields.push("Project Category (English)");
		if (!trimmedCategoryVi) missingFields.push("Project Category (Vietnamese)");
		if (!trimmedLocation) missingFields.push("Location");
		if (!trimmedYear) missingFields.push("Year");
		if (!trimmedDescriptionEn) missingFields.push("Project Description (English)");
		if (!trimmedDescriptionVi) missingFields.push("Project Description (Vietnamese)");
		if (!visibilityStatus) missingFields.push("Visibility Status");
		if (!completionStatus) missingFields.push("Completion Status");

		if (missingFields.length > 0) {
			return {
				success: false,
				error: `Please fill in the following required fields: ${missingFields.join(", ")}`,
			};
		}

		// Validate specifications - if any spec exists, both en and vi must be provided
		for (let i = 0; i < projectSpecs.length; i++) {
			const spec = projectSpecs[i];
			const hasEn = spec.en && spec.en.trim().length > 0;
			const hasVi = spec.vi && spec.vi.trim().length > 0;

			if (hasEn && !hasVi) {
				return {
					success: false,
					error: `Specification ${i + 1} is missing Vietnamese translation`,
				};
			}
			if (hasVi && !hasEn) {
				return {
					success: false,
					error: `Specification ${i + 1} is missing English translation`,
				};
			}
		}

		// Validate status values
		if (
			!Object.values(ProjectVisibilityStatus).includes(visibilityStatus as ProjectVisibilityStatus)
		) {
			return {
				success: false,
				error: "Invalid visibility status",
			};
		}

		if (
			!Object.values(ProjectCompletionStatus).includes(completionStatus as ProjectCompletionStatus)
		) {
			return {
				success: false,
				error: "Invalid completion status",
			};
		}

		const projectId = nanoid();

		// Upload images to S3 in batches of 10 using lodash chunk
		const batchSize = 10;
		const imageBatches = chunk(projectImages, batchSize);
		const uploadedImages: ProjectImageDocument[] = [];

		try {
			// Process each batch
			for (const [batchIndex, batchImages] of imageBatches.entries()) {
				const uploadPromises = batchImages.map(async (image, imageIndex) => {
					const globalImageIndex = batchIndex * batchSize + imageIndex;
					const s3Key = generateProjectS3Key(projectId, image.name, globalImageIndex);

					await uploadToS3(image, s3Key);

					return {
						key: s3Key,
						isMain: globalImageIndex === parseInt(selectedImageIndex, 10),
						uploadedAt: new Date(),
					} as ProjectImageDocument;
				});

				const batchResults = await Promise.all(uploadPromises);
				uploadedImages.push(...batchResults);
			}
		} catch (error) {
			console.error("Failed to upload images:", error);
			return {
				success: false,
				error: `Failed to upload images: ${error instanceof Error ? error.message : "Unknown error"}`,
			};
		}

		// Filter out completely empty specifications (both en and vi must be empty)
		const validSpecs = projectSpecs.filter(
			(spec) => (spec.en && spec.en.trim().length > 0) || (spec.vi && spec.vi.trim().length > 0),
		);

		// Create project document
		const projectDoc: ProjectDocument = {
			id: projectId,
			name: {
				en: trimmedNameEn,
				vi: trimmedNameVi,
			},
			category: {
				en: trimmedCategoryEn,
				vi: trimmedCategoryVi,
			},
			location: trimmedLocation,
			year: trimmedYear,
			description: {
				en: trimmedDescriptionEn,
				vi: trimmedDescriptionVi,
			},
			specs: validSpecs,
			visibilityStatus: visibilityStatus as ProjectVisibilityStatus,
			completionStatus: completionStatus as ProjectCompletionStatus,
			gallery: uploadedImages,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Save to database
		const db = await getDatabase();
		await db.collection<ProjectDocument>("projects").insertOne(projectDoc);

		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Error creating project:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to create project",
		};
	}
}
