import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "src/components/image-gallery/image-gallery";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import type { Product } from "src/server/products";
import { getProductById } from "src/server/products";

interface ProductDialogProps {
	productId: string;
}

/**
 * Server component that fetches product data by ID and renders the product dialog with card trigger
 * Uses the newer image gallery system for consistent UI across admin and public interfaces
 * @param productId - The ID of the product to display
 */
export default async function ProductDialog({ productId }: ProductDialogProps) {
	const product: Product | null = await getProductById(productId);

	if (!product) {
		return <NotFoundProductDialog />;
	}

	const galleryImages = product.gallery || [];
	const convertedImages = convertToGalleryImages(
		galleryImages.map((image, index) => ({
			src: image.url,
			alt: `${product.name.vi} - ${index + 1}`,
		})),
	);

	const mainImage = product.gallery?.find((img) => img.isMain) || product.gallery?.[0];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
					<div className="aspect-video overflow-hidden rounded-t-lg px-0">
						<Image
							src={mainImage?.url || "/placeholder.svg"}
							alt={product.name.vi}
							width={400}
							height={300}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<CardHeader>
						<CardTitle className="text-xl font-serif font-bold text-foreground">
							{product.name.vi}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-4 leading-relaxed">{product.description.vi}</p>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
				<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
					<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
						{product.name.vi}
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

					<p className="text-muted-foreground leading-relaxed text-lg">{product.description.vi}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Fallback component for when product is not found
 */
function NotFoundProductDialog() {
	return (
		<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
			<div className="aspect-video overflow-hidden rounded-t-lg px-0 bg-muted flex items-center justify-center">
				<p className="text-muted-foreground">Product Not Found</p>
			</div>
			<CardHeader>
				<CardTitle className="text-xl font-serif font-bold text-foreground">
					Product Not Found
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground mb-4 leading-relaxed">
					The requested product could not be found.
				</p>
			</CardContent>
		</Card>
	);
}
