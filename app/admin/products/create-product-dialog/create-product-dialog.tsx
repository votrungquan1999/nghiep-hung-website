import { Plus } from "lucide-react";
import { FormBoundaryProvider } from "@/components/form-state/form-state.state";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ProductImageSelectionProvider } from "./create-product-dialog.state";
import { CreateProductForm } from "./create-product-form";

/**
 * Create product dialog server component
 * Self-contained dialog for creating new products with uncontrolled inputs
 * All text content is hardcoded in the server component
 */
export default function CreateProductDialog() {
	return (
		<ProductImageSelectionProvider>
			<FormBoundaryProvider>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 size-4" />
							Add New Product
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
						<DialogHeader>
							<DialogTitle>Create New Product</DialogTitle>
						</DialogHeader>

						<CreateProductForm />
					</DialogContent>
				</Dialog>
			</FormBoundaryProvider>
		</ProductImageSelectionProvider>
	);
}
