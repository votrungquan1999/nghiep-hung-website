import { Package } from "lucide-react";
import { getProductCounts, getProductIds } from "src/server/products";
import { Card, CardContent } from "src/components/ui/card";
import CreateProductDialog from "./create-product-dialog/create-product-dialog";
import { EmptyStateWithDialog } from "./empty-state-with-dialog";
import { ProductsList } from "./products-list";

/**
 * Products management page
 * Manages air duct products and inventory
 * Uses efficient queries to check for products and display them
 */
export default async function ProductsPage() {
	// Fetch product IDs and counts efficiently
	const [productIds, productCounts] = await Promise.all([getProductIds(), getProductCounts()]);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<Package className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">{"Products"}</h1>
						<p className="text-muted-foreground">{"Manage air duct products"}</p>
					</div>
				</div>

				{/* Add New Button */}
				<CreateProductDialog />
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{productIds.length}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Total Products"}</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<Package className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">{productCounts.active}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">
									{"Active Products"}
								</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<Package className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">{productCounts.draft}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft Products"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Package className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Products List */}
			{productIds.length === 0 ? (
				<EmptyStateWithDialog />
			) : (
				<ProductsList productIds={productIds} />
			)}
		</div>
	);
}
