import {
	useCarouselActions,
	useCarouselItemManager,
	useCarouselItems,
	useCarouselState,
} from "./carousel.state";
import {
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNextButton,
	CarouselPrevButton,
	CarouselRoot,
} from "./carousel.ui";

// Export individual components for composition
export { CarouselRoot };
export { CarouselItem };
export { CarouselContent };
export { CarouselNextButton };
export { CarouselPrevButton };
export { CarouselDots };
export { useCarouselState };
export { useCarouselActions };
export { useCarouselItemManager };
export { useCarouselItems };

export type { CarouselItemData } from "./carousel.type";
