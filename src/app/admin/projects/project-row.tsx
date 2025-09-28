import {
	Building,
	Calendar,
	Edit,
	Eye,
	FolderOpen,
	MapPin,
	MoreVertical,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import {
	CancelButton,
	ConfirmButton,
	ConfirmDialog,
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormSubmitMessage,
} from "src/components/form-state";
import { SubmitButton } from "src/components/form-state/form-state.ui";
import { Badge } from "src/components/ui/badge";
import { Button } from "src/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "src/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import {
	getProjectById,
	ProjectCompletionStatus,
	ProjectVisibilityStatus,
} from "src/server/projects";
import { deleteProjectAction } from "./delete-project.actions";
import {
	ProjectEditTrigger,
	ProjectImageTrigger,
	ProjectPreviewTrigger,
} from "./project-dialog-triggers";
import { ProjectEditDialogContent } from "./project-edit-dialog-content";
import { ProjectImageDialogContent } from "./project-image-dialog-content";
import { ProjectPreviewDialogContent } from "./project-preview-dialog-content";
import { ProjectRowDialog } from "./project-row-context.ui";

interface ProjectRowProps {
	projectId: string;
}

/**
 * Individual project row component that fetches and displays a single project
 * Features a card-based design with project-specific information and interactions
 * @param projectId - The ID of the project to display
 */
export async function ProjectRow({ projectId }: ProjectRowProps) {
	const project = await getProjectById(projectId);

	if (!project) {
		throw new Error(`Project with id ${projectId} not found`);
	}

	const mainImage = project.gallery.find((img) => img.isMain) || project.gallery[0];

	return (
		<div className="p-6 hover:bg-muted/50 transition-colors">
			<div className="flex items-center space-x-4">
				{/* Project Image */}
				<div className="size-40 flex-shrink-0 overflow-hidden rounded-lg">
					{mainImage ? (
						<Image
							src={mainImage.url}
							alt={project.name.en}
							width={160}
							height={160}
							className="size-full object-cover"
						/>
					) : (
						<div className="size-full flex items-center justify-center bg-muted">
							<Building className="size-8 text-muted-foreground" />
						</div>
					)}
				</div>

				{/* Project Info */}
				<div className="flex-1 min-w-0">
					<div className="flex items-center space-x-3 mb-1">
						<h3 className="text-lg font-semibold text-foreground truncate">{project.name.en}</h3>
						{/* Status Badges */}
						<div className="flex items-center space-x-2">
							<Badge
								variant={
									project.visibilityStatus === ProjectVisibilityStatus.Active
										? "default"
										: "secondary"
								}
								className="text-xs"
							>
								{project.visibilityStatus === ProjectVisibilityStatus.Active ? "Active" : "Draft"}
							</Badge>
							<Badge
								variant={
									project.completionStatus === ProjectCompletionStatus.Completed
										? "default"
										: "outline"
								}
								className="text-xs"
							>
								{project.completionStatus === ProjectCompletionStatus.Completed
									? "Completed"
									: project.completionStatus === ProjectCompletionStatus.InProgress
										? "In Progress"
										: "Planning"}
							</Badge>
						</div>
					</div>
					<p className="text-sm text-muted-foreground truncate mb-2">{project.name.vi}</p>
					<div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
						<div className="flex items-center">
							<MapPin className="size-4 mr-1" />
							{project.location}
						</div>
						<div className="flex items-center">
							<Calendar className="size-4 mr-1" />
							{project.year}
						</div>
						<Badge variant="outline" className="text-xs">
							{project.category.en}
						</Badge>
					</div>
					<div className="text-sm text-muted-foreground mb-3 min-w-0 max-w-full">
						<p className="truncate mb-1 whitespace-nowrap overflow-hidden">
							<strong>EN:</strong> {project.description.en}
						</p>
						<p className="truncate whitespace-nowrap overflow-hidden">
							<strong>VI:</strong> {project.description.vi}
						</p>
						{project.specs.length > 0 && (
							<div className="mt-2">
								<p className="text-xs font-medium text-foreground mb-1">Specifications:</p>
								<div className="flex flex-wrap gap-1">
									{project.specs.slice(0, 3).map((spec, index) => (
										<span
											key={`spec-${index}-${spec.en}-${spec.vi}`}
											className="text-xs bg-muted px-2 py-1 rounded"
										>
											{spec.en}
										</span>
									))}
									{project.specs.length > 3 && (
										<span className="text-xs text-muted-foreground">
											+{project.specs.length - 3} more
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Actions */}
				<div className="self-stretch flex items-start">
					<Form action={deleteProjectAction} confirmBeforeSubmit>
						<input type="hidden" name="projectId" value={project.id} />
						{/* Actions Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
									<MoreVertical className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<ProjectPreviewTrigger className="flex items-center gap-2 w-full">
									<Eye className="size-4" />
									View Details
								</ProjectPreviewTrigger>
								<ProjectEditTrigger className="flex items-center gap-2 w-full">
									<Edit className="size-4" />
									Edit Project Info
								</ProjectEditTrigger>
								<ProjectImageTrigger className="flex items-center gap-2 w-full">
									<FolderOpen className="size-4" />
									Edit Images
								</ProjectImageTrigger>
								<SubmitButton asChild>
									<DropdownMenuItem className="text-destructive focus:text-destructive">
										<Trash2 className="mr-2 size-4" />
										Delete Project
									</DropdownMenuItem>
								</SubmitButton>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Delete Confirm Dialog */}
						<ConfirmDialog>
							<DialogContent className="sm:max-w-2xl bg-white">
								<DialogHeader className="space-y-3">
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-full bg-destructive/10 flex-shrink-0">
											<Trash2 className="size-5 text-destructive" />
										</div>
										<div className="space-y-1">
											<DialogTitle>Delete Project</DialogTitle>
											<DialogDescription>
												This action cannot be undone. The project will be permanently removed.
											</DialogDescription>
										</div>
									</div>
								</DialogHeader>
								<div className="space-y-3">
									<div className="p-4 bg-muted/50 rounded-lg border">
										<div className="mb-2">
											<p className="font-medium text-foreground">{project.name.en}</p>
											<p className="text-sm text-muted-foreground">{project.name.vi}</p>
										</div>
										<div className="text-sm text-muted-foreground leading-relaxed mb-3">
											<p className="mb-1">
												<strong>EN:</strong> {project.description.en}
											</p>
											<p>
												<strong>VI:</strong> {project.description.vi}
											</p>
										</div>
										<div className="flex items-center gap-4 text-xs text-muted-foreground">
											<span className="flex items-center gap-1">
												<span className="size-2 rounded-full bg-destructive"></span>
												{project.gallery.length} image{project.gallery.length !== 1 ? "s" : ""} will
												be deleted
											</span>
											<span className="flex items-center gap-1">
												<span className="size-2 rounded-full bg-destructive"></span>
												{project.specs.length} specification{project.specs.length !== 1 ? "s" : ""}{" "}
												will be deleted
											</span>
										</div>
									</div>
									<FormErrorDisplay />
								</div>

								<DialogFooter className="gap-2">
									<CancelButton>Cancel</CancelButton>
									<ConfirmButton variant="destructive">
										<FormSubmitMessage>Delete Project</FormSubmitMessage>
										<FormPendingMessage>Deleting...</FormPendingMessage>
									</ConfirmButton>
								</DialogFooter>
							</DialogContent>
						</ConfirmDialog>
					</Form>
				</div>
			</div>

			{/* Dialog wrappers for preview and edit */}
			<ProjectRowDialog type="preview">
				<ProjectPreviewDialogContent projectId={project.id} />
			</ProjectRowDialog>

			<ProjectRowDialog type="edit">
				<ProjectEditDialogContent project={project} />
			</ProjectRowDialog>

			{/* Image Management Dialog */}
			<ProjectRowDialog type="image">
				<ProjectImageDialogContent project={project} />
			</ProjectRowDialog>
		</div>
	);
}
