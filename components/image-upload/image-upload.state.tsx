"use client"

import { createReducerContext } from "@/contexts/createReducerContext"
import type { ImageUploadAction, ImageUploadFile, ImageUploadState } from "./image-upload.type"
import { ImageUploadActionType } from "./image-upload.type"

const createInitialState = (
	maxFiles: number = 10,
	maxFileSize: number = 5 * 1024 * 1024, // 5MB
	acceptedTypes: string[] = ["image/*"],
	inputId: string = "",
	initialFiles: ImageUploadFile[] = [],
	onChange?: (files: ImageUploadFile[]) => void,
): ImageUploadState => ({
	files: initialFiles,
	isUploading: false,
	uploadProgress: 0,
	errors: [],
	maxFiles,
	maxFileSize,
	acceptedTypes,
	inputId,
	onChange,
})

function imageUploadReducer(state: ImageUploadState, action: ImageUploadAction): ImageUploadState {
	switch (action.type) {
		case ImageUploadActionType.AddFiles: {
			const newFiles = [...state.files, ...action.payload]
			const limitedFiles = newFiles.slice(0, state.maxFiles)

			const newState = {
				...state,
				files: limitedFiles,
				errors: [],
			}

			// Call onChange for controlled mode
			if (state.onChange) {
				state.onChange(limitedFiles)
			}

			return newState
		}
		case ImageUploadActionType.RemoveFile: {
			const filteredFiles = state.files.filter((file) => file.id !== action.payload)

			const newState = {
				...state,
				files: filteredFiles,
			}

			// Call onChange for controlled mode
			if (state.onChange) {
				state.onChange(filteredFiles)
			}

			return newState
		}
		case ImageUploadActionType.SetUploading:
			return {
				...state,
				isUploading: action.payload,
			}
		case ImageUploadActionType.SetProgress:
			return {
				...state,
				uploadProgress: action.payload,
			}
		case ImageUploadActionType.AddError:
			return {
				...state,
				errors: [...state.errors, action.payload],
			}
		case ImageUploadActionType.ClearErrors:
			return {
				...state,
				errors: [],
			}
		case ImageUploadActionType.Reset:
			return createInitialState(
				state.maxFiles,
				state.maxFileSize,
				state.acceptedTypes,
				state.inputId,
				state.files, // Keep current files on reset
				state.onChange,
			)
		case ImageUploadActionType.SyncFiles:
			return {
				...state,
				files: action.payload,
			}
		default:
			return state
	}
}

export const [ImageUploadProvider, useImageUploadState, useImageUploadDispatch] =
	createReducerContext(imageUploadReducer, createInitialState())

/**
 * Hook for file management - handles files display and basic operations
 * @returns Object containing files array and file management functions
 */
export function useImageUploadFiles() {
	const state = useImageUploadState()
	const dispatch = useImageUploadDispatch()

	const addFiles = (files: ImageUploadFile[]) => {
		dispatch({ type: ImageUploadActionType.AddFiles, payload: files })
	}

	const removeFile = (fileId: string) => {
		dispatch({ type: ImageUploadActionType.RemoveFile, payload: fileId })
	}

	const syncFiles = (files: ImageUploadFile[]) => {
		dispatch({ type: ImageUploadActionType.SyncFiles, payload: files })
	}

	return {
		files: state.files,
		addFiles,
		removeFile,
		syncFiles,
	}
}

/**
 * Hook for upload progress - handles progress display
 * @returns Object containing upload state and progress
 */
export function useImageUploadProgress() {
	const state = useImageUploadState()
	return {
		isUploading: state.isUploading,
		uploadProgress: state.uploadProgress,
	}
}

/**
 * Hook for error handling - handles error display
 * @returns Array of error messages
 */
export function useImageUploadErrors() {
	const state = useImageUploadState()
	return state.errors
}

/**
 * Hook for file input operations - handles file selection and validation
 * @returns Object containing input configuration and validation functions
 */
export function useImageUploadInput() {
	const state = useImageUploadState()
	const dispatch = useImageUploadDispatch()

	const addError = (error: string) => {
		dispatch({ type: ImageUploadActionType.AddError, payload: error })
	}

	const validateFile = (file: File): { isValid: boolean; error?: string } => {
		// Check file type
		const isValidType = state.acceptedTypes.some((type) => {
			if (type.endsWith("/*")) {
				return file.type.startsWith(type.slice(0, -1))
			}
			return file.type === type
		})

		if (!isValidType) {
			return { isValid: false, error: `File ${file.name} is not a valid image type` }
		}

		// Check file size
		if (file.size > state.maxFileSize) {
			return {
				isValid: false,
				error: `File ${file.name} is too large (max ${Math.round(state.maxFileSize / 1024 / 1024)}MB)`,
			}
		}

		return { isValid: true }
	}

	const validateFiles = (files: File[]): { validFiles: ImageUploadFile[]; errors: string[] } => {
		const validFiles: ImageUploadFile[] = []
		const errors: string[] = []

		for (const file of files) {
			const validation = validateFile(file)

			if (!validation.isValid) {
				if (validation.error) {
					errors.push(validation.error)
				}
				continue
			}

			// Check max files
			if (state.files.length + validFiles.length >= state.maxFiles) {
				errors.push(`Maximum ${state.maxFiles} files allowed`)
				continue
			}

			const fileId = Math.random().toString(36).substr(2, 9)
			const preview = URL.createObjectURL(file)

			validFiles.push({
				id: fileId,
				file,
				preview,
				name: file.name,
				size: file.size,
			})
		}

		return { validFiles, errors }
	}

	const triggerFileSelect = () => {
		const fileInput = document.getElementById(state.inputId) as HTMLInputElement
		fileInput?.click()
	}

	return {
		inputId: state.inputId,
		acceptedTypes: state.acceptedTypes,
		validateFiles,
		addError,
		triggerFileSelect,
	}
}
