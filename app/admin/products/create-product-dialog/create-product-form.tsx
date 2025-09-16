import { Upload } from "lucide-react"
import {
	ImageUploadArea,
	ImageUploadError,
	ImageUploadProgress,
	ImageUploadReview,
	ImageUploadRoot,
	ImageUploadTrigger,
} from "@/components/image-upload"
import { Button } from "@/components/ui/button"
import { ProductImageRenderer } from "./create-product-dialog.ui"
import { CreateProductErrorDisplay } from "./create-product-error-display"
import { CreateProductFormActions } from "./create-product-form-actions"
import { CreateProductFormFields } from "./create-product-form-fields"
import { CreateProductFormHandler } from "./create-product-form-handler"

/**
 * Server component for product creation form
 * Composes static content with client components for interactivity
 */
export function CreateProductForm() {
	return (
		<CreateProductFormHandler>
			{/* Form Fields */}
			<CreateProductFormFields />

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
			<CreateProductErrorDisplay />

			{/* Form Actions */}
			<CreateProductFormActions />
		</CreateProductFormHandler>
	)
}
