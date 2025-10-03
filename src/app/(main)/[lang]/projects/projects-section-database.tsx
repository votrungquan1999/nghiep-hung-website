/**
 * Server component that fetches projects from database and renders the projects section
 * Has the same structure as the static projects-section.tsx
 */

import { unstable_cacheTag as cacheTag } from "next/cache";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getActiveProjectIds } from "src/server/projects";
import ProjectDialog from "./project-dialog";

/**
 * Server component that fetches projects from database
 * Has the exact same structure as the static projects-section.tsx
 */
export default async function ProjectsSectionDatabase() {
	"use cache";
	cacheTag(CACHE_TAGS.PROJECTS);

	const projectIds: string[] = await getActiveProjectIds();

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="projects" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Dự án"} <span className="text-primary">{"Tiêu biểu"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Khám phá những dự án đã hoàn thành của chúng tôi, từ các tòa nhà thương mại đến nhà máy công nghiệp."
						}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projectIds.map((projectId) => (
						<ProjectDialog key={projectId} projectId={projectId} />
					))}
				</div>
			</div>
		</section>
	);
}
