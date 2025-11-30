import { screen, waitFor } from "@testing-library/react";
import ProjectsSectionDatabase from "src/app/(main)/[lang]/projects/projects-section-database";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { mockProjectDocuments } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("projects-section");

// vi.mock is hoisted - order in source doesn't matter
vi.mock("src/lib/database", () => ({
	getDatabase: async () => testDb.getDb(),
}));

// Mock window.innerWidth for column calculation
const mockWindowWidth = (width: number) => {
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value: width,
	});
	window.dispatchEvent(new Event("resize"));
};

describe("ProjectsSectionDatabase", () => {
	beforeAll(async () => {
		await testDb.connect();
		await testDb.seedProjects(mockProjectDocuments);
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	beforeEach(() => {
		mockWindowWidth(1024);
	});

	it("renders correct number of projects from database", async () => {
		await renderAsync(<ProjectsSectionDatabase locale="en" />);

		await waitFor(() => {
			const projectCards = screen.getAllByTestId("project-card");
			expect(projectCards).toHaveLength(3);
		});
	});
});
