import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { updateProduct } from "src/app/admin/products/edit-product-dialog/edit-product-dialog.actions";
import { createMockProductDocument } from "../utils/test-data";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("edit-product-category");

// vi.mock is hoisted - must be at file level
vi.mock("src/lib/database", () => ({
	getDatabase: async () => testDb.getDb(),
}));

describe("Edit Product — category field", () => {
	beforeAll(async () => {
		await testDb.connect();
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	it("should update category in the database when edited", async () => {
		// Given: an existing product with a category
		const existing = createMockProductDocument({
			id: "edit-cat-1",
			name: { en: "Original Product", vi: "Sản phẩm gốc" },
			category: { en: "Old Category", vi: "Danh mục cũ" },
		});
		await testDb.seedProducts([existing]);

		const formData = new FormData();
		formData.append("productId", "edit-cat-1");
		formData.append("productNameEn", "Original Product");
		formData.append("productNameVi", "Sản phẩm gốc");
		formData.append("productDescriptionEn", "Test description");
		formData.append("productDescriptionVi", "Mô tả thử nghiệm");
		formData.append("productStatus", "active");
		formData.append("productCategoryEn", "New Category");
		formData.append("productCategoryVi", "Danh mục mới");

		// When: the update action is called
		const result = await updateProduct(formData);

		// Then: it succeeds and category is updated
		expect(result.success).toBe(true);

		const db = testDb.getDb();
		const saved = await db.collection("products").findOne({ id: "edit-cat-1" });
		expect(saved?.category).toEqual({ en: "New Category", vi: "Danh mục mới" });
	});

	it("should clear category when empty strings are submitted", async () => {
		// Given: an existing product with a category
		const existing = createMockProductDocument({
			id: "edit-cat-2",
			name: { en: "Product With Category", vi: "Sản phẩm có danh mục" },
			category: { en: "Ventilation", vi: "Thông gió" },
		});
		await testDb.seedProducts([existing]);

		const formData = new FormData();
		formData.append("productId", "edit-cat-2");
		formData.append("productNameEn", "Product With Category");
		formData.append("productNameVi", "Sản phẩm có danh mục");
		formData.append("productDescriptionEn", "Test description");
		formData.append("productDescriptionVi", "Mô tả thử nghiệm");
		formData.append("productStatus", "active");
		// No category fields appended — admin left them empty

		// When
		const result = await updateProduct(formData);

		// Then: succeeds and category is removed (unset)
		expect(result.success).toBe(true);

		const db = testDb.getDb();
		const saved = await db.collection("products").findOne({ id: "edit-cat-2" });
		expect(saved?.category).toBeUndefined();
	});
});
