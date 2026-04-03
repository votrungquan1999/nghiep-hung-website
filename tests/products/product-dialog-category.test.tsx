import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsSectionDatabase from "src/app/(main)/[lang]/products/products-section-database";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { createMockProductDocument } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("product-dialog-category");

// vi.mock is hoisted - must be at file level
vi.mock("src/lib/database", () => ({
	getDatabase: async () => testDb.getDb(),
}));

// Mock window.innerWidth for column calculation
Object.defineProperty(window, "innerWidth", {
	writable: true,
	configurable: true,
	value: 1024,
});

describe("Product Dialog — category label", () => {
	beforeAll(async () => {
		await testDb.connect();
		// Seed all products upfront - no state mutation between tests
		await testDb.seedProducts([
			createMockProductDocument({
				id: "dialog-cat-1",
				name: { en: "Spiral Duct", vi: "Ống xoắn ốc" },
				description: { en: "A quality spiral duct.", vi: "Ống xoắn ốc chất lượng." },
				category: { en: "Ventilation Ducts", vi: "Ống thông gió" },
			}),
			createMockProductDocument({
				id: "dialog-no-cat-1",
				name: { en: "Plain Duct", vi: "Ống thường" },
				description: { en: "No category.", vi: "Không danh mục." },
			}),
		]);
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	it("should show the category label inside the dialog when the product has a category", async () => {
		const user = userEvent.setup();

		// Given: the products section is rendered with the categorized product
		await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

		// When: the Spiral Duct card is clicked to open the dialog
		await waitFor(() => {
			expect(screen.getByText("Spiral Duct")).toBeInTheDocument();
		});
		await user.click(screen.getByText("Spiral Duct"));

		// Then: the category label is visible inside the dialog
		await waitFor(() => {
			const label = screen.getByTestId("product-category-label");
			expect(label).toBeInTheDocument();
			expect(label).toHaveTextContent("Ventilation Ducts");
		});
	});

	it("should not show a category label when the product has no category", async () => {
		const user = userEvent.setup();

		// Given: the products section is rendered
		await renderAsync(<ProductsSectionDatabase locale="en" viewAll />);

		// When: the Plain Duct card (no category) is clicked
		await waitFor(() => {
			expect(screen.getByText("Plain Duct")).toBeInTheDocument();
		});
		await user.click(screen.getByText("Plain Duct"));

		// Then: the dialog opens but no category label is shown
		await waitFor(() => {
			expect(screen.getByText("No category.")).toBeInTheDocument();
		});
		expect(screen.queryByTestId("product-category-label")).not.toBeInTheDocument();
	});
});
