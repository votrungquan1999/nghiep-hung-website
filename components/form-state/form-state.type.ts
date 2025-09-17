/**
 * Form state management types
 * Defines the state structure and actions for reusable form components
 */

export interface FormState {
	/**
	 * Whether the form is currently being submitted
	 */
	isSubmitting: boolean;
	/**
	 * Current error message, null if no error
	 */
	error: string | null;
	/**
	 * Whether the form has been submitted at least once
	 */
	hasSubmitted: boolean;
	/**
	 * Field-specific validation errors
	 */
	fieldErrors: Record<string, string>;
}

export enum FormActionType {
	SetSubmitting = "SET_SUBMITTING",
	SetError = "SET_ERROR",
	SetHasSubmitted = "SET_HAS_SUBMITTED",
	SetFieldError = "SET_FIELD_ERROR",
	ClearFieldError = "CLEAR_FIELD_ERROR",
	ClearAllFieldErrors = "CLEAR_ALL_FIELD_ERRORS",
	Reset = "RESET",
}

export interface FormAction {
	type: FormActionType;
	payload?: boolean | string | null | { fieldName: string; error: string } | string;
}

interface RedirectResult {
	success: true;
	redirect: string;
}

interface RefreshResult {
	success: true;
	refresh: true;
}

interface ErrorResult {
	success: false;
	error: string;
}

export type SuccessResult = RedirectResult | RefreshResult;

export type FormResult = SuccessResult | ErrorResult;

export interface FormSubmitHandler {
	/**
	 * Handle form submission
	 * @param formData - Form data from the form submission
	 * @returns Promise that resolves to success/error result
	 */
	(formData: FormData): Promise<FormResult>;
}

export interface FormProps {
	/**
	 * Form action function
	 */
	action: FormSubmitHandler;
	/**
	 * Form children components
	 */
	children: React.ReactNode;
}
