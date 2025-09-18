"use client";

import { Slot } from "@radix-ui/react-slot";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useProductRowActions } from "./product-row-context.state";

interface ProductPreviewTriggerProps extends React.ComponentProps<typeof DropdownMenuItem> {
	asChild?: boolean;
}

/**
 * Client component trigger for opening the product preview dialog
 * Can be used as a wrapper around any element to make it trigger the dialog
 * @param children - The element to wrap
 * @param asChild - Whether to use Slot for composition
 * @param onClick - Optional additional click handler
 */
export function ProductPreviewTrigger({
	children,
	asChild = false,
	className,
}: ProductPreviewTriggerProps) {
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
