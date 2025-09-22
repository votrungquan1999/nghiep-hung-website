import type { Product } from "src/server/products/product.type";
import { ProductStatus } from "src/server/products/product.type";
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
import { updateProduct } from "./edit-product-dialog.actions";

interface EditProductFormProps {
	product: Product;
}

/**
 * Server component for product editing form
 * Composes static content with client components for interactivity
 * @param product - The product to edit
 */
export function EditProductForm({ product }: EditProductFormProps) {
	return (
		<Form action={updateProduct}>
			{/* Hidden product ID */}
			<input type="hidden" name="productId" value={product.id} />

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
								<FormInput defaultValue={product.name.en} />
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
								<FormInput defaultValue={product.name.vi} />
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
								<FormInput asChild defaultValue={product.description.en}>
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
								<FormInput asChild defaultValue={product.description.vi}>
									<Textarea rows={4} />
								</FormInput>
								<FieldError />
							</FormField>
						</VisualTabsContent>
					</VisualTabs>
				</div>
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
								defaultChecked={product.status === ProductStatus.Draft}
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
								defaultChecked={product.status === ProductStatus.Active}
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
					<FormResetButton>Close</FormResetButton>
				</DialogClose>

				<Button type="submit">
					<FormSubmitMessage>Update Product</FormSubmitMessage>
					<FormPendingMessage>Updating...</FormPendingMessage>
				</Button>
			</div>
		</Form>
	);
}
