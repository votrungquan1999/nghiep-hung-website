"use client";

import { getStandardColumns } from "./get-standard-columns";
import { GridVisibilityController } from "./grid-visibility-controller";

interface StandardGridVisibilityControllerProps {
	itemIds: string[];
	limitRows?: boolean;
	children: React.ReactNode;
}

/**
 * Standard grid visibility controller with preset configuration
 * Uses standard 3-column grid with 2-row limit
 * @param itemIds - Array of item IDs to manage
 * @param limitRows - Whether to apply row limiting (default: true)
 * @param children - Child components to render
 */
export function StandardGridVisibilityController({
	itemIds,
	limitRows = true,
	children,
}: StandardGridVisibilityControllerProps) {
	return (
		<GridVisibilityController
			itemIds={itemIds}
			maxRows={2}
			getColumns={getStandardColumns}
			limitRows={limitRows}
		>
			{children}
		</GridVisibilityController>
	);
}
