"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type { ImageGalleryAction, ImageGalleryState } from "./image-gallery.type";
import { ImageGalleryActionType } from "./image-gallery.type";

const initialState: ImageGalleryState = {
	currentIndex: 0,
	imageCount: 0,
	images: [],
	isTransitioning: false,
};

function imageGalleryReducer(
	state: ImageGalleryState,
	action: ImageGalleryAction,
): ImageGalleryState {
	switch (action.type) {
		case ImageGalleryActionType.SetIndex:
			return { ...state, currentIndex: action.payload, isTransitioning: false };
		case ImageGalleryActionType.NextImage: {
			const nextIndex = (state.currentIndex + 1) % state.imageCount;
			return { ...state, currentIndex: nextIndex, isTransitioning: false };
		}
		case ImageGalleryActionType.PrevImage: {
			const prevIndex = state.currentIndex === 0 ? state.imageCount - 1 : state.currentIndex - 1;
			return { ...state, currentIndex: prevIndex, isTransitioning: false };
		}
		case ImageGalleryActionType.SetImageCount:
			return { ...state, imageCount: action.payload };
		case ImageGalleryActionType.SetTransitioning:
			return { ...state, isTransitioning: action.payload };
		default:
			return state;
	}
}

export const [ImageGalleryProvider, useImageGalleryState, useImageGalleryDispatch] =
	createReducerContext(imageGalleryReducer, initialState);
