import { screen, waitFor } from "@testing-library/react";
import ServicesSectionDatabase from "src/app/(main)/[lang]/services/services-section-database";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { mock7ServiceDocuments } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("services-row-limit");

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

describe("Services Row Limiting", () => {
	beforeAll(async () => {
		await testDb.connect();
		await testDb.seedServices(mock7ServiceDocuments);
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	describe("with lg breakpoint (3 columns, MAX_ROWS=2 → 6 items)", () => {
		beforeEach(() => {
			mockWindowWidth(1024); // lg breakpoint
		});

		it("limits to 6 services (2 rows × 3 columns) on large screens", async () => {
			await renderAsync(<ServicesSectionDatabase locale="en" />);

			await waitFor(() => {
				// MAX_ROWS = 2, columns = 3 → max 6 items
				const serviceCards = screen.getAllByTestId("service-card");
				expect(serviceCards).toHaveLength(6);
			});
		});

		it("shows View All link when there are more services than limit", async () => {
			await renderAsync(<ServicesSectionDatabase locale="en" />);

			await waitFor(() => {
				const viewAllLink = screen.getByRole("link", { name: /view all/i });
				expect(viewAllLink).toBeInTheDocument();
				expect(viewAllLink).toHaveAttribute("href", "/en/services");
			});
		});

		it("does not show View All when viewAll is true", async () => {
			await renderAsync(<ServicesSectionDatabase locale="en" viewAll />);

			await waitFor(() => {
				const serviceCards = screen.getAllByTestId("service-card");
				// Should show all 7 items when viewAll is true
				expect(serviceCards).toHaveLength(7);
			});

			// View All should not appear when viewAll is true
			expect(screen.queryByRole("link", { name: /view all/i })).not.toBeInTheDocument();
		});
	});

	describe("with md breakpoint (2 columns, MAX_ROWS=2 → 4 items)", () => {
		beforeEach(() => {
			mockWindowWidth(768); // md breakpoint
		});

		it("limits to 4 services (2 rows × 2 columns) on medium screens", async () => {
			await renderAsync(<ServicesSectionDatabase locale="en" />);

			await waitFor(() => {
				// MAX_ROWS = 2, columns = 2 → max 4 items
				const serviceCards = screen.getAllByTestId("service-card");
				expect(serviceCards).toHaveLength(4);
			});
		});
	});

	describe("with sm breakpoint (1 column, MAX_ROWS=2 → 2 items)", () => {
		beforeEach(() => {
			mockWindowWidth(375); // mobile
		});

		it("limits to 2 services (2 rows × 1 column) on small screens", async () => {
			await renderAsync(<ServicesSectionDatabase locale="en" />);

			await waitFor(() => {
				// MAX_ROWS = 2, columns = 1 → max 2 items
				const serviceCards = screen.getAllByTestId("service-card");
				expect(serviceCards).toHaveLength(2);
			});
		});
	});
});
