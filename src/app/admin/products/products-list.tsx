import { FormBoundaryProvider } from "src/components/form-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { ProductRow } from "./product-row";
import { ProductRowProvider } from "./product-row-context.state";

interface ProductsListProps {
	productIds: string[];
}

/**
 * Component that displays the list of products when products exist
 * Uses individual ProductRow components that fetch their own data
 * @param productIds - Array of product IDs to display
 */
export function ProductsList({ productIds }: ProductsListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{"All Products"}</CardTitle>
				<CardDescription>{"Manage your product catalog and inventory"}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{productIds.map((productId) => (
						<FormBoundaryProvider key={productId}>
							<ProductRowProvider>
								<ProductRow productId={productId} />
							</ProductRowProvider>
						</FormBoundaryProvider>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
