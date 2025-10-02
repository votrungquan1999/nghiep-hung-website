import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNextButton,
	CarouselPrevButton,
	CarouselRoot,
} from "src/components/carousel";
import { coreValues } from "./core-values.data";

/**
 * Core values carousel component that displays each core value in a slide
 * Users can navigate between the 7 core values using navigation controls
 */
export function CoreValuesCarousel() {
	return (
		<CarouselRoot>
			<CarouselContent className="w-full max-w-sm sm:max-w-[622px]">
				{coreValues.map((value) => {
					return (
						<CarouselItem key={value.id} id={value.id.toString()}>
							<div className="p-4 space-y-4 h-full flex flex-col sm:p-6 sm:space-y-6">
								{/* Header */}
								<div className="text-center space-y-2 flex-shrink-0">
									<h3 className="text-xl font-serif font-bold text-foreground sm:text-2xl">
										{value.title}
									</h3>
									<p className="text-sm text-muted-foreground sm:text-base">{value.description}</p>
								</div>

								{/* Items list */}
								<div className="space-y-2 flex-1 overflow-y-auto sm:space-y-3">
									{value.items.map((item, index) => (
										<div key={`core-value-${value.id}-item-${index}`} className="flex items-start">
											<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0 sm:w-2 sm:h-2 sm:mt-2 sm:mr-4" />
											<p className="text-xs text-foreground leading-relaxed sm:text-sm">{item}</p>
										</div>
									))}
								</div>
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			{/* Navigation controls */}
			<div className="flex items-center justify-between mt-4 sm:mt-6">
				<CarouselPrevButton className="flex items-center gap-2">
					<ChevronLeft className="size-4" />
					Trước
				</CarouselPrevButton>
				<CarouselDots />
				<CarouselNextButton className="flex items-center gap-2">
					Sau
					<ChevronRight className="size-4" />
				</CarouselNextButton>
			</div>
		</CarouselRoot>
	);
}
