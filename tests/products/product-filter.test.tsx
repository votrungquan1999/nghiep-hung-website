import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsSectionDatabase from "src/app/(main)/[lang]/products/products-section-database";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { createMockProductDocument } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

const testDb: TestDatabase = createTestDatabase("product-filter");

vi.mock("src/lib/database", () => ({
	getDatabase: async () => testDb.getDb(),
}));

Object.defineProperty(window, "innerWidth", {
	writable: true,
	configurable: true,
	value: 1024,
});

describe("Product Filter", () => {
	beforeAll(async () => {
		await testDb.connect();
		await testDb.seedProducts([
			createMockProductDocument({
				id: "filter-1",
				name: { en: "Spiral Duct", vi: "Ống xoắn" },
				category: { en: "Ventilation", vi: "Thông gió" },
			}),
			createMockProductDocument({
				id: "filter-2",
				name: { en: "Square Duct", vi: "Ống vuông" },
				category: { en: "Exhaust", vi: "Hút khói" },
			}),
			createMockProductDocument({
				id: "filter-3",
				name: { en: "Flexible Duct", vi: "Ống mềm" },
				category: { en: "Ventilation", vi: "Thông gió" }, // same as filter-1
			}),
			createMockProductDocument({
				id: "filter-4",
				name: { en: "Plain Duct", vi: "Ống thường" },
				// no category — goes into "Other"
			}),
		]);
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	describe("Step 4: Filter buttons render from live DB categories", () => {
		it("should render an 'All' filter button", async () => {
			await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

			await waitFor(() => {
				expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
			});
		});

		it("should render unique category filter buttons from DB", async () => {
			await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

			await waitFor(() => {
				// Two unique categories from DB
				expect(screen.getByRole("button", { name: "Ventilation" })).toBeInTheDocument();
				expect(screen.getByRole("button", { name: "Exhaust" })).toBeInTheDocument();
				// "Other" for uncategorized product
				expect(screen.getByRole("button", { name: /other/i })).toBeInTheDocument();
			});
		});
	});

	describe("Step 5: Clicking a filter shows only matching products", () => {
		it("should show only products matching the clicked category", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

			await waitFor(() => {
				expect(screen.getByRole("button", { name: "Ventilation" })).toBeInTheDocument();
			});

			// When: click "Ventilation" filter
			await user.click(screen.getByRole("button", { name: "Ventilation" }));

			// Then: two ventilation products visible, exhaust product hidden
			await waitFor(() => {
				expect(screen.getByText("Spiral Duct")).toBeInTheDocument();
				expect(screen.getByText("Flexible Duct")).toBeInTheDocument();
				expect(screen.queryByText("Square Duct")).not.toBeInTheDocument();
				expect(screen.queryByText("Plain Duct")).not.toBeInTheDocument();
			});
		});

		it("should show all products when 'All' is clicked", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

			// First filter down
			await waitFor(() => {
				expect(screen.getByRole("button", { name: "Exhaust" })).toBeInTheDocument();
			});
			await user.click(screen.getByRole("button", { name: "Exhaust" }));

			// Then click All
			await user.click(screen.getByRole("button", { name: /all/i }));

			await waitFor(() => {
				expect(screen.getByText("Spiral Duct")).toBeInTheDocument();
				expect(screen.getByText("Square Duct")).toBeInTheDocument();
				expect(screen.getByText("Flexible Duct")).toBeInTheDocument();
				expect(screen.getByText("Plain Duct")).toBeInTheDocument();
			});
		});
	});

	describe("Step 6: Products without category appear under 'Other'", () => {
		it("should show only uncategorized products when 'Other' is clicked", async () => {
			const user = userEvent.setup();
			await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

			await waitFor(() => {
				expect(screen.getByRole("button", { name: /other/i })).toBeInTheDocument();
			});

			await user.click(screen.getByRole("button", { name: /other/i }));

			await waitFor(() => {
				expect(screen.getByText("Plain Duct")).toBeInTheDocument();
				expect(screen.queryByText("Spiral Duct")).not.toBeInTheDocument();
				expect(screen.queryByText("Square Duct")).not.toBeInTheDocument();
				expect(screen.queryByText("Flexible Duct")).not.toBeInTheDocument();
			});
		});
	});
});
