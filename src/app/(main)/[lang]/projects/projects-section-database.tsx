/**
 * Server component that fetches projects from database and renders the projects section
 * Has the same structure as the static projects-section.tsx
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
import { getActiveProjectIds } from "src/server/projects";
import ProjectDialog from "./project-dialog";

interface ProjectsSectionDatabaseProps {
	locale: Locale;
}

/**
 * Server component that fetches projects from database
 * Has the exact same structure as the static projects-section.tsx
 * @param locale - The current locale for internationalization
 */
export default async function ProjectsSectionDatabase({ locale }: ProjectsSectionDatabaseProps) {
	"use cache";
	cacheTag(CACHE_TAGS.PROJECTS);

	const projectIds: string[] = await getActiveProjectIds();
	const dictionary = getDictionary(locale);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="projects" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{dictionary.projects.title}{" "}
						<span className="text-primary">{dictionary.projects.subtitle}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{dictionary.projects.description}
					</p>
				</div>

				{projectIds.length > 0 ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projectIds.map((projectId) => (
							<ProjectDialog key={projectId} projectId={projectId} locale={locale} />
						))}
					</div>
				) : (
					<EmptyStateCard>
						<EmptyStateIcon>🏗️</EmptyStateIcon>
						<EmptyStateTitle>{dictionary.projects.empty.title}</EmptyStateTitle>
						<EmptyStateDescription>{dictionary.projects.empty.description}</EmptyStateDescription>
					</EmptyStateCard>
				)}
			</div>
		</section>
	);
}
