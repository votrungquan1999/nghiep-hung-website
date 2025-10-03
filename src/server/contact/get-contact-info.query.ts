/**
 * Database query to get contact information
 * Retrieves the current contact information from the database
 */

import type { ContactInfo, ContactInfoDocument } from "src/app/admin/contact/contact.type";
import { getDatabase } from "src/lib/database";

/**
 * Get current contact information from database
 * @returns Promise that resolves to contact information (empty data if not found)
 */
export async function getContactInfo(): Promise<ContactInfo> {
	const emptyContactInfo: ContactInfo = {
		phone1: "",
		phone2: "",
		email1: "",
		email2: "",
		address: "",
		workingHours: {
			en: "",
			vi: "",
		},
		socialMedia: [],
	};

	// try {
	const db = await getDatabase();
	const document = await db.collection<ContactInfoDocument>("contactInfo").findOne({});

	if (!document) {
		return emptyContactInfo;
	}

	// Convert database document to client interface
	return {
		phone1: document.phone1,
		phone2: document.phone2,
		email1: document.email1,
		email2: document.email2,
		address: document.address,
		workingHours: document.workingHours,
		socialMedia: document.socialMedia.map((link) => ({
			id: link.id,
			platformId: link.platformId,
			url: link.url,
		})),
	};
	// } catch (error) {
	// 	console.error("Error fetching contact info:", error);
	// 	return emptyContactInfo;
	// }
}
