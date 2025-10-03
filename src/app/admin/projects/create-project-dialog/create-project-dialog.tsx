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
					<DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0 bg-white">
						<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
							<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
								Create New Project
							</DialogTitle>
							<DialogDescription className="text-muted-foreground">
								Add a new project to showcase your work and achievements
							</DialogDescription>
						</DialogHeader>

						<div className="px-6 pb-6">
							<CreateProjectForm />
						</div>
					</DialogContent>
				</Dialog>
			</ProjectFormProvider>
		</FormBoundaryProvider>
	);
}
