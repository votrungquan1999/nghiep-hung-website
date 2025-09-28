/**
 * Types for image management dialog in edit project dialog
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

export interface ProjectImageManagementState {
	deletedImages: ExistingImage[];
	existingImages: ExistingImage[];
	newImages: NewImage[];
	mainImageId: string | null;
}

export enum ProjectImageManagementActionType {
	AddNewImages = "ADD_NEW_IMAGES",
	RemoveExistingImage = "REMOVE_EXISTING_IMAGE",
	RemoveNewImage = "REMOVE_NEW_IMAGE",
	SetMainImage = "SET_MAIN_IMAGE",
	Reset = "RESET",
}

export type ProjectImageManagementAction =
	| {
			type: ProjectImageManagementActionType.AddNewImages;
			payload: NewImage[];
	  }
	| {
			type: ProjectImageManagementActionType.RemoveExistingImage;
			payload: string;
	  }
	| {
			type: ProjectImageManagementActionType.RemoveNewImage;
			payload: string;
	  }
	| {
			type: ProjectImageManagementActionType.SetMainImage;
			payload: string | null;
	  }
	| {
			type: ProjectImageManagementActionType.Reset;
	  };
