import { Building, Calendar, Edit, FolderOpen, MapPin, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "src/components/ui/badge";
import { Button } from "src/components/ui/button";
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
import { ProjectPreviewDialog } from "./project-preview-dialog";

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
									: "In Progress"}
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
					{/* Actions Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
								<MoreVertical className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild>
								<ProjectPreviewDialog projectId={project.id} />
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Edit className="mr-2 size-4" />
								Edit Project Info
							</DropdownMenuItem>
							<DropdownMenuItem>
								<FolderOpen className="mr-2 size-4" />
								Edit Images
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive focus:text-destructive">
								<Trash2 className="mr-2 size-4" />
								Delete Project
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}
