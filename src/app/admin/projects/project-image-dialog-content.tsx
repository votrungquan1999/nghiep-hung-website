import { ImageIcon } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Project } from "src/server/projects";
import { ProjectImageManagementProvider } from "./edit-project-images/image-management-dialog.state";
import type { ExistingImage } from "./edit-project-images/image-management-dialog.type";
import { ProjectImageManagementContent } from "./edit-project-images/image-management-dialog.ui";

interface ProjectImageDialogContentProps {
	project: Project;
}

/**
 * Server component that renders the content of the project image management dialog
 * Displays the image management interface for the project
 * @param project - The project whose images to manage
 */
export function ProjectImageDialogContent({ project }: ProjectImageDialogContentProps) {
	// Convert project images to the expected format
	const existingImages: ExistingImage[] = project.gallery.map((image) => ({
		id: image.key,
		type: "existing" as const,
		url: image.url,
		name: `Project image ${image.key}`,
	}));

	// Find the main image
	const mainImage = project.gallery.find((img) => img.isMain);
	const mainImageId = mainImage ? mainImage.key : null;

	return (
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<ImageIcon className="size-5" />
					Manage Images: {project.name.vi}
				</DialogTitle>
			</DialogHeader>

			<ProjectImageManagementProvider existingImages={existingImages} mainImageId={mainImageId}>
				<ProjectImageManagementContent projectId={project.id} />
			</ProjectImageManagementProvider>
		</DialogContent>
	);
}
