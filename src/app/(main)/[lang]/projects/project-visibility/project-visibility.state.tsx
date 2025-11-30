"use client";

import { createContext, useContext } from "react";

interface ProjectVisibilityContextValue {
	registerProject: (id: string, categoryEn: string) => void;
	isVisible: (id: string) => boolean;
	hasMore: boolean;
	isReady: boolean;
}

const ProjectVisibilityContext = createContext<ProjectVisibilityContextValue | null>(null);

export function useProjectVisibility() {
	const context = useContext(ProjectVisibilityContext);
	if (!context) {
		throw new Error("useProjectVisibility must be used within ProjectVisibilityProvider");
	}
	return context;
}

export { ProjectVisibilityContext };
