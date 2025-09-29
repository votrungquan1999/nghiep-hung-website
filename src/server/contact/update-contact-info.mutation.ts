/**
 * Database mutation to update contact information
 * Updates the contact information in the database
 */

import type { ContactInfoDocument, ContactInfoFormData } from "src/app/admin/contact/contact.type";
import { getDatabase } from "src/lib/database";

/**
 * Update contact information in database
 * @param data - Contact information form data
 * @returns Promise that resolves to the update result
 */
export async function updateContactInfo(
	data: ContactInfoFormData,
): Promise<{ success: boolean; error?: string }> {
	try {
		const db = await getDatabase();

		// Generate social media links with IDs
		const socialMediaLinks = data.socialMediaLinks.map((link) => ({
			id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			platformId: link.platformId,
			url: link.url,
		}));

		const contactInfoDoc: Omit<ContactInfoDocument, "_id"> = {
			id: "contact-info",
			phone1: data.phone1,
			phone2: data.phone2 || "",
			email1: data.email1,
			email2: data.email2 || "",
			address: data.address,
			workingHours: data.workingHours,
			socialMedia: socialMediaLinks,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Use upsert to create or update the contact info
		const result = await db
			.collection<ContactInfoDocument>("contactInfo")
			.replaceOne({ id: "contact-info" }, contactInfoDoc, { upsert: true });

		if (result.acknowledged) {
			return { success: true };
		} else {
			return { success: false, error: "Failed to update contact information" };
		}
	} catch (error) {
		console.error("Error updating contact info:", error);
		return {
			success: false,
			error: "An unexpected error occurred while updating contact information",
		};
	}
}
