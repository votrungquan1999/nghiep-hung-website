/**
 * Contact information data types
 * Defines the structure for contact information and related data
 */

import type { SocialMediaLink, SocialMediaPlatformId } from "./social-media/social-media.type";

/**
 * Working hours information with simple text fields
 */
export interface WorkingHours {
	/**
	 * Working hours text in English
	 */
	en: string;
	/**
	 * Working hours text in Vietnamese
	 */
	vi: string;
}

/**
 * Contact information data structure
 */
export interface ContactInfo {
	/**
	 * Primary phone number
	 */
	phone1: string;
	/**
	 * Secondary phone number
	 */
	phone2: string;
	/**
	 * Primary email address
	 */
	email1: string;
	/**
	 * Secondary email address
	 */
	email2: string;
	/**
	 * Physical address
	 */
	address: string;
	/**
	 * Working hours information
	 */
	workingHours: WorkingHours;
	/**
	 * Social media links
	 */
	socialMedia: SocialMediaLink[];
}

/**
 * Contact information database document
 */
export interface ContactInfoDocument {
	_id?: unknown; // MongoDB ObjectId
	id: string;
	phone1: string;
	phone2: string;
	email1: string;
	email2: string;
	address: string;
	workingHours: WorkingHours;
	socialMedia: Array<{
		id: string;
		platformId: SocialMediaPlatformId;
		url: string;
	}>;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Contact information form data
 */
export interface ContactInfoFormData {
	phone1: string;
	phone2?: string;
	email1: string;
	email2?: string;
	address: string;
	workingHours: WorkingHours;
	socialMediaLinks: Array<{
		platformId: SocialMediaPlatformId;
		url: string;
	}>;
}
