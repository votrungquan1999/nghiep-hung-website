import { Building, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "src/components/image-gallery/image-gallery";
import { Badge } from "src/components/ui/badge";
import { Card, CardContent } from "src/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import type { Project } from "src/server/projects";
import { getProjectById, ProjectCompletionStatus } from "src/server/projects";

interface ProjectDialogProps {
	projectId: string;
}

/**
 * Server component that fetches project data by ID and renders the project dialog with card trigger
 * Uses the newer image gallery system for consistent UI across admin and public interfaces
 * @param projectId - The ID of the project to display
 */
export default async function ProjectDialog({ projectId }: ProjectDialogProps) {
	const project: Project | null = await getProjectById(projectId);

	if (!project) {
		return <NotFoundProjectDialog />;
	}

	const convertedImages = convertToGalleryImages(
		project.gallery.map((image, index) => ({
			src: image.url,
			alt: `${project.name.vi} - ${index + 1}`,
		})),
	);

	const mainImage = project.gallery?.find((img) => img.isMain) || project.gallery?.[0];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1">
					<div className="aspect-video overflow-hidden rounded-t-lg">
						<Image
							src={mainImage?.url || "/placeholder.svg"}
							alt={project.name.vi}
							width={400}
							height={300}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<CardContent className="p-6">
						<div className="flex items-center justify-between mb-3">
							<Badge variant="secondary">{project.category.vi}</Badge>
							<span className="text-sm text-muted-foreground">{project.year}</span>
						</div>
						<h3 className="text-xl font-serif font-bold text-foreground mb-2">{project.name.vi}</h3>
						<div className="flex items-center text-sm text-muted-foreground mb-3">
							<MapPin className="h-4 w-4 mr-1" />
							{project.location}
						</div>
						<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
							{project.description.vi}
						</p>
					</CardContent>
				</Card>
			</DialogTrigger>

			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-serif font-bold">{project.name.vi}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
						<div className="flex items-center">
							<Building className="size-4 mr-2 text-primary" />
							<span>{project.category.vi}</span>
						</div>
						<div className="flex items-center">
							<MapPin className="size-4 mr-2 text-primary" />
							<span>{project.location}</span>
						</div>
						<div className="flex items-center">
							<Calendar className="size-4 mr-2 text-primary" />
							<span>{project.year}</span>
						</div>
						<Badge
							variant={
								project.completionStatus === ProjectCompletionStatus.Completed
									? "default"
									: "outline"
							}
							className="w-fit"
						>
							{project.completionStatus === ProjectCompletionStatus.Completed
								? "Hoàn thành"
								: project.completionStatus === ProjectCompletionStatus.InProgress
									? "Đang thực hiện"
									: "Đang lên kế hoạch"}
						</Badge>
					</div>

					<div>
						<h4 className="font-serif font-bold text-lg mb-3">{"Mô tả dự án"}</h4>
						<p className="text-muted-foreground leading-relaxed">{project.description.vi}</p>
					</div>

					<div>
						<h4 className="font-serif font-bold text-lg mb-3">{"Thông số kỹ thuật"}</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{project.specs.map((spec, index) => (
								<div key={`spec-${index}-${spec.vi}`} className="flex items-start">
									<div className="size-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<span className="text-muted-foreground text-sm">{spec.vi}</span>
								</div>
							))}
						</div>
					</div>

					<div>
						<h4 className="font-serif font-bold text-lg mb-3">{"Hình ảnh dự án"}</h4>
						<GalleryRoot images={convertedImages}>
							<div className="relative">
								<GalleryImage className="mb-6" />
								<GalleryBackButton className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white">
									<ChevronLeft className="size-4" />
								</GalleryBackButton>
								<GalleryNextButton className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white">
									<ChevronRight className="size-4" />
								</GalleryNextButton>
							</div>
							<GalleryThumbnails />
						</GalleryRoot>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Fallback component displayed when a project is not found
 * Shows a placeholder card with "Project Not Found" message
 * @returns JSX element displaying not found project card
 */
function NotFoundProjectDialog() {
	return (
		<Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1">
			<div className="aspect-video overflow-hidden rounded-t-lg">
				<Image
					src="/placeholder.svg"
					alt="Project not found"
					width={400}
					height={300}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-3">
					<Badge variant="secondary">Not Found</Badge>
					<span className="text-sm text-muted-foreground">-</span>
				</div>
				<h3 className="text-xl font-serif font-bold text-foreground mb-2">Project Not Found</h3>
				<div className="flex items-center text-sm text-muted-foreground mb-3">
					<MapPin className="h-4 w-4 mr-1" />
					Unknown
				</div>
				<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
					The requested project could not be found.
				</p>
			</CardContent>
		</Card>
	);
}
