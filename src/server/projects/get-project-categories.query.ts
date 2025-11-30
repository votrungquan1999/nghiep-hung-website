import { cache } from "react";
import { getDatabase } from "src/lib/database";
import type { MultilingualText } from "src/lib/types/common.type";
import type { ProjectDocument, ProjectVisibilityStatus } from "./project.type";

/**
 * Retrieves unique project categories from active projects in the database
 * Categories are dynamically computed from existing project data
 * @returns Promise that resolves to an array of unique multilingual categories
 */
export const getActiveProjectCategories = cache(async (): Promise<MultilingualText[]> => {
	try {
		const db = await getDatabase();
		const projects = await db
			.collection<ProjectDocument>("projects")
			.find(
				{ visibilityStatus: "active" as ProjectVisibilityStatus },
				{ projection: { category: 1 } },
			)
			.toArray();

		// Extract unique categories using a Map keyed by the English value
		const categoryMap = new Map<string, MultilingualText>();
		for (const project of projects) {
			if (project.category?.en && !categoryMap.has(project.category.en)) {
				categoryMap.set(project.category.en, project.category);
			}
		}

		return Array.from(categoryMap.values());
	} catch (error) {
		console.error("Error fetching project categories:", error);
		return [];
	}
});
