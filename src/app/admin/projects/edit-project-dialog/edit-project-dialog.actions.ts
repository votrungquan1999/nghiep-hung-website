"use server";

import type { FormResult } from "src/components/form-state/form-state.type";
import { getDatabase } from "src/lib/database";
import type { MultilingualText } from "src/lib/types/common.type";
import type { Project, ProjectDocument } from "src/server/projects/project.type";
import { ProjectCompletionStatus, ProjectVisibilityStatus } from "src/server/projects/project.type";

/**
 * Server action to update an existing project (without image handling)
 * @param formData - Form data containing project information
 * @returns Promise that resolves to the update result
 */
export async function updateProject(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const projectId = formData.get("projectId") as string;
		const projectNameEn = formData.get("projectNameEn") as string;
		const projectNameVi = formData.get("projectNameVi") as string;
		const projectCategoryEn = formData.get("projectCategoryEn") as string;
		const projectCategoryVi = formData.get("projectCategoryVi") as string;
		const projectLocation = formData.get("projectLocation") as string;
		const projectYear = formData.get("projectYear") as string;
		const projectDescriptionEn = formData.get("projectDescriptionEn") as string;
		const projectDescriptionVi = formData.get("projectDescriptionVi") as string;
		const projectVisibilityStatus = formData.get("projectVisibilityStatus") as string;
		const projectCompletionStatus = formData.get("projectCompletionStatus") as string;

		// Extract specs (dynamic fields)
		const specsEn: string[] = [];
		const specsVi: string[] = [];

		// Process dynamic specs fields
		for (const [key, value] of formData.entries()) {
			if (key.startsWith("specEn_") && typeof value === "string" && value.trim()) {
				specsEn.push(value.trim());
			}
			if (key.startsWith("specVi_") && typeof value === "string" && value.trim()) {
				specsVi.push(value.trim());
			}
		}

		// Validation phase
		if (!projectId) {
			return {
				success: false,
				error: "Project ID is required",
			};
		}

		// Validate required fields and collect missing field names
		const missingFields: string[] = [];

		if (!projectNameEn) {
			missingFields.push("Project Name (English)");
		}
		if (!projectNameVi) {
			missingFields.push("Project Name (Vietnamese)");
		}
		if (!projectCategoryEn) {
			missingFields.push("Project Category (English)");
		}
		if (!projectCategoryVi) {
			missingFields.push("Project Category (Vietnamese)");
		}
		if (!projectLocation) {
			missingFields.push("Location");
		}
		if (!projectYear) {
			missingFields.push("Year");
		}
		if (!projectDescriptionEn) {
			missingFields.push("Project Description (English)");
		}
		if (!projectDescriptionVi) {
			missingFields.push("Project Description (Vietnamese)");
		}
		if (!projectVisibilityStatus) {
			missingFields.push("Visibility Status");
		}
		if (!projectCompletionStatus) {
			missingFields.push("Completion Status");
		}

		if (missingFields.length > 0) {
			return {
				success: false,
				error: `Please fill in the following required fields: ${missingFields.join(", ")}`,
			};
		}

		// Validate status values, these are validated in the client already, no need to handle errors here
		if (
			!Object.values(ProjectVisibilityStatus).includes(
				projectVisibilityStatus as ProjectVisibilityStatus,
			)
		) {
			throw new Error("Invalid project visibility status");
		}

		if (
			!Object.values(ProjectCompletionStatus).includes(
				projectCompletionStatus as ProjectCompletionStatus,
			)
		) {
			throw new Error("Invalid project completion status");
		}

		// Combine specs into multilingual objects
		const specs: MultilingualText[] = [];
		const maxSpecs = Math.max(specsEn.length, specsVi.length);
		for (let i = 0; i < maxSpecs; i++) {
			if (specsEn[i] || specsVi[i]) {
				specs.push({
					en: specsEn[i] || "",
					vi: specsVi[i] || "",
				});
			}
		}

		// Create updated project document for MongoDB
		const updatedProject: Partial<Project> = {
			name: {
				en: projectNameEn,
				vi: projectNameVi,
			},
			category: {
				en: projectCategoryEn,
				vi: projectCategoryVi,
			},
			location: projectLocation,
			year: projectYear,
			description: {
				en: projectDescriptionEn,
				vi: projectDescriptionVi,
			},
			specs: specs,
			visibilityStatus: projectVisibilityStatus as ProjectVisibilityStatus,
			completionStatus: projectCompletionStatus as ProjectCompletionStatus,
			updatedAt: new Date(),
		};

		// Update in MongoDB
		const db = await getDatabase();
		const result = await db
			.collection<ProjectDocument>("projects")
			.updateOne({ id: projectId }, { $set: updatedProject });

		if (result.matchedCount === 0) {
			return {
				success: false,
				error: "Project not found",
			};
		}

		return {
			success: true,
			refresh: true,
		};
	} catch {
		return {
			success: false,
			error: "An unexpected error occurred while updating the project",
		};
	}
}
