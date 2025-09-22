/**
 * Service-related types and interfaces for edit service dialog
 * Contains only dialog-specific types
 */

export interface EditServiceImageSelectionState {
	selectedMainImageId: string | null;
}

export enum EditServiceImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
}

export type EditServiceImageSelectionAction = {
	type: EditServiceImageSelectionActionType.SetMainImage;
	payload: string | null;
};
