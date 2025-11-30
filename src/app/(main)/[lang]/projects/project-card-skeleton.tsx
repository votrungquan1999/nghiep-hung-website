import { Card, CardContent } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";

/**
 * Skeleton placeholder for ProjectCard while loading
 */
export function ProjectCardSkeleton() {
	return (
		<Card className="py-0">
			<Skeleton className="aspect-video rounded-t-lg" />
			<CardContent className="pb-6">
				<Skeleton className="h-6 w-3/4" />
			</CardContent>
		</Card>
	);
}
