import { render, screen } from "@testing-library/react";
import { EditProductForm } from "src/app/admin/products/edit-product-dialog/edit-product-form";
import { Dialog, DialogContent } from "src/components/ui/dialog";
import type { Product } from "src/server/products";
import { ProductStatus } from "src/server/products";
import { describe, expect, it, vi } from "vitest";

// Mock next/navigation (required by Form components)
vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

const mockProductWithCategory: Product = {
	id: "test-1",
	name: { en: "Test Duct", vi: "Ống gió thử nghiệm" },
	description: { en: "A test product", vi: "Sản phẩm thử nghiệm" },
	category: { en: "Ventilation Ducts", vi: "Ống gió thông gió" },
	status: ProductStatus.Active,
	gallery: [{ key: "test.jpg", url: "https://example.com/test.jpg", isMain: true }],
	createdAt: new Date(),
	updatedAt: new Date(),
};

const mockProductWithoutCategory: Product = {
	...mockProductWithCategory,
	id: "test-2",
	category: undefined,
};

describe("Edit Product Form — category fields rendered", () => {
	it("should render the Product Category label", () => {
		// Given: the edit form is rendered
		render(
			<Dialog open>
				<DialogContent aria-describedby={undefined}>
					<EditProductForm product={mockProductWithCategory} />
				</DialogContent>
			</Dialog>,
		);

		// Then: there is a label for Product Category
		expect(screen.getByText(/product category/i)).toBeInTheDocument();
	});

	it("should render the category EN input pre-populated with the existing value", () => {
		// Given: the edit form is rendered with a product that has a category
		render(
			<Dialog open>
				<DialogContent aria-describedby={undefined}>
					<EditProductForm product={mockProductWithCategory} />
				</DialogContent>
			</Dialog>,
		);

		// Then: the EN category input exists and is pre-filled
		const input = document.querySelector(
			"input[name='productCategoryEn']",
		) as HTMLInputElement | null;
		expect(input).not.toBeNull();
		expect(input?.value).toBe("Ventilation Ducts");
	});

	it("should render the category VI input pre-populated with the existing value", () => {
		// Given: the edit form is rendered with a product that has a category
		render(
			<Dialog open>
				<DialogContent aria-describedby={undefined}>
					<EditProductForm product={mockProductWithCategory} />
				</DialogContent>
			</Dialog>,
		);

		// Then: the VI category input exists and is pre-filled
		const input = document.querySelector(
			"input[name='productCategoryVi']",
		) as HTMLInputElement | null;
		expect(input).not.toBeNull();
		expect(input?.value).toBe("Ống gió thông gió");
	});

	it("should render category inputs as empty when product has no category", () => {
		// Given: the edit form is rendered with a product that has NO category
		render(
			<Dialog open>
				<DialogContent aria-describedby={undefined}>
					<EditProductForm product={mockProductWithoutCategory} />
				</DialogContent>
			</Dialog>,
		);

		// Then: category inputs exist but are empty
		const inputEn = document.querySelector(
			"input[name='productCategoryEn']",
		) as HTMLInputElement | null;
		const inputVi = document.querySelector(
			"input[name='productCategoryVi']",
		) as HTMLInputElement | null;
		expect(inputEn).not.toBeNull();
		expect(inputVi).not.toBeNull();
		expect(inputEn?.value).toBe("");
		expect(inputVi?.value).toBe("");
	});
});
