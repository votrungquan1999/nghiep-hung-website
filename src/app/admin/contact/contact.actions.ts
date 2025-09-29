"use server";

import type { FormResult } from "src/components/form-state";
import { updateContactInfo } from "src/server/contact";
import { z } from "zod";
import type { ContactInfoFormData, WorkingHours } from "./contact.type";
import { SocialMediaPlatformId } from "./social-media/social-media.type";

/**
 * Zod schema for contact information validation
 * Validates all contact form fields including social media links
 */
const contactInfoSchema = z.object({
	phone1: z.string().min(1, "Primary phone is required"),
	phone2: z.string().optional(),
	email1: z.string().email("Invalid primary email").min(1, "Primary email is required"),
	email2: z.string().email("Invalid secondary email").optional(),
	address: z.string().min(1, "Address is required"),
	workingHours: z.object({
		en: z.string().min(1, "English working hours are required"),
		vi: z.string().min(1, "Vietnamese working hours are required"),
	}),
	socialMediaLinks: z
		.array(
			z.object({
				platformId: z.nativeEnum(SocialMediaPlatformId),
				url: z
					.string()
					.min(1, "Social media URL is required")
					.refine(
						(url) => {
							// Allow empty strings (will be filtered out)
							if (!url.trim()) return true;
							// Check if it's a valid URL
							try {
								new URL(url);
								return true;
							} catch {
								return false;
							}
						},
						{
							message: "Please enter a valid URL (e.g., https://facebook.com/yourpage)",
						},
					),
			}),
		)
		.optional()
		.default([]),
});

/**
 * Server action to update contact information
 * @param formData - Form data containing contact information
 * @returns Promise that resolves to the update result
 */
export async function updateContactInformation(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const phone2 = formData.get("phone2") as string;
		const email2 = formData.get("email2") as string;

		// Extract working hours data from individual fields
		const workingHoursEn = (formData.get("workingHoursEn") as string) || "";
		const workingHoursVi = (formData.get("workingHoursVi") as string) || "";

		const workingHours: WorkingHours = {
			en: workingHoursEn || "Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:00 AM - 12:00 PM",
			vi: workingHoursVi || "Thứ 2 - Thứ 6: 08:00 - 17:30 | Thứ 7: 08:00 - 12:00",
		};

		const rawData = {
			phone1: (formData.get("phone1") as string) || "",
			phone2: phone2 || undefined,
			email1: (formData.get("email1") as string) || "",
			email2: email2 || undefined,
			address: (formData.get("address") as string) || "",
			workingHours,
			socialMediaLinks: (() => {
				const socialMediaLinksData = formData.get("socialMediaLinks") as string;
				if (!socialMediaLinksData) return [];
				try {
					return JSON.parse(socialMediaLinksData);
				} catch {
					return [];
				}
			})(),
		};

		// Validate data using Zod schema
		const validationResult = contactInfoSchema.safeParse(rawData);

		if (!validationResult.success) {
			const errorMessages = validationResult.error.errors.map((err) => {
				const path = err.path.join(".");
				// Make social media URL errors more user-friendly
				if (path.includes("socialMediaLinks") && path.includes("url")) {
					const linkIndex = err.path[1];
					const platformId = rawData.socialMediaLinks?.[linkIndex]?.platformId;
					const platformName = platformId
						? platformId.charAt(0).toUpperCase() + platformId.slice(1)
						: "Social media";
					return `${platformName} URL: ${err.message}`;
				}
				return `${path}: ${err.message}`;
			});
			return {
				success: false,
				error: `Validation failed: ${errorMessages.join(", ")}`,
			};
		}

		const validatedData: ContactInfoFormData = validationResult.data;

		// Update contact information in database
		const result = await updateContactInfo(validatedData);

		if (result.success) {
			return {
				success: true,
				refresh: true,
			};
		} else {
			return {
				success: false,
				error: result.error || "Failed to update contact information",
			};
		}
	} catch (error) {
		console.error("Error updating contact information:", error);
		return {
			success: false,
			error: "An unexpected error occurred while updating contact information",
		};
	}
}
