import { Package } from "lucide-react";
import { Card, CardContent } from "src/components/ui/card";
import CreateProductDialog from "./create-product-dialog/create-product-dialog";

/**
 * Wrapper component that combines empty state with create product dialog
 * Handles the dialog state for the empty state button
 */
export function EmptyStateWithDialog() {
	return (
		<Card className="border-dashed">
			<CardContent className="flex flex-col items-center justify-center py-16">
				<div className="text-center space-y-4">
					<div className="mx-auto size-16 rounded-full bg-muted flex items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold">No products yet</h3>
						<p className="text-muted-foreground max-w-sm">
							Get started by creating your first product. Add details about your offerings to help
							customers understand what you provide.
						</p>
					</div>
					<CreateProductDialog />
				</div>
			</CardContent>
		</Card>
	);
}
