import { Building, Calendar, ChevronLeft, ChevronRight, Eye, MapPin } from "lucide-react";
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "src/components/image-gallery/image-gallery";
import { Badge } from "src/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";

interface Project {
	id: string;
	name: {
		en: string;
		vi: string;
	};
	category: {
		en: string;
		vi: string;
	};
	location: string;
	year: string;
	description: {
		en: string;
		vi: string;
	};
	mainImage: string;
	images: string[];
	specs: {
		en: string[];
		vi: string[];
	};
	visibilityStatus: "active" | "draft";
	completionStatus: "completed" | "in-progress";
}

interface ProjectPreviewDialogProps {
	project: Project;
}

/**
 * Project preview dialog server component
 * Renders a dialog with project gallery and description
 */
export function ProjectPreviewDialog({ project }: ProjectPreviewDialogProps) {
	const galleryImages = project.images;
	const convertedImages = convertToGalleryImages(
		galleryImages.map((src, index) => ({
			src,
			alt: `${project.name.en} - ${index + 1}`,
		})),
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-muted">
					<Eye className="mr-2 size-4" />
					View Project
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
				<Tabs defaultValue="en" className="w-full">
					<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
						<TabsList className="grid w-full grid-cols-2 mb-4">
							<TabsTrigger value="en">English</TabsTrigger>
							<TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
						</TabsList>
						<TabsContent value="en" className="mt-0">
							<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
								{project.name.en}
							</DialogTitle>
						</TabsContent>
						<TabsContent value="vi" className="mt-0">
							<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
								{project.name.vi}
							</DialogTitle>
						</TabsContent>
					</DialogHeader>

					<div className="px-6 pb-6">
						<div className="space-y-6">
							{/* Project Info - Always visible */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
								<div className="flex items-center">
									<Building className="h-4 w-4 mr-2 text-primary" />
									<span>{project.category.en}</span>
								</div>
								<div className="flex items-center">
									<MapPin className="h-4 w-4 mr-2 text-primary" />
									<span>{project.location}</span>
								</div>
								<div className="flex items-center">
									<Calendar className="h-4 w-4 mr-2 text-primary" />
									<span>{project.year}</span>
								</div>
								<Badge
									variant={project.completionStatus === "completed" ? "default" : "outline"}
									className="w-fit"
								>
									{project.completionStatus === "completed" ? "Completed" : "In Progress"}
								</Badge>
							</div>

							{/* Project Description - Tabbed content */}
							<div>
								<h4 className="font-serif font-bold text-lg mb-3">Project Description</h4>
								<TabsContent value="en">
									<p className="text-muted-foreground leading-relaxed">{project.description.en}</p>
								</TabsContent>
								<TabsContent value="vi">
									<p className="text-muted-foreground leading-relaxed">{project.description.vi}</p>
								</TabsContent>
							</div>

							{/* Technical Specifications - Tabbed content */}
							<div>
								<h4 className="font-serif font-bold text-lg mb-3">Technical Specifications</h4>
								<TabsContent value="en">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{project.specs.en.map((spec) => (
											<div key={spec} className="flex items-start">
												<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
												<span className="text-muted-foreground text-sm">{spec}</span>
											</div>
										))}
									</div>
								</TabsContent>
								<TabsContent value="vi">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{project.specs.vi.map((spec) => (
											<div key={spec} className="flex items-start">
												<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
												<span className="text-muted-foreground text-sm">{spec}</span>
											</div>
										))}
									</div>
								</TabsContent>
							</div>

							{/* Project Images - Always visible */}
							<div>
								<h4 className="font-serif font-bold text-lg mb-3">Project Images</h4>
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
							</div>
						</div>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
