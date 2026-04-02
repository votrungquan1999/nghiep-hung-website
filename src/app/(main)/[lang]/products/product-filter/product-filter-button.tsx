"use client";

import { Slot } from "@radix-ui/react-slot";
import { useProductFilterActions, useProductFilterState } from "./product-filter.state";

interface FilterButtonSlotProps {
	id: string | null; // null = "All"
	children: React.ReactNode;
}

/** Slot shown when this ID matches the selected category */
export function ActiveFilterButton({ id, children }: FilterButtonSlotProps) {
	const { selectedCategory } = useProductFilterState();
	const { selectCategory, selectAll } = useProductFilterActions();

	if (selectedCategory !== id) return null;

	return <Slot onClick={id === null ? selectAll : () => selectCategory(id)}>{children}</Slot>;
}

/** Slot shown when this ID does NOT match the selected category */
export function InactiveFilterButton({ id, children }: FilterButtonSlotProps) {
	const { selectedCategory } = useProductFilterState();
	const { selectCategory, selectAll } = useProductFilterActions();

	if (selectedCategory === id) return null;

	return <Slot onClick={id === null ? selectAll : () => selectCategory(id)}>{children}</Slot>;
}
