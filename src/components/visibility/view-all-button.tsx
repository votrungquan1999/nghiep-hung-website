"use client";

import type { ReactNode } from "react";
import { useGridVisibility } from "./grid-visibility-context";

interface ViewAllButtonProps {
	children: ReactNode;
}

/**
 * Client wrapper that shows children only when there are more items than the row limit
 * @param children - Button or link component to conditionally display
 */
export function ViewAllButton({ children }: ViewAllButtonProps) {
	const { hasMore } = useGridVisibility();

	if (!hasMore) return null;

	return <div className="mt-8 text-center">{children}</div>;
}
