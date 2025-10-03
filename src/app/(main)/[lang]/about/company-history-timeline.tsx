"use client";

import { Building2, Calendar, Wind } from "lucide-react";

interface TimelineEvent {
	year: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}

const timelineEvents: TimelineEvent[] = [
	{
		year: "2010",
		title: "Thành lập công ty",
		description: "Công ty được thành lập với tên Công ty TNHH Thương Mại Dịch Vụ Kỹ Thuật TRE",
		icon: Building2,
		color: "blue",
	},
	{
		year: "2018",
		title: "Đổi tên công ty",
		description:
			"Công ty đổi tên mới là Công ty TNHH Nghiệp Hưng. Là nhà thầu thiết kế và thi công hệ thống cơ điện trong các công trình dân dụng và công nghiệp",
		icon: Calendar,
		color: "green",
	},
	{
		year: "2020",
		title: "Mở rộng sản xuất",
		description:
			"Mở rộng thêm sản xuất ống thông gió, các hạng mục thiết kế, thi công đa dạng các hệ thống thông gió – làm mát nhà xưởng, điều hòa công nghiệp, hút khói mùi, phòng sạch,…",
		icon: Wind,
		color: "orange",
	},
];

/**
 * Company history timeline component displaying key milestones
 * Shows a vertical timeline with colored icons and event cards
 */
export function CompanyHistoryTimeline() {
	return (
		<div className="relative">
			{/* Timeline line */}
			<div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-orange-500" />

			<div className="space-y-8">
				{timelineEvents.map((event) => {
					const Icon = event.icon;

					return (
						<div key={event.year} className="relative flex items-start">
							{/* Timeline icon */}
							<div
								className={`relative z-10 flex items-center justify-center size-12 rounded-full ${
									event.color === "blue"
										? "bg-blue-500"
										: event.color === "green"
											? "bg-green-500"
											: "bg-orange-500"
								}`}
							>
								<Icon className="size-6 text-white" />
							</div>

							{/* Event card */}
							<div className="ml-8 flex-1">
								<div className="bg-card rounded-lg shadow-sm border p-6">
									<div
										className={`text-3xl font-bold mb-2 ${
											event.color === "blue"
												? "text-blue-600"
												: event.color === "green"
													? "text-green-600"
													: "text-orange-600"
										}`}
									>
										{event.year}
									</div>
									<h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
									<p className="text-muted-foreground leading-relaxed">{event.description}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
