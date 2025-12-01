"use client";

import { createContext, useContext } from "react";

interface GridVisibilityContextValue {
	registerItem: (id: string) => void;
	isVisible: (id: string) => boolean;
	hasMore: boolean;
	isReady: boolean;
}

const GridVisibilityContext = createContext<GridVisibilityContextValue | null>(null);

/**
 * Hook to access grid visibility context
 * Must be used within a GridVisibilityController
 * @returns Grid visibility context value
 */
export function useGridVisibility() {
	const context = useContext(GridVisibilityContext);
	if (!context) {
		throw new Error("useGridVisibility must be used within GridVisibilityController");
	}
	return context;
}

export { GridVisibilityContext };
