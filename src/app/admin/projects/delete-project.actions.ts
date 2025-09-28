"use server";

import { chunk } from "lodash";
import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import { deleteFromS3 } from "src/lib/s3";
import type { ProjectDocument, ProjectImageDocument } from "src/server/projects/project.type";

/**
 * Delete a project by ID
 * @param formData - Form data containing the project ID
 * @returns Promise that resolves to success/error result
 */
export async function deleteProjectAction(formData: FormData): Promise<FormResult> {
	try {
		const projectId = formData.get("projectId") as string;

		if (!projectId) {
			return {
				success: false,
				error: "Project ID is required",
			};
		}

		const db = await getDatabase();
		const projectsCollection = db.collection<ProjectDocument>("projects");

		// Check if project exists
		const existingProject = await projectsCollection.findOne({ id: projectId });
		if (!existingProject) {
			return {
				success: false,
				error: "Project not found",
			};
		}

		// Extract S3 keys from project gallery
		const s3Keys = existingProject.gallery
			.map((image: ProjectImageDocument) => image.key)
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

		// Delete the project from database
		const result = await projectsCollection.deleteOne({ id: projectId });

		if (result.deletedCount === 0) {
			return {
				success: false,
				error: "Failed to delete project",
			};
		}

		// Return success with refresh to update the UI
		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Error deleting project:", error);
		return {
			success: false,
			error: "An unexpected error occurred while deleting the project",
		};
	}
}
