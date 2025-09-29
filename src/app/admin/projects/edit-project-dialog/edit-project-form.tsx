import { FieldError, FormField, FormInput, FormLabel } from "src/components/form-field";
import {
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormSubmitMessage,
} from "src/components/form-state";
import { Button } from "src/components/ui/button";
import { DialogClose } from "src/components/ui/dialog";
import { Textarea } from "src/components/ui/textarea";
import {
	VisualTabs,
	VisualTabsContent,
	VisualTabsList,
	VisualTabsTrigger,
} from "src/components/ui/visual-tabs";
import type { Project } from "src/server/projects";
import { ProjectCompletionStatus, ProjectVisibilityStatus } from "src/server/projects";
import { updateProject } from "./edit-project-dialog.actions";
import { EditProjectSpecsWithState } from "./edit-project-specs-with-state";

interface EditProjectFormProps {
	project: Project;
}

/**
 * Server component for project editing form
 * Composes static content with client components for interactivity
 * @param project - The project to edit
 */
export function EditProjectForm({ project }: EditProjectFormProps) {
	return (
		<Form action={updateProject}>
			{/* Hidden project ID */}
			<input type="hidden" name="projectId" value={project.id} />

			{/* Form Fields */}
			<div className="space-y-6">
				{/* Project Name - Multilingual */}
				<div className="space-y-4">
					<FormField>
						<FormLabel>Project Name</FormLabel>
						<VisualTabs defaultValue="en" className="w-full">
							<VisualTabsList className="grid w-full grid-cols-2">
								<VisualTabsTrigger value="en">English</VisualTabsTrigger>
								<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
							</VisualTabsList>
							<VisualTabsContent value="en">
								<FormField
									fieldId="projectNameEn"
									name="projectNameEn"
									placeholder="Enter project name in English"
								>
									<FormInput defaultValue={project.name.en} />
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="projectNameVi"
									name="projectNameVi"
									placeholder="Nhập tên dự án bằng tiếng Việt"
								>
									<FormInput defaultValue={project.name.vi} />
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>

				{/* Project Category - Multilingual */}
				<div className="space-y-4">
					<FormField>
						<FormLabel>Project Category</FormLabel>
						<VisualTabs defaultValue="en" className="w-full">
							<VisualTabsList className="grid w-full grid-cols-2">
								<VisualTabsTrigger value="en">English</VisualTabsTrigger>
								<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
							</VisualTabsList>
							<VisualTabsContent value="en">
								<FormField
									fieldId="projectCategoryEn"
									name="projectCategoryEn"
									placeholder="Enter project category in English"
								>
									<FormInput defaultValue={project.category.en} />
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="projectCategoryVi"
									name="projectCategoryVi"
									placeholder="Nhập loại dự án bằng tiếng Việt"
								>
									<FormInput defaultValue={project.category.vi} />
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>

				{/* Location and Year */}
				<div className="grid grid-cols-2 gap-4">
					<FormField
						fieldId="projectLocation"
						name="projectLocation"
						placeholder="Enter project location"
						required
					>
						<FormLabel>Location</FormLabel>
						<FormInput defaultValue={project.location} />
						<FieldError />
					</FormField>

					<FormField
						fieldId="projectYear"
						name="projectYear"
						placeholder="Enter project year"
						required
					>
						<FormLabel>Year</FormLabel>
						<FormInput defaultValue={project.year} />
						<FieldError />
					</FormField>
				</div>

				{/* Project Description - Multilingual */}
				<div className="space-y-4">
					<FormField>
						<FormLabel>Project Description</FormLabel>
						<VisualTabs defaultValue="en" className="w-full">
							<VisualTabsList className="grid w-full grid-cols-2">
								<VisualTabsTrigger value="en">English</VisualTabsTrigger>
								<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
							</VisualTabsList>
							<VisualTabsContent value="en">
								<FormField
									fieldId="projectDescriptionEn"
									name="projectDescriptionEn"
									placeholder="Enter project description in English"
								>
									<Textarea
										name="projectDescriptionEn"
										placeholder="Enter project description in English"
										defaultValue={project.description.en}
										className="min-h-[100px]"
									/>
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="projectDescriptionVi"
									name="projectDescriptionVi"
									placeholder="Nhập mô tả dự án bằng tiếng Việt"
								>
									<Textarea
										name="projectDescriptionVi"
										placeholder="Nhập mô tả dự án bằng tiếng Việt"
										defaultValue={project.description.vi}
										className="min-h-[100px]"
									/>
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>

				{/* Project Specifications */}
				<div className="space-y-4">
					<div className="text-sm font-medium text-foreground">Project Specifications</div>
					<EditProjectSpecsWithState initialSpecs={project.specs} />
				</div>

				{/* Status Fields */}
				<div className="grid grid-cols-2 gap-4">
					<FormField fieldId="projectVisibilityStatus" name="projectVisibilityStatus" required>
						<FormLabel>Visibility Status</FormLabel>
						<FormInput asChild>
							<select
								defaultValue={project.visibilityStatus}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value={ProjectVisibilityStatus.Active}>Active</option>
								<option value={ProjectVisibilityStatus.Draft}>Draft</option>
							</select>
						</FormInput>
						<FieldError />
					</FormField>

					<FormField fieldId="projectCompletionStatus" name="projectCompletionStatus" required>
						<FormLabel>Completion Status</FormLabel>
						<FormInput asChild>
							<select
								defaultValue={project.completionStatus}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value={ProjectCompletionStatus.Completed}>Completed</option>
								<option value={ProjectCompletionStatus.InProgress}>In Progress</option>
								<option value={ProjectCompletionStatus.Planning}>Planning</option>
							</select>
						</FormInput>
						<FieldError />
					</FormField>
				</div>
			</div>

			{/* Form Status Messages */}
			<FormErrorDisplay />

			{/* Form Actions */}
			<div className="flex items-center justify-end space-x-2 pt-4">
				<DialogClose asChild>
					<Button type="button" variant="outline">
						Cancel
					</Button>
				</DialogClose>

				<Button type="submit">
					<FormSubmitMessage>Update Project</FormSubmitMessage>
					<FormPendingMessage>Updating project…</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
