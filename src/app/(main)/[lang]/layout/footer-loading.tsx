import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the footer component
 * Matches the structure and dimensions of the actual footer
 */
export default function FooterLoading() {
	return (
		<footer className="bg-primary text-primary-foreground">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info skeleton */}
					<div className="lg:col-span-2">
						<Skeleton className="h-12 w-48 mb-6 bg-primary-foreground/20" />
						<Skeleton className="h-6 w-64 mb-4 bg-primary-foreground/20" />
						<div className="space-y-2 mb-6">
							<Skeleton className="h-4 w-full bg-primary-foreground/20" />
							<Skeleton className="h-4 w-full bg-primary-foreground/20" />
							<Skeleton className="h-4 w-3/4 bg-primary-foreground/20" />
						</div>
						<div className="flex space-x-4">
							{["facebook", "youtube", "linkedin"].map((platform) => (
								<Skeleton
									key={`social-${platform}`}
									className="h-10 w-10 bg-primary-foreground/20"
								/>
							))}
						</div>
					</div>

					{/* Quick Links skeleton */}
					<div>
						<Skeleton className="h-6 w-32 mb-6 bg-primary-foreground/20" />
						<div className="space-y-3">
							{["about", "products", "services", "projects", "contact", "privacy"].map((link) => (
								<Skeleton key={`link-${link}`} className="h-4 w-24 bg-primary-foreground/20" />
							))}
						</div>
					</div>

					{/* Contact Info skeleton */}
					<div>
						<Skeleton className="h-6 w-40 mb-6 bg-primary-foreground/20" />
						<div className="space-y-4">
							{["address", "phone1", "phone2", "email1", "email2"].map((contact) => (
								<div key={`contact-${contact}`} className="flex items-center">
									<Skeleton className="h-5 w-5 mr-3 bg-primary-foreground/20" />
									<Skeleton className="h-4 w-32 bg-primary-foreground/20" />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Copyright skeleton */}
				<div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
					<Skeleton className="h-4 w-80 mx-auto bg-primary-foreground/20" />
				</div>
			</div>
		</footer>
	);
}
