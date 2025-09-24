import { FormBoundaryProvider } from "src/components/form-state/form-state.state";
import { ProjectRow } from "./project-row";

interface ProjectsListProps {
	projectIds: string[];
}

/**
 * Component that displays the list of projects when projects exist
 * Uses individual ProjectRow components that fetch their own data
 * @param projectIds - Array of project IDs to display
 */
export function ProjectsList({ projectIds }: ProjectsListProps) {
	return (
		<div className="bg-card rounded-lg border">
			<div className="px-6 py-4 border-b">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-foreground">Projects</h2>
					<div className="text-sm text-muted-foreground">{projectIds.length} total</div>
				</div>
			</div>

			<div className="divide-y">
				{projectIds.map((projectId) => (
					<FormBoundaryProvider key={projectId}>
						<ProjectRow projectId={projectId} />
					</FormBoundaryProvider>
				))}
			</div>
		</div>
	);
}
