import { Upload } from "lucide-react";
import { FieldError, FormField, FormInput, FormLabel } from "src/components/form-field";
import {
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormResetButton,
	FormSubmitMessage,
} from "src/components/form-state";
import {
	ImageUploadArea,
	ImageUploadError,
	ImageUploadProgress,
	ImageUploadReview,
	ImageUploadRoot,
	ImageUploadTrigger,
} from "src/components/image-upload";
import { Button } from "src/components/ui/button";
import { Textarea } from "src/components/ui/textarea";
import {
	VisualTabs,
	VisualTabsContent,
	VisualTabsList,
	VisualTabsTrigger,
} from "src/components/ui/visual-tabs";
import { ProjectCompletionStatus, ProjectVisibilityStatus } from "src/server/projects";
import { createProject } from "./create-project-dialog.actions";
import { HiddenSelectedImageInput } from "./hidden-selected-image-input";
import { HiddenSpecsInput } from "./hidden-specs-input";
import { ProjectImageRenderer } from "./project-image-renderer";
import { ProjectSpecsField } from "./project-specs-field";

/**
 * Server component for project creation form
 * Composes static content with client components for interactivity
 */
export function CreateProjectForm() {
	return (
		<Form action={createProject}>
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
									<FormInput />
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="projectNameVi"
									name="projectNameVi"
									placeholder="Nhập tên dự án bằng tiếng Việt"
								>
									<FormInput />
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
									<FormInput />
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="projectCategoryVi"
									name="projectCategoryVi"
									placeholder="Nhập loại dự án bằng tiếng Việt"
								>
									<FormInput />
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>

				{/* Location and Year */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						fieldId="projectLocation"
						name="projectLocation"
						placeholder="Enter project location"
						required
					>
						<FormLabel>Location</FormLabel>
						<FormInput />
						<FieldError />
					</FormField>
					<FormField
						fieldId="projectYear"
						name="projectYear"
						placeholder="Enter project year"
						required
					>
						<FormLabel>Year</FormLabel>
						<FormInput />
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
									<FormInput asChild>
										<Textarea className="min-h-[100px]" />
									</FormInput>
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="projectDescriptionVi"
									name="projectDescriptionVi"
									placeholder="Nhập mô tả dự án bằng tiếng Việt"
								>
									<FormInput asChild>
										<Textarea className="min-h-[100px]" />
									</FormInput>
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>

				{/* Project Specifications - Dynamic Array */}
				<ProjectSpecsField />
			</div>

			{/* Image Upload Section */}
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="text-sm font-medium text-foreground">Project Images</div>
					<p className="text-xs text-muted-foreground">
						Upload multiple images and click on any image to set it as the main project image
					</p>
				</div>

				<ImageUploadRoot maxFiles={10} maxFileSize={5 * 1024 * 1024} name="projectImages">
					{/* Drop Zone with integrated trigger */}
					<ImageUploadArea
						className="p-8 w-full flex items-center justify-center"
						clickable={false}
					>
						<div className="text-center text-muted-foreground space-y-4">
							<div className="flex flex-col items-center space-y-2">
								<div className="size-16 rounded-full bg-muted flex items-center justify-center">
									<Upload className="size-8 text-muted-foreground" />
								</div>
								<div className="space-y-1">
									<h3 className="text-sm font-medium text-foreground">Upload Project Images</h3>
									<p className="text-xs text-muted-foreground">
										Drag and drop your images here, or click the button below to select files
									</p>
								</div>
							</div>

							<ImageUploadTrigger asChild>
								<Button
									type="button"
									variant="outline"
									className="bg-white border-border hover:bg-muted"
								>
									<Upload className="mr-2 size-4" />
									Select Images
								</Button>
							</ImageUploadTrigger>
						</div>
					</ImageUploadArea>
					{/* Upload Progress */}
					<ImageUploadProgress />
					{/* Upload Errors */}
					<ImageUploadError />
					{/* Image Review with Custom Component */}
					<ImageUploadReview
						ImageComponent={ProjectImageRenderer}
						className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
					/>

					{/* Hidden Selected Image Input - need to be in the ImageUploadRoot so that it can use the files context */}
					<HiddenSelectedImageInput />
				</ImageUploadRoot>
			</div>

			{/* Hidden Specs Input */}
			<HiddenSpecsInput />

			{/* Project Status */}
			<div className="space-y-4">
				<div className="text-sm font-medium text-foreground">Project Status</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField fieldId="visibilityStatus" name="visibilityStatus" required>
						<FormLabel>Visibility Status</FormLabel>
						<FormInput asChild>
							<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
								<option value={ProjectVisibilityStatus.Active}>Active</option>
								<option value={ProjectVisibilityStatus.Draft}>Draft</option>
							</select>
						</FormInput>
						<FieldError />
					</FormField>
					<FormField fieldId="completionStatus" name="completionStatus" required>
						<FormLabel>Completion Status</FormLabel>
						<FormInput asChild>
							<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
								<option value={ProjectCompletionStatus.Completed}>Completed</option>
								<option value={ProjectCompletionStatus.InProgress}>In Progress</option>
								<option value={ProjectCompletionStatus.Planning}>Planning</option>
							</select>
						</FormInput>
						<FieldError />
					</FormField>
				</div>
			</div>

			{/* Form Messages */}
			<FormErrorDisplay />

			{/* Form Actions */}
			<div className="flex items-center justify-end space-x-4 pt-6 border-t">
				<FormResetButton type="button" variant="outline">
					Reset Form
				</FormResetButton>
				<Button type="submit">
					<FormSubmitMessage>Create Project</FormSubmitMessage>
					<FormPendingMessage>Creating project...</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
