import { Plus } from "lucide-react";
import { FormBoundaryProvider } from "src/components/form-state/form-state.state";
import { Button } from "src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { ProjectFormProvider } from "./create-project-dialog.state";
import { CreateProjectForm } from "./create-project-form";

/**
 * Create project dialog server component
 * Self-contained dialog for creating new projects with uncontrolled inputs
 * All text content is hardcoded in the server component
 */
export default function CreateProjectDialog() {
	return (
		<FormBoundaryProvider>
			<ProjectFormProvider>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 size-4" />
							Add New Project
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
						<DialogHeader>
							<DialogTitle>Create New Project</DialogTitle>
						</DialogHeader>

						<CreateProjectForm />
					</DialogContent>
				</Dialog>
			</ProjectFormProvider>
		</FormBoundaryProvider>
	);
}
