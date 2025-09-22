/**
 * Types for image management dialog in edit product dialog
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

export interface ImageManagementState {
	deletedImages: ExistingImage[];
	existingImages: ExistingImage[];
	newImages: NewImage[];
	mainImageId: string | null;
}

export enum ImageManagementActionType {
	AddNewImages = "ADD_NEW_IMAGES",
	RemoveExistingImage = "REMOVE_EXISTING_IMAGE",
	RemoveNewImage = "REMOVE_NEW_IMAGE",
	SetMainImage = "SET_MAIN_IMAGE",
	Reset = "RESET",
}

export type ImageManagementAction =
	| {
			type: ImageManagementActionType.AddNewImages;
			payload: NewImage[];
	  }
	| {
			type: ImageManagementActionType.RemoveExistingImage;
			payload: string;
	  }
	| {
			type: ImageManagementActionType.RemoveNewImage;
			payload: string;
	  }
	| {
			type: ImageManagementActionType.SetMainImage;
			payload: string | null;
	  }
	| {
			type: ImageManagementActionType.Reset;
	  };
