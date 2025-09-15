"use client"

import { createReducerContext } from "@/contexts/createReducerContext"
import type { ImageUploadAction, ImageUploadState } from "./image-upload.type"
import { ImageUploadActionType } from "./image-upload.type"

const createInitialState = (
	maxFiles: number = 10,
	maxFileSize: number = 5 * 1024 * 1024, // 5MB
	acceptedTypes: string[] = ["image/*"],
	inputId: string = "",
): ImageUploadState => ({
	files: [],
	isUploading: false,
	uploadProgress: 0,
	errors: [],
	maxFiles,
	maxFileSize,
	acceptedTypes,
	inputId,
})

function imageUploadReducer(state: ImageUploadState, action: ImageUploadAction): ImageUploadState {
	switch (action.type) {
		case ImageUploadActionType.AddFiles: {
			const newFiles = [...state.files, ...action.payload]
			const limitedFiles = newFiles.slice(0, state.maxFiles)

			return {
				...state,
				files: limitedFiles,
				errors: [],
			}
		}
		case ImageUploadActionType.RemoveFile: {
			const filteredFiles = state.files.filter((file) => file.id !== action.payload)

			return {
				...state,
				files: filteredFiles,
			}
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
			)
		default:
			return state
	}
}

export const [ImageUploadProvider, useImageUploadState, useImageUploadDispatch] =
	createReducerContext(imageUploadReducer, createInitialState())
