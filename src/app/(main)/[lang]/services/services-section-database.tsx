/**
 * Server component that fetches services from database and renders the services section
 * Has the same structure as the static services-section.tsx
 */

import { unstable_cacheTag as cacheTag } from "next/cache";
import {
	EmptyStateCard,
	EmptyStateDescription,
	EmptyStateIcon,
	EmptyStateTitle,
} from "src/components/empty-state";
import { CACHE_TAGS } from "src/lib/cache-tags";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { getActiveServiceIds } from "src/server/services";
import ServiceDialog from "./service-dialog";

interface ServicesSectionDatabaseProps {
	locale: Locale;
}

/**
 * Server component that fetches services from database
 * Has the exact same structure as the static services-section.tsx
 * @param locale - The current locale for internationalization
 */
export default async function ServicesSectionDatabase({ locale }: ServicesSectionDatabaseProps) {
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
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{serviceIds.map((serviceId) => (
							<ServiceDialog key={serviceId} serviceId={serviceId} locale={locale} />
						))}
					</div>
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
