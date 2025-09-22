"use client";

import { Dialog } from "src/components/ui/dialog";
import {
	useOpenEditDialog,
	useOpenImageDialog,
	useOpenPreviewDialog,
	useProductRowActions,
} from "./product-row-context.state";

interface ProductRowDialogProps {
	children: React.ReactNode;
	type: "preview" | "edit" | "image";
}

/**
 * Client component that renders children inside a controlled Dialog
 * Manages dialog open/close state using context
 * @param children - Server components to render inside the dialog
 * @param type - Type of dialog (preview, edit, or image)
 */
export function ProductRowDialog({ children, type }: ProductRowDialogProps) {
	const isPreviewDialogOpen = useOpenPreviewDialog();
	const isEditDialogOpen = useOpenEditDialog();
	const isImageDialogOpen = useOpenImageDialog();
	const {
		openPreviewDialog,
		closePreviewDialog,
		openEditDialog,
		closeEditDialog,
		openImageDialog,
		closeImageDialog,
	} = useProductRowActions();

	const isOpen =
		type === "preview"
			? isPreviewDialogOpen
			: type === "edit"
				? isEditDialogOpen
				: isImageDialogOpen;

	const handleOpenChange = (open: boolean) => {
		if (type === "preview") {
			if (open) {
				openPreviewDialog();
			} else {
				closePreviewDialog();
			}
		} else if (type === "edit") {
			if (open) {
				openEditDialog();
			} else {
				closeEditDialog();
			}
		} else {
			if (open) {
				openImageDialog();
			} else {
				closeImageDialog();
			}
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			{children}
		</Dialog>
	);
}
