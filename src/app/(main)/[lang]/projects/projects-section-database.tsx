/**
 * Server component that fetches projects from database and renders the projects section
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
import { getActiveProjectIds, getProjectById } from "src/server/projects";
import { ProjectCardContent } from "./project-card-content";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { ProjectCardWrapper } from "./project-card-wrapper";
import { ProjectFilterButtons, ProjectFilterProvider } from "./project-filter";
import { ProjectGridController, ViewAllButton } from "./project-visibility";

interface ProjectsSectionDatabaseProps {
	locale: Locale;
	viewAll?: boolean;
}

/**
 * Async component that fetches and renders a single project card
 */
async function ProjectCard({ id, locale }: { id: string; locale: Locale }) {
	const project = await getProjectById(id);
	if (!project) return null;

	return (
		<ProjectCardWrapper id={project.id} categoryEn={project.category.en}>
			<ProjectCardContent project={project} locale={locale} />
		</ProjectCardWrapper>
	);
}

/**
 * Server component that fetches project IDs from database
 * Each project card loads its own data via Suspense for fast initial render
 * @param locale - The current locale for internationalization
 * @param viewAll - Whether to view all items without row limiting (optional, for dedicated pages)
 */
export default async function ProjectsSectionDatabase({
	locale,
	viewAll,
}: ProjectsSectionDatabaseProps) {
	"use cache";
	cacheTag(CACHE_TAGS.PROJECTS);

	const projectIds = await getActiveProjectIds();
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
					<ProjectFilterProvider>
						<ProjectFilterButtons locale={locale} />
						<ProjectGridController projectIds={projectIds} limitRows={!viewAll}>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
								{projectIds.map((id) => (
									<Suspense key={id} fallback={<ProjectCardSkeleton />}>
										<ProjectCard id={id} locale={locale} />
									</Suspense>
								))}
							</div>
							{!viewAll && (
								<ViewAllButton>
									<Button asChild variant="outline" size="lg">
										<Link href={`/${locale}/projects`}>{dictionary.projects.filter.viewAll}</Link>
									</Button>
								</ViewAllButton>
							)}
						</ProjectGridController>
					</ProjectFilterProvider>
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
