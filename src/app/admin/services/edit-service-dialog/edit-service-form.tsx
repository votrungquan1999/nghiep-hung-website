import { FieldError, FormField, FormInput, FormLabel } from "src/components/form-field";
import {
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormResetButton,
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
import type { Service } from "src/server/services";
import { ServiceStatus } from "src/server/services";
import { updateService } from "./";

interface EditServiceFormProps {
	service: Service;
}

/**
 * Server component for service editing form
 * Composes static content with client components for interactivity
 * @param service - The service to edit
 */
export function EditServiceForm({ service }: EditServiceFormProps) {
	return (
		<Form action={updateService}>
			{/* Hidden service ID */}
			<input type="hidden" name="serviceId" value={service.id} />

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
									<FormInput defaultValue={service.name.en} />
									<FieldError />
								</FormField>
							</VisualTabsContent>
							<VisualTabsContent value="vi">
								<FormField
									fieldId="serviceNameVi"
									name="serviceNameVi"
									placeholder="Nhập tên dịch vụ bằng tiếng Việt"
								>
									<FormInput defaultValue={service.name.vi} />
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
										<Textarea rows={4} defaultValue={service.description.en} />
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
										<Textarea rows={4} defaultValue={service.description.vi} />
									</FormInput>
									<FieldError />
								</FormField>
							</VisualTabsContent>
						</VisualTabs>
					</FormField>
				</div>
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
								defaultChecked={service.status === ServiceStatus.Draft}
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
								defaultChecked={service.status === ServiceStatus.Active}
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
				<DialogClose asChild>
					<FormResetButton>Cancel</FormResetButton>
				</DialogClose>

				<Button type="submit">
					<FormSubmitMessage>Update Service</FormSubmitMessage>
					<FormPendingMessage>Updating...</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
