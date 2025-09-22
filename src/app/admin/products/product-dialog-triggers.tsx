"use client";

import { Slot } from "@radix-ui/react-slot";
import { ImageIcon } from "lucide-react";
import { DropdownMenuItem } from "src/components/ui/dropdown-menu";
import { useProductRowActions } from "./product-row-context.state";

interface ProductDialogTriggerProps extends React.ComponentProps<typeof DropdownMenuItem> {
	asChild?: boolean;
}

/**
 * Client component trigger for opening the product preview dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param className - Additional CSS classes
 */
export function ProductPreviewTrigger({
	children,
	asChild = false,
	className,
}: ProductDialogTriggerProps) {
	const { openPreviewDialog } = useProductRowActions();

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
 * Client component trigger for opening the product edit dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param className - Additional CSS classes
 */
export function ProductEditTrigger({
	children,
	asChild = false,
	className,
}: ProductDialogTriggerProps) {
	const { openEditDialog } = useProductRowActions();

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
 * Client component trigger for opening the product image management dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param className - Additional CSS classes
 */
export function ProductImageTrigger({
	children,
	asChild = false,
	className,
}: ProductDialogTriggerProps) {
	const { openImageDialog } = useProductRowActions();

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
