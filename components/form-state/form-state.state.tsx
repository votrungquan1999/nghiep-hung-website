"use client"

import { createReducerContext } from "@/contexts/createReducerContext"
import type { FormAction, FormState } from "./form-state.type"

const initialState: FormState = {
	isSubmitting: false,
	error: null,
	hasSubmitted: false,
}

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
			}
		case "SET_ERROR":
			return {
				...state,
				error: action.payload as string | null,
			}
		case "SET_HAS_SUBMITTED":
			return {
				...state,
				hasSubmitted: action.payload as boolean,
			}
		case "RESET":
			return initialState
		default:
			return state
	}
}

/**
 * Form state context provider and hooks
 * Provides form state management to child components
 */
export const [FormProvider, useFormState, useFormDispatch] = createReducerContext(
	formReducer,
	initialState,
)

/**
 * Hook to get form state
 * @returns Current form state
 */
export function useForm() {
	return useFormState()
}

/**
 * Hook to get form dispatch function
 * @returns Form dispatch function
 */
export function useFormActions() {
	return useFormDispatch()
}
