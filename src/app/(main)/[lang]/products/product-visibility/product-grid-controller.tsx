"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useProductFilterState } from "../product-filter/product-filter.state";
import { PRODUCT_OTHER_ID } from "../product-filter/product-filter.type";
import { ProductVisibilityContext } from "./product-visibility.state";

const MAX_ROWS = 2;

function getColumns(width: number): number {
	if (width >= 1024) return 3; // lg
	if (width >= 768) return 2; // md
	return 1;
}

interface ProductGridControllerProps {
	productIds: string[];
	limitRows?: boolean;
	children: React.ReactNode;
}

/**
 * Client component that manages product visibility based on:
 * - Filter state (selected category, including "__other__" for uncategorized)
 * - Window width (columns)
 * - Row limit (MAX_ROWS, only if limitRows is true)
 *
 * Products register their category (null = uncategorized) when they mount.
 * The "Other" filter shows products with null category.
 */
export function ProductGridController({
	productIds,
	limitRows = true,
	children,
}: ProductGridControllerProps) {
	const { selectedCategory } = useProductFilterState();
	const [columns, setColumns] = useState(3);
	const [isReady, setIsReady] = useState(false);
	// Map of productId → categoryEn (null = uncategorized)
	const [loadedProducts, setLoadedProducts] = useState<Map<string, string | null>>(new Map());

	useLayoutEffect(() => {
		const updateColumns = () => {
			setColumns(getColumns(window.innerWidth));
			setIsReady(true);
		};
		updateColumns();
		window.addEventListener("resize", updateColumns);
		return () => window.removeEventListener("resize", updateColumns);
	}, []);

	const registerProduct = useCallback((id: string, categoryEn: string | null) => {
		setLoadedProducts((prev) => {
			if (prev.get(id) === categoryEn) return prev;
			const next = new Map(prev);
			next.set(id, categoryEn);
			return next;
		});
	}, []);

	const { visibleIds, hasMore } = useMemo(() => {
		const filtered = productIds.filter((id) => {
			if (!loadedProducts.has(id)) return false; // not registered yet
			const category = loadedProducts.get(id) ?? null;

			if (selectedCategory === null) return true; // "All"
			if (selectedCategory === PRODUCT_OTHER_ID) return category === null; // "Other" = uncategorized
			return category === selectedCategory; // named category match
		});

		if (!limitRows) {
			return { visibleIds: new Set(filtered), hasMore: false };
		}

		const maxItems = MAX_ROWS * columns;
		const visible = new Set(filtered.slice(0, maxItems));
		return { visibleIds: visible, hasMore: filtered.length > maxItems };
	}, [productIds, loadedProducts, selectedCategory, columns, limitRows]);

	const isVisible = useCallback((id: string) => visibleIds.has(id), [visibleIds]);

	const contextValue = useMemo(
		() => ({ registerProduct, isVisible, hasMore, isReady }),
		[registerProduct, isVisible, hasMore, isReady],
	);

	return (
		<ProductVisibilityContext.Provider value={contextValue}>
			<div style={{ visibility: isReady ? "visible" : "hidden" }}>{children}</div>
		</ProductVisibilityContext.Provider>
	);
}
