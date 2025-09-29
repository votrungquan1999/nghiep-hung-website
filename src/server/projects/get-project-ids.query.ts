import { cache } from "react";
import { getDatabase } from "src/lib/database";
import type { ProjectVisibilityStatus } from "./project.type";

/**
 * Retrieves all project IDs from the database
 * @returns Promise that resolves to an array of project IDs
 */
export const getProjectIds = cache(async (): Promise<string[]> => {
	try {
		const db = await getDatabase();
		const projects = await db
			.collection("projects")
			.find({}, { projection: { id: 1 } })
			.toArray();
		return projects.map((project) => project.id);
	} catch (error) {
		console.error("Error fetching project IDs:", error);
		return [];
	}
});

/**
 * Get only active project IDs from the database
 * Used for displaying projects on public pages
 * @returns Promise that resolves to an array of active project IDs
 */
export const getActiveProjectIds = cache(async (): Promise<string[]> => {
	try {
		const db = await getDatabase();
		const projects = await db
			.collection("projects")
			.find({ visibilityStatus: "active" as ProjectVisibilityStatus }, { projection: { id: 1 } })
			.toArray();
		return projects.map((project) => project.id);
	} catch (error) {
		console.error("Error fetching active project IDs:", error);
		return [];
	}
});
