/**
 * Image gallery component types
 */

export interface ImageGalleryImage {
	src: string;
	alt: string;
}

export interface AutoCycleConfig {
	intervalMs: number;
}

export interface ImageGalleryState {
	currentIndex: number;
	imageCount: number;
	images: ImageGalleryImage[];
	lastUserInteraction: number;
}

export enum ImageGalleryActionType {
	SetIndex = "SET_INDEX",
	NextImage = "NEXT_IMAGE",
	PrevImage = "PREV_IMAGE",
	SetImageCount = "SET_IMAGE_COUNT",
	UserNext = "USER_NEXT",
	UserPrev = "USER_PREV",
	UserSetIndex = "USER_SET_INDEX",
	CycleNext = "CYCLE_NEXT",
}

export type ImageGalleryAction =
	| { type: ImageGalleryActionType.SetIndex; payload: number }
	| { type: ImageGalleryActionType.NextImage }
	| { type: ImageGalleryActionType.PrevImage }
	| { type: ImageGalleryActionType.SetImageCount; payload: number }
	| { type: ImageGalleryActionType.UserNext; payload: number }
	| { type: ImageGalleryActionType.UserPrev; payload: number }
	| { type: ImageGalleryActionType.UserSetIndex; payload: { index: number; timestamp: number } }
	| { type: ImageGalleryActionType.CycleNext; payload: { timestamp: number; intervalMs: number } };

export interface GalleryRootProps {
	images: ImageGalleryImage[];
	children: React.ReactNode;
	autoCycle?: AutoCycleConfig;
}
