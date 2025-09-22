"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type {
	ServiceImageManagementAction,
	ServiceImageManagementState,
} from "./image-management-dialog.type";
import { ServiceImageManagementActionType } from "./image-management-dialog.type";

const initialState: ServiceImageManagementState = {
	selectedMainImageId: null,
};

/**
 * Reducer for managing service image management state
 * @param state - Current state
 * @param action - Action to perform
 * @returns New state
 */
function serviceImageManagementReducer(
	state: ServiceImageManagementState,
	action: ServiceImageManagementAction,
): ServiceImageManagementState {
	switch (action.type) {
		case ServiceImageManagementActionType.SetMainImage:
			return {
				...state,
				selectedMainImageId: action.payload,
			};
		case ServiceImageManagementActionType.ClearSelection:
			return {
				...state,
				selectedMainImageId: null,
			};
		default:
			return state;
	}
}

const [
	ServiceImageManagementProvider,
	useServiceImageManagementState,
	useServiceImageManagementDispatch,
] = createReducerContext(serviceImageManagementReducer, initialState);

export {
	ServiceImageManagementProvider,
	useServiceImageManagementState,
	useServiceImageManagementDispatch,
};
