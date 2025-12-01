/**
 * Server component that fetches products from database and renders the products section
 * Has the same structure as the static products-section.tsx
 */

import { unstable_cacheTag as cacheTag } from "next/cache";
import Link from "next/link";
import {
	EmptyStateCard,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
} from "src/components/empty-state";
import { Button } from "src/components/ui/button";
import {
	ItemWrapper,
	StandardGridVisibilityController,
	ViewAllButton,
} from "src/components/visibility";
import { CACHE_TAGS } from "src/lib/cache-tags";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { getActiveProductIds } from "src/server/products";
import ProductDialog from "./product-dialog";

interface ProductsSectionDatabaseProps {
	locale: Locale;
	viewAll?: boolean;
}

/**
 * Server component that fetches products from database
 * Supports row limiting with "View All" button on homepage
 * @param locale - The current locale for internationalization
 * @param viewAll - Whether to view all items without row limiting (optional, for dedicated pages)
 */
export default async function ProductsSectionDatabase({
	locale,
	viewAll,
}: ProductsSectionDatabaseProps) {
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

				{productIds.length > 0 ? (
					<StandardGridVisibilityController itemIds={productIds} limitRows={!viewAll}>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{productIds.map((productId) => (
								<ItemWrapper key={productId} id={productId}>
									<ProductDialog productId={productId} locale={locale} />
								</ItemWrapper>
							))}
						</div>
						{!viewAll && (
							<ViewAllButton>
								<Button asChild variant="outline" size="lg">
									<Link href={`/${locale}/products`}>{dictionary.products.viewAll}</Link>
								</Button>
							</ViewAllButton>
						)}
					</StandardGridVisibilityController>
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
