import { Building, Edit, FolderOpen } from "lucide-react";
import { Card, CardContent } from "src/components/ui/card";
import { getProjectCounts, getProjectIds, ProjectVisibilityStatus } from "src/server/projects";
import { CreateProjectDialog } from "./create-project-dialog";
import { EmptyStateWithDialog } from "./empty-state-with-dialog";
import { ProjectsList } from "./projects-list";

/**
 * Projects management page
 * Manages and displays completed projects and portfolio
 * Uses efficient queries to check for projects and display them
 */
export default async function ProjectsPage() {
	// Fetch project IDs and counts efficiently
	const [projectIds, projectCounts] = await Promise.all([getProjectIds(), getProjectCounts()]);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<FolderOpen className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">
							{"Projects Management"}
						</h1>
						<p className="text-muted-foreground">{"Manage and display completed projects"}</p>
					</div>
				</div>

				{/* Add New Button */}
				<CreateProjectDialog />
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{projectCounts.total}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Total Projects"}</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<FolderOpen className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">
									{projectCounts.visibility[ProjectVisibilityStatus.Active]}
								</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">
									{"Active Projects"}
								</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<Building className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">
									{projectCounts.visibility[ProjectVisibilityStatus.Draft]}
								</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft Projects"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Edit className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Projects List */}
			{projectIds.length === 0 ? (
				<EmptyStateWithDialog />
			) : (
				<ProjectsList projectIds={projectIds} />
			)}
		</div>
	);
}
