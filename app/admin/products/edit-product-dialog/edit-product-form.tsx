import { FieldError, FormField, FormInput, FormLabel } from "@/components/form-field";
import {
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormResetButton,
	FormSubmitMessage,
} from "@/components/form-state";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/server/products/product.type";
import { ProductStatus } from "@/server/products/product.type";
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
				{/* Product Name */}
				<FormField
					fieldId="productName"
					name="productName"
					placeholder="Enter product name"
					required
				>
					<FormLabel>Product Name</FormLabel>
					<FormInput defaultValue={product.name} />
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
					<FormInput asChild defaultValue={product.description}>
						<Textarea rows={4} />
					</FormInput>
					<FieldError />
				</FormField>
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
