/**
 * Calculate number of columns based on window width
 * Matches Tailwind breakpoints: md:grid-cols-2 lg:grid-cols-3
 * @param width - Window inner width in pixels
 * @returns Number of columns (1, 2, or 3)
 */
export function getStandardColumns(width: number): number {
	if (width >= 1024) return 3; // lg breakpoint
	if (width >= 768) return 2; // md breakpoint
	return 1;
}
