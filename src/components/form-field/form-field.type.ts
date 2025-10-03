/**
 * Form field component types
 * Defines the field context structure and component props for reusable form field components
 */

import type { ReactNode } from "react";

/**
 * Enum for field error display timing
 */
export enum FieldErrorDisplayWhen {
	Empty = "empty",
	Invalid = "invalid",
}

/**
 * Form field context data
 * Contains all necessary field information for child components
 */
export interface FormFieldContext {
	/**
	 * Unique identifier for the form field
	 */
	id: string;
	/**
	 * Name attribute for the form field
	 */
	name: string;
	/**
	 * Whether the field is required
	 */
	required?: boolean;
	/**
	 * Whether the field is disabled
	 */
	disabled?: boolean;
	/**
	 * Whether the field is read-only
	 */
	readOnly?: boolean;
	/**
	 * Current field value
	 */
	value?: string | number | boolean;
	/**
	 * Field validation error message
	 */
	error?: string;
	/**
	 * Field help/description text
	 */
	helpText?: string;
	/**
	 * Field label text
	 */
	label?: string;
	/**
	 * Field placeholder text
	 */
	placeholder?: string;
	/**
	 * Field type (text, email, password, etc.)
	 */
	type?: string;
	/**
	 * Minimum value for number inputs
	 */
	min?: number;
	/**
	 * Maximum value for number inputs
	 */
	max?: number;
	/**
	 * Step value for number inputs
	 */
	step?: number;
	/**
	 * Maximum length for text inputs
	 */
	maxLength?: number;
	/**
	 * Pattern for input validation
	 */
	pattern?: string;
	/**
	 * Title attribute for input validation tooltip
	 */
	title?: string;
	/**
	 * Auto-complete attribute
	 */
	autoComplete?: string;
	/**
	 * Whether to show the field as invalid
	 */
	invalid?: boolean;
}

/**
 * Form field provider props
 * Props for the FormField component that provides context
 */
export interface FormFieldProps {
	/**
	 * Field identifier (used for id and name attributes, auto-generated if not provided)
	 */
	fieldId?: string;
	/**
	 * Field name (defaults to fieldId if not provided)
	 */
	name?: string;
	/**
	 * Whether the field is required
	 */
	required?: boolean;
	/**
	 * Whether the field is disabled
	 */
	disabled?: boolean;
	/**
	 * Whether the field is read-only
	 */
	readOnly?: boolean;
	/**
	 * Current field value
	 */
	value?: string | number | boolean;
	/**
	 * Field validation error message
	 */
	error?: string;
	/**
	 * Field help/description text
	 */
	helpText?: string;
	/**
	 * Field label text
	 */
	label?: string;
	/**
	 * Field placeholder text
	 */
	placeholder?: string;
	/**
	 * Field type (text, email, password, etc.)
	 */
	type?: string;
	/**
	 * Minimum value for number inputs
	 */
	min?: number;
	/**
	 * Maximum value for number inputs
	 */
	max?: number;
	/**
	 * Step value for number inputs
	 */
	step?: number;
	/**
	 * Maximum length for text inputs
	 */
	maxLength?: number;
	/**
	 * Pattern for input validation
	 */
	pattern?: string;
	/**
	 * Title attribute for input validation tooltip
	 */
	title?: string;
	/**
	 * Auto-complete attribute
	 */
	autoComplete?: string;
	/**
	 * Form field children components
	 */
	children: ReactNode;
	/**
	 * Additional CSS classes
	 */
	className?: string;
}

/**
 * Form label component props
 * Props for the FormLabel component
 */
export interface FormLabelProps {
	/**
	 * Label children content
	 */
	children: ReactNode;
	/**
	 * Whether to render as a different element using asChild
	 */
	asChild?: boolean;
	/**
	 * Additional CSS classes
	 */
	className?: string;
}

/**
 * Form input component props
 * Props for the FormInput component
 */
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Input children content (for asChild pattern)
	 */
	children?: ReactNode;
	/**
	 * Whether to render as a different element using asChild
	 */
	asChild?: boolean;
}

/**
 * Field error component props
 * Props for the FieldError component
 */
export interface FieldErrorProps {
	/**
	 * Error children content (for asChild pattern)
	 */
	children?: ReactNode;
	/**
	 * Whether to render as a different element using asChild
	 */
	asChild?: boolean;
	/**
	 * Additional CSS classes
	 */
	className?: string;
	/**
	 * When to show the error message
	 */
	when?: FieldErrorDisplayWhen;
}

/**
 * Form help text component props
 * Props for the FormHelpText component
 */
export interface FormHelpTextProps {
	/**
	 * Help text children content (for asChild pattern)
	 */
	children?: ReactNode;
	/**
	 * Whether to render as a different element using asChild
	 */
	asChild?: boolean;
	/**
	 * Additional CSS classes
	 */
	className?: string;
}
