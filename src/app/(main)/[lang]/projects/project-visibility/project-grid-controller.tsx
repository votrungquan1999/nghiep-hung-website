"use client";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useProjectFilterState } from "../project-filter/project-filter.state";
import { ProjectVisibilityContext } from "./project-visibility.state";

const MAX_ROWS = 2;

/**
 * Get number of columns based on window width
 * Matches Tailwind breakpoints: md:grid-cols-2 lg:grid-cols-3
 */
function getColumns(width: number): number {
	if (width >= 1024) return 3; // lg
	if (width >= 768) return 2; // md
	return 1;
}

interface ProjectGridControllerProps {
	projectIds: string[];
	children: React.ReactNode;
}

/**
 * Client component that manages project visibility based on:
 * - Filter state (selected category)
 * - Window width (columns)
 * - Row limit (MAX_ROWS)
 *
 * Cards register themselves when they load, and visibility is recalculated.
 */
export function ProjectGridController({ projectIds, children }: ProjectGridControllerProps) {
	const { selectedCategory } = useProjectFilterState();
	const [columns, setColumns] = useState(3);
	const [isReady, setIsReady] = useState(false);
	const [loadedProjects, setLoadedProjects] = useState<Map<string, string>>(new Map());

	useLayoutEffect(() => {
		const updateColumns = () => {
			setColumns(getColumns(window.innerWidth));
			setIsReady(true);
		};
		updateColumns();
		window.addEventListener("resize", updateColumns);
		return () => window.removeEventListener("resize", updateColumns);
	}, []);

	const registerProject = useCallback((id: string, categoryEn: string) => {
		setLoadedProjects((prev) => {
			if (prev.get(id) === categoryEn) return prev;
			const next = new Map(prev);
			next.set(id, categoryEn);
			return next;
		});
	}, []);

	const { visibleIds, hasMore } = useMemo(() => {
		// Filter loaded projects by category (maintain original order from projectIds)
		const filtered = projectIds.filter((id) => {
			const category = loadedProjects.get(id);
			if (!category) return false; // Not loaded yet
			return !selectedCategory || category === selectedCategory;
		});

		const maxItems = MAX_ROWS * columns;
		const visible = new Set(filtered.slice(0, maxItems));

		return {
			visibleIds: visible,
			hasMore: filtered.length > maxItems,
		};
	}, [projectIds, loadedProjects, selectedCategory, columns]);

	const isVisible = useCallback((id: string) => visibleIds.has(id), [visibleIds]);

	const contextValue = useMemo(
		() => ({
			registerProject,
			isVisible,
			hasMore,
			isReady,
		}),
		[registerProject, isVisible, hasMore, isReady],
	);

	return (
		<ProjectVisibilityContext.Provider value={contextValue}>
			<div style={{ visibility: isReady ? "visible" : "hidden" }}>{children}</div>
		</ProjectVisibilityContext.Provider>
	);
}
