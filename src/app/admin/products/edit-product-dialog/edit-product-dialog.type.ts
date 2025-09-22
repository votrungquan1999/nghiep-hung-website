/**
 * Product-related types and interfaces for edit product dialog
 * Contains only dialog-specific types
 */

export interface EditProductImageSelectionState {
	selectedMainImageId: string | null;
}

export enum EditProductImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
}

export type EditProductImageSelectionAction = {
	type: EditProductImageSelectionActionType.SetMainImage;
	payload: string | null;
};
