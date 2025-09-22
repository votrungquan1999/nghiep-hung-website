/**
 * Server component that fetches products from database and renders the products section
 * Has the same structure as the static products-section.tsx
 */

import { getAllProducts } from "@/server/products/get-all-products.query";
import type { Product } from "@/server/products/product.type";
import ProductDialog from "./product-dialog";

/**
 * Server component that fetches products from database
 * Has the exact same structure as the static products-section.tsx
 */
export default async function ProductsSectionDatabase() {
	const products: Product[] = await getAllProducts();

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
					{products.map((product) => (
						<ProductDialog key={product.id} productId={product.id} />
					))}
				</div>
			</div>
		</section>
	);
}
