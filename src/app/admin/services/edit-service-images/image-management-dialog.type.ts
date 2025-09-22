/**
 * Service image management dialog types
 * Contains types for managing service images
 */

export interface ServiceImageManagementState {
	selectedMainImageId: string | null;
}

export enum ServiceImageManagementActionType {
	SetMainImage = "SET_MAIN_IMAGE",
	ClearSelection = "CLEAR_SELECTION",
}

export type ServiceImageManagementAction =
	| { type: ServiceImageManagementActionType.SetMainImage; payload: string }
	| { type: ServiceImageManagementActionType.ClearSelection };
