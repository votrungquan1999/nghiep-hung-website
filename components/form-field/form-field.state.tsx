"use client";

import { createContext, useContext } from "react";
import type { FormFieldContext } from "./form-field.type";

/**
 * Form field context
 * Provides field information to child components
 */
const FormFieldContextInstance = createContext<FormFieldContext | null>(null);

/**
 * Hook to access form field context
 * @returns Form field context data
 * @throws Error if used outside of FormField provider
 */
export function useFormFieldContext(): FormFieldContext {
	const context = useContext(FormFieldContextInstance);
	if (!context) {
		throw new Error("useFormFieldContext must be used within a FormField component");
	}
	return context;
}

/**
 * Hook to check if we're inside a form field context
 * @returns True if inside FormField provider, false otherwise
 */
export function useFormField(): boolean {
	const context = useContext(FormFieldContextInstance);
	return context !== null;
}

/**
 * Form field context provider
 * @param props - Form field context data and children
 */
export function FormFieldProvider({
	value,
	children,
}: {
	value: FormFieldContext;
	children: React.ReactNode;
}) {
	return (
		<FormFieldContextInstance.Provider value={value}>{children}</FormFieldContextInstance.Provider>
	);
}
