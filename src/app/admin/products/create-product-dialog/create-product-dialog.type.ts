/**
 * Product-related types and interfaces for create product dialog
 * Contains only dialog-specific types
 */

export interface ProductImageSelectionState {
	selectedMainImageId: string | null;
}

export enum ProductImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
}

export type ProductImageSelectionAction = {
	type: ProductImageSelectionActionType.SetMainImage;
	payload: string | null;
};
