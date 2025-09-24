"use client";

import { Slot } from "@radix-ui/react-slot";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useRef } from "react";
import { Button } from "src/components/ui/button";
import { Dialog } from "src/components/ui/dialog";
import { cn } from "src/lib/utils";
import {
	FormProvider,
	useConfirmDialogActions,
	useConfirmDialogOpen,
	useForm,
	useFormActions,
	useFormRef,
	useResetFormBoundary,
} from "./form-state.state";
import type { FormProps } from "./form-state.type";
import { FormActionType } from "./form-state.type";

/**
 * Form submission handler component
 * Manages form submission state and error handling
 */
function FormSubmissionHandler({ action, children, confirmBeforeSubmit }: FormProps) {
	const dispatch = useFormActions();
	const router = useRouter();
	const resetFormBoundary = useResetFormBoundary();
	const { openConfirmDialog } = useConfirmDialogActions();
	const isConfirmDialogOpen = useConfirmDialogOpen();
	const formRef = useFormRef();

	/**
	 * Handle form submission with state management
	 * @param event - Form submission event
	 */
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// If confirm before submit is enabled, open dialog instead of submitting
		// however, if confirm before submit is enabled and the dialog is open, then actually submit the form, since it means the user has confirmed the submission
		if (confirmBeforeSubmit && !isConfirmDialogOpen) {
			openConfirmDialog();
			return;
		}

		// Start submission - this automatically resets error state
		dispatch({ type: FormActionType.StartSubmitting });

		// Create FormData from the form
		const formData = new FormData(event.currentTarget);

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
						resetFormBoundary();
						return;
					}

					// Success - let the action handle any redirects or success logic
				} else {
					const errorMessage = result.error || "An unexpected error occurred";
					startTransition(() => {
						dispatch({ type: FormActionType.SetError, payload: errorMessage });
					});
				}
			} catch (err) {
				const errorMessage = "An unexpected error occurred";
				startTransition(() => {
					dispatch({ type: FormActionType.SetError, payload: errorMessage });
				});
				console.error("Form submission error:", err);
			} finally {
				// Finish submission
				startTransition(() => {
					dispatch({ type: FormActionType.FinishSubmitting });
				});
			}
		});
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
			{children}
		</form>
	);
}

/**
 * Form component with state management
 * Provides FormProvider and injects action into context
 */
export function Form({ action, children, confirmBeforeSubmit }: FormProps) {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<FormProvider formRef={formRef}>
			<FormSubmissionHandler action={action} confirmBeforeSubmit={confirmBeforeSubmit}>
				{children}
			</FormSubmissionHandler>
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

export function SubmitButton({
	children,
	asChild = false,
	...props
}: Omit<React.ComponentProps<"button">, "onClick"> & { asChild?: boolean }) {
	const formRef = useFormRef();

	const handleClick = () => {
		if (formRef?.current) {
			formRef.current.requestSubmit();
		}
	};

	const Comp = asChild ? Slot : "button";

	return (
		<Comp onSelect={handleClick} onClick={handleClick} {...props}>
			{children}
		</Comp>
	);
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

/**
 * Confirm dialog component for server components
 * Renders children inside a controlled dialog
 */
export function ConfirmDialog({ children }: { children: React.ReactNode }) {
	const isOpen = useConfirmDialogOpen();
	const { closeConfirmDialog, openConfirmDialog } = useConfirmDialogActions();

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			closeConfirmDialog();
			return;
		}

		openConfirmDialog();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			{children}
		</Dialog>
	);
}

/**
 * Confirm button component
 * Renders the confirm button that triggers form submission
 */
export function ConfirmButton({
	children,
	className,
	...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
	// const { closeConfirmDialog } = useConfirmDialogActions();
	const formRef = useFormRef();

	const handleClick = () => {
		// closeConfirmDialog();
		if (formRef?.current) {
			formRef.current.requestSubmit();
		}
	};

	return (
		<Button onClick={handleClick} className={className} {...props}>
			{children || "Confirm"}
		</Button>
	);
}

/**
 * Cancel button component
 * Renders the cancel button that closes the dialog
 */
export function CancelButton({
	children,
	className,
	...props
}: Omit<React.ComponentProps<typeof Button>, "onClick">) {
	const { closeConfirmDialog } = useConfirmDialogActions();

	const handleClick = () => {
		closeConfirmDialog();
	};

	return (
		<Button variant="outline" onClick={handleClick} className={className} {...props}>
			{children || "Cancel"}
		</Button>
	);
}
