import { FolderOpen } from "lucide-react";
import { Card, CardContent } from "src/components/ui/card";
import { CreateProjectDialog } from "./create-project-dialog";

/**
 * Wrapper component that combines empty state with create project dialog
 * Handles the dialog state for the empty state button
 */
export function EmptyStateWithDialog() {
	return (
		<Card className="border-dashed">
			<CardContent className="flex flex-col items-center justify-center py-16">
				<div className="text-center space-y-4">
					<div className="mx-auto size-16 rounded-full bg-muted flex items-center justify-center">
						<FolderOpen className="size-8 text-muted-foreground" />
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold">No projects yet</h3>
						<p className="text-muted-foreground max-w-sm">
							Get started by creating your first project. Showcase your completed work and build your
							portfolio to demonstrate your expertise.
						</p>
					</div>
					<CreateProjectDialog />
				</div>
			</CardContent>
		</Card>
	);
}
