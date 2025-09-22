"use client";

import { useServiceImageSelectionState } from "./create-service-dialog.state";

/**
 * Hidden input that tracks the selected main image index
 * This component must be inside ImageUploadRoot to access the files context
 */
export function HiddenSelectedImageInput() {
	const state = useServiceImageSelectionState();

	return <input type="hidden" name="selectedImageIndex" value={state.selectedMainImageId || ""} />;
}
