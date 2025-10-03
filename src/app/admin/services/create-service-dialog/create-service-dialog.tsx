import { Plus } from "lucide-react";
import { FormBoundaryProvider } from "src/components/form-state";
import { Button } from "src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { ServiceImageSelectionProvider } from "./create-service-dialog.state";
import { CreateServiceForm } from "./create-service-form";

/**
 * Create service dialog server component
 * Self-contained dialog for creating new services with uncontrolled inputs
 * All text content is hardcoded in the server component
 */
export default function CreateServiceDialog() {
	return (
		<FormBoundaryProvider>
			<ServiceImageSelectionProvider>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 size-4" />
							Add New Service
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0 bg-white">
						<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
							<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
								Create New Service
							</DialogTitle>
							<DialogDescription className="text-muted-foreground">
								Add a new service to showcase your offerings
							</DialogDescription>
						</DialogHeader>

						<div className="px-6 pb-6">
							<CreateServiceForm />
						</div>
					</DialogContent>
				</Dialog>
			</ServiceImageSelectionProvider>
		</FormBoundaryProvider>
	);
}
