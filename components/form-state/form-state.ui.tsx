"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormProvider, useForm, useFormActions } from "./form-state.state";
import type { FormProps } from "./form-state.type";
import { FormActionType } from "./form-state.type";

/**
 * Form submission handler component
 * Manages form submission state and error handling
 */
function FormSubmissionHandler({ action, children }: Pick<FormProps, "action" | "children">) {
	const dispatch = useFormActions();
	const router = useRouter();
	/**
	 * Handle form submission with state management
	 * @param formData - Form data from the form submission
	 */
	async function handleSubmit(formData: FormData) {
		dispatch({ type: FormActionType.SetSubmitting, payload: true });
		dispatch({ type: FormActionType.SetError, payload: null });
		dispatch({ type: FormActionType.SetHasSubmitted, payload: true });

		startTransition(async () => {
			try {
				const result = await action(formData);

				if (result.success) {
					if ("redirect" in result) {
						router.push(result.redirect);
						return;
					}

					if ("refresh" in result) {
						router.refresh();
						return;
					}

					// Success - let the action handle any redirects or success logic
				} else {
					const errorMessage = result.error || "An unexpected error occurred";
					dispatch({ type: FormActionType.SetError, payload: errorMessage });
				}
			} catch (err) {
				const errorMessage = "An unexpected error occurred";
				dispatch({ type: FormActionType.SetError, payload: errorMessage });
				console.error("Form submission error:", err);
			} finally {
				dispatch({ type: FormActionType.SetSubmitting, payload: false });
			}
		});
	}

	return (
		<form action={handleSubmit} className="space-y-6">
			{children}
		</form>
	);
}

/**
 * Form component with state management
 * Provides FormProvider and injects action into context
 */
export function Form({ action, children }: FormProps) {
	return (
		<FormProvider>
			<FormSubmissionHandler action={action}>{children}</FormSubmissionHandler>
		</FormProvider>
	);
}

/**
 * Form error display component
 * Shows error messages when form submission fails
 */
export function FormErrorDisplay({ className }: { className?: string }) {
	const { error } = useForm();

	if (!error) return null;

	return (
		<div
			className={cn(
				"flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20",
				className,
			)}
		>
			<AlertCircle className="size-4 flex-shrink-0" />
			<span className="text-sm">{error}</span>
		</div>
	);
}

/**
 * Form submit message component
 * Shows submit button text with loading state
 */
export function FormSubmitMessage({ children }: { children: React.ReactNode }) {
	const { isSubmitting } = useForm();

	if (isSubmitting) {
		return null;
	}

	return children;
}

/**
 * Form pending message component
 * Shows pending/loading message
 */
export function FormPendingMessage({ children }: { children: React.ReactNode }) {
	const { isSubmitting } = useForm();

	if (!isSubmitting) return null;

	return children;
}

/**
 * Form reset button component
 * Resets form state to initial values
 */
export function FormResetButton({
	children,
	className,
	...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
	const dispatch = useFormActions();

	const handleReset = () => {
		dispatch({ type: FormActionType.Reset });
	};

	return (
		<Button type="button" variant="outline" onClick={handleReset} className={className} {...props}>
			{children}
		</Button>
	);
}
