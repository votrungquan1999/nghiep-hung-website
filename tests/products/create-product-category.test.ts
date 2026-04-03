import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createProduct } from "src/app/admin/products/create-product-dialog/create-product-dialog.actions";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

// Create isolated database for this test file
const testDb: TestDatabase = createTestDatabase("create-product-category");

// vi.mock is hoisted - must be at file level
vi.mock("src/lib/database", () => ({
	getDatabase: async () => testDb.getDb(),
}));

// Mock S3 upload so we don't need real AWS credentials
vi.mock("src/lib/s3", () => ({
	uploadToS3: vi.fn().mockResolvedValue({
		key: "products/test-id/image.jpg",
		url: "https://bucket.s3.amazonaws.com/products/test-id/image.jpg",
	}),
}));

describe("Create Product — category field", () => {
	beforeAll(async () => {
		await testDb.connect();
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	it("should persist category to the database when provided on creation", async () => {
		// Given: a FormData with name, description, status, image, and category
		const formData = new FormData();
		formData.append("productNameEn", "Test Duct");
		formData.append("productNameVi", "Ống gió thử nghiệm");
		formData.append("productDescriptionEn", "A test product");
		formData.append("productDescriptionVi", "Sản phẩm thử nghiệm");
		formData.append("productStatus", "active");
		formData.append("productCategoryEn", "Ống Gió");
		formData.append("productCategoryVi", "Ống Gió");
		formData.append("selectedImageIndex", "0");

		// Attach a mock image file
		const mockFile = new File(["image-content"], "test.jpg", { type: "image/jpeg" });
		formData.append("productImages", mockFile);

		// When: the create action is called
		const result = await createProduct(formData);

		// Then: it succeeds
		expect(result.success).toBe(true);

		// And: the saved document has the category field
		const db = testDb.getDb();
		const saved = await db.collection("products").findOne({ "name.en": "Test Duct" });
		expect(saved).not.toBeNull();
		expect(saved?.category).toEqual({ en: "Ống Gió", vi: "Ống Gió" });
	});

	it("should persist successfully without a category (category is optional)", async () => {
		// Given: a FormData WITHOUT category fields
		const formData = new FormData();
		formData.append("productNameEn", "No Category Product");
		formData.append("productNameVi", "Sản phẩm không danh mục");
		formData.append("productDescriptionEn", "No category");
		formData.append("productDescriptionVi", "Không danh mục");
		formData.append("productStatus", "active");
		formData.append("selectedImageIndex", "0");

		const mockFile = new File(["image-content"], "test.jpg", { type: "image/jpeg" });
		formData.append("productImages", mockFile);

		// When
		const result = await createProduct(formData);

		// Then: still succeeds — category is optional
		expect(result.success).toBe(true);

		const db = testDb.getDb();
		const saved = await db.collection("products").findOne({ "name.en": "No Category Product" });
		expect(saved).not.toBeNull();
		// category should be absent or undefined (not an empty object)
		expect(saved?.category).toBeUndefined();
	});
});
