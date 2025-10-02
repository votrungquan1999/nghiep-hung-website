"use client";

import { Slot } from "@radix-ui/react-slot";
import { useEffect } from "react";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import {
	CarouselProvider,
	useCarouselActions,
	useCarouselItemManager,
	useCarouselItems,
	useCarouselState,
} from "./carousel.state";

interface CarouselRootProps {
	children: React.ReactNode;
}

/**
 * Carousel root component that provides context and manages children
 * @param children - React nodes to be rendered inside the carousel
 * @param className - Optional CSS class name for styling
 */
export function CarouselRoot({ children }: CarouselRootProps) {
	return <CarouselProvider>{children}</CarouselProvider>;
}

interface CarouselItemProps {
	children: React.ReactNode;
	className?: string;
	id: string;
}

/**
 * Carousel item component that registers itself with the root context
 * @param children - React nodes to be rendered as carousel item content
 * @param className - Optional CSS class name for styling
 */
export function CarouselItem({ children, className, id }: CarouselItemProps) {
	const { registerItem, unregisterItem } = useCarouselItemManager();

	// biome-ignore lint/correctness/useExhaustiveDependencies: don't want to continuously register and unregister
	useEffect(() => {
		registerItem(id);

		return () => {
			unregisterItem(id);
		};
	}, []);

	return <div className={cn("w-full flex-shrink-0", className)}>{children}</div>;
}

interface CarouselButtonProps {
	children: React.ReactNode;
	asChild?: boolean;
	className?: string;
}

/**
 * Carousel next button component that navigates to the next carousel item
 * @param children - React nodes to be rendered inside the button
 * @param asChild - Whether to render as a child component using Slot
 * @param className - Optional CSS class name for styling
 */
export function CarouselNextButton({ children, asChild = false, className }: CarouselButtonProps) {
	const { hasMultipleItems } = useCarouselState();
	const { goToNext } = useCarouselActions();

	if (!hasMultipleItems) return null;

	const handleClick = () => {
		goToNext();
	};

	if (asChild) {
		return (
			<Slot onClick={handleClick} className={className}>
				{children}
			</Slot>
		);
	}

	return (
		<Button variant="outline" size="sm" onClick={handleClick} className={className}>
			{children}
		</Button>
	);
}

/**
 * Carousel previous button component that navigates to the previous carousel item
 * @param children - React nodes to be rendered inside the button
 * @param asChild - Whether to render as a child component using Slot
 * @param className - Optional CSS class name for styling
 */
export function CarouselPrevButton({ children, asChild = false, className }: CarouselButtonProps) {
	const { hasMultipleItems } = useCarouselState();
	const { goToPrevious } = useCarouselActions();

	if (!hasMultipleItems) return null;

	const handleClick = () => {
		goToPrevious();
	};

	if (asChild) {
		return (
			<Slot onClick={handleClick} className={className}>
				{children}
			</Slot>
		);
	}

	return (
		<Button variant="outline" size="sm" onClick={handleClick} className={className}>
			{children}
		</Button>
	);
}

interface CarouselContentProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * Carousel content component that provides the container for carousel items
 * Items are rendered by CarouselItem components in the composition
 * @param children - React nodes to be rendered as carousel items
 * @param className - Optional CSS class name for styling
 */
export function CarouselContent({ children, className }: CarouselContentProps) {
	const { currentIndex } = useCarouselState();

	return (
		<div className={cn("overflow-hidden max-w-3xl", className)}>
			<div
				className="flex transition-transform duration-300 ease-in-out h-full"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{children}
			</div>
		</div>
	);
}

interface CarouselDotsProps {
	className?: string;
}

/**
 * Carousel dots component that renders navigation dots for direct item selection
 * @param className - Optional CSS class name for styling
 */
export function CarouselDots({ className }: CarouselDotsProps) {
	const { hasMultipleItems, currentIndex } = useCarouselState();
	const { goToSlide } = useCarouselActions();
	const items = useCarouselItems();

	if (!hasMultipleItems) return null;

	return (
		<div className={cn("flex gap-2", className)}>
			{items.map((item, index) => (
				<button
					key={`carousel-dot-${item.id}`}
					type="button"
					onClick={() => goToSlide(index)}
					className={cn(
						"size-2 rounded-full transition-colors",
						index === currentIndex ? "bg-primary" : "bg-muted",
					)}
				/>
			))}
		</div>
	);
}
