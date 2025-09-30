"use client";

import { Slot } from "@radix-ui/react-slot";
import { useId } from "react";
import { useFieldError, useForm } from "src/components/form-state";
import { Input } from "src/components/ui/input";
import { cn } from "src/lib/utils";
import { FormFieldProvider, useFormFieldContext } from "./form-field.state";

import type {
	FieldErrorProps,
	FormFieldProps,
	FormHelpTextProps,
	FormInputProps,
	FormLabelProps,
} from "./form-field.type";
import { FieldErrorDisplayWhen } from "./form-field.type";

/**
 * Form field wrapper component
 * Provides context and manages field state
 */
export function FormField({
	fieldId,
	name,
	required = false,
	disabled = false,
	readOnly = false,
	value,
	error,
	helpText,
	label,
	placeholder,
	type = "text",
	min,
	max,
	step,
	maxLength,
	pattern,
	title,
	autoComplete,
	children,
	className,
}: FormFieldProps) {
	const generatedId = useId();

	// Use provided fieldId or generate one
	const id = fieldId || generatedId;
	const fieldName = name || id;

	const contextValue = {
		id,
		name: fieldName,
		required,
		disabled,
		readOnly,
		value,
		error,
		helpText,
		label,
		placeholder,
		type,
		min,
		max,
		step,
		maxLength,
		pattern,
		title,
		autoComplete,
		invalid: Boolean(error),
	};

	return (
		<div className={cn("space-y-2", className)}>
			<FormFieldProvider value={contextValue}>{children}</FormFieldProvider>
		</div>
	);
}

/**
 * Form label component
 * Automatically associates with field using context
 */
export function FormLabel({ children, asChild = false, className }: FormLabelProps) {
	const { id, required, invalid } = useFormFieldContext();

	const labelProps = {
		htmlFor: id,
		className: cn(
			"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
			invalid && "text-destructive",
			className,
		),
	} as const;

	if (asChild) {
		return <Slot {...labelProps}>{children}</Slot>;
	}

	return (
		<label htmlFor={id} className={labelProps.className}>
			{children}
			{required && <span className="text-destructive ml-1">*</span>}
		</label>
	);
}

/**
 * Form input component
 * Automatically applies field properties from context
 */
export function FormInput({ children, asChild = false, className, ...inputProps }: FormInputProps) {
	const { id, name, value, disabled, readOnly, required, invalid, pattern, title } =
		useFormFieldContext();
	const formState = useForm();

	const inputElementProps = {
		id,
		name,
		value: value as string | number | readonly string[] | undefined,
		disabled: disabled || formState.isSubmitting,
		readOnly,
		required,
		pattern,
		title,
		"aria-invalid": invalid,
		"aria-describedby": invalid ? `${id}-error` : undefined,
		...inputProps,
	};

	if (asChild) {
		return (
			<Slot {...inputElementProps} className={cn(className)}>
				{children}
			</Slot>
		);
	}

	return <Input {...inputElementProps} className={cn(className)} />;
}

/**
 * Field error component
 * Displays field validation errors from form context
 */
export function FieldError({
	children,
	asChild = false,
	className,
	when = FieldErrorDisplayWhen.Invalid,
}: FieldErrorProps) {
	const { name, id, required, value, error } = useFormFieldContext();
	const fieldError = useFieldError(name);

	// Use field error from form context or fallback to prop error
	const effectiveError = fieldError || error;

	// Determine if error should be shown based on 'when' prop
	let shouldShow = false;
	let errorMessage = "";

	switch (when) {
		case FieldErrorDisplayWhen.Empty:
			shouldShow = Boolean(required && !value);
			errorMessage = "This field is required";
			break;
		case FieldErrorDisplayWhen.Invalid:
			shouldShow = Boolean(effectiveError);
			errorMessage = effectiveError || "This field is invalid";
			break;
	}

	if (!shouldShow) return null;

	const errorProps = {
		id: `${id}-error`,
		className: cn("text-sm text-destructive", className),
		role: "alert",
		"aria-live": "polite" as const,
	};

	if (asChild) {
		return <Slot {...errorProps}>{children || errorMessage}</Slot>;
	}

	return <p {...errorProps}>{children || errorMessage}</p>;
}

/**
 * Form help text component
 * Displays field help/description text
 */
export function FormHelpText({ children, asChild = false, className }: FormHelpTextProps) {
	const { helpText, id } = useFormFieldContext();

	if (!helpText && !children) return null;

	const helpTextProps = {
		id: `${id}-help`,
		className: cn("text-sm text-muted-foreground", className),
	};

	if (asChild) {
		return <Slot {...helpTextProps}>{children || helpText}</Slot>;
	}

	return <p {...helpTextProps}>{children || helpText}</p>;
}
