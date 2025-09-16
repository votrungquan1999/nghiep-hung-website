"use client"

import { useRouter } from "next/navigation"
import { createProduct } from "./create-product-dialog.actions"
import {
	ProductImageSelectionActionType,
	useProductImageSelectionDispatch,
} from "./create-product-dialog.state"

interface CreateProductFormHandlerProps {
	children: React.ReactNode
}

/**
 * Client component for handling form submission
 * Manages server action calls and state updates
 */
export function CreateProductFormHandler({ children }: CreateProductFormHandlerProps) {
	const dispatch = useProductImageSelectionDispatch()
	const router = useRouter()

	/**
	 * Handle form submission with server action
	 * @param formData - Form data from the form submission
	 */
	async function handleSubmit(formData: FormData) {
		dispatch({ type: ProductImageSelectionActionType.SetSubmitting, payload: true })
		dispatch({ type: ProductImageSelectionActionType.SetError, payload: null })

		try {
			const result = await createProduct(formData)

			if (result.success) {
				// Redirect to products page on success
				router.push("/admin/products")
				router.refresh()
			} else {
				dispatch({
					type: ProductImageSelectionActionType.SetError,
					payload: result.error || "Failed to create product",
				})
			}
		} catch (err) {
			dispatch({
				type: ProductImageSelectionActionType.SetError,
				payload: "An unexpected error occurred",
			})
			console.error("Form submission error:", err)
		} finally {
			dispatch({ type: ProductImageSelectionActionType.SetSubmitting, payload: false })
		}
	}

	return (
		<form action={handleSubmit} className="space-y-6">
			{children}
		</form>
	)
}
