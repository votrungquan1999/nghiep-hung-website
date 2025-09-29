import { Edit } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Product } from "src/server/products";
import { EditProductForm } from "./edit-product-dialog/edit-product-form";

interface ProductEditDialogContentProps {
	product: Product;
}

/**
 * Server component that renders the content of the product edit dialog
 * Fetches product data and displays edit form
 * @param product - The product to edit
 */
export function ProductEditDialogContent({ product }: ProductEditDialogContentProps) {
	return (
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Edit className="size-5" />
					Edit Product: {product.name.en}
				</DialogTitle>
			</DialogHeader>

			<EditProductForm product={product} />
		</DialogContent>
	);
}
