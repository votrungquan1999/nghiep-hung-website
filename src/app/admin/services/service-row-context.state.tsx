"use client";

import { createReducerContext } from "src/contexts/createReducerContext";

export interface ServiceRowState {
	isPreviewDialogOpen: boolean;
	isEditDialogOpen: boolean;
	isImageDialogOpen: boolean;
}

export type ServiceRowAction =
	| { type: "OPEN_PREVIEW_DIALOG" }
	| { type: "CLOSE_PREVIEW_DIALOG" }
	| { type: "OPEN_EDIT_DIALOG" }
	| { type: "CLOSE_EDIT_DIALOG" }
	| { type: "OPEN_IMAGE_DIALOG" }
	| { type: "CLOSE_IMAGE_DIALOG" };

const initialState: ServiceRowState = {
	isPreviewDialogOpen: false,
	isEditDialogOpen: false,
	isImageDialogOpen: false,
};

/**
 * Reducer for managing service row state including dialog visibility
 * @param state - Current state
 * @param action - Action to perform
 * @returns New state
 */
function serviceRowReducer(state: ServiceRowState, action: ServiceRowAction): ServiceRowState {
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

const [ServiceRowProvider, useRawServiceRowState, useRawServiceRowDispatch] = createReducerContext(
	serviceRowReducer,
	initialState,
);

/**
 * Hook to access service row state with computed values
 * @returns Object containing dialog state and computed values
 */
export function useOpenPreviewDialog() {
	const state = useRawServiceRowState();
	return state.isPreviewDialogOpen;
}

/**
 * Hook to access edit dialog state
 * @returns Boolean indicating if edit dialog is open
 */
export function useOpenEditDialog() {
	const state = useRawServiceRowState();
	return state.isEditDialogOpen;
}

/**
 * Hook to access image dialog state
 * @returns Boolean indicating if image dialog is open
 */
export function useOpenImageDialog() {
	const state = useRawServiceRowState();
	return state.isImageDialogOpen;
}

/**
 * Hook to access service row actions
 * @returns Object containing action functions
 */
export function useServiceRowActions() {
	const dispatch = useRawServiceRowDispatch();
	return {
		openPreviewDialog: () => dispatch({ type: "OPEN_PREVIEW_DIALOG" }),
		closePreviewDialog: () => dispatch({ type: "CLOSE_PREVIEW_DIALOG" }),
		openEditDialog: () => dispatch({ type: "OPEN_EDIT_DIALOG" }),
		closeEditDialog: () => dispatch({ type: "CLOSE_EDIT_DIALOG" }),
		openImageDialog: () => dispatch({ type: "OPEN_IMAGE_DIALOG" }),
		closeImageDialog: () => dispatch({ type: "CLOSE_IMAGE_DIALOG" }),
	};
}

export { ServiceRowProvider };
