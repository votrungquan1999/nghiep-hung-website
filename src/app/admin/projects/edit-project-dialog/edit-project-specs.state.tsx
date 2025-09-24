"use client";

import { useState } from "react";
import type { MultilingualText } from "src/lib/types/common.type";

interface EditProjectSpec extends MultilingualText {
	id: string;
}

/**
 * Generates a unique ID for new specs
 * Uses timestamp and random number for uniqueness
 * @returns Unique string identifier for a spec
 */
function generateSpecId(): string {
	return `spec-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Hook to manage project specifications editing
 * Provides specs data and actions for adding, removing, and updating specs
 * @param initialSpecs - Initial specifications to populate the form
 * @returns Object containing specs state and spec management actions
 */
export function useEditProjectSpecs(initialSpecs: MultilingualText[]) {
	// Convert initial specs to specs with IDs
	const [specs, setSpecs] = useState<EditProjectSpec[]>(() =>
		initialSpecs.map((spec, index) => ({
			...spec,
			id: `initial-spec-${index}`,
		})),
	);

	/**
	 * Adds a new empty specification
	 */
	const addSpec = () => {
		const newSpec: EditProjectSpec = {
			id: generateSpecId(),
			en: "",
			vi: "",
		};
		setSpecs((prevSpecs) => [...prevSpecs, newSpec]);
	};

	/**
	 * Removes a specification by ID
	 * @param specId - ID of the specification to remove
	 */
	const removeSpec = (specId: string) => {
		setSpecs((prevSpecs) => prevSpecs.filter((spec) => spec.id !== specId));
	};

	/**
	 * Updates a specification's value for a specific language
	 * @param specId - ID of the specification to update
	 * @param language - Language to update ("en" or "vi")
	 * @param value - New value for the specification
	 */
	const updateSpec = (specId: string, language: "en" | "vi", value: string) => {
		setSpecs((prevSpecs) =>
			prevSpecs.map((spec) => (spec.id === specId ? { ...spec, [language]: value } : spec)),
		);
	};

	return {
		specs,
		addSpec,
		removeSpec,
		updateSpec,
	};
}
