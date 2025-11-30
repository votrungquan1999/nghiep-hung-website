import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsSectionDatabase from "src/app/(main)/[lang]/projects/projects-section-database";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { mockProjectDocuments } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("filter-interaction");

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

describe("Project Filter Interaction", () => {
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

	describe("Filter Buttons", () => {
		it("renders All button as selected by default", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			const allButton = screen.getByRole("button", { name: "All" });
			expect(allButton).toBeInTheDocument();
		});

		it("shows all 3 projects when All is selected", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(3);
			});
		});

		it("filters to show only Commercial projects when Commercial button is clicked", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			// Wait for initial render
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(3);
			});

			// Click Commercial filter
			await user.click(screen.getByRole("button", { name: "Commercial" }));

			// Should show only 2 Commercial projects
			await waitFor(() => {
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(2);
			});

			// Verify the correct projects are shown
			expect(screen.getByText("Commercial Building A")).toBeInTheDocument();
			expect(screen.getByText("Commercial Center C")).toBeInTheDocument();
			expect(screen.queryByText("Industrial Factory B")).not.toBeInTheDocument();
		});

		it("filters to show only Industrial projects when Industrial button is clicked", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(3);
			});

			// Click Industrial filter
			await user.click(screen.getByRole("button", { name: "Industrial" }));

			// Should show only 1 Industrial project
			await waitFor(() => {
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(1);
			});

			// Verify the correct project is shown
			expect(screen.getByText("Industrial Factory B")).toBeInTheDocument();
			expect(screen.queryByText("Commercial Building A")).not.toBeInTheDocument();
		});

		it("shows all projects again when All button is clicked after filtering", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(3);
			});

			// First filter by Commercial
			await user.click(screen.getByRole("button", { name: "Commercial" }));
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(2);
			});

			// Then click All
			await user.click(screen.getByRole("button", { name: "All" }));

			// Should show all 3 projects again
			await waitFor(() => {
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(3);
			});
		});

		it("can switch between different category filters", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(3);
			});

			// Click Commercial
			await user.click(screen.getByRole("button", { name: "Commercial" }));
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(2);
			});

			// Switch to Industrial
			await user.click(screen.getByRole("button", { name: "Industrial" }));
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(1);
			});

			// Switch back to Commercial
			await user.click(screen.getByRole("button", { name: "Commercial" }));
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(2);
			});
		});
	});
});
