import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the header component
 * Matches the structure and dimensions of the actual header
 */
export default function HeaderLoading() {
	return (
		<header className="bg-card shadow-sm border-b border-border sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo skeleton */}
					<div className="flex items-center">
						<Skeleton className="h-10 w-32" />
					</div>

					{/* Desktop Navigation skeleton */}
					<nav className="hidden md:flex space-x-8">
						{Array.from({ length: 6 }, (_, index) => {
							const navItems = ["home", "about", "products", "services", "projects", "contact"];
							return (
								<Skeleton key={`nav-${navItems[index] || `item-${index}`}`} className="h-4 w-16" />
							);
						})}
					</nav>

					{/* Contact Info skeleton */}
					<div className="hidden lg:flex items-center space-x-4">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-4 w-32" />
					</div>

					{/* Mobile menu button skeleton */}
					<Skeleton className="md:hidden h-8 w-8" />
				</div>
			</div>
		</header>
	);
}
