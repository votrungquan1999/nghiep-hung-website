"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type {
	ServiceImageSelectionAction,
	ServiceImageSelectionState,
} from "./create-service-dialog.type";
import { ServiceImageSelectionActionType } from "./create-service-dialog.type";

const initialState: ServiceImageSelectionState = {
	selectedMainImageId: null,
};

/**
 * Reducer for managing service image selection state
 * @param state - Current state
 * @param action - Action to perform
 * @returns New state
 */
function serviceImageSelectionReducer(
	state: ServiceImageSelectionState,
	action: ServiceImageSelectionAction,
): ServiceImageSelectionState {
	switch (action.type) {
		case ServiceImageSelectionActionType.SetMainImage:
			return {
				...state,
				selectedMainImageId: action.payload,
			};
		case ServiceImageSelectionActionType.ClearSelection:
			return {
				...state,
				selectedMainImageId: null,
			};
		default:
			return state;
	}
}

const [
	ServiceImageSelectionProvider,
	useServiceImageSelectionState,
	useServiceImageSelectionDispatch,
] = createReducerContext(serviceImageSelectionReducer, initialState);

export {
	ServiceImageSelectionProvider,
	useServiceImageSelectionState,
	useServiceImageSelectionDispatch,
};
