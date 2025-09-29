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
import { ServiceStatus } from "src/server/services";
import { createService } from "./create-service-dialog.actions";
import { HiddenSelectedImageInput } from "./hidden-selected-image-input";
import { ServiceImageRenderer } from "./service-image-renderer";

/**
 * Server component for service creation form
 * Composes static content with client components for interactivity
 */
export function CreateServiceForm() {
	return (
		<Form action={createService}>
			{/* Form Fields */}
			<div className="space-y-6">
				{/* Service Name - Multilingual */}
				<div className="space-y-4">
					<FormField>
						<FormLabel>Service Name</FormLabel>
						<VisualTabs defaultValue="en" className="w-full">
							<VisualTabsList className="grid w-full grid-cols-2">
								<VisualTabsTrigger value="en">English</VisualTabsTrigger>
								<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
							</VisualTabsList>
							<VisualTabsContent value="en">
								<FormField
									fieldId="serviceNameEn"
									name="serviceNameEn"
									placeholder="Enter service name in English"
								>
									<FormInput />
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="serviceNameVi"
									name="serviceNameVi"
									placeholder="Nhập tên dịch vụ bằng tiếng Việt"
								>
									<FormInput />
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>

				{/* Service Description - Multilingual */}
				<div className="space-y-4">
					<FormField>
						<FormLabel>Service Description</FormLabel>
						<VisualTabs defaultValue="en" className="w-full">
							<VisualTabsList className="grid w-full grid-cols-2">
								<VisualTabsTrigger value="en">English</VisualTabsTrigger>
								<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
							</VisualTabsList>
							<VisualTabsContent value="en">
								<FormField
									fieldId="serviceDescriptionEn"
									name="serviceDescriptionEn"
									placeholder="Enter service description in English"
								>
									<FormInput asChild>
										<Textarea rows={4} />
									</FormInput>
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="serviceDescriptionVi"
									name="serviceDescriptionVi"
									placeholder="Nhập mô tả dịch vụ bằng tiếng Việt"
								>
									<FormInput asChild>
										<Textarea rows={4} />
									</FormInput>
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>
			</div>

			{/* Image Upload Section */}
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="text-sm font-medium text-foreground">Service Images</div>
					<p className="text-xs text-muted-foreground">
						Upload multiple images and click on any image to set it as the main service image
					</p>
				</div>

				<ImageUploadRoot maxFiles={10} maxFileSize={5 * 1024 * 1024} name="serviceImages">
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
									<h3 className="text-sm font-medium text-foreground">Upload Service Images</h3>
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
						ImageComponent={ServiceImageRenderer}
						className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
					/>

					{/* Hidden Selected Image Input - need to be in the ImageUploadRoot so that it can use the files context */}
					<HiddenSelectedImageInput />
				</ImageUploadRoot>
			</div>

			{/* Service Status */}
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="text-sm font-medium text-foreground">Service Status</div>
					<p className="text-xs text-muted-foreground">
						Choose whether to publish the service immediately or save as draft
					</p>
				</div>

				<FormField fieldId="serviceStatus" name="serviceStatus" required>
					<div className="flex space-x-1 p-1 bg-muted rounded-lg">
						<label className="flex-1">
							<input
								type="radio"
								name="serviceStatus"
								value={ServiceStatus.Draft}
								className="sr-only peer"
								defaultChecked
							/>
							<div className="flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md cursor-pointer transition-all peer-checked:bg-slate-100 peer-checked:text-slate-700 peer-checked:shadow-sm text-muted-foreground hover:text-foreground peer-checked:border peer-checked:border-slate-200">
								Draft
							</div>
						</label>
						<label className="flex-1">
							<input
								type="radio"
								name="serviceStatus"
								value={ServiceStatus.Active}
								className="sr-only peer"
							/>
							<div className="flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md cursor-pointer transition-all peer-checked:bg-green-100 peer-checked:text-green-600 peer-checked:shadow-sm text-green-600 hover:text-green-700 peer-checked:border peer-checked:border-green-200">
								Active
							</div>
						</label>
					</div>
					<FieldError />
				</FormField>
			</div>

			{/* Error Display */}
			<FormErrorDisplay />

			{/* Form Actions */}
			<div className="flex justify-end space-x-2 pt-4">
				<FormResetButton>Cancel</FormResetButton>

				<Button type="submit">
					<FormSubmitMessage>Create Service</FormSubmitMessage>
					<FormPendingMessage>Creating...</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
