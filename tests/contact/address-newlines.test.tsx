import { waitFor } from "@testing-library/react";
import ContactSectionDatabase from "src/app/(main)/[lang]/contact/contact-section-database";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderAsync } from "../utils/render-async";
import { createTestDatabase, type TestDatabase } from "../utils/test-database";

const testDb: TestDatabase = createTestDatabase("address-newlines");

vi.mock("src/lib/database", () => ({
	getDatabase: async () => testDb.getDb(),
}));

// Mock next/navigation to avoid "invariant expected app router" error
vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

describe("Step 7: Address field preserves newlines on render", () => {
	beforeAll(async () => {
		await testDb.connect();
		const db = testDb.getDb();
		// Seed a contact document with a multi-line address
		await db.collection("contactInfo").insertOne({
			id: "contact-1",
			phone1: "0123456789",
			phone2: "",
			email1: "test@example.com",
			email2: "",
			address: "123 ABC Street\nWard 5, District 1\nHo Chi Minh City",
			workingHours: { vi: "8:00 - 17:00", en: "8:00 - 17:00" },
			socialMedia: [],
		});
	});

	afterAll(async () => {
		await testDb.destroy();
	});

	it("should render the address paragraph with whitespace-pre-line class", async () => {
		// Given: the contact section is rendered with a multi-line address
		await renderAsync(<ContactSectionDatabase locale="en" />);

		// Then: the address paragraph has the whitespace-pre-line CSS class
		await waitFor(() => {
			// Find all paragraphs that contain part of the multi-line address
			const allPs = document.querySelectorAll("p.whitespace-pre-line");
			// At least one should exist and contain the address text
			const addressPs = Array.from(allPs).filter((el) =>
				el.textContent?.includes("123 ABC Street"),
			);
			expect(addressPs.length).toBeGreaterThan(0);
		});
	});

	it("should preserve the full address text content (all lines)", async () => {
		// Given: contact section rendered with seeded multi-line address
		await renderAsync(<ContactSectionDatabase locale="en" />);

		// Then: all parts of the address text are present in the DOM
		await waitFor(() => {
			const allPs = document.querySelectorAll("p.whitespace-pre-line");
			const addressEl = Array.from(allPs).find((el) => el.textContent?.includes("123 ABC Street"));
			expect(addressEl).toBeDefined();
			// All three lines are in the text content
			expect(addressEl?.textContent).toContain("Ward 5, District 1");
			expect(addressEl?.textContent).toContain("Ho Chi Minh City");
		});
	});
});
