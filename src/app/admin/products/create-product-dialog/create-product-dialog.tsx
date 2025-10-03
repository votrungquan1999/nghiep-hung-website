import { Plus } from "lucide-react";
import { FormBoundaryProvider } from "src/components/form-state";
import { Button } from "src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { ProductImageSelectionProvider } from "./create-product-dialog.state";
import { CreateProductForm } from "./create-product-form";

/**
 * Create product dialog server component
 * Self-contained dialog for creating new products with uncontrolled inputs
 * All text content is hardcoded in the server component
 */
export default function CreateProductDialog() {
	return (
		<FormBoundaryProvider>
			<ProductImageSelectionProvider>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 size-4" />
							Add New Product
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0 bg-white">
						<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
							<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
								Create New Product
							</DialogTitle>
							<DialogDescription className="text-muted-foreground">
								Add a new product to showcase your offerings
							</DialogDescription>
						</DialogHeader>

						<div className="px-6 pb-6">
							<CreateProductForm />
						</div>
					</DialogContent>
				</Dialog>
			</ProductImageSelectionProvider>
		</FormBoundaryProvider>
	);
}
