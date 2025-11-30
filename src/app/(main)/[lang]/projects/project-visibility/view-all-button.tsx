"use client";

import type { ReactNode } from "react";
import { useProjectVisibility } from "./project-visibility.state";

interface ViewAllButtonProps {
	children: ReactNode;
}

/**
 * Client wrapper that shows the server-rendered "View All" button
 * only when there are more projects than the row limit
 */
export function ViewAllButton({ children }: ViewAllButtonProps) {
	const { hasMore } = useProjectVisibility();

	if (!hasMore) return null;

	return <div className="mt-8 text-center">{children}</div>;
}
