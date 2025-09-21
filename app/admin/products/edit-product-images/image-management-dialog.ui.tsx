"use client";

import { Check, Upload, X } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useRef } from "react";
import { Form, FormPendingMessage, FormSubmitMessage } from "@/components/form-state";
import { ImageUploadArea, ImageUploadError, ImageUploadRoot } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { updateProductImages } from "./image-management.actions";
import {
	useExistingImages,
	useMainImageSelection,
	useNewImages,
	useUnifiedImages,
} from "./image-management-dialog.state";
import type { UnifiedImage } from "./image-management-dialog.type";

interface ImageManagementContentProps {
	productId: string;
}
/**
 * Main content component for image management dialog
 * Displays all images in a unified interface
 */
export function ImageManagementContent({ productId }: ImageManagementContentProps) {
	return (
		<Form action={updateProductImages}>
			<ImagesSection productId={productId} />
			<ImageManagementActions />
		</Form>
	);
}

interface ImagesSectionProps {
	productId: string;
}

/**
 * Unified section for displaying and managing all images
 */
function ImagesSection({ productId }: ImagesSectionProps) {
	const { images } = useUnifiedImages();

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="text-sm font-medium text-foreground">Product Images</div>
				<p className="text-xs text-muted-foreground">
					Click on any image to set it as the main product image. Click the X to remove images.
				</p>
			</div>

			{/* Image Upload Component */}
			<NewImageUpload />

			{/* Hidden form inputs for form data */}
			<FormDataInputs productId={productId} />

			{/* Images Display */}
			{images.length > 0 && (
				<div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
					{images.map((image) => (
						<UnifiedImageItem key={image.id} image={image} />
					))}
				</div>
			)}
		</div>
	);
}

/**
 * Actions section for the image management dialog
 */
function ImageManagementActions() {
	return (
		<div className="flex justify-end space-x-2 pt-4 border-t">
			<DialogClose asChild>
				<Button variant="outline">Cancel</Button>
			</DialogClose>
			<Button type="submit">
				<FormSubmitMessage>Save Changes</FormSubmitMessage>
				<FormPendingMessage>Saving...</FormPendingMessage>
			</Button>
		</div>
	);
}

/**
 * Unified image item component that handles both existing and new images
 * Uses its own hooks for state management instead of props
 */
interface UnifiedImageItemProps {
	image: UnifiedImage;
}

function UnifiedImageItem({ image }: UnifiedImageItemProps) {
	const { selectedMainImageId, setMainImage } = useMainImageSelection();
	const { removeExistingImage } = useExistingImages();
	const { removeNewImage } = useNewImages();

	const isMainImage = selectedMainImageId === image.id;

	const handleSelectMain = () => {
		setMainImage(image.id);
	};

	const handleRemove = () => {
		if (image.type === "existing") {
			removeExistingImage(image.id);
		} else {
			removeNewImage(image.id);
		}
	};

	return (
		<div className="relative group">
			<button
				type="button"
				className={cn(
					"relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors",
					isMainImage
						? "border-primary ring-2 ring-primary/20"
						: "border-border hover:border-primary/50",
				)}
				onClick={handleSelectMain}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleSelectMain();
					}
				}}
			>
				<Image
					src={image.url}
					alt={image.name}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
				/>
				{isMainImage && (
					<div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
						<Check className="size-4" />
					</div>
				)}

				{/* New image indicator */}
				{image.type === "new" && (
					<div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg">
						NEW
					</div>
				)}
			</button>

			{/* Remove button - show for both existing and new images */}
			<button
				type="button"
				className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
				onClick={(e) => {
					e.stopPropagation();
					handleRemove();
				}}
			>
				<X className="size-4" />
			</button>
		</div>
	);
}

/**
 * Hidden form inputs component that provides form data for submission
 * Includes inputs for new images, deleted images, and main image selection
 */
interface FormDataInputsProps {
	productId: string;
}

/**
 * Component that manages a hidden file input and injects file values from state
 * This allows us to control the file input programmatically while maintaining form integration
 */
function HiddenFileInput() {
	const { newImages } = useNewImages();
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Update the file input when newImages change
	useEffect(() => {
		if (fileInputRef.current && newImages.length > 0) {
			// Create a new DataTransfer object to hold the files
			const dataTransfer = new DataTransfer();

			// Add each file to the DataTransfer object
			newImages.forEach((image) => {
				dataTransfer.items.add(image.file);
			});

			// Set the files on the input
			fileInputRef.current.files = dataTransfer.files;
		}
	}, [newImages]);

	return (
		<input
			ref={fileInputRef}
			type="file"
			name="newImages"
			multiple
			accept="image/*"
			className="hidden"
		/>
	);
}

function FormDataInputs({ productId }: FormDataInputsProps) {
	const { deletedImages } = useExistingImages();
	const { selectedMainImageId } = useMainImageSelection();
	const { images } = useUnifiedImages();

	// Convert deleted images to JSON for form submission
	const deletedImagesJson = JSON.stringify(
		deletedImages.map((img) => ({
			id: img.id,
			name: img.name,
		})),
	);

	// Convert selected main image ID to index for server
	const getMainImageIndex = () => {
		if (!selectedMainImageId || images.length === 0) {
			return "";
		}

		const selectedIndex = images.findIndex((img) => img.id === selectedMainImageId);
		return selectedIndex === -1 ? "" : selectedIndex.toString();
	};

	return (
		<>
			{/* Hidden file input for new images */}
			<HiddenFileInput />

			{/* Hidden input for product ID */}
			<input type="hidden" name="productId" value={productId} />

			{/* Hidden input for deleted images */}
			<input type="hidden" name="deletedImages" value={deletedImagesJson} />

			{/* Hidden input for main image selection */}
			<input type="hidden" name="mainImageIndex" value={getMainImageIndex()} />
		</>
	);
}

const NewImageUpload = memo(function NewImageUpload() {
	const { addNewImagesFromUpload } = useNewImages();

	return (
		<ImageUploadRoot
			maxFiles={20}
			acceptedTypes={["image/*"]}
			maxFileSize={10 * 1024 * 1024} // 10MB
			onChange={addNewImagesFromUpload}
		>
			<ImageUploadArea className="p-8">
				<div className="text-center text-muted-foreground space-y-4">
					<div className="flex flex-col items-center space-y-2">
						<div className="size-16 rounded-full bg-muted flex items-center justify-center">
							<Upload className="size-8 text-muted-foreground" />
						</div>
						<div className="space-y-1">
							<h3 className="text-sm font-medium text-foreground">Upload Images</h3>
							<p className="text-xs text-muted-foreground">
								Click here or drag and drop your images
							</p>
						</div>
					</div>
				</div>
			</ImageUploadArea>

			{/* Error Display */}
			<ImageUploadError />
		</ImageUploadRoot>
	);
});
