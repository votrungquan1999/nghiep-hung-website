/**
 * Server component that fetches services from database and renders the services section
 * Has the same structure as the static services-section.tsx
 */

import { getActiveServiceIds } from "src/server/services";
import ServiceDialog from "./service-dialog";

/**
 * Server component that fetches services from database
 * Has the exact same structure as the static services-section.tsx
 */
export default async function ServicesSectionDatabase() {
	const serviceIds: string[] = await getActiveServiceIds();

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="services" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Dịch vụ"} <span className="text-primary">{"Chuyên nghiệp"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Chúng tôi cung cấp đầy đủ các dịch vụ từ tư vấn, thiết kế, thi công đến bảo trì hệ thống ống gió."
						}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{serviceIds.map((serviceId) => (
						<ServiceDialog key={serviceId} serviceId={serviceId} />
					))}
				</div>
			</div>
		</section>
	);
}
