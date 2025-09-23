"use client";

import type { ImageUploadFile } from "src/components/image-upload/image-upload.type";
import { createReducerContext } from "src/contexts/createReducerContext";
import type {
	NewImage,
	ServiceImageManagementAction,
	ServiceImageManagementState,
} from "./image-management-dialog.type";
import { ServiceImageManagementActionType } from "./image-management-dialog.type";

const initialState: ServiceImageManagementState = {
	existingImages: [],
	newImages: [],
	deletedImages: [],
	mainImageId: null,
};

function serviceImageManagementReducer(
	state: ServiceImageManagementState,
	action: ServiceImageManagementAction,
): ServiceImageManagementState {
	switch (action.type) {
		case ServiceImageManagementActionType.AddNewImages:
			return {
				...state,
				newImages: [...state.newImages, ...action.payload],
			};
		case ServiceImageManagementActionType.RemoveExistingImage: {
			const imageToDelete = state.existingImages.find((img) => img.id === action.payload);
			return {
				...state,
				existingImages: state.existingImages.filter((image) => image.id !== action.payload),
				deletedImages: imageToDelete
					? [...state.deletedImages, imageToDelete]
					: state.deletedImages,
			};
		}
		case ServiceImageManagementActionType.RemoveNewImage:
			return {
				...state,
				newImages: state.newImages.filter((image) => image.id !== action.payload),
			};
		case ServiceImageManagementActionType.SetMainImage:
			return {
				...state,
				mainImageId: action.payload,
			};
		case ServiceImageManagementActionType.Reset:
			return initialState;
		default:
			return state;
	}
}

const [
	ServiceImageManagementProvider,
	useServiceImageManagementState,
	useServiceImageManagementDispatch,
] = createReducerContext(serviceImageManagementReducer, initialState);

export { ServiceImageManagementProvider };

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
	const state = useServiceImageManagementState();
	const dispatch = useServiceImageManagementDispatch();

	const removeExistingImage = (imageId: string) => {
		dispatch({ type: ServiceImageManagementActionType.RemoveExistingImage, payload: imageId });
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
	const state = useServiceImageManagementState();
	const dispatch = useServiceImageManagementDispatch();

	const addNewImagesFromUpload = (files: ImageUploadFile[]) => {
		const newImages = convertImageUploadFilesToNewImages(files);
		dispatch({ type: ServiceImageManagementActionType.AddNewImages, payload: newImages });
	};

	const removeNewImage = (imageId: string) => {
		dispatch({ type: ServiceImageManagementActionType.RemoveNewImage, payload: imageId });
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
	const state = useServiceImageManagementState();

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
	const state = useServiceImageManagementState();
	const dispatch = useServiceImageManagementDispatch();

	const setMainImage = (imageId: string | null) => {
		dispatch({ type: ServiceImageManagementActionType.SetMainImage, payload: imageId });
	};

	return {
		selectedMainImageId: state.mainImageId,
		setMainImage,
	};
}
