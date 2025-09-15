"use client"

import { createReducerContext } from "@/contexts/createReducerContext"

interface ProductImageSelectionState {
	selectedMainImageId: string | null
}

enum ProductImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
	Reset = "RESET",
}

type ProductImageSelectionAction =
	| { type: ProductImageSelectionActionType.SetMainImage; payload: string | null }
	| { type: ProductImageSelectionActionType.Reset }

const initialState: ProductImageSelectionState = {
	selectedMainImageId: null,
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
}

export { ProductImageSelectionActionType }
