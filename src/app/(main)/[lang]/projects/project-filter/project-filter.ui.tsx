import { Fragment } from "react";
import { Button } from "src/components/ui/button";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { cn } from "src/lib/utils";
import { getActiveProjectCategories } from "src/server/projects";
import { ActiveFilterButton, InactiveFilterButton } from "./project-filter-button";

interface ProjectFilterButtonsProps {
	locale: Locale;
}

/**
 * Server component that renders filter buttons for project categories
 * Fetches categories directly and renders both active/inactive variants
 * Client slots inject onClick handlers and toggle visibility based on state
 * @param locale - Current locale for internationalization
 */
export async function ProjectFilterButtons({ locale }: ProjectFilterButtonsProps) {
	const categories = await getActiveProjectCategories();
	const dictionary = getDictionary(locale);

	return (
		<div className="flex flex-wrap justify-center gap-2 mb-8">
			{/* All button - server renders Button, client slots inject onClick */}
			<ActiveFilterButton id={null}>
				<Button variant="default" size="sm" className={cn("transition-all shadow-md")}>
					{dictionary.projects.filter.all}
				</Button>
			</ActiveFilterButton>
			<InactiveFilterButton id={null}>
				<Button variant="outline" size="sm" className="transition-all">
					{dictionary.projects.filter.all}
				</Button>
			</InactiveFilterButton>

			{/* Category buttons */}
			{categories.map((category) => (
				<Fragment key={category.en}>
					<ActiveFilterButton id={category.en}>
						<Button variant="default" size="sm" className={cn("transition-all shadow-md")}>
							{category[locale]}
						</Button>
					</ActiveFilterButton>
					<InactiveFilterButton id={category.en}>
						<Button variant="outline" size="sm" className="transition-all">
							{category[locale]}
						</Button>
					</InactiveFilterButton>
				</Fragment>
			))}
		</div>
	);
}
