/**
 * Types for image management dialog in edit service dialog
 * Handles both existing and newly uploaded images in a unified structure
 */

export interface NewImage {
	id: string;
	type: "new";
	url: string;
	name: string;
	file: File;
}

export interface ExistingImage {
	id: string;
	type: "existing";
	url: string;
	name: string;
}

export type UnifiedImage = NewImage | ExistingImage;

export interface ServiceImageManagementState {
	deletedImages: ExistingImage[];
	existingImages: ExistingImage[];
	newImages: NewImage[];
	mainImageId: string | null;
}

export enum ServiceImageManagementActionType {
	AddNewImages = "ADD_NEW_IMAGES",
	RemoveExistingImage = "REMOVE_EXISTING_IMAGE",
	RemoveNewImage = "REMOVE_NEW_IMAGE",
	SetMainImage = "SET_MAIN_IMAGE",
	Reset = "RESET",
}

export type ServiceImageManagementAction =
	| {
			type: ServiceImageManagementActionType.AddNewImages;
			payload: NewImage[];
	  }
	| {
			type: ServiceImageManagementActionType.RemoveExistingImage;
			payload: string;
	  }
	| {
			type: ServiceImageManagementActionType.RemoveNewImage;
			payload: string;
	  }
	| {
			type: ServiceImageManagementActionType.SetMainImage;
			payload: string | null;
	  }
	| {
			type: ServiceImageManagementActionType.Reset;
	  };
