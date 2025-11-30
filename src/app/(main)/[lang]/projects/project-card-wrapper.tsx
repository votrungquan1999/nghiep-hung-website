"use client";

import { type ReactNode, useEffect } from "react";
import { useProjectVisibility } from "./project-visibility";

interface ProjectCardWrapperProps {
	id: string;
	categoryEn: string;
	children: ReactNode;
}

/**
 * Wrapper that:
 * 1. Registers the project's category with the visibility controller
 * 2. Shows/hides children based on visibility state (filter + row limit)
 */
export function ProjectCardWrapper({ id, categoryEn, children }: ProjectCardWrapperProps) {
	const { registerProject, isVisible } = useProjectVisibility();

	// Register this project's category when mounted
	useEffect(() => {
		registerProject(id, categoryEn);
	}, [id, categoryEn, registerProject]);

	// Hide if not visible (filtered out or beyond row limit)
	if (!isVisible(id)) return null;

	return <>{children}</>;
}
