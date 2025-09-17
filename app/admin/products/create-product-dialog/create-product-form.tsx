import { Upload } from "lucide-react";
import { FieldError, FormField, FormInput, FormLabel } from "@/components/form-field";
import {
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormResetButton,
	FormSubmitMessage,
} from "@/components/form-state";
import {
	ImageUploadArea,
	ImageUploadError,
	ImageUploadProgress,
	ImageUploadReview,
	ImageUploadRoot,
	ImageUploadTrigger,
} from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "./create-product-dialog.actions";
import { ProductImageRenderer } from "./product-image-renderer";

/**
 * Server component for product creation form
 * Composes static content with client components for interactivity
 */
export function CreateProductForm() {
	return (
		<Form action={createProduct}>
			{/* Form Fields */}
			<div className="space-y-6">
				{/* Product Name */}
				<FormField
					fieldId="productName"
					name="productName"
					placeholder="Enter product name"
					required
				>
					<FormLabel>Product Name</FormLabel>
					<FormInput />
					<FieldError />
				</FormField>

				{/* Product Description */}
				<FormField
					fieldId="productDescription"
					name="productDescription"
					placeholder="Enter product description"
					required
				>
					<FormLabel>Product Description</FormLabel>
					<FormInput asChild>
						<Textarea rows={4} />
					</FormInput>
					<FieldError />
				</FormField>
			</div>

			{/* Image Upload Section */}
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="text-sm font-medium text-foreground">Product Images</div>
					<p className="text-xs text-muted-foreground">
						Upload multiple images and click on any image to set it as the main product image
					</p>
				</div>

				<ImageUploadRoot maxFiles={10} maxFileSize={5 * 1024 * 1024} name="productImages">
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
									<h3 className="text-sm font-medium text-foreground">Upload Product Images</h3>
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
						ImageComponent={ProductImageRenderer}
						className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
					/>
				</ImageUploadRoot>
			</div>

			{/* Error Display */}
			<FormErrorDisplay />

			{/* Form Actions */}
			<div className="flex justify-end space-x-2 pt-4">
				<FormResetButton>Cancel</FormResetButton>
				<Button type="submit">
					<FormSubmitMessage>Create Product</FormSubmitMessage>
					<FormPendingMessage>Creating...</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
