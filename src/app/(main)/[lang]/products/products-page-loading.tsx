import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the products page component
 * Matches the structure of products section and contact button
 */
export default function ProductsPageLoading() {
	return (
		<>
			{/* Products Section Loading */}
			<section className="py-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Products Header */}
					<div className="text-center mb-16">
						<Skeleton className="h-12 w-80 mx-auto mb-6" />
						<Skeleton className="h-6 w-full max-w-3xl mx-auto" />
					</div>

					{/* Products Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							"round-duct",
							"square-duct",
							"accessories",
							"soundproof",
							"flexible",
							"filtration",
						].map((product) => (
							<div key={`product-${product}`} className="group">
								<div className="bg-card rounded-lg shadow-sm">
									<Skeleton className="aspect-video w-full rounded-t-lg" />
									<div className="p-6">
										<Skeleton className="h-6 w-32 mb-2" />
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
