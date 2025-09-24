import { ImageIcon } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Product } from "src/server/products/product.type";
import { ImageManagementProvider } from "./edit-product-images/image-management-dialog.state";
import type { ExistingImage } from "./edit-product-images/image-management-dialog.type";
import { ImageManagementContent } from "./edit-product-images/image-management-dialog.ui";

interface ProductImageDialogContentProps {
	product: Product;
}

/**
 * Server component that renders the content of the product image management dialog
 * Displays the image management interface for the product
 * @param product - The product whose images to manage
 */
export function ProductImageDialogContent({ product }: ProductImageDialogContentProps) {
	// Convert product images to the expected format
	const existingImages: ExistingImage[] = product.gallery.map((image) => ({
		id: image.key,
		type: "existing" as const,
		url: image.url,
		name: `Product image ${image.key}`,
	}));

	// Find the main image
	const mainImage = product.gallery.find((img) => img.isMain);
	const mainImageId = mainImage ? mainImage.key : null;

	return (
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<ImageIcon className="size-5" />
					Manage Images: {product.name.vi}
				</DialogTitle>
			</DialogHeader>

			<ImageManagementProvider existingImages={existingImages} mainImageId={mainImageId}>
				<ImageManagementContent productId={product.id} />
			</ImageManagementProvider>
		</DialogContent>
	);
}
