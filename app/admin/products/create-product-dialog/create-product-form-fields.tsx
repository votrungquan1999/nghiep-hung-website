"use client"

import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useProductImageSelectionState } from "./create-product-dialog.state"

/**
 * Client component for form fields with proper ID generation
 * Uses context state for disabled state
 */
export function CreateProductFormFields() {
	const { isSubmitting } = useProductImageSelectionState()
	const productNameId = useId()
	const productDescriptionId = useId()

	return (
		<>
			{/* Product Name */}
			<div className="space-y-2">
				<label htmlFor={productNameId} className="text-sm font-medium text-foreground">
					Product Name
				</label>
				<Input
					id={productNameId}
					name="productName"
					placeholder="Enter product name"
					required
					disabled={isSubmitting}
				/>
			</div>

			{/* Product Description */}
			<div className="space-y-2">
				<label htmlFor={productDescriptionId} className="text-sm font-medium text-foreground">
					Product Description
				</label>
				<Textarea
					id={productDescriptionId}
					name="productDescription"
					placeholder="Enter product description"
					rows={4}
					required
					disabled={isSubmitting}
				/>
			</div>
		</>
	)
}
