"use client";

import { createReducerContext } from "src/contexts/createReducerContext";

export interface ProjectRowState {
	isPreviewDialogOpen: boolean;
	isEditDialogOpen: boolean;
	isImageDialogOpen: boolean;
}

export type ProjectRowAction =
	| { type: "OPEN_PREVIEW_DIALOG" }
	| { type: "CLOSE_PREVIEW_DIALOG" }
	| { type: "OPEN_EDIT_DIALOG" }
	| { type: "CLOSE_EDIT_DIALOG" }
	| { type: "OPEN_IMAGE_DIALOG" }
	| { type: "CLOSE_IMAGE_DIALOG" };

const initialState: ProjectRowState = {
	isPreviewDialogOpen: false,
	isEditDialogOpen: false,
	isImageDialogOpen: false,
};

/**
 * Reducer for managing project row state including dialog visibility
 * @param state - Current state
 * @param action - Action to perform
 * @returns New state
 */
function projectRowReducer(state: ProjectRowState, action: ProjectRowAction): ProjectRowState {
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

const [ProjectRowProvider, useRawProjectRowState, useRawProjectRowDispatch] = createReducerContext(
	projectRowReducer,
	initialState,
);

// Transform raw hooks into domain-specific hooks following rules

/**
 * Hook to check if preview dialog is open
 * @returns Boolean indicating if preview dialog is open
 */
export function useOpenPreviewDialog() {
	const state = useRawProjectRowState();
	return state.isPreviewDialogOpen;
}

/**
 * Hook to check if edit dialog is open
 * @returns Boolean indicating if edit dialog is open
 */
export function useOpenEditDialog() {
	const state = useRawProjectRowState();
	return state.isEditDialogOpen;
}

/**
 * Hook to check if image dialog is open
 * @returns Boolean indicating if image dialog is open
 */
export function useOpenImageDialog() {
	const state = useRawProjectRowState();
	return state.isImageDialogOpen;
}

/**
 * Hook to get project row actions for dialog management
 * @returns Object containing dialog management actions
 */
export function useProjectRowActions() {
	const dispatch = useRawProjectRowDispatch();

	return {
		openPreviewDialog: () => dispatch({ type: "OPEN_PREVIEW_DIALOG" }),
		closePreviewDialog: () => dispatch({ type: "CLOSE_PREVIEW_DIALOG" }),
		openEditDialog: () => dispatch({ type: "OPEN_EDIT_DIALOG" }),
		closeEditDialog: () => dispatch({ type: "CLOSE_EDIT_DIALOG" }),
		openImageDialog: () => dispatch({ type: "OPEN_IMAGE_DIALOG" }),
		closeImageDialog: () => dispatch({ type: "CLOSE_IMAGE_DIALOG" }),
	};
}

export { ProjectRowProvider };
