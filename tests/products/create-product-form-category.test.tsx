import { render, screen } from "@testing-library/react";
import { CreateProductForm } from "src/app/admin/products/create-product-dialog/create-product-form";
import { describe, expect, it, vi } from "vitest";

// Mock next/navigation (required by Form components)
vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

describe("Create Product Form — category fields rendered", () => {
	it("should render the Product Category label", () => {
		// Given: the create product form is rendered
		render(<CreateProductForm />);

		// Then: there is a label for Product Category
		expect(screen.getByText(/product category/i)).toBeInTheDocument();
	});

	it("should render the category EN input field", () => {
		// Given: the create product form is rendered
		render(<CreateProductForm />);

		// Then: an input with name productCategoryEn exists
		const input = document.querySelector("input[name='productCategoryEn']");
		expect(input).not.toBeNull();
	});

	it("should render the category VI input field", () => {
		// Given: the create product form is rendered
		render(<CreateProductForm />);

		// Then: an input with name productCategoryVi exists
		const input = document.querySelector("input[name='productCategoryVi']");
		expect(input).not.toBeNull();
	});
});
