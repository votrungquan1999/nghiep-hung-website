import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the contact page component
 * Matches the structure of contact section
 */
export default function ContactPageLoading() {
	return (
		<>
			{/* Contact Section Loading */}
			<section className="py-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Contact Header */}
					<div className="text-center mb-16">
						<Skeleton className="h-12 w-80 mx-auto mb-6" />
						<Skeleton className="h-6 w-full max-w-3xl mx-auto" />
					</div>

					{/* Contact Content */}
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Contact Info */}
						<div>
							<Skeleton className="h-8 w-48 mb-6" />
							<div className="space-y-4">
								{["address", "phone1", "phone2", "email1"].map((contact) => (
									<div key={`contact-info-${contact}`} className="flex items-center">
										<Skeleton className="h-5 w-5 mr-3" />
										<Skeleton className="h-4 w-48" />
									</div>
								))}
							</div>
						</div>

						{/* Contact Form */}
						<div>
							<div className="space-y-4">
								{["name", "email", "phone", "message"].map((field) => (
									<div key={`form-field-${field}`}>
										<Skeleton className="h-4 w-24 mb-2" />
										<Skeleton className="h-10 w-full" />
									</div>
								))}
								<Skeleton className="h-10 w-32" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
