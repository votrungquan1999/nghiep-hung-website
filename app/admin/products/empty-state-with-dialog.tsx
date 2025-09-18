"use client";

import { useState } from "react";
import { FormBoundaryProvider } from "@/components/form-state/form-state.state";
import { ProductsEmptyState } from "@/components/products-empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductImageSelectionProvider } from "./create-product-dialog/create-product-dialog.state";
import { CreateProductForm } from "./create-product-dialog/create-product-form";

/**
 * Wrapper component that combines empty state with create product dialog
 * Handles the dialog state for the empty state button
 */
export function EmptyStateWithDialog() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAddProduct = () => {
		setIsDialogOpen(true);
	};

	return (
		<>
			<ProductsEmptyState onAddProduct={handleAddProduct} />

			<ProductImageSelectionProvider>
				<FormBoundaryProvider>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
							<DialogHeader>
								<DialogTitle>Create New Product</DialogTitle>
							</DialogHeader>
							<CreateProductForm />
						</DialogContent>
					</Dialog>
				</FormBoundaryProvider>
			</ProductImageSelectionProvider>
		</>
	);
}
