"use client";

import { Slot } from "@radix-ui/react-slot";
import { ImageIcon } from "lucide-react";
import { DropdownMenuItem } from "src/components/ui/dropdown-menu";
import { useProjectRowActions } from "./project-row-context.state";

interface ProjectDialogTriggerProps {
	children?: React.ReactNode;
	asChild?: boolean;
	className?: string;
}

/**
 * Client component trigger for opening the project preview dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param className - Additional CSS classes
 */
export function ProjectPreviewTrigger({
	children,
	asChild = false,
	className,
}: ProjectDialogTriggerProps) {
	const { openPreviewDialog } = useProjectRowActions();

	if (asChild) {
		return (
			<Slot className={className} onClick={openPreviewDialog}>
				{children}
			</Slot>
		);
	}

	return (
		<DropdownMenuItem
			onSelect={() => {
				// this is a workaround to prevent conflict between the dropdown menu and the dialog
				setTimeout(() => {
					openPreviewDialog();
				}, 0);
			}}
			className={className}
		>
			{children}
		</DropdownMenuItem>
	);
}

/**
 * Client component trigger for opening the project edit dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param className - Additional CSS classes
 */
export function ProjectEditTrigger({
	children,
	asChild = false,
	className,
}: ProjectDialogTriggerProps) {
	const { openEditDialog } = useProjectRowActions();

	if (asChild) {
		return (
			<Slot className={className} onClick={openEditDialog}>
				{children}
			</Slot>
		);
	}

	return (
		<DropdownMenuItem
			onSelect={() => {
				// this is a workaround to prevent conflict between the dropdown menu and the dialog
				setTimeout(() => {
					openEditDialog();
				}, 0);
			}}
			className={className}
		>
			{children}
		</DropdownMenuItem>
	);
}

/**
 * Client component trigger for opening the project image management dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param className - Additional CSS classes
 */
export function ProjectImageTrigger({
	children,
	asChild = false,
	className,
}: ProjectDialogTriggerProps) {
	const { openImageDialog } = useProjectRowActions();

	if (asChild) {
		return (
			<Slot className={className} onClick={openImageDialog}>
				{children}
			</Slot>
		);
	}

	return (
		<DropdownMenuItem
			onSelect={() => {
				// this is a workaround to prevent conflict between the dropdown menu and the dialog
				setTimeout(() => {
					openImageDialog();
				}, 0);
			}}
			className={className}
		>
			{children || (
				<>
					<ImageIcon className="size-4" />
					Manage Images
				</>
			)}
		</DropdownMenuItem>
	);
}
