import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "src/components/image-gallery/image-gallery";
import { Button } from "src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";

interface Project {
	id: string;
	title: string;
	description: string;
	location: string;
	client: string;
	status: string;
	completionDate: string;
	gallery: string[];
	category: string;
	duration: string;
}

interface ProjectPreviewDialogProps {
	project: Project;
}

/**
 * Project preview dialog server component
 * Renders a dialog with project gallery and description
 */
export function ProjectPreviewDialog({ project }: ProjectPreviewDialogProps) {
	const galleryImages = project.gallery;
	const convertedImages = convertToGalleryImages(
		galleryImages.map((src, index) => ({
			src,
			alt: `${project.title} - ${index + 1}`,
		})),
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button" variant="ghost" size="sm">
					<Eye className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
				<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
					<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
						{project.title}
					</DialogTitle>
				</DialogHeader>

				<div className="px-6 pb-6">
					<GalleryRoot images={convertedImages}>
						<div className="relative">
							<GalleryImage className="mb-6" />
							<GalleryBackButton className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white">
								<ChevronLeft className="h-4 w-4" />
							</GalleryBackButton>
							<GalleryNextButton className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white">
								<ChevronRight className="h-4 w-4" />
							</GalleryNextButton>
						</div>
						<GalleryThumbnails />
					</GalleryRoot>

					<div className="space-y-4">
						<p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>

						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<span className="font-medium text-foreground">Location:</span>
								<span className="ml-2 text-muted-foreground">{project.location}</span>
							</div>
							<div>
								<span className="font-medium text-foreground">Client:</span>
								<span className="ml-2 text-muted-foreground">{project.client}</span>
							</div>
							<div>
								<span className="font-medium text-foreground">Status:</span>
								<span className="ml-2 text-muted-foreground">{project.status}</span>
							</div>
							<div>
								<span className="font-medium text-foreground">Duration:</span>
								<span className="ml-2 text-muted-foreground">{project.duration}</span>
							</div>
							<div>
								<span className="font-medium text-foreground">Category:</span>
								<span className="ml-2 text-muted-foreground">{project.category}</span>
							</div>
							<div>
								<span className="font-medium text-foreground">Completed:</span>
								<span className="ml-2 text-muted-foreground">{project.completionDate}</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
