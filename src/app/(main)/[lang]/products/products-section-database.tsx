/**
 * Server component that fetches products from database and renders the products section
 * Has the same structure as the static products-section.tsx
 */

import { unstable_cacheTag as cacheTag } from "next/cache";
import { CACHE_TAGS } from "src/lib/cache-tags";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { getActiveProductIds } from "src/server/products";
import ProductDialog from "./product-dialog";

interface ProductsSectionDatabaseProps {
	locale: Locale;
}

/**
 * Server component that fetches products from database
 * Has the exact same structure as the static products-section.tsx
 * @param locale - The current locale for internationalization
 */
export default async function ProductsSectionDatabase({ locale }: ProductsSectionDatabaseProps) {
	"use cache";
	cacheTag(CACHE_TAGS.PRODUCTS);

	const productIds: string[] = await getActiveProductIds();
	const dictionary = getDictionary(locale);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="products" className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{dictionary.products.title}{" "}
						<span className="text-primary">{dictionary.products.subtitle}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{dictionary.products.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{productIds.map((productId) => (
						<ProductDialog key={productId} productId={productId} locale={locale} />
					))}
				</div>
			</div>
		</section>
	);
}
