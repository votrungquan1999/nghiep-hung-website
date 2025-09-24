import { cache } from "react";
import { getDatabase } from "src/lib/database";
import { getS3Url } from "src/lib/s3";
import type { Project, ProjectDocument } from "./project.type";

/**
 * Retrieves a project by its ID from the database
 * @param id - The unique identifier of the project
 * @returns Promise that resolves to the project object or null if not found
 */
export const getProjectById = cache(async (id: string): Promise<Project | null> => {
	try {
		const db = await getDatabase();
		const projectDoc = await db.collection<ProjectDocument>("projects").findOne({ id });

		if (!projectDoc) {
			return null;
		}

		// Convert database document to client interface
		const project: Project = {
			id: projectDoc.id,
			name: projectDoc.name,
			category: projectDoc.category,
			location: projectDoc.location,
			year: projectDoc.year,
			description: projectDoc.description,
			specs: projectDoc.specs,
			visibilityStatus: projectDoc.visibilityStatus,
			completionStatus: projectDoc.completionStatus,
			gallery: projectDoc.gallery.map((img) => ({
				key: img.key,
				url: getS3Url(img.key),
				isMain: img.isMain,
				uploadedAt: img.uploadedAt,
			})),
			createdAt: projectDoc.createdAt,
			updatedAt: projectDoc.updatedAt,
		};

		return project;
	} catch (error) {
		console.error("Error fetching project by ID:", error);
		return null;
	}
});
