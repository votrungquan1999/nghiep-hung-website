import { Building2, Calendar, Wind } from "lucide-react";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";

interface TimelineEvent {
	year: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

/**
 * Company history timeline component displaying key milestones
 * Shows a vertical timeline with colored icons and event cards
 * @param locale - The current locale for internationalization
 */
export function CompanyHistoryTimeline({ locale }: { locale: Locale }) {
	const dictionary = getDictionary(locale);

	const timelineEvents: TimelineEvent[] = [
		{
			year: dictionary.about.timeline.events[0].year,
			title: dictionary.about.timeline.events[0].title,
			description: dictionary.about.timeline.events[0].description,
			icon: Building2,
			color: "blue",
		},
		{
			year: dictionary.about.timeline.events[1].year,
			title: dictionary.about.timeline.events[1].title,
			description: dictionary.about.timeline.events[1].description,
			icon: Calendar,
			color: "green",
		},
		{
			year: dictionary.about.timeline.events[2].year,
			title: dictionary.about.timeline.events[2].title,
			description: dictionary.about.timeline.events[2].description,
			icon: Wind,
			color: "orange",
		},
	];
	return (
		<div className="relative">
			{/* Timeline line */}
			<div className="absolute left-4 sm:left-6 top-0 bottom-0 size-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-orange-500" />

			<div className="space-y-4 sm:space-y-6">
				{timelineEvents.map((event) => {
					const Icon = event.icon;

					return (
						<div key={event.year} className="relative flex items-start">
							{/* Timeline icon */}
							<div
								className={`relative z-10 flex items-center justify-center size-8 sm:size-10 rounded-full ${
									event.color === "blue"
										? "bg-blue-500"
										: event.color === "green"
											? "bg-green-500"
											: "bg-orange-500"
								}`}
							>
								<Icon className="size-4 sm:size-5 text-white" />
							</div>

							{/* Event card */}
							<div className="ml-3 sm:ml-6 flex-1">
								<div className="bg-card rounded-lg shadow-sm border p-3 sm:p-4">
									<div
										className={`text-xl sm:text-2xl font-bold mb-1 ${
											event.color === "blue"
												? "text-blue-600"
												: event.color === "green"
													? "text-green-600"
													: "text-orange-600"
										}`}
									>
										{event.year}
									</div>
									<h3 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
										{event.title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{event.description}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
