/**
 * Form state management types
 * Defines the state structure and actions for reusable form components
 */

export interface FormState {
	/**
	 * Whether the form is currently being submitted
	 */
	isSubmitting: boolean
	/**
	 * Current error message, null if no error
	 */
	error: string | null
	/**
	 * Whether the form has been submitted at least once
	 */
	hasSubmitted: boolean
}

export enum FormActionType {
	SetSubmitting = "SET_SUBMITTING",
	SetError = "SET_ERROR",
	SetHasSubmitted = "SET_HAS_SUBMITTED",
	Reset = "RESET",
}

export interface FormAction {
	type: FormActionType
	payload?: boolean | string | null
}

export interface FormSubmitHandler {
	/**
	 * Handle form submission
	 * @param formData - Form data from the form submission
	 * @returns Promise that resolves to success/error result
	 */
	(formData: FormData): Promise<{ success: boolean; error?: string }>
}

export interface FormProps {
	/**
	 * Form action function
	 */
	action: FormSubmitHandler
	/**
	 * Form children components
	 */
	children: React.ReactNode
}
