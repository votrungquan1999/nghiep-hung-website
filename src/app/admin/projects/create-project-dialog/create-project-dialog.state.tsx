"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type {
	ProjectFormAction,
	ProjectFormState,
	ProjectSpec,
} from "./create-project-dialog.type";
import { ProjectFormActionType } from "./create-project-dialog.type";

const initialState: ProjectFormState = {
	selectedMainImageId: null,
	specs: [], // Start with no specs - user can add them if needed
};

/**
 * Generates a unique ID for new specs
 * Uses timestamp and random number for uniqueness
 * @returns Unique string identifier for a spec
 */
function generateSpecId(): string {
	return `spec-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Reducer function for managing project form state
 * Handles adding/removing specs by ID, updating spec values, and setting main image
 * @param state - Current project form state
 * @param action - Action to apply to the state
 * @returns New state after applying the action
 */
function projectFormReducer(state: ProjectFormState, action: ProjectFormAction): ProjectFormState {
	switch (action.type) {
		case ProjectFormActionType.SetMainImage:
			return {
				...state,
				selectedMainImageId: action.payload,
			};
		case ProjectFormActionType.AddSpec: {
			const newSpecId = generateSpecId();
			const newSpec: ProjectSpec = { id: newSpecId, en: "", vi: "" };
			return {
				...state,
				specs: [...state.specs, newSpec],
			};
		}
		case ProjectFormActionType.RemoveSpec: {
			return {
				...state,
				specs: state.specs.filter((spec) => spec.id !== action.payload),
			};
		}
		case ProjectFormActionType.UpdateSpec: {
			return {
				...state,
				specs: state.specs.map((spec) =>
					spec.id === action.payload.id
						? { ...spec, [action.payload.language]: action.payload.value }
						: spec,
				),
			};
		}
		default:
			return state;
	}
}

const [ProjectFormProviderBase, useRawProjectFormState, useRawProjectFormDispatch] =
	createReducerContext(projectFormReducer, initialState);

// Transform raw hooks into domain-specific hooks following rules

/**
 * Hook to manage project specifications
 * Provides specs data and actions for adding, removing, and updating specs
 * @returns Object containing specs state and spec management actions
 */
export function useCreateProjectSpecs() {
	const state = useRawProjectFormState();
	const dispatch = useRawProjectFormDispatch();

	return {
		// Specs state
		specs: state.specs,
		specsCount: state.specs.length,
		hasSpecs: state.specs.length > 0,

		// Specs actions
		addSpec: () => dispatch({ type: ProjectFormActionType.AddSpec }),
		removeSpec: (specId: string) =>
			dispatch({ type: ProjectFormActionType.RemoveSpec, payload: specId }),
		updateSpec: (specId: string, language: "en" | "vi", value: string) =>
			dispatch({
				type: ProjectFormActionType.UpdateSpec,
				payload: { id: specId, language, value },
			}),
	};
}

/**
 * Hook to manage main image selection
 * Provides selected image state and action for setting main image
 * @returns Object containing main image state and selection action
 */
export function useCreateProjectMainImage() {
	const state = useRawProjectFormState();
	const dispatch = useRawProjectFormDispatch();

	return {
		// Main image state
		selectedMainImageId: state.selectedMainImageId,
		hasSelectedImage: state.selectedMainImageId !== null,

		// Main image actions
		setMainImage: (imageId: string | null) =>
			dispatch({ type: ProjectFormActionType.SetMainImage, payload: imageId }),
		clearMainImage: () => dispatch({ type: ProjectFormActionType.SetMainImage, payload: null }),
	};
}

export { ProjectFormProviderBase as ProjectFormProvider };
