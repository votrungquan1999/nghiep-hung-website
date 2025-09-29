import { Edit } from "lucide-react";
import { FormBoundaryProvider } from "src/components/form-state";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Project } from "src/server/projects";
import { EditProjectForm } from "./edit-project-dialog/edit-project-form";

interface ProjectEditDialogContentProps {
	project: Project;
}

/**
 * Server component for project edit dialog content
 * Provides form boundary and dialog structure for editing
 * @param product - The project to edit
 */
export function ProjectEditDialogContent({ project }: ProjectEditDialogContentProps) {
	return (
		<DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Edit className="size-5" />
					Edit Project
				</DialogTitle>
			</DialogHeader>

			<FormBoundaryProvider>
				<EditProjectForm project={project} />
			</FormBoundaryProvider>
		</DialogContent>
	);
}
