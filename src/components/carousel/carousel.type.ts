/**
 * Carousel component types and interfaces
 */

export interface CarouselItemData {
	id: string;
	// content: React.ReactNode;
}

export interface CarouselState {
	currentIndex: number;
	itemCount: number;
	items: CarouselItemData[];
	isTransitioning: boolean;
}

export enum CarouselActionType {
	SetIndex = "SET_INDEX",
	NextItem = "NEXT_ITEM",
	PrevItem = "PREV_ITEM",
	RegisterItem = "REGISTER_ITEM",
	UnregisterItem = "UNREGISTER_ITEM",
	SetTransitioning = "SET_TRANSITIONING",
}

export type CarouselAction =
	| {
			type: CarouselActionType.SetIndex;
			payload: number;
	  }
	| {
			type: CarouselActionType.NextItem;
	  }
	| {
			type: CarouselActionType.PrevItem;
	  }
	| {
			type: CarouselActionType.RegisterItem;
			payload: string;
	  }
	| {
			type: CarouselActionType.UnregisterItem;
			payload: string;
	  }
	| {
			type: CarouselActionType.SetTransitioning;
			payload: boolean;
	  };
