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
	 * Field-specific validation errors
	 */
	fieldErrors: Record<string, string>;
	/**
	 * Whether the confirm dialog is open
	 */
	isConfirmDialogOpen: boolean;

	/**
	 * Form ref
	 */
	formRef: React.RefObject<HTMLFormElement | null> | null;
}

export enum FormActionType {
	StartSubmitting = "START_SUBMITTING",
	FinishSubmitting = "FINISH_SUBMITTING",
	SetError = "SET_ERROR",
	SetFieldError = "SET_FIELD_ERROR",
	ClearFieldError = "CLEAR_FIELD_ERROR",
	ClearAllFieldErrors = "CLEAR_ALL_FIELD_ERRORS",
	Reset = "RESET",
	OpenConfirmDialog = "OPEN_CONFIRM_DIALOG",
	CloseConfirmDialog = "CLOSE_CONFIRM_DIALOG",
}

export type FormAction =
	| { type: FormActionType.StartSubmitting }
	| { type: FormActionType.FinishSubmitting }
	| { type: FormActionType.SetError; payload: string | null }
	| { type: FormActionType.SetFieldError; payload: { fieldName: string; error: string } }
	| { type: FormActionType.ClearFieldError; payload: string }
	| { type: FormActionType.ClearAllFieldErrors }
	| { type: FormActionType.Reset }
	| { type: FormActionType.OpenConfirmDialog }
	| { type: FormActionType.CloseConfirmDialog };

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
	/**
	 * Whether to show confirm dialog before submit
	 */
	confirmBeforeSubmit?: boolean;
}
