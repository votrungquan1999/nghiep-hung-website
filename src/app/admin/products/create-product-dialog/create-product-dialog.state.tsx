"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type {
	ProductImageSelectionAction,
	ProductImageSelectionState,
} from "./create-product-dialog.type";
import { ProductImageSelectionActionType } from "./create-product-dialog.type";

const initialState: ProductImageSelectionState = {
	selectedMainImageId: null,
};

function productImageSelectionReducer(
	state: ProductImageSelectionState,
	action: ProductImageSelectionAction,
): ProductImageSelectionState {
	switch (action.type) {
		case ProductImageSelectionActionType.SetMainImage:
			return {
				...state,
				selectedMainImageId: action.payload,
			};
		default:
			return state;
	}
}

const [
	ProductImageSelectionProvider,
	useProductImageSelectionState,
	useProductImageSelectionDispatch,
] = createReducerContext(productImageSelectionReducer, initialState);

export {
	ProductImageSelectionProvider,
	useProductImageSelectionState,
	useProductImageSelectionDispatch,
	ProductImageSelectionActionType,
};
