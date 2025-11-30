"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import {
	type ProjectFilterAction,
	ProjectFilterActionType,
	type ProjectFilterState,
} from "./project-filter.type";

const initialState: ProjectFilterState = {
	selectedCategory: null, // null means "All"
};

/**
 * Reducer for project filter state
 * @param state - Current filter state
 * @param action - Action to process
 * @returns Updated filter state
 */
function projectFilterReducer(
	state: ProjectFilterState,
	action: ProjectFilterAction,
): ProjectFilterState {
	switch (action.type) {
		case ProjectFilterActionType.SetCategory:
			return { ...state, selectedCategory: action.payload };
		default:
			return state;
	}
}

const [ProjectFilterProvider, useRawFilterState, useRawFilterDispatch] = createReducerContext(
	projectFilterReducer,
	initialState,
);

/**
 * Hook to access current filter state
 * @returns Object containing filter state information
 */
export function useProjectFilterState() {
	const rawState = useRawFilterState();
	return {
		selectedCategory: rawState.selectedCategory,
		isAllSelected: rawState.selectedCategory === null,
	};
}

/**
 * Hook to access filter actions
 * @returns Object containing filter action methods
 */
export function useProjectFilterActions() {
	const dispatch = useRawFilterDispatch();
	return {
		selectCategory: (category: string | null) =>
			dispatch({ type: ProjectFilterActionType.SetCategory, payload: category }),
		selectAll: () => dispatch({ type: ProjectFilterActionType.SetCategory, payload: null }),
	};
}

export { ProjectFilterProvider };
