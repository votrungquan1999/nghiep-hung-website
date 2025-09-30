import { Skeleton } from "../../../components/ui/skeleton";

/**
 * Loading component for the admin products page.
 * Displays skeleton placeholders while the products data is being fetched.
 */
export default function Loading() {
	return (
		<div className="container mx-auto p-6 space-y-6">
			{/* Header with action button skeleton */}
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-4 w-64" />
				</div>
				<Skeleton className="h-10 w-32" />
			</div>

			{/* Products list skeleton */}
			<div className="space-y-4">
				{/* Table header skeleton */}
				<div className="grid grid-cols-12 gap-4 p-4 border-b">
					<Skeleton className="h-4 w-16 col-span-2" />
					<Skeleton className="h-4 w-24 col-span-3" />
					<Skeleton className="h-4 w-20 col-span-2" />
					<Skeleton className="h-4 w-16 col-span-2" />
					<Skeleton className="h-4 w-20 col-span-2" />
					<Skeleton className="h-4 w-16 col-span-1" />
				</div>

				{/* Product rows skeleton */}
				{[1, 2, 3, 4, 5].map((item) => (
					<div key={`product-skeleton-${item}`} className="grid grid-cols-12 gap-4 p-4 border-b">
						<Skeleton className="h-16 w-16 col-span-2 rounded" />
						<div className="col-span-3 space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-3 w-2/3" />
						</div>
						<div className="col-span-2 space-y-1">
							<Skeleton className="h-4 w-12" />
						</div>
						<div className="col-span-2 space-y-1">
							<Skeleton className="h-4 w-16" />
						</div>
						<div className="col-span-2 space-y-1">
							<Skeleton className="h-4 w-20" />
						</div>
						<div className="col-span-1 flex gap-2">
							<Skeleton className="h-8 w-8 rounded" />
							<Skeleton className="h-8 w-8 rounded" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
