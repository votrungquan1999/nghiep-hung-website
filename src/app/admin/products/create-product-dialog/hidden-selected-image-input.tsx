"use client";

import { useImageUploadFiles } from "src/components/image-upload/image-upload.state";
import { useProductImageSelectionState } from "./create-product-dialog.state";

/**
 * Hidden input component that stores the index of the selected main image
 * This component renders a hidden input field with the selected image index
 * for form submission purposes
 * @returns JSX element containing a hidden input or null if no image is selected
 */
export function HiddenSelectedImageInput() {
	const state = useProductImageSelectionState();
	const { files } = useImageUploadFiles();

	if (!state.selectedMainImageId || files.length === 0) {
		return null;
	}

	// Find the index of the selected image
	const selectedIndex = files.findIndex((file) => file.id === state.selectedMainImageId);

	if (selectedIndex === -1) {
		return null;
	}

	return <input type="hidden" name="selectedImageIndex" value={selectedIndex} />;
}
