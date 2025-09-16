"use client"

import { useProductImageSelectionState } from "./create-product-dialog.state"

/**
 * Client component for displaying form errors
 * Uses context state to show error messages
 */
export function CreateProductErrorDisplay() {
	const { error } = useProductImageSelectionState()

	if (!error) {
		return null
	}

	return (
		<div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
			<p className="text-sm text-destructive">{error}</p>
		</div>
	)
}
