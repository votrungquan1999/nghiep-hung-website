"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import {
	type ProductFilterAction,
	ProductFilterActionType,
	type ProductFilterState,
} from "./product-filter.type";

const initialState: ProductFilterState = {
	selectedCategory: null, // null means "All"
};

function productFilterReducer(
	state: ProductFilterState,
	action: ProductFilterAction,
): ProductFilterState {
	switch (action.type) {
		case ProductFilterActionType.SetCategory:
			return { ...state, selectedCategory: action.payload };
		default:
			return state;
	}
}

const [ProductFilterProvider, useRawFilterState, useRawFilterDispatch] = createReducerContext(
	productFilterReducer,
	initialState,
);

export function useProductFilterState() {
	const rawState = useRawFilterState();
	return {
		selectedCategory: rawState.selectedCategory,
		isAllSelected: rawState.selectedCategory === null,
	};
}

export function useProductFilterActions() {
	const dispatch = useRawFilterDispatch();
	return {
		selectCategory: (category: string | null) =>
			dispatch({ type: ProductFilterActionType.SetCategory, payload: category }),
		selectAll: () => dispatch({ type: ProductFilterActionType.SetCategory, payload: null }),
	};
}

export { ProductFilterProvider };
