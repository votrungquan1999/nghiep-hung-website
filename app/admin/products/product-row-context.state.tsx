"use client";

import { createReducerContext } from "@/contexts/createReducerContext";

export interface ProductRowState {
	isPreviewDialogOpen: boolean;
	isEditDialogOpen: boolean;
	isImageDialogOpen: boolean;
}

export type ProductRowAction =
	| { type: "OPEN_PREVIEW_DIALOG" }
	| { type: "CLOSE_PREVIEW_DIALOG" }
	| { type: "OPEN_EDIT_DIALOG" }
	| { type: "CLOSE_EDIT_DIALOG" }
	| { type: "OPEN_IMAGE_DIALOG" }
	| { type: "CLOSE_IMAGE_DIALOG" };

const initialState: ProductRowState = {
	isPreviewDialogOpen: false,
	isEditDialogOpen: false,
	isImageDialogOpen: false,
};

/**
 * Reducer for managing product row state including dialog visibility
 * @param state - Current state
 * @param action - Action to perform
 * @returns New state
 */
function productRowReducer(state: ProductRowState, action: ProductRowAction): ProductRowState {
	switch (action.type) {
		case "OPEN_PREVIEW_DIALOG":
			return {
				...state,
				isPreviewDialogOpen: true,
				isEditDialogOpen: false,
				isImageDialogOpen: false,
			};
		case "CLOSE_PREVIEW_DIALOG":
			return {
				...state,
				isPreviewDialogOpen: false,
			};
		case "OPEN_EDIT_DIALOG":
			return {
				...state,
				isPreviewDialogOpen: false,
				isEditDialogOpen: true,
				isImageDialogOpen: false,
			};
		case "CLOSE_EDIT_DIALOG":
			return {
				...state,
				isEditDialogOpen: false,
			};
		case "OPEN_IMAGE_DIALOG":
			return {
				...state,
				isPreviewDialogOpen: false,
				isEditDialogOpen: false,
				isImageDialogOpen: true,
			};
		case "CLOSE_IMAGE_DIALOG":
			return {
				...state,
				isImageDialogOpen: false,
			};
		default:
			return state;
	}
}

const [ProductRowProvider, useRawProductRowState, useRawProductRowDispatch] = createReducerContext(
	productRowReducer,
	initialState,
);

/**
 * Hook to access product row state with computed values
 * @returns Object containing dialog state and computed values
 */
export function useOpenPreviewDialog() {
	const state = useRawProductRowState();
	return state.isPreviewDialogOpen;
}

/**
 * Hook to access edit dialog state
 * @returns Boolean indicating if edit dialog is open
 */
export function useOpenEditDialog() {
	const state = useRawProductRowState();
	return state.isEditDialogOpen;
}

/**
 * Hook to access image dialog state
 * @returns Boolean indicating if image dialog is open
 */
export function useOpenImageDialog() {
	const state = useRawProductRowState();
	return state.isImageDialogOpen;
}

/**
 * Hook to access product row actions
 * @returns Object containing action functions
 */
export function useProductRowActions() {
	const dispatch = useRawProductRowDispatch();
	return {
		openPreviewDialog: () => dispatch({ type: "OPEN_PREVIEW_DIALOG" }),
		closePreviewDialog: () => dispatch({ type: "CLOSE_PREVIEW_DIALOG" }),
		openEditDialog: () => dispatch({ type: "OPEN_EDIT_DIALOG" }),
		closeEditDialog: () => dispatch({ type: "CLOSE_EDIT_DIALOG" }),
		openImageDialog: () => dispatch({ type: "OPEN_IMAGE_DIALOG" }),
		closeImageDialog: () => dispatch({ type: "CLOSE_IMAGE_DIALOG" }),
	};
}

export { ProductRowProvider };
