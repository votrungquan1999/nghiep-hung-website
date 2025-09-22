"use client";

import { Package, Plus } from "lucide-react";
import { Button } from "src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "src/components/ui/card";

interface ProductsEmptyStateProps {
	onAddProduct: () => void;
}

/**
 * Empty state component for when no products exist
 * @param onAddProduct - Function to call when add product button is clicked
 */
export function ProductsEmptyState({ onAddProduct }: ProductsEmptyStateProps) {
	return (
		<Card className="border-dashed">
			<CardHeader className="text-center py-12">
				<div className="mx-auto mb-4 p-4 rounded-full bg-muted/50 w-fit">
					<Package className="size-12 text-muted-foreground" />
				</div>
				<CardTitle className="text-xl font-semibold text-foreground mb-2">
					No products yet
				</CardTitle>
				<CardDescription className="text-muted-foreground max-w-md mx-auto">
					Get started by adding your first air duct product to showcase your inventory and services.
				</CardDescription>
			</CardHeader>
			<CardContent className="text-center pb-12">
				<Button onClick={onAddProduct} className="gap-2">
					<Plus className="size-4" />
					Add Your First Product
				</Button>
			</CardContent>
		</Card>
	);
}
