import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the projects page component
 * Matches the structure of projects section and contact button
 */
export default function ProjectsPageLoading() {
	return (
		<>
			{/* Projects Section Loading */}
			<section className="py-20 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Projects Header */}
					<div className="text-center mb-16">
						<Skeleton className="h-12 w-80 mx-auto mb-6" />
						<Skeleton className="h-6 w-full max-w-3xl mx-auto" />
					</div>

					{/* Projects Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{["mall", "factory", "hospital", "residential", "hotel", "university"].map(
							(project) => (
								<div key={`project-${project}`} className="group">
									<div className="bg-card rounded-lg shadow-sm">
										<Skeleton className="aspect-video w-full rounded-t-lg" />
										<div className="p-6">
											<div className="flex items-center justify-between mb-3">
												<Skeleton className="h-6 w-20" />
												<Skeleton className="h-4 w-12" />
											</div>
											<Skeleton className="h-6 w-48 mb-2" />
											<div className="flex items-center mb-3">
												<Skeleton className="h-4 w-4 mr-1" />
												<Skeleton className="h-4 w-24" />
											</div>
											<div className="space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-3/4" />
											</div>
										</div>
									</div>
								</div>
							),
						)}
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
