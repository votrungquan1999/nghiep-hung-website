"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
	ProductImageSelectionActionType,
	useProductImageSelectionDispatch,
	useProductImageSelectionState,
} from "./create-product-dialog.state"

/**
 * Client component for form action buttons
 * Handles form submission state and navigation
 */
export function CreateProductFormActions() {
	const { isSubmitting } = useProductImageSelectionState()
	const dispatch = useProductImageSelectionDispatch()
	const router = useRouter()

	/**
	 * Handle cancel button click
	 */
	function handleCancel() {
		dispatch({ type: ProductImageSelectionActionType.Reset })
		// Close dialog or navigate away
		router.back()
	}

	return (
		<div className="flex justify-end space-x-2 pt-4">
			<Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
				Cancel
			</Button>
			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Creating..." : "Create Product"}
			</Button>
		</div>
	)
}
