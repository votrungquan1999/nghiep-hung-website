"use client";

import { type ReactNode, useEffect } from "react";
import { useGridVisibility } from "./grid-visibility-context";

interface ItemWrapperProps {
	id: string;
	children: ReactNode;
}

/**
 * Wrapper that:
 * 1. Registers the item with the visibility controller
 * 2. Shows/hides children based on visibility state (row limit)
 * @param id - Unique identifier for the item
 * @param children - Child components to conditionally render
 */
export function ItemWrapper({ id, children }: ItemWrapperProps) {
	const { registerItem, isVisible } = useGridVisibility();

	// Register this item when mounted
	useEffect(() => {
		registerItem(id);
	}, [id, registerItem]);

	// Hide if not visible (beyond row limit)
	if (!isVisible(id)) return null;

	return <>{children}</>;
}
