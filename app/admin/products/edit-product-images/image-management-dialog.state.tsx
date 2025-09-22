"use client";

import type { ImageUploadFile } from "@/components/image-upload/image-upload.type";
import { createReducerContext } from "@/contexts/createReducerContext";
import type {
	ImageManagementAction,
	ImageManagementState,
	NewImage,
} from "./image-management-dialog.type";
import { ImageManagementActionType } from "./image-management-dialog.type";

const initialState: ImageManagementState = {
	existingImages: [],
	newImages: [],
	deletedImages: [],
	mainImageId: null,
};

function imageManagementReducer(
	state: ImageManagementState,
	action: ImageManagementAction,
): ImageManagementState {
	switch (action.type) {
		case ImageManagementActionType.AddNewImages:
			return {
				...state,
				newImages: [...state.newImages, ...action.payload],
			};
		case ImageManagementActionType.RemoveExistingImage: {
			const imageToDelete = state.existingImages.find((img) => img.id === action.payload);
			return {
				...state,
				existingImages: state.existingImages.filter((image) => image.id !== action.payload),
				deletedImages: imageToDelete
					? [...state.deletedImages, imageToDelete]
					: state.deletedImages,
			};
		}
		case ImageManagementActionType.RemoveNewImage:
			return {
				...state,
				newImages: state.newImages.filter((image) => image.id !== action.payload),
			};
		case ImageManagementActionType.SetMainImage:
			return {
				...state,
				mainImageId: action.payload,
			};
		case ImageManagementActionType.Reset:
			return initialState;
		default:
			return state;
	}
}

const [ImageManagementProvider, useImageManagementState, useImageManagementDispatch] =
	createReducerContext(imageManagementReducer, initialState);

export { ImageManagementProvider };

/**
 * Converts ImageUpload files to NewImage format
 * @param files - Array of ImageUploadFile objects
 * @returns Array of NewImage objects
 */
function convertImageUploadFilesToNewImages(files: ImageUploadFile[]): NewImage[] {
	return files.map((file) => ({
		id: file.id,
		type: "new" as const,
		url: file.preview,
		name: file.name,
		file: file.file,
	}));
}

/**
 * Hook for managing existing images
 * Handles setting, removing, and tracking deleted existing images
 * @returns Object containing existing images and related functions
 */
export function useExistingImages() {
	const state = useImageManagementState();
	const dispatch = useImageManagementDispatch();

	const removeExistingImage = (imageId: string) => {
		dispatch({ type: ImageManagementActionType.RemoveExistingImage, payload: imageId });
	};

	return {
		existingImages: state.existingImages,
		deletedImages: state.deletedImages,
		removeExistingImage,
	};
}

/**
 * Hook for managing new images
 * Handles adding and removing newly uploaded images
 * @returns Object containing new images and related functions
 */
export function useNewImages() {
	const state = useImageManagementState();
	const dispatch = useImageManagementDispatch();

	const addNewImagesFromUpload = (files: ImageUploadFile[]) => {
		const newImages = convertImageUploadFilesToNewImages(files);
		dispatch({ type: ImageManagementActionType.AddNewImages, payload: newImages });
	};

	const removeNewImage = (imageId: string) => {
		dispatch({ type: ImageManagementActionType.RemoveNewImage, payload: imageId });
	};

	return {
		newImages: state.newImages,
		addNewImagesFromUpload,
		removeNewImage,
	};
}

/**
 * Hook for unified image display
 * Combines existing and new images for display purposes
 * @returns Object containing unified images array
 */
export function useUnifiedImages() {
	const state = useImageManagementState();

	// Compute the images to display from the state
	const images = [...state.existingImages, ...state.newImages];

	return {
		images,
	};
}

/**
 * Hook for managing main image selection
 * @returns Object containing main image selection state and functions
 */
export function useMainImageSelection() {
	const state = useImageManagementState();
	const dispatch = useImageManagementDispatch();

	const setMainImage = (imageId: string | null) => {
		dispatch({ type: ImageManagementActionType.SetMainImage, payload: imageId });
	};

	return {
		selectedMainImageId: state.mainImageId,
		setMainImage,
	};
}
