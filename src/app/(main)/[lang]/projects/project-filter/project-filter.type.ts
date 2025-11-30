/**
 * Project filter types and interfaces
 */

/**
 * Action types for project filter reducer
 */
export enum ProjectFilterActionType {
	SetCategory = "SET_CATEGORY",
}

/**
 * Project filter state interface
 */
export interface ProjectFilterState {
	selectedCategory: string | null; // null means "All"
}

/**
 * Project filter action types
 */
export type ProjectFilterAction = {
	type: ProjectFilterActionType.SetCategory;
	payload: string | null;
};
