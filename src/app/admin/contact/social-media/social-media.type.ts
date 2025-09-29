/**
 * Social media data types
 * Defines the structure for social media links and related data
 */

/**
 * Social media platform identifier enum
 */
export enum SocialMediaPlatformId {
	Facebook = "facebook",
	Youtube = "youtube",
	Linkedin = "linkedin",
	Twitter = "twitter",
	Instagram = "instagram",
	Tiktok = "tiktok",
	Zalo = "zalo",
}

/**
 * Social media link data structure
 */
export interface SocialMediaLink {
	/**
	 * Unique identifier for the social media link
	 */
	id: string;
	/**
	 * Platform identifier
	 */
	platformId: SocialMediaPlatformId;
	/**
	 * URL for the social media profile
	 */
	url: string;
}

/**
 * Social media link input data (for form submission)
 */
export interface SocialMediaLinkInput {
	/**
	 * Platform identifier
	 */
	platformId: SocialMediaPlatformId;
	/**
	 * URL for the social media profile
	 */
	url: string;
}

/**
 * Social media form data structure
 */
export interface SocialMediaFormData {
	/**
	 * Array of social media links
	 */
	links: SocialMediaLinkInput[];
}

/**
 * Social media validation result
 */
export interface SocialMediaValidationResult {
	/**
	 * Whether the validation was successful
	 */
	success: boolean;
	/**
	 * Error message if validation failed
	 */
	error?: string;
	/**
	 * Validated social media links
	 */
	links?: SocialMediaLinkInput[];
}
