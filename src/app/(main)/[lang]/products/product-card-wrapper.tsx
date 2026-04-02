"use client";

import { type ReactNode, useEffect } from "react";
import { useProductVisibility } from "./product-visibility";

interface ProductCardWrapperProps {
	id: string;
	categoryEn: string | null; // null = uncategorized ("Other")
	children: ReactNode;
}

/**
 * Wrapper that:
 * 1. Registers the product's category with the visibility controller
 * 2. Shows/hides children based on visibility state (filter + row limit)
 *
 * Products with no category pass null, which the grid controller
 * maps to the "Other" bucket.
 */
export function ProductCardWrapper({ id, categoryEn, children }: ProductCardWrapperProps) {
	const { registerProduct, isVisible } = useProductVisibility();

	useEffect(() => {
		registerProduct(id, categoryEn);
	}, [id, categoryEn, registerProduct]);

	if (!isVisible(id)) return null;

	return <>{children}</>;
}
