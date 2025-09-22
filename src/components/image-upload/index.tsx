"use client";

import { Slot } from "@radix-ui/react-slot";
import { AlertCircle, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useId, useRef } from "react";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import {
	ImageUploadProvider,
	useImageUploadErrors,
	useImageUploadFiles,
	useImageUploadInput,
	useImageUploadOnChange,
	useImageUploadProgress,
} from "./image-upload.state";
import type { ImageUploadFile, ImageUploadRootProps } from "./image-upload.type";

/**
 * Image upload root component that provides context and manages file input
 * @param children - React children components to render within the upload context
 * @param maxFiles - Maximum number of files allowed (default: 10)
 * @param acceptedTypes - Array of accepted MIME types (default: ["image/*"])
 * @param maxFileSize - Maximum file size in bytes (default: 5MB)
 * @param inputId - Optional custom input ID, will generate one if not provided
 * @param name - Optional name attribute for form integration
 * @param value - Controlled value for files (when using controlled mode)
 * @param onChange - Callback for file changes (when using controlled mode)
 * @returns JSX element providing upload context to children
 */
export function ImageUploadRoot({
	children,
	maxFiles = 10,
	acceptedTypes = ["image/*"],
	maxFileSize = 5 * 1024 * 1024,
	inputId: providedInputId,
	name,
	value,
	onChange,
}: ImageUploadRootProps) {
	const generatedInputId = useId();
	const inputId = providedInputId || generatedInputId;
	const isControlled = value !== undefined && onChange !== undefined;
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<ImageUploadProvider
			maxFiles={maxFiles}
			acceptedTypes={acceptedTypes}
			maxFileSize={maxFileSize}
			inputId={inputId}
			inputRef={inputRef}
			files={isControlled ? value : []}
			onChange={onChange}
		>
			<ImageUploadInput name={name} />
			{isControlled && <ImageUploadValueSync value={value} />}
			{children}
		</ImageUploadProvider>
	);
}

/**
 * Component that syncs external value prop with internal state
 * Only renders in controlled mode to handle value prop changes
 */
function ImageUploadValueSync({ value }: { value?: ImageUploadFile[] }) {
	const { syncFiles } = useImageUploadFiles();
	const onChange = useImageUploadOnChange();

	useEffect(() => {
		// Only sync if we have an onChange callback (controlled mode)
		// and the external value is different from internal state
		if (onChange && value) {
			syncFiles(value);
		}
	}, [value, onChange, syncFiles]);

	return null;
}

/**
 * Hidden file input component that handles file selection
 * Validates files and dispatches appropriate actions to the upload state
 * @param name - Optional name attribute for form integration
 * @returns JSX element for the hidden file input
 */
function ImageUploadInput({ name }: { name?: string }) {
	const { addFiles } = useImageUploadFiles();
	const { validateFiles, addError, acceptedTypes, inputId, inputRef } = useImageUploadInput();
	const onChange = useImageUploadOnChange();

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const { validFiles, errors } = validateFiles(fileArray);

		if (errors.length > 0) {
			for (const error of errors) {
				addError(error);
			}
		}

		if (validFiles.length > 0) {
			// Call onChange before addFiles to prevent setState during render
			if (onChange) {
				onChange(validFiles);
			}
			addFiles(validFiles);
		}
	};

	return (
		<input
			ref={inputRef}
			id={inputId}
			name={name}
			type="file"
			multiple
			accept={acceptedTypes.join(",")}
			onChange={handleFileSelect}
			className="hidden"
		/>
	);
}

interface ImageUploadTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
	className?: string;
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
	const { inputId, triggerFileSelect } = useImageUploadInput();

	if (asChild) {
		return (
			<Slot className={className} onClick={triggerFileSelect}>
				{children}
			</Slot>
		);
	}

	return (
		<label
			htmlFor={inputId}
			className={cn("cursor-pointer", className)}
			onClick={triggerFileSelect}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					triggerFileSelect();
				}
			}}
		>
			{children}
		</label>
	);
}

interface ImageUploadAreaProps {
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	asChild?: boolean;
	clickable?: boolean;
}

/**
 * Image upload drop zone area component
 * Handles drag and drop functionality for file uploads
 * @param className - Optional CSS class name for styling
 * @param disabled - Whether the drop zone is disabled
 * @param children - React children to render within the drop zone
 * @param asChild - Whether to render as a child component using Radix Slot
 * @param clickable - Whether clicking the area should trigger file selection (default: true)
 * @returns JSX element for the drag and drop area
 */
export function ImageUploadArea({
	className,
	disabled = false,
	children,
	asChild = false,
	clickable = true,
}: ImageUploadAreaProps) {
	const { addFiles } = useImageUploadFiles();
	const { validateFiles, addError, triggerFileSelect } = useImageUploadInput();
	const [isDragOver, setIsDragOver] = React.useState(false);

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver(false);
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragOver(false);

		if (disabled) return;

		const files = event.dataTransfer.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const { validFiles, errors } = validateFiles(fileArray);

		if (errors.length > 0) {
			for (const error of errors) {
				addError(error);
			}
		}

		if (validFiles.length > 0) {
			addFiles(validFiles);
		}
	};

	const handleClick = () => {
		if (disabled || !clickable) return;
		triggerFileSelect();
	};

	if (asChild) {
		return (
			<Slot
				className={cn(
					"border-2 border-dashed rounded-lg transition-colors w-full",
					isDragOver
						? "border-primary bg-primary/5"
						: "border-border bg-card hover:border-primary/50 focus-within:border-primary",
					disabled && "opacity-50 cursor-not-allowed",
					!disabled && clickable && "cursor-pointer",
					!disabled && !clickable && "cursor-default",
					className,
				)}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleClick();
					}
				}}
			>
				{children}
			</Slot>
		);
	}

	if (clickable) {
		return (
			<button
				type="button"
				className={cn(
					"border-2 border-dashed rounded-lg transition-colors w-full",
					isDragOver
						? "border-primary bg-primary/5"
						: "border-border bg-card hover:border-primary/50 focus-within:border-primary",
					disabled && "opacity-50 cursor-not-allowed",
					!disabled && "cursor-pointer",
					className,
				)}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				disabled={disabled}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleClick();
					}
				}}
			>
				{children}
			</button>
		);
	}

	return (
		<section
			className={cn(
				"border-2 border-dashed rounded-lg transition-colors w-full",
				isDragOver
					? "border-primary bg-primary/5"
					: "border-border hover:bg-card focus-within:bg-card",
				disabled && "opacity-50 cursor-not-allowed",
				!disabled && "cursor-default",
				className,
			)}
			aria-label="Upload area. Drag and drop images or click to select."
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{children}
		</section>
	);
}

interface ImageUploadReviewProps {
	className?: string;
	ImageComponent?: React.ComponentType<
		React.ComponentProps<typeof Image> & {
			file: ImageUploadFile;
		}
	>;
}

/**
 * Image upload review component that displays uploaded images in a grid
 * Shows uploaded files with remove functionality and optional custom image component
 * @param className - Optional CSS class name for styling
 * @param ImageComponent - Optional custom component to render images instead of default Next.js Image
 * @returns JSX element displaying uploaded images in a grid layout
 */
export function ImageUploadReview({ className, ImageComponent }: ImageUploadReviewProps) {
	const { files, removeFile } = useImageUploadFiles();

	if (files.length === 0) return null;

	const Component = ImageComponent || Image;

	return (
		<div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
			{files.map((file) => (
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
							onClick={() => removeFile(file.id)}
						>
							<X className="size-3" />
						</Button>
						<div className="mt-1 text-xs text-muted-foreground truncate">{file.name}</div>
					</div>
				</div>
			))}
		</div>
	);
}

interface ImageUploadProgressProps {
	className?: string;
	showPercentage?: boolean;
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
	const { isUploading, uploadProgress } = useImageUploadProgress();

	if (!isUploading) return null;

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Uploading...</span>
				{showPercentage && (
					<span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
				)}
			</div>
			<div className="w-full bg-muted rounded-full h-2">
				<div
					className="bg-primary h-2 rounded-full transition-all duration-300"
					style={{ width: `${uploadProgress}%` }}
				/>
			</div>
		</div>
	);
}

interface ImageUploadErrorProps {
	className?: string;
	variant?: "default" | "destructive";
}

/**
 * Image upload error display component
 * Shows validation errors and upload failures to the user
 * @param className - Optional CSS class name for styling
 * @param variant - Error display variant, either "default" or "destructive" (default: "destructive")
 * @returns JSX element displaying errors or null if no errors
 */
export function ImageUploadError({ className, variant = "destructive" }: ImageUploadErrorProps) {
	const errors = useImageUploadErrors();

	if (errors.length === 0) return null;

	return (
		<div className={cn("space-y-2", className)}>
			{errors.map((error) => (
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
	);
}
