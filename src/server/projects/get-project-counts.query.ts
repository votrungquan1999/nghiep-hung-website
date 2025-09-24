import { cache } from "react";
import { getDatabase } from "src/lib/database";
import { ProjectCompletionStatus, ProjectVisibilityStatus } from "./project.type";

/**
 * Retrieves project counts by visibility and completion status
 * @returns Promise that resolves to counts for each status type
 */
export const getProjectCounts = cache(
	async (): Promise<{
		visibility: Record<ProjectVisibilityStatus, number>;
		completion: Record<ProjectCompletionStatus, number>;
		total: number;
	}> => {
		try {
			const db = await getDatabase();

			// Get total count
			const total = await db.collection("projects").countDocuments();

			// Get visibility status counts
			const visibilityCounts = await db
				.collection("projects")
				.aggregate([
					{
						$group: {
							_id: "$visibilityStatus",
							count: { $sum: 1 },
						},
					},
				])
				.toArray();

			const visibility: Record<ProjectVisibilityStatus, number> = {
				[ProjectVisibilityStatus.Active]: 0,
				[ProjectVisibilityStatus.Draft]: 0,
			};

			visibilityCounts.forEach((item) => {
				if (item._id in visibility) {
					visibility[item._id as ProjectVisibilityStatus] = item.count;
				}
			});

			// Get completion status counts
			const completionCounts = await db
				.collection("projects")
				.aggregate([
					{
						$group: {
							_id: "$completionStatus",
							count: { $sum: 1 },
						},
					},
				])
				.toArray();

			const completion: Record<ProjectCompletionStatus, number> = {
				[ProjectCompletionStatus.Completed]: 0,
				[ProjectCompletionStatus.InProgress]: 0,
				[ProjectCompletionStatus.Planning]: 0,
			};

			completionCounts.forEach((item) => {
				if (item._id in completion) {
					completion[item._id as ProjectCompletionStatus] = item.count;
				}
			});

			return {
				visibility,
				completion,
				total,
			};
		} catch (error) {
			console.error("Error fetching project counts:", error);
			return {
				visibility: {
					[ProjectVisibilityStatus.Active]: 0,
					[ProjectVisibilityStatus.Draft]: 0,
				},
				completion: {
					[ProjectCompletionStatus.Completed]: 0,
					[ProjectCompletionStatus.InProgress]: 0,
					[ProjectCompletionStatus.Planning]: 0,
				},
				total: 0,
			};
		}
	},
);
