import { screen, waitFor } from "@testing-library/react";
import ProjectsSectionDatabase from "src/app/(main)/[lang]/projects/projects-section-database";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { mockProjectDocuments } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("projects-filter");

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

describe("ProjectsSectionDatabase Filter", () => {
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

	it("renders filter buttons for each category", async () => {
		await renderAsync(<ProjectsSectionDatabase locale="en" />);

		expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Commercial" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Industrial" })).toBeInTheDocument();
	});

	it("renders project names from seeded data", async () => {
		await renderAsync(<ProjectsSectionDatabase locale="en" />);

		await waitFor(() => {
			expect(screen.getByText("Commercial Building A")).toBeInTheDocument();
			expect(screen.getByText("Industrial Factory B")).toBeInTheDocument();
			expect(screen.getByText("Commercial Center C")).toBeInTheDocument();
		});
	});
});
