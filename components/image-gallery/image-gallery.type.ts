/**
 * Image gallery component types
 */

export interface ImageGalleryImage {
	src: string
	alt: string
}

export interface ImageGalleryState {
	currentIndex: number
	imageCount: number
	images: ImageGalleryImage[]
	isTransitioning: boolean
}

export enum ImageGalleryActionType {
	SetIndex = "SET_INDEX",
	NextImage = "NEXT_IMAGE",
	PrevImage = "PREV_IMAGE",
	SetImageCount = "SET_IMAGE_COUNT",
	SetTransitioning = "SET_TRANSITIONING",
}

export type ImageGalleryAction =
	| { type: ImageGalleryActionType.SetIndex; payload: number }
	| { type: ImageGalleryActionType.NextImage }
	| { type: ImageGalleryActionType.PrevImage }
	| { type: ImageGalleryActionType.SetImageCount; payload: number }
	| { type: ImageGalleryActionType.SetTransitioning; payload: boolean }

export interface GalleryRootProps {
	images: ImageGalleryImage[]
	children: React.ReactNode
}
