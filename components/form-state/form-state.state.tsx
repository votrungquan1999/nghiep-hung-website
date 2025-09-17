"use client";

import { createReducerContext } from "@/contexts/createReducerContext";
import type { FormAction, FormState } from "./form-state.type";

const initialState: FormState = {
	isSubmitting: false,
	error: null,
	hasSubmitted: false,
	fieldErrors: {},
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
		case "SET_SUBMITTING":
			return {
				...state,
				isSubmitting: action.payload as boolean,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload as string | null,
			};
		case "SET_HAS_SUBMITTED":
			return {
				...state,
				hasSubmitted: action.payload as boolean,
			};
		case "SET_FIELD_ERROR": {
			const fieldErrorPayload = action.payload as { fieldName: string; error: string };
			return {
				...state,
				fieldErrors: {
					...state.fieldErrors,
					[fieldErrorPayload.fieldName]: fieldErrorPayload.error,
				},
			};
		}
		case "CLEAR_FIELD_ERROR": {
			const fieldName = action.payload as string;
			const { [fieldName]: _, ...remainingFieldErrors } = state.fieldErrors;
			return {
				...state,
				fieldErrors: remainingFieldErrors,
			};
		}
		case "CLEAR_ALL_FIELD_ERRORS":
			return {
				...state,
				fieldErrors: {},
			};
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

/**
 * Form state context provider and hooks
 * Provides form state management to child components
 */
const [FormProvider, useFormState, useFormDispatch] = createReducerContext(
	formReducer,
	initialState,
);

export { FormProvider, useFormState, useFormDispatch };

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
