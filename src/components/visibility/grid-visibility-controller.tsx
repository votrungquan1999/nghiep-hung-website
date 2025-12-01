"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { GridVisibilityContext } from "./grid-visibility-context";

interface GridVisibilityControllerProps {
	itemIds: string[];
	maxRows: number;
	getColumns: (width: number) => number;
	limitRows?: boolean;
	children: React.ReactNode;
}

/**
 * Client component that manages item visibility based on:
 * - Window width (columns via getColumns function)
 * - Row limit (maxRows prop, only applied if limitRows is true)
 *
 * Items register themselves when they load, and visibility is recalculated.
 * @param itemIds - Array of item IDs to manage
 * @param maxRows - Maximum number of rows to display
 * @param getColumns - Function to calculate columns based on window width
 * @param limitRows - Whether to apply row limiting (default: true)
 * @param children - Child components to render
 */
export function GridVisibilityController({
	itemIds,
	maxRows,
	getColumns,
	limitRows = true,
	children,
}: GridVisibilityControllerProps) {
	const [columns, setColumns] = useState(3);
	const [isReady, setIsReady] = useState(false);
	const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set());

	useLayoutEffect(() => {
		const updateColumns = () => {
			setColumns(getColumns(window.innerWidth));
			setIsReady(true);
		};
		updateColumns();
		window.addEventListener("resize", updateColumns);
		return () => window.removeEventListener("resize", updateColumns);
	}, [getColumns]);

	const registerItem = useCallback((id: string) => {
		setLoadedItems((prev) => {
			if (prev.has(id)) return prev;
			const next = new Set(prev);
			next.add(id);
			return next;
		});
	}, []);

	const { visibleIds, hasMore } = useMemo(() => {
		// Filter to only loaded items (maintain order from itemIds)
		const loaded = itemIds.filter((id) => loadedItems.has(id));

		// If limitRows is false, show all items
		if (!limitRows) {
			return {
				visibleIds: new Set(loaded),
				hasMore: false,
			};
		}

		// Apply row limiting
		const maxItems = maxRows * columns;
		const visible = new Set(loaded.slice(0, maxItems));

		return {
			visibleIds: visible,
			hasMore: loaded.length > maxItems,
		};
	}, [itemIds, loadedItems, maxRows, columns, limitRows]);

	const isVisible = useCallback((id: string) => visibleIds.has(id), [visibleIds]);

	const contextValue = useMemo(
		() => ({
			registerItem,
			isVisible,
			hasMore,
			isReady,
		}),
		[registerItem, isVisible, hasMore, isReady],
	);

	return (
		<GridVisibilityContext.Provider value={contextValue}>
			<div style={{ visibility: isReady ? "visible" : "hidden" }}>{children}</div>
		</GridVisibilityContext.Provider>
	);
}
