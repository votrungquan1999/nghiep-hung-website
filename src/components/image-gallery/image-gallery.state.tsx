"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type { ImageGalleryAction, ImageGalleryState } from "./image-gallery.type";
import { ImageGalleryActionType } from "./image-gallery.type";

const initialState: ImageGalleryState = {
	currentIndex: 0,
	imageCount: 0,
	images: [],
	lastUserInteraction: 0,
};

function imageGalleryReducer(
	state: ImageGalleryState,
	action: ImageGalleryAction,
): ImageGalleryState {
	switch (action.type) {
		case ImageGalleryActionType.SetIndex:
			return { ...state, currentIndex: action.payload };
		case ImageGalleryActionType.NextImage: {
			const nextIndex = (state.currentIndex + 1) % state.imageCount;
			return { ...state, currentIndex: nextIndex };
		}
		case ImageGalleryActionType.PrevImage: {
			const prevIndex = state.currentIndex === 0 ? state.imageCount - 1 : state.currentIndex - 1;
			return { ...state, currentIndex: prevIndex };
		}
		case ImageGalleryActionType.SetImageCount:
			return { ...state, imageCount: action.payload };
		case ImageGalleryActionType.UserNext: {
			const nextIndex = (state.currentIndex + 1) % state.imageCount;
			return {
				...state,
				currentIndex: nextIndex,
				lastUserInteraction: action.payload,
			};
		}
		case ImageGalleryActionType.UserPrev: {
			const prevIndex = state.currentIndex === 0 ? state.imageCount - 1 : state.currentIndex - 1;
			return {
				...state,
				currentIndex: prevIndex,
				lastUserInteraction: action.payload,
			};
		}
		case ImageGalleryActionType.UserSetIndex:
			return {
				...state,
				currentIndex: action.payload.index,
				lastUserInteraction: action.payload.timestamp,
			};
		case ImageGalleryActionType.CycleNext: {
			const timeSinceLastInteraction = action.payload.timestamp - state.lastUserInteraction;
			// Only cycle if it's been more than the interval since last user interaction
			if (timeSinceLastInteraction >= action.payload.intervalMs) {
				const nextIndex = (state.currentIndex + 1) % state.imageCount;
				return { ...state, currentIndex: nextIndex };
			}
			return state; // No change if not enough time has passed
		}
		default:
			return state;
	}
}

export const [ImageGalleryProvider, useImageGalleryState, useImageGalleryDispatch] =
	createReducerContext(imageGalleryReducer, initialState);
