"use client";

import { useCreateProjectSpecs } from "./create-project-dialog.state";

/**
 * Hidden input component that stores the project specifications as a JSON string
 * This component renders hidden input fields with the multilingual specs data
 * for form submission purposes
 * @returns JSX element containing hidden inputs or null if no specs
 */
export function HiddenSpecsInput() {
	const { specs, hasSpecs } = useCreateProjectSpecs();

	if (!hasSpecs) {
		return null;
	}

	// Filter out empty specs (both en and vi must be empty)
	const validSpecs = specs
		.filter((spec) => spec.en.trim().length > 0 || spec.vi.trim().length > 0)
		.map(({ id, ...spec }) => spec); // Remove id from the data sent to server

	if (validSpecs.length === 0) {
		return null;
	}

	return <input type="hidden" name="projectSpecs" value={JSON.stringify(validSpecs)} />;
}
