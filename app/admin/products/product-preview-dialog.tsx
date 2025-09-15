import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "@/components/image-gallery/image-gallery"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

interface Product {
	id: string
	name: string
	description: string
	category: string
	price: string
	status: string
	gallery: string[]
	createdAt: string
}

interface ProductPreviewDialogProps {
	product: Product
}

/**
 * Product preview dialog server component
 * Renders a dialog with product gallery and description, matching the products page dialog
 */
export function ProductPreviewDialog({ product }: ProductPreviewDialogProps) {
	const galleryImages = product.gallery
	const convertedImages = convertToGalleryImages(
		galleryImages.map((src, index) => ({
			src,
			alt: `${product.name} - ${index + 1}`,
		})),
	)

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
						{product.name}
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

					<p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
