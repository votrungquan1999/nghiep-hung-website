/**
 * Server component that fetches products from database and renders the products section
 * Has the same structure as the static products-section.tsx
 */

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/server/products/get-all-products.query";
import type { Product } from "@/server/products/product.type";
import ProductGalleryDialog from "./product-gallery-dialog";

/**
 * Convert database product to display format matching static version
 * @param product - Product from database
 * @returns Product in display format matching static structure
 */
function convertDatabaseProductToDisplay(product: Product) {
	const mainImage = product.gallery?.find((img) => img.isMain) || product.gallery?.[0];
	const imageUrls = product.gallery?.map((img) => img.url) || [];

	return {
		name: product.name,
		description: product.description,
		image: mainImage?.url || "/placeholder.svg",
		gallery: imageUrls,
	};
}

/**
 * Server component that fetches products from database
 * Has the exact same structure as the static products-section.tsx
 */
export default async function ProductsSectionDatabase() {
	const products: Product[] = await getAllProducts();

	const displayProducts = products.map(convertDatabaseProductToDisplay);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="products" className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Sản phẩm"} <span className="text-primary">{"Chất lượng cao"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Chúng tôi cung cấp đa dạng các sản phẩm hệ thống ống gió chất lượng cao, đáp ứng mọi nhu cầu của khách hàng."
						}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{displayProducts.map((product) => (
						<ProductGalleryDialog key={product.name} product={product}>
							<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
								<div className="aspect-video overflow-hidden rounded-t-lg px-0">
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										width={400}
										height={300}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<CardHeader>
									<CardTitle className="text-xl font-serif font-bold text-foreground">
										{product.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4 leading-relaxed">
										{product.description}
									</p>
								</CardContent>
							</Card>
						</ProductGalleryDialog>
					))}
				</div>
			</div>
		</section>
	);
}
