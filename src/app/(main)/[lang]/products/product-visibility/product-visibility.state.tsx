"use client";

import { createContext, useContext } from "react";

interface ProductVisibilityContextValue {
	registerProduct: (id: string, categoryEn: string | null) => void;
	isVisible: (id: string) => boolean;
	hasMore: boolean;
	isReady: boolean;
}

const ProductVisibilityContext = createContext<ProductVisibilityContextValue | null>(null);

export function useProductVisibility() {
	const context = useContext(ProductVisibilityContext);
	if (!context) {
		throw new Error("useProductVisibility must be used within ProductGridController");
	}
	return context;
}

export { ProductVisibilityContext };
