"use client"

import { createReducerContext } from "@/contexts/createReducerContext"
import type {
	ProductImageSelectionAction,
	ProductImageSelectionState,
} from "./create-product-dialog.type"
import { ProductImageSelectionActionType } from "./create-product-dialog.type"

const initialState: ProductImageSelectionState = {
	selectedMainImageId: null,
	isSubmitting: false,
	error: null,
}

function productImageSelectionReducer(
	state: ProductImageSelectionState,
	action: ProductImageSelectionAction,
): ProductImageSelectionState {
	switch (action.type) {
		case ProductImageSelectionActionType.SetMainImage:
			return {
				...state,
				selectedMainImageId: action.payload,
			}
		case ProductImageSelectionActionType.SetSubmitting:
			return {
				...state,
				isSubmitting: action.payload,
			}
		case ProductImageSelectionActionType.SetError:
			return {
				...state,
				error: action.payload,
			}
		case ProductImageSelectionActionType.Reset:
			return initialState
		default:
			return state
	}
}

const [
	ProductImageSelectionProvider,
	useProductImageSelectionState,
	useProductImageSelectionDispatch,
] = createReducerContext(productImageSelectionReducer, initialState)

export {
	ProductImageSelectionProvider,
	useProductImageSelectionState,
	useProductImageSelectionDispatch,
	ProductImageSelectionActionType,
}
