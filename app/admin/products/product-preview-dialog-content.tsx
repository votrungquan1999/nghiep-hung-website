import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "@/components/image-gallery/image-gallery";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getProductById } from "@/server/products";

interface ProductPreviewDialogContentProps {
	productId: string;
}

/**
 * Server component that renders the content of the product preview dialog
 * Fetches product data and displays gallery and description
 * @param productId - The ID of the product to display
 */
export async function ProductPreviewDialogContent({ productId }: ProductPreviewDialogContentProps) {
	const product = await getProductById(productId);

	if (!product) {
		return <NotFoundProductPreviewDialogContent />;
	}

	const galleryImages = product.gallery;
	const convertedImages = convertToGalleryImages(
		galleryImages.map((image, index) => ({
			src: image.url,
			alt: `${product.name} - ${index + 1}`,
		})),
	);

	return (
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
	);
}

function NotFoundProductPreviewDialogContent() {
	return (
		<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
			<DialogHeader className="p-6 pb-0">
				<DialogTitle>Product Not Found</DialogTitle>
			</DialogHeader>
			<div className="p-6">
				<p className="text-muted-foreground">The requested product could not be found.</p>
			</div>
		</DialogContent>
	);
}
