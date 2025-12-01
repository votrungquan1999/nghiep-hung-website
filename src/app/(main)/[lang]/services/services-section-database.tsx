/**
 * Server component that fetches services from database and renders the services section
 * Has the same structure as the static services-section.tsx
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
import { getActiveServiceIds } from "src/server/services";
import ServiceDialog from "./service-dialog";

interface ServicesSectionDatabaseProps {
	locale: Locale;
	viewAll?: boolean;
}

/**
 * Server component that fetches services from database
 * Supports row limiting with "View All" button on homepage
 * @param locale - The current locale for internationalization
 * @param viewAll - Whether to view all items without row limiting (optional, for dedicated pages)
 */
export default async function ServicesSectionDatabase({
	locale,
	viewAll,
}: ServicesSectionDatabaseProps) {
	"use cache";
	cacheTag(CACHE_TAGS.SERVICES);

	const serviceIds: string[] = await getActiveServiceIds();
	const dictionary = getDictionary(locale);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="services" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{dictionary.services.title}{" "}
						<span className="text-primary">{dictionary.services.subtitle}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{dictionary.services.description}
					</p>
				</div>

				{serviceIds.length > 0 ? (
					<StandardGridVisibilityController itemIds={serviceIds} limitRows={!viewAll}>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{serviceIds.map((serviceId) => (
								<ItemWrapper key={serviceId} id={serviceId}>
									<ServiceDialog serviceId={serviceId} locale={locale} />
								</ItemWrapper>
							))}
						</div>
						{!viewAll && (
							<ViewAllButton>
								<Button asChild variant="outline" size="lg">
									<Link href={`/${locale}/services`}>{dictionary.services.viewAll}</Link>
								</Button>
							</ViewAllButton>
						)}
					</StandardGridVisibilityController>
				) : (
					<EmptyStateCard>
						<EmptyStateIcon>🔧</EmptyStateIcon>
						<EmptyStateTitle>{dictionary.services.empty.title}</EmptyStateTitle>
						<EmptyStateDescription>{dictionary.services.empty.description}</EmptyStateDescription>
					</EmptyStateCard>
				)}
			</div>
		</section>
	);
}
