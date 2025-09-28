"use client";

import type { ImageUploadFile } from "src/components/image-upload/image-upload.type";
import { createReducerContext } from "src/contexts/createReducerContext";
import type {
	NewImage,
	ProjectImageManagementAction,
	ProjectImageManagementState,
} from "./image-management-dialog.type";
import { ProjectImageManagementActionType } from "./image-management-dialog.type";

const initialState: ProjectImageManagementState = {
	existingImages: [],
	newImages: [],
	deletedImages: [],
	mainImageId: null,
};

function projectImageManagementReducer(
	state: ProjectImageManagementState,
	action: ProjectImageManagementAction,
): ProjectImageManagementState {
	switch (action.type) {
		case ProjectImageManagementActionType.AddNewImages:
			return {
				...state,
				newImages: [...state.newImages, ...action.payload],
			};
		case ProjectImageManagementActionType.RemoveExistingImage: {
			const imageToDelete = state.existingImages.find((img) => img.id === action.payload);
			return {
				...state,
				existingImages: state.existingImages.filter((image) => image.id !== action.payload),
				deletedImages: imageToDelete
					? [...state.deletedImages, imageToDelete]
					: state.deletedImages,
			};
		}
		case ProjectImageManagementActionType.RemoveNewImage:
			return {
				...state,
				newImages: state.newImages.filter((image) => image.id !== action.payload),
			};
		case ProjectImageManagementActionType.SetMainImage:
			return {
				...state,
				mainImageId: action.payload,
			};
		case ProjectImageManagementActionType.Reset:
			return initialState;
		default:
			return state;
	}
}

const [
	ProjectImageManagementProvider,
	useProjectImageManagementState,
	useProjectImageManagementDispatch,
] = createReducerContext(projectImageManagementReducer, initialState);

export { ProjectImageManagementProvider };

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
	const state = useProjectImageManagementState();
	const dispatch = useProjectImageManagementDispatch();

	const removeExistingImage = (imageId: string) => {
		dispatch({ type: ProjectImageManagementActionType.RemoveExistingImage, payload: imageId });
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
	const state = useProjectImageManagementState();
	const dispatch = useProjectImageManagementDispatch();

	const addNewImagesFromUpload = (files: ImageUploadFile[]) => {
		const newImages = convertImageUploadFilesToNewImages(files);
		dispatch({ type: ProjectImageManagementActionType.AddNewImages, payload: newImages });
	};

	const removeNewImage = (imageId: string) => {
		dispatch({ type: ProjectImageManagementActionType.RemoveNewImage, payload: imageId });
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
	const state = useProjectImageManagementState();

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
	const state = useProjectImageManagementState();
	const dispatch = useProjectImageManagementDispatch();

	const setMainImage = (imageId: string | null) => {
		dispatch({ type: ProjectImageManagementActionType.SetMainImage, payload: imageId });
	};

	return {
		selectedMainImageId: state.mainImageId,
		setMainImage,
	};
}
