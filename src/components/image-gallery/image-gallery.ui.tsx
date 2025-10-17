"use client";

import { Slot } from "@radix-ui/react-slot";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import {
	ImageGalleryProvider,
	useImageGalleryDispatch,
	useImageGalleryState,
} from "./image-gallery.state";
import type { AutoCycleConfig, ImageGalleryImage } from "./image-gallery.type";
import { ImageGalleryActionType } from "./image-gallery.type";

interface GalleryRootProps {
	images: ImageGalleryImage[];
	children: React.ReactNode;
	autoCycle?: AutoCycleConfig;
}

/**
 * Gallery root component that provides context and manages images
 */
export function GalleryRoot({ images, children, autoCycle }: GalleryRootProps) {
	return (
		<ImageGalleryProvider imageCount={images.length} images={images}>
			<AutoCycleManager autoCycle={autoCycle} />
			{children}
		</ImageGalleryProvider>
	);
}

/**
 * Auto-cycle manager component that handles automatic image cycling
 */
function AutoCycleManager({ autoCycle }: { autoCycle?: AutoCycleConfig }) {
	const state = useImageGalleryState();
	const dispatch = useImageGalleryDispatch();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!autoCycle || state.images.length <= 1) return;

		intervalRef.current = setInterval(() => {
			dispatch({
				type: ImageGalleryActionType.CycleNext,
				payload: {
					timestamp: Date.now(),
					intervalMs: autoCycle.intervalMs,
				},
			});
		}, autoCycle.intervalMs);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [autoCycle, state.images.length, dispatch]);

	return null;
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
	const state = useImageGalleryState();
	const dispatch = useImageGalleryDispatch();

	const hasMultipleImages = state.images.length > 1;

	if (!hasMultipleImages) return null;

	const handleClick = () => {
		dispatch({ type: ImageGalleryActionType.UserNext, payload: Date.now() });
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
	const state = useImageGalleryState();
	const dispatch = useImageGalleryDispatch();

	const hasMultipleImages = state.images.length > 1;

	if (!hasMultipleImages) return null;

	const handleClick = () => {
		dispatch({ type: ImageGalleryActionType.UserPrev, payload: Date.now() });
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

interface GalleryImageProps
	extends Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "fill"> {
	containerClassName?: string;
	imageClassName?: string;
	aspectRatio?: string;
}

/**
 * Gallery image component that renders all images and hides non-current ones
 */
export function GalleryImage({
	containerClassName = "",
	imageClassName = "",
	aspectRatio = "aspect-video",
	...imageProps
}: GalleryImageProps) {
	const state = useImageGalleryState();

	return (
		<div className={cn("relative w-full bg-muted rounded-lg overflow-hidden", containerClassName)}>
			<div className={`${aspectRatio} w-full relative`}>
				{state.images.map((image, index) => (
					<Image
						key={`${image.src}-${index}`}
						src={image.src || "/placeholder.svg"}
						alt={image.alt || "Gallery image"}
						fill
						className={cn(
							"object-contain transition-opacity duration-300",
							index === state.currentIndex ? "opacity-100" : "opacity-0 absolute",
							imageClassName,
						)}
						{...imageProps}
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

	const handleThumbnailClick = (index: number) => {
		dispatch({
			type: ImageGalleryActionType.UserSetIndex,
			payload: { index, timestamp: Date.now() },
		});
	};

	return (
		<div className={`flex justify-center space-x-2 ${className}`}>
			{state.images.map((_, index) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: this is ok since we have no plan to change the image's order
					key={index}
					type="button"
					onClick={() => handleThumbnailClick(index)}
					className={`w-3 h-3 rounded-full transition-colors ${
						index === state.currentIndex ? "bg-primary" : "bg-muted-foreground/30"
					}`}
				/>
			))}
		</div>
	);
}
