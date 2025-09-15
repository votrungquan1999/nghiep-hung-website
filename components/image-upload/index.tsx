"use client"

import { Slot } from "@radix-ui/react-slot"
import { AlertCircle, X } from "lucide-react"
import Image from "next/image"
import React, { useId } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
	ImageUploadProvider,
	useImageUploadDispatch,
	useImageUploadState,
} from "./image-upload.state"
import type { ImageUploadFile, ImageUploadRootProps } from "./image-upload.type"
import { ImageUploadActionType } from "./image-upload.type"

/**
 * Image upload root component that provides context and manages file input
 * @param children - React children components to render within the upload context
 * @param maxFiles - Maximum number of files allowed (default: 10)
 * @param acceptedTypes - Array of accepted MIME types (default: ["image/*"])
 * @param maxFileSize - Maximum file size in bytes (default: 5MB)
 * @param inputId - Optional custom input ID, will generate one if not provided
 * @returns JSX element providing upload context to children
 */
export function ImageUploadRoot({
	children,
	maxFiles = 10,
	acceptedTypes = ["image/*"],
	maxFileSize = 5 * 1024 * 1024,
	inputId: providedInputId,
}: ImageUploadRootProps) {
	const generatedInputId = useId()
	const inputId = providedInputId || generatedInputId

	return (
		<ImageUploadProvider
			maxFiles={maxFiles}
			acceptedTypes={acceptedTypes}
			maxFileSize={maxFileSize}
			inputId={inputId}
		>
			<ImageUploadInput />
			{children}
		</ImageUploadProvider>
	)
}

/**
 * Hidden file input component that handles file selection
 * Validates files and dispatches appropriate actions to the upload state
 * @returns JSX element for the hidden file input
 */
function ImageUploadInput() {
	const state = useImageUploadState()
	const dispatch = useImageUploadDispatch()

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (!files) return

		const fileArray = Array.from(files)
		const validFiles: ImageUploadFile[] = []
		const errors: string[] = []

		for (const file of fileArray) {
			// Check file type
			const isValidType = state.acceptedTypes.some((type) => {
				if (type.endsWith("/*")) {
					return file.type.startsWith(type.slice(0, -1))
				}
				return file.type === type
			})

			if (!isValidType) {
				errors.push(`File ${file.name} is not a valid image type`)
				continue
			}

			// Check file size
			if (file.size > state.maxFileSize) {
				errors.push(
					`File ${file.name} is too large (max ${Math.round(state.maxFileSize / 1024 / 1024)}MB)`,
				)
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

		if (errors.length > 0) {
			for (const error of errors) {
				dispatch({ type: ImageUploadActionType.AddError, payload: error })
			}
		}

		if (validFiles.length > 0) {
			dispatch({ type: ImageUploadActionType.AddFiles, payload: validFiles })
		}

		// Reset input
		event.target.value = ""
	}

	return (
		<input
			id={state.inputId}
			type="file"
			multiple
			accept={state.acceptedTypes.join(",")}
			onChange={handleFileSelect}
			className="hidden"
		/>
	)
}

interface ImageUploadTriggerProps {
	children: React.ReactNode
	asChild?: boolean
	className?: string
}

/**
 * Image upload trigger component that opens file selection
 * @param children - React children to render as the trigger element
 * @param asChild - Whether to render as a child component using Radix Slot
 * @param className - Optional CSS class name for styling
 * @returns JSX element that triggers file selection when clicked
 */
export function ImageUploadTrigger({
	children,
	asChild = false,
	className,
}: ImageUploadTriggerProps) {
	const state = useImageUploadState()

	const handleClick = () => {
		const fileInput = document.getElementById(state.inputId) as HTMLInputElement
		fileInput?.click()
	}

	if (asChild) {
		return (
			<Slot className={className} onClick={handleClick}>
				{children}
			</Slot>
		)
	}

	return (
		<label
			htmlFor={state.inputId}
			className={cn("cursor-pointer", className)}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					handleClick()
				}
			}}
		>
			{children}
		</label>
	)
}

interface ImageUploadAreaProps {
	className?: string
	disabled?: boolean
	children?: React.ReactNode
	asChild?: boolean
}

/**
 * Image upload drop zone area component
 * Handles drag and drop functionality for file uploads
 * @param className - Optional CSS class name for styling
 * @param disabled - Whether the drop zone is disabled
 * @param children - React children to render within the drop zone
 * @param asChild - Whether to render as a child component using Radix Slot
 * @returns JSX element for the drag and drop area
 */
export function ImageUploadArea({
	className,
	disabled = false,
	children,
	asChild = false,
}: ImageUploadAreaProps) {
	const dispatch = useImageUploadDispatch()
	const state = useImageUploadState()
	const [isDragOver, setIsDragOver] = React.useState(false)

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragOver(true)
	}

	const handleDragLeave = (event: React.DragEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragOver(false)
	}

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragOver(false)

		if (disabled) return

		const files = event.dataTransfer.files
		if (!files) return

		const fileArray = Array.from(files)
		const validFiles: ImageUploadFile[] = []
		const errors: string[] = []

		for (const file of fileArray) {
			// Check file type
			const isValidType = state.acceptedTypes.some((type) => {
				if (type.endsWith("/*")) {
					return file.type.startsWith(type.slice(0, -1))
				}
				return file.type === type
			})

			if (!isValidType) {
				errors.push(`File ${file.name} is not a valid image type`)
				continue
			}

			// Check file size
			if (file.size > state.maxFileSize) {
				errors.push(
					`File ${file.name} is too large (max ${Math.round(state.maxFileSize / 1024 / 1024)}MB)`,
				)
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

		if (errors.length > 0) {
			for (const error of errors) {
				dispatch({ type: ImageUploadActionType.AddError, payload: error })
			}
		}

		if (validFiles.length > 0) {
			dispatch({ type: ImageUploadActionType.AddFiles, payload: validFiles })
		}
	}

	const handleClick = () => {
		if (disabled) return
		const fileInput = document.getElementById(state.inputId) as HTMLInputElement
		fileInput?.click()
	}

	if (asChild) {
		return (
			<Slot
				className={cn(
					"border-2 border-dashed rounded-lg transition-colors w-full",
					isDragOver
						? "border-primary bg-primary/5"
						: "border-slate-700 bg-white hover:border-primary/50 focus-within:border-primary",
					disabled && "opacity-50 cursor-not-allowed",
					className,
				)}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault()
						handleClick()
					}
				}}
			>
				{children}
			</Slot>
		)
	}

	return (
		<button
			type="button"
			className={cn(
				"border-2 border-dashed rounded-lg transition-colors w-full",
				isDragOver
					? "border-primary bg-primary/5"
					: "border-slate-700 bg-white hover:border-primary/50 focus-within:border-primary",
				disabled && "opacity-50 cursor-not-allowed",
				className,
			)}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}
			disabled={disabled}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					handleClick()
				}
			}}
		>
			{children}
		</button>
	)
}

interface ImageUploadReviewProps {
	className?: string
	ImageComponent?: React.ComponentType<
		React.ComponentProps<typeof Image> & {
			file: ImageUploadFile
		}
	>
}

/**
 * Image upload review component that displays uploaded images in a grid
 * Shows uploaded files with remove functionality and optional custom image component
 * @param className - Optional CSS class name for styling
 * @param ImageComponent - Optional custom component to render images instead of default Next.js Image
 * @returns JSX element displaying uploaded images in a grid layout
 */
export function ImageUploadReview({ className, ImageComponent }: ImageUploadReviewProps) {
	const state = useImageUploadState()
	const dispatch = useImageUploadDispatch()

	const handleRemoveFile = (fileId: string) => {
		dispatch({ type: ImageUploadActionType.RemoveFile, payload: fileId })
	}

	if (state.files.length === 0) return null

	const Component = ImageComponent || Image

	return (
		<div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
			{state.files.map((file) => (
				<div key={file.id}>
					<div className="relative group">
						<div className="aspect-square rounded-lg overflow-hidden bg-muted">
							<Component
								src={file.preview}
								alt={file.name}
								fill
								className="object-cover"
								file={file}
							/>
						</div>
						<Button
							type="button"
							variant="destructive"
							size="icon"
							className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={() => handleRemoveFile(file.id)}
						>
							<X className="size-3" />
						</Button>
						<div className="mt-1 text-xs text-muted-foreground truncate">{file.name}</div>
					</div>
				</div>
			))}
		</div>
	)
}

interface ImageUploadProgressProps {
	className?: string
	showPercentage?: boolean
}

/**
 * Image upload progress component
 * Displays upload progress with optional percentage indicator
 * @param className - Optional CSS class name for styling
 * @param showPercentage - Whether to show percentage text (default: true)
 * @returns JSX element showing upload progress or null if not uploading
 */
export function ImageUploadProgress({
	className,
	showPercentage = true,
}: ImageUploadProgressProps) {
	const state = useImageUploadState()

	if (!state.isUploading) return null

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Uploading...</span>
				{showPercentage && (
					<span className="text-muted-foreground">{Math.round(state.uploadProgress)}%</span>
				)}
			</div>
			<div className="w-full bg-muted rounded-full h-2">
				<div
					className="bg-primary h-2 rounded-full transition-all duration-300"
					style={{ width: `${state.uploadProgress}%` }}
				/>
			</div>
		</div>
	)
}

interface ImageUploadErrorProps {
	className?: string
	variant?: "default" | "destructive"
}

/**
 * Image upload error display component
 * Shows validation errors and upload failures to the user
 * @param className - Optional CSS class name for styling
 * @param variant - Error display variant, either "default" or "destructive" (default: "destructive")
 * @returns JSX element displaying errors or null if no errors
 */
export function ImageUploadError({ className, variant = "destructive" }: ImageUploadErrorProps) {
	const state = useImageUploadState()

	if (state.errors.length === 0) return null

	return (
		<div className={cn("space-y-2", className)}>
			{state.errors.map((error) => (
				<div
					key={`error-${error}`}
					className={cn(
						"flex items-center space-x-2 text-sm",
						variant === "destructive" ? "text-destructive" : "text-muted-foreground",
					)}
				>
					<AlertCircle className="size-4" />
					<span>{error}</span>
				</div>
			))}
		</div>
	)
}
