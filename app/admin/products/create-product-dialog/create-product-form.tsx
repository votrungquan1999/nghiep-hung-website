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
import {
	VisualTabs,
	VisualTabsContent,
	VisualTabsList,
	VisualTabsTrigger,
} from "@/components/ui/visual-tabs";
import { ProductStatus } from "@/server/products/product.type";
import { createProduct } from "./create-product-dialog.actions";
import { HiddenSelectedImageInput } from "./hidden-selected-image-input";
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
				{/* Product Name - Multilingual */}
				<div className="space-y-4">
					<div className="text-sm font-medium text-foreground">Product Name</div>
					<VisualTabs defaultValue="en" className="w-full">
						<VisualTabsList className="grid w-full grid-cols-2">
							<VisualTabsTrigger value="en">English</VisualTabsTrigger>
							<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
						</VisualTabsList>
						<VisualTabsContent value="en">
							<FormField
								fieldId="productNameEn"
								name="productNameEn"
								placeholder="Enter product name in English"
								required
							>
								<FormLabel>Product Name (English)</FormLabel>
								<FormInput />
								<FieldError />
							</FormField>
						</VisualTabsContent>
						<VisualTabsContent value="vi">
							<FormField
								fieldId="productNameVi"
								name="productNameVi"
								placeholder="Nhập tên sản phẩm bằng tiếng Việt"
								required
							>
								<FormLabel>Tên sản phẩm (Tiếng Việt)</FormLabel>
								<FormInput />
								<FieldError />
							</FormField>
						</VisualTabsContent>
					</VisualTabs>
				</div>

				{/* Product Description - Multilingual */}
				<div className="space-y-4">
					<div className="text-sm font-medium text-foreground">Product Description</div>
					<VisualTabs defaultValue="en" className="w-full">
						<VisualTabsList className="grid w-full grid-cols-2">
							<VisualTabsTrigger value="en">English</VisualTabsTrigger>
							<VisualTabsTrigger value="vi">Tiếng Việt</VisualTabsTrigger>
						</VisualTabsList>
						<VisualTabsContent value="en">
							<FormField
								fieldId="productDescriptionEn"
								name="productDescriptionEn"
								placeholder="Enter product description in English"
								required
							>
								<FormLabel>Product Description (English)</FormLabel>
								<FormInput asChild>
									<Textarea rows={4} />
								</FormInput>
								<FieldError />
							</FormField>
						</VisualTabsContent>
						<VisualTabsContent value="vi">
							<FormField
								fieldId="productDescriptionVi"
								name="productDescriptionVi"
								placeholder="Nhập mô tả sản phẩm bằng tiếng Việt"
								required
							>
								<FormLabel>Mô tả sản phẩm (Tiếng Việt)</FormLabel>
								<FormInput asChild>
									<Textarea rows={4} />
								</FormInput>
								<FieldError />
							</FormField>
						</VisualTabsContent>
					</VisualTabs>
				</div>
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

					{/* Hidden Selected Image Input - need to be in the ImageUploadRoot so that it can use the files context */}
					<HiddenSelectedImageInput />
				</ImageUploadRoot>
			</div>

			{/* Product Status */}
			<div className="space-y-4">
				<div className="space-y-2">
					<div className="text-sm font-medium text-foreground">Product Status</div>
					<p className="text-xs text-muted-foreground">
						Choose whether to publish the product immediately or save as draft
					</p>
				</div>

				<FormField fieldId="productStatus" name="productStatus" required>
					<div className="flex space-x-1 p-1 bg-muted rounded-lg">
						<label className="flex-1">
							<input
								type="radio"
								name="productStatus"
								value={ProductStatus.Draft}
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
								name="productStatus"
								value={ProductStatus.Active}
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
					<FormSubmitMessage>Create Product</FormSubmitMessage>
					<FormPendingMessage>Creating...</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
