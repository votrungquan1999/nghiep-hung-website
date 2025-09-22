/**
 * Service-related types and interfaces for create service dialog
 * Contains only dialog-specific types
 */

export interface ServiceImageSelectionState {
	selectedMainImageId: string | null;
}

export enum ServiceImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
	ClearSelection = "CLEAR_SELECTION",
}

export type ServiceImageSelectionAction =
	| { type: ServiceImageSelectionActionType.SetMainImage; payload: string }
	| { type: ServiceImageSelectionActionType.ClearSelection };
