import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the services page component
 * Matches the structure of services section and contact button
 */
export default function ServicesPageLoading() {
	return (
		<>
			{/* Services Section Loading */}
			<section className="py-20 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Services Header */}
					<div className="text-center mb-16">
						<Skeleton className="h-12 w-80 mx-auto mb-6" />
						<Skeleton className="h-6 w-full max-w-3xl mx-auto" />
					</div>

					{/* Services Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							"installation",
							"design",
							"maintenance",
							"consultation",
							"soundproofing",
							"cleaning",
						].map((service) => (
							<div key={`service-${service}`} className="group">
								<div className="bg-card rounded-lg shadow-sm">
									<Skeleton className="aspect-video w-full rounded-t-lg" />
									<div className="p-6">
										<Skeleton className="h-6 w-40 mb-2" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-3/4" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Button Loading */}
			<div className="text-center mb-12">
				<Skeleton className="h-12 w-48 mx-auto" />
			</div>
		</>
	);
}
