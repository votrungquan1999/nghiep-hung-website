import { Plus } from "lucide-react";
import { FormBoundaryProvider } from "src/components/form-state";
import { Button } from "src/components/ui/button";
import {
	Dialog,
	DialogContent,
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
					<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
						<DialogHeader>
							<DialogTitle>Create New Service</DialogTitle>
						</DialogHeader>

						<CreateServiceForm />
					</DialogContent>
				</Dialog>
			</ServiceImageSelectionProvider>
		</FormBoundaryProvider>
	);
}
