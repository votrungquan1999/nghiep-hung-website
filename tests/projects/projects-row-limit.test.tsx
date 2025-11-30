import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsSectionDatabase from "src/app/(main)/[lang]/projects/projects-section-database";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { mock7ProjectDocuments } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("row-limit");

// vi.mock is hoisted - must be at file level
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

describe("Projects Row Limiting", () => {
	beforeAll(async () => {
		await testDb.connect();
		await testDb.seedProjects(mock7ProjectDocuments);
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	describe("with lg breakpoint (3 columns, MAX_ROWS=2 → 6 items)", () => {
		beforeEach(() => {
			mockWindowWidth(1024); // lg breakpoint
		});

		it("limits to 6 projects (2 rows × 3 columns) on large screens", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				// MAX_ROWS = 2, columns = 3 → max 6 items
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(6);
			});
		});

		it("shows View All link when there are more projects than limit", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" showViewAll />);

			await waitFor(() => {
				const viewAllLink = screen.getByRole("link", { name: /view all/i });
				expect(viewAllLink).toBeInTheDocument();
				expect(viewAllLink).toHaveAttribute("href", "/en/projects");
			});
		});

		it("does not show View All when showViewAll is false", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(6);
			});

			// View All should not appear since showViewAll is not set
			expect(screen.queryByRole("link", { name: /view all/i })).not.toBeInTheDocument();
		});
	});

	describe("with md breakpoint (2 columns, MAX_ROWS=2 → 4 items)", () => {
		beforeEach(() => {
			mockWindowWidth(768); // md breakpoint
		});

		it("limits to 4 projects (2 rows × 2 columns) on medium screens", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				// MAX_ROWS = 2, columns = 2 → max 4 items
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(4);
			});
		});
	});

	describe("with sm breakpoint (1 column, MAX_ROWS=2 → 2 items)", () => {
		beforeEach(() => {
			mockWindowWidth(375); // mobile
		});

		it("limits to 2 projects (2 rows × 1 column) on small screens", async () => {
			await renderAsync(<ProjectsSectionDatabase locale="en" />);

			await waitFor(() => {
				// MAX_ROWS = 2, columns = 1 → max 2 items
				const projectCards = screen.getAllByTestId("project-card");
				expect(projectCards).toHaveLength(2);
			});
		});
	});

	describe("row limiting with filtering", () => {
		beforeEach(() => {
			mockWindowWidth(1024); // lg breakpoint, 3 columns
		});

		it("applies row limit to filtered results", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProjectsSectionDatabase locale="en" showViewAll />);

			// Initially limited to 6 (2 rows × 3 columns), hasMore = true
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(6);
				expect(screen.getByRole("link", { name: /view all/i })).toBeInTheDocument();
			});

			// Filter to Commercial (4 projects total in extended mock)
			await user.click(screen.getByRole("button", { name: "Commercial" }));

			// All 4 Commercial projects fit in 6 slots
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(4);
			});
			// View All should not show (4 <= 6)
			expect(screen.queryByRole("link", { name: /view all/i })).not.toBeInTheDocument();

			// Filter to Healthcare (1 project)
			await user.click(screen.getByRole("button", { name: "Healthcare" }));

			// Should show only 1 project
			await waitFor(() => {
				expect(screen.getAllByTestId("project-card")).toHaveLength(1);
			});
			expect(screen.queryByRole("link", { name: /view all/i })).not.toBeInTheDocument();
		});
	});
});
