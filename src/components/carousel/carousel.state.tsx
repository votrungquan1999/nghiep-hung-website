"use client";

import { createReducerContext } from "src/contexts/createReducerContext";
import type { CarouselAction, CarouselState } from "./carousel.type";
import { CarouselActionType } from "./carousel.type";

const initialState: CarouselState = {
	currentIndex: 0,
	itemCount: 0,
	items: [],
	isTransitioning: false,
};

function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
	switch (action.type) {
		case CarouselActionType.SetIndex:
			return { ...state, currentIndex: action.payload, isTransitioning: false };
		case CarouselActionType.NextItem: {
			const nextIndex = (state.currentIndex + 1) % state.itemCount;
			return { ...state, currentIndex: nextIndex, isTransitioning: false };
		}
		case CarouselActionType.PrevItem: {
			const prevIndex = state.currentIndex === 0 ? state.itemCount - 1 : state.currentIndex - 1;
			return { ...state, currentIndex: prevIndex, isTransitioning: false };
		}
		case CarouselActionType.RegisterItem: {
			const itemId = action.payload;
			const existingItems = state.items.filter((item) => item.id !== itemId);
			const updatedItems = [...existingItems, { id: itemId }];
			return {
				...state,
				items: updatedItems,
				itemCount: updatedItems.length,
				isTransitioning: false,
			};
		}
		case CarouselActionType.UnregisterItem: {
			const itemId = action.payload;
			const updatedItems = state.items.filter((item) => item.id !== itemId);
			return {
				...state,
				items: updatedItems,
				itemCount: updatedItems.length,
				// Adjust current index if needed
				currentIndex:
					state.currentIndex >= updatedItems.length
						? Math.max(0, updatedItems.length - 1)
						: state.currentIndex,
				isTransitioning: false,
			};
		}
		case CarouselActionType.SetTransitioning:
			return { ...state, isTransitioning: action.payload };
		default:
			return state;
	}
}

const [CarouselProvider, useRawCarouselState, useRawCarouselDispatch] = createReducerContext(
	carouselReducer,
	initialState,
);

/**
 * Hook to access carousel state (read-only)
 * @returns Object containing carousel state information
 */
export function useCarouselState() {
	const rawState = useRawCarouselState();
	return {
		currentIndex: rawState.currentIndex,
		itemCount: rawState.itemCount,
		hasMultipleItems: rawState.items.length > 1,
		hasItems: rawState.items.length > 0,
		isTransitioning: rawState.isTransitioning,
	};
}

/**
 * Hook to access carousel actions
 * @returns Object containing carousel action methods
 */
export function useCarouselActions() {
	const dispatch = useRawCarouselDispatch();
	return {
		goToNext: () => dispatch({ type: CarouselActionType.NextItem }),
		goToPrevious: () => dispatch({ type: CarouselActionType.PrevItem }),
		goToSlide: (index: number) => dispatch({ type: CarouselActionType.SetIndex, payload: index }),
	};
}

/**
 * Hook for carousel item management
 * @returns Methods for registering and managing carousel items
 */
export function useCarouselItemManager() {
	const rawState = useRawCarouselState();
	const rawDispatch = useRawCarouselDispatch();

	const registerItem = (itemId: string) => {
		rawDispatch({ type: CarouselActionType.RegisterItem, payload: itemId });
	};

	const unregisterItem = (itemId: string) => {
		rawDispatch({ type: CarouselActionType.UnregisterItem, payload: itemId });
	};

	const getItemIndex = (itemId: string) => {
		console.log("getItemIndex", itemId, rawState.items);
		return rawState.items.findIndex((item) => item.id === itemId);
	};

	const isCurrentItem = (itemId: string) => {
		const itemIndex = getItemIndex(itemId);
		return itemIndex === rawState.currentIndex;
	};

	return {
		registerItem,
		unregisterItem,
		getItemIndex,
		isCurrentItem,
		hasItems: rawState.items.length > 0,
	};
}

/**
 * Hook to access carousel items
 * @returns Array of carousel items
 */
export function useCarouselItems() {
	const rawState = useRawCarouselState();
	return rawState.items;
}

export { CarouselProvider, useRawCarouselState, useRawCarouselDispatch };
