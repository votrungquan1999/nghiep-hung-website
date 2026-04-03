/**
 * Server component that fetches products from database and renders the products section
 * Supports filtering by category with row limiting (controlled by client)
 */

import { unstable_cacheTag as cacheTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import {
	EmptyStateCard,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
} from "src/components/empty-state";
import { Button } from "src/components/ui/button";
import { CACHE_TAGS } from "src/lib/cache-tags";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { getActiveProductIds, getProductById } from "src/server/products";
import ProductDialog from "./product-dialog";
import { ProductCardWrapper } from "./product-card-wrapper";
import { ProductFilterButtons, ProductFilterProvider } from "./product-filter";
import { ProductGridController, ViewAllButton } from "./product-visibility";

interface ProductsSectionDatabaseProps {
	locale: Locale;
	viewAll?: boolean;
}

/**
 * Async component that fetches and renders a single product card within
 * its filter-aware wrapper. Uses the same Suspense-per-card pattern as projects.
 */
async function ProductCard({ id, locale }: { id: string; locale: Locale }) {
	const product = await getProductById(id);
	if (!product) return null;

	return (
		<ProductCardWrapper id={product.id} categoryEn={product.category?.en ?? null}>
			<ProductDialog productId={product.id} locale={locale} />
		</ProductCardWrapper>
	);
}

/**
 * Server component that fetches product IDs from database.
 * Each card loads its own data via Suspense for fast initial render.
 * Category filter buttons are rendered from live DB data.
 * Products without a category appear under the implicit "Other" filter.
 *
 * @param locale - The current locale
 * @param viewAll - Whether to disable row limiting (for the dedicated /products page)
 */
export default async function ProductsSectionDatabase({
	locale,
	viewAll,
}: ProductsSectionDatabaseProps) {
	"use cache";
	cacheTag(CACHE_TAGS.PRODUCTS);

	const productIds: string[] = await getActiveProductIds();
	const dictionary = getDictionary(locale);

	// Determine whether any products lack a category (for the "Other" button)
	// We fetch all products to check — this is cached so it's free
	const allProducts = await Promise.all(productIds.map((id) => getProductById(id)));
	const hasUncategorized = allProducts.some((p) => p !== null && !p.category);

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

				{productIds.length > 0 ? (
					<ProductFilterProvider>
						<ProductFilterButtons locale={locale} hasUncategorized={hasUncategorized} />
						<ProductGridController productIds={productIds} limitRows={!viewAll}>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
								{productIds.map((productId) => (
									<Suspense key={productId} fallback={null}>
										<ProductCard id={productId} locale={locale} />
									</Suspense>
								))}
							</div>
							{!viewAll && (
								<ViewAllButton>
									<Button asChild variant="outline" size="lg">
										<Link href={`/${locale}/products`}>{dictionary.products.viewAll}</Link>
									</Button>
								</ViewAllButton>
							)}
						</ProductGridController>
					</ProductFilterProvider>
				) : (
					<EmptyStateCard>
						<EmptyStateIcon>📦</EmptyStateIcon>
						<EmptyStateTitle>{dictionary.products.empty.title}</EmptyStateTitle>
						<EmptyStateDescription>{dictionary.products.empty.description}</EmptyStateDescription>
					</EmptyStateCard>
				)}
			</div>
		</section>
	);
}
