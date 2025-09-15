/**
 * Image upload component types
 */

export interface ImageUploadFile {
	id: string
	file: File
	preview: string
	name: string
	size: number
}

export interface ImageUploadState {
	files: ImageUploadFile[]
	isUploading: boolean
	uploadProgress: number
	errors: string[]
	maxFiles: number
	maxFileSize: number
	acceptedTypes: string[]
	inputId: string
}

export enum ImageUploadActionType {
	AddFiles = "ADD_FILES",
	RemoveFile = "REMOVE_FILE",
	SetUploading = "SET_UPLOADING",
	SetProgress = "SET_PROGRESS",
	AddError = "ADD_ERROR",
	ClearErrors = "CLEAR_ERRORS",
	Reset = "RESET",
}

export type ImageUploadAction =
	| { type: ImageUploadActionType.AddFiles; payload: ImageUploadFile[] }
	| { type: ImageUploadActionType.RemoveFile; payload: string }
	| { type: ImageUploadActionType.SetUploading; payload: boolean }
	| { type: ImageUploadActionType.SetProgress; payload: number }
	| { type: ImageUploadActionType.AddError; payload: string }
	| { type: ImageUploadActionType.ClearErrors }
	| { type: ImageUploadActionType.Reset }

export interface ImageUploadRootProps {
	children: React.ReactNode
	maxFiles?: number
	acceptedTypes?: string[]
	maxFileSize?: number
	inputId?: string
}
