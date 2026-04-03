"use client";

import { useProductVisibility } from "./product-visibility.state";

/**
 * Shows a "View All" button slot only when there are more products than the current row limit
 */
export function ViewAllButton({ children }: { children: React.ReactNode }) {
	const { hasMore } = useProductVisibility();
	if (!hasMore) return null;
	return <div className="flex justify-center mt-8">{children}</div>;
}
