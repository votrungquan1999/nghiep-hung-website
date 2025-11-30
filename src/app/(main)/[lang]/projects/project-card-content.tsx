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
import { Card, CardContent, CardTitle } from "src/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { type Project, ProjectCompletionStatus } from "src/server/projects/project.type";

interface ProjectCardContentProps {
	project: Project;
	locale: Locale;
}

/**
 * Client component that renders the project card UI with dialog
 * Receives project data as props (data fetching is handled elsewhere)
 */
export function ProjectCardContent({ project, locale }: ProjectCardContentProps) {
	const dictionary = getDictionary(locale);
	const projectName = project.name[locale];
	const projectDescription = project.description[locale];
	const projectCategory = project.category[locale];

	const convertedImages = convertToGalleryImages(
		project.gallery.map((image, index) => ({
			src: image.url,
			alt: `${projectName} - ${index + 1}`,
		})),
	);

	const mainImage = project.gallery?.find((img) => img.isMain) || project.gallery?.[0];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card
					data-testid="project-card"
					className="group cursor-pointer hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1"
				>
					<div className="aspect-video overflow-hidden rounded-t-lg">
						<Image
							src={mainImage?.url || "/placeholder.svg"}
							alt={projectName}
							width={400}
							height={300}
							className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<CardContent className="pb-6">
						<CardTitle className="text-xl font-serif font-bold text-foreground">
							{projectName}
						</CardTitle>
					</CardContent>
				</Card>
			</DialogTrigger>

			<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
				<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
					<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
						{projectName}
					</DialogTitle>
				</DialogHeader>

				<div className="px-6 pb-6 space-y-6">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
						<div className="flex items-center">
							<Building className="size-4 mr-2 text-primary" />
							<span>{projectCategory}</span>
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
								? dictionary.projects.completionStatus.completed
								: project.completionStatus === ProjectCompletionStatus.InProgress
									? dictionary.projects.completionStatus.inProgress
									: dictionary.projects.completionStatus.planning}
						</Badge>
					</div>

					<div>
						<h4 className="font-serif font-bold text-lg mb-3">
							{dictionary.projects.technicalSpecs}
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{project.specs.map((spec, index) => (
								<div key={`spec-${index}-${spec[locale]}`} className="flex items-start">
									<div className="size-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
									<span className="text-muted-foreground text-sm">{spec[locale]}</span>
								</div>
							))}
						</div>
					</div>

					<div>
						<h4 className="font-serif font-bold text-lg mb-3">
							{dictionary.projects.projectImages}
						</h4>
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

					<div className="border border-border rounded-lg p-6 bg-muted/30">
						<h4 className="font-serif font-bold text-xl mb-4 text-foreground">
							{dictionary.projects.projectDescription}
						</h4>
						<div className="text-foreground text-lg leading-relaxed whitespace-pre-line">
							{projectDescription}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
