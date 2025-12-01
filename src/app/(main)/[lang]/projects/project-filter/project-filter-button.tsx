"use client";

import { Slot } from "@radix-ui/react-slot";
import { useProjectFilterActions, useProjectFilterState } from "./project-filter.state";

interface FilterButtonSlotProps {
	id: string | null; // null = "All"
	children: React.ReactNode;
}

/**
 * Slot that shows when this ID matches selected category
 * Uses Radix Slot to merge onClick onto the child Button
 * @param id - Category ID to match (null for "All")
 * @param children - Server-rendered Button element
 */
export function ActiveFilterButton({ id, children }: FilterButtonSlotProps) {
	const { selectedCategory } = useProjectFilterState();
	const { selectCategory, selectAll } = useProjectFilterActions();

	if (selectedCategory !== id) return null;

	return <Slot onClick={id === null ? selectAll : () => selectCategory(id)}>{children}</Slot>;
}

/**
 * Slot that shows when this ID does NOT match selected category
 * Uses Radix Slot to merge onClick onto the child Button
 * @param id - Category ID to check (null for "All")
 * @param children - Server-rendered Button element
 */
export function InactiveFilterButton({ id, children }: FilterButtonSlotProps) {
	const { selectedCategory } = useProjectFilterState();
	const { selectCategory, selectAll } = useProjectFilterActions();

	if (selectedCategory === id) return null;

	return <Slot onClick={id === null ? selectAll : () => selectCategory(id)}>{children}</Slot>;
}
