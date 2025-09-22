"use client";

import { createContext, useContext, useState } from "react";
import { createReducerContext } from "@/contexts/createReducerContext";
import type { FormAction, FormState } from "./form-state.type";
import { FormActionType } from "./form-state.type";

const FormBoundaryContext = createContext<{ formKey: string; resetFormKey: () => void }>({
	formKey: "",
	resetFormKey: () => {},
});

export function FormBoundaryProvider({ children }: { children: React.ReactNode }) {
	const [formKey, setFormKey] = useState(1);

	const resetFormKey = () => {
		setFormKey(formKey + 1);
	};

	return (
		<FormBoundaryContext.Provider value={{ formKey: formKey.toString(), resetFormKey }}>
			<div key={formKey}>{children}</div>
		</FormBoundaryContext.Provider>
	);
}

export function useResetFormBoundary() {
	const context = useContext(FormBoundaryContext);

	if (!context) {
		return () => {};
	}

	return context.resetFormKey;
}

const initialState: FormState = {
	isSubmitting: false,
	error: null,
	fieldErrors: {},
	formRef: null,
	isConfirmDialogOpen: false,
};

/**
 * Form state reducer
 * Handles all form state updates
 * @param state - Current form state
 * @param action - Action to apply to the state
 * @returns New form state after applying the action
 */
function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case FormActionType.StartSubmitting:
			return {
				...state,
				isSubmitting: true,
				// Automatically reset error when starting submission
				error: null,
			};
		case FormActionType.FinishSubmitting:
			return {
				...state,
				isSubmitting: false,
			};
		case FormActionType.SetError:
			return {
				...state,
				error: action.payload,
			};
		case FormActionType.SetFieldError:
			return {
				...state,
				fieldErrors: {
					...state.fieldErrors,
					[action.payload.fieldName]: action.payload.error,
				},
			};
		case FormActionType.ClearFieldError: {
			const { [action.payload]: _, ...remainingFieldErrors } = state.fieldErrors;
			return {
				...state,
				fieldErrors: remainingFieldErrors,
			};
		}
		case FormActionType.ClearAllFieldErrors:
			return {
				...state,
				fieldErrors: {},
			};
		case FormActionType.Reset:
			return initialState;
		case FormActionType.OpenConfirmDialog:
			return {
				...state,
				isConfirmDialogOpen: true,
			};
		case FormActionType.CloseConfirmDialog:
			return {
				...state,
				isConfirmDialogOpen: false,
			};
		default:
			return state;
	}
}

/**
 * Form state context provider and hooks
 * Provides form state management to child components
 */
const [FormProviderBase, useFormState, useFormDispatch] = createReducerContext(
	formReducer,
	initialState,
);

/**
 * Enhanced FormProvider that includes form ref
 * Provides both form state and form ref to child components
 */
export function FormProvider({
	formRef,
	children,
}: {
	formRef: React.RefObject<HTMLFormElement | null>;
	children: React.ReactNode;
}) {
	return <FormProviderBase formRef={formRef}>{children}</FormProviderBase>;
}

/**
 * Hook to get form ref
 * @returns Form ref
 */
export function useFormRef() {
	const context = useFormState();
	return context.formRef;
}

/**
 * Hook to get form state
 * @returns Current form state
 */
export function useForm() {
	return useFormState();
}

/**
 * Hook to get form dispatch function
 * @returns Form dispatch function
 */
export function useFormActions() {
	return useFormDispatch();
}

/**
 * Hook to get field error for a specific field
 * @param fieldName - Name of the field to get error for
 * @returns Field error message or null if no error
 */
export function useFieldError(fieldName: string): string | null {
	const { fieldErrors } = useFormState();
	return fieldErrors[fieldName] || null;
}

/**
 * Hook to get all field errors
 * @returns Record of field errors
 */
export function useFieldErrors(): Record<string, string> {
	const { fieldErrors } = useFormState();
	return fieldErrors;
}

/**
 * Hook to get confirm dialog state
 * @returns Boolean indicating if confirm dialog is open
 */
export function useConfirmDialogOpen(): boolean {
	const { isConfirmDialogOpen } = useFormState();
	return isConfirmDialogOpen;
}

/**
 * Hook to get confirm dialog actions
 * @returns Object containing confirm dialog action functions
 */
export function useConfirmDialogActions() {
	const dispatch = useFormDispatch();
	return {
		openConfirmDialog: () => dispatch({ type: FormActionType.OpenConfirmDialog }),
		closeConfirmDialog: () => dispatch({ type: FormActionType.CloseConfirmDialog }),
	};
}
