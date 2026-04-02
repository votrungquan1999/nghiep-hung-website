/**
 * Product filter types and interfaces
 */

/** Action types for product filter reducer */
export enum ProductFilterActionType {
	SetCategory = "SET_CATEGORY",
}

/** Product filter state */
export interface ProductFilterState {
	selectedCategory: string | null; // null = "All", "__other__" = uncategorized
}

/** Product filter actions */
export type ProductFilterAction = {
	type: ProductFilterActionType.SetCategory;
	payload: string | null;
};

/** Sentinel string used to represent the "Other" (uncategorized) bucket */
export const PRODUCT_OTHER_ID = "__other__";
