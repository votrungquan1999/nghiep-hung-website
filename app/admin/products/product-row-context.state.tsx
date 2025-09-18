"use client";

import { Dialog } from "@/components/ui/dialog";
import { createReducerContext } from "@/contexts/createReducerContext";

export interface ProductRowState {
	isPreviewDialogOpen: boolean;
}

export type ProductRowAction = { type: "OPEN_PREVIEW_DIALOG" } | { type: "CLOSE_PREVIEW_DIALOG" };

const initialState: ProductRowState = {
	isPreviewDialogOpen: false,
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
			};
		case "CLOSE_PREVIEW_DIALOG":
			return {
				...state,
				isPreviewDialogOpen: false,
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
 * Hook to access product row actions
 * @returns Object containing action functions
 */
export function useProductRowActions() {
	const dispatch = useRawProductRowDispatch();
	return {
		openPreviewDialog: () => dispatch({ type: "OPEN_PREVIEW_DIALOG" }),
		closePreviewDialog: () => dispatch({ type: "CLOSE_PREVIEW_DIALOG" }),
	};
}

export { ProductRowProvider };

interface ProductRowDialogProps {
	children: React.ReactNode;
}

/**
 * Client component that renders children inside a controlled Dialog
 * Manages dialog open/close state using context
 * @param children - Server components to render inside the dialog
 */
export function ProductRowDialog({ children }: ProductRowDialogProps) {
	const isPreviewDialogOpen = useOpenPreviewDialog();
	const { openPreviewDialog, closePreviewDialog } = useProductRowActions();

	const handleOpenChange = (open: boolean) => {
		if (open) {
			openPreviewDialog();
		} else {
			closePreviewDialog();
		}
	};

	return (
		<Dialog open={isPreviewDialogOpen} onOpenChange={handleOpenChange}>
			{children}
		</Dialog>
	);
}
