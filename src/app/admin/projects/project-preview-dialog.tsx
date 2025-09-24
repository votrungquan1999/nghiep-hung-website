import { Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "src/components/ui/dialog";
import { ProjectPreviewDialogContent } from "./project-preview-dialog-content";

interface ProjectPreviewDialogProps {
	projectId: string;
}

/**
 * Project preview dialog component
 * Renders a dialog with project gallery, description, and specifications
 * @param projectId - The ID of the project to display
 */
export function ProjectPreviewDialog({ projectId }: ProjectPreviewDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-muted">
					<Eye className="mr-2 size-4" />
					View Project
				</div>
			</DialogTrigger>
			<ProjectPreviewDialogContent projectId={projectId} />
		</Dialog>
	);
}
