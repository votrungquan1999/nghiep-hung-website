"use client";

import { Slot } from "@radix-ui/react-slot";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	ImageGalleryProvider,
	useImageGalleryDispatch,
	useImageGalleryState,
} from "./image-gallery.state";
import type { ImageGalleryImage } from "./image-gallery.type";
import { ImageGalleryActionType } from "./image-gallery.type";

interface GalleryRootProps {
	images: ImageGalleryImage[];
	children: React.ReactNode;
}

/**
 * Gallery root component that provides context and manages images
 */
export function GalleryRoot({ images, children }: GalleryRootProps) {
	return (
		<ImageGalleryProvider imageCount={images.length} images={images}>
			{children}
		</ImageGalleryProvider>
	);
}

interface GalleryButtonProps {
	children: React.ReactNode;
	asChild?: boolean;
	className?: string;
}

/**
 * Gallery next button component
 */
export function GalleryNextButton({ children, asChild = false, className }: GalleryButtonProps) {
	const dispatch = useImageGalleryDispatch();

	const handleClick = () => {
		dispatch({ type: ImageGalleryActionType.NextImage });
	};

	if (asChild) {
		return (
			<Slot onClick={handleClick} className={className}>
				{children}
			</Slot>
		);
	}

	return (
		<Button variant="secondary" size="icon" onClick={handleClick} className={className}>
			{children}
		</Button>
	);
}

/**
 * Gallery back button component
 */
export function GalleryBackButton({ children, asChild = false, className }: GalleryButtonProps) {
	const dispatch = useImageGalleryDispatch();

	const handleClick = () => {
		dispatch({ type: ImageGalleryActionType.PrevImage });
	};

	if (asChild) {
		return (
			<Slot onClick={handleClick} className={className}>
				{children}
			</Slot>
		);
	}

	return (
		<Button variant="secondary" size="icon" onClick={handleClick} className={className}>
			{children}
		</Button>
	);
}

interface GalleryImageProps {
	className?: string;
	aspectRatio?: string;
}

/**
 * Gallery image component that renders all images and hides non-current ones
 */
export function GalleryImage({ className = "", aspectRatio = "aspect-video" }: GalleryImageProps) {
	const state = useImageGalleryState();

	return (
		<div className={`relative w-full bg-muted rounded-lg overflow-hidden ${className}`}>
			<div className={`${aspectRatio} w-full`}>
				{state.images.map((image, index) => (
					<Image
						key={`${image.src}-${index}`}
						src={image.src || "/placeholder.svg"}
						alt={image.alt || "Gallery image"}
						fill
						className={`object-contain transition-opacity duration-300 ${
							index === state.currentIndex ? "opacity-100" : "opacity-0 absolute"
						}`}
					/>
				))}
			</div>
		</div>
	);
}

interface GalleryThumbnailsProps {
	className?: string;
}

/**
 * Gallery thumbnails component that renders navigation dots
 */
export function GalleryThumbnails({ className = "" }: GalleryThumbnailsProps) {
	const state = useImageGalleryState();
	const dispatch = useImageGalleryDispatch();

	const hasMultipleImages = state.images.length > 1;

	if (!hasMultipleImages) return null;

	return (
		<div className={`flex justify-center space-x-2 ${className}`}>
			{state.images.map((_, index) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: this is ok since we have no plan to change the image's order
					key={index}
					type="button"
					onClick={() => dispatch({ type: ImageGalleryActionType.SetIndex, payload: index })}
					className={`w-3 h-3 rounded-full transition-colors ${
						index === state.currentIndex ? "bg-primary" : "bg-muted-foreground/30"
					}`}
				/>
			))}
		</div>
	);
}
