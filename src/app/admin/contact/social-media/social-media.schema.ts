import { z } from "zod";
import { SocialMediaPlatformId } from "./social-media.type";

/**
 * Zod schema for social media platform ID validation
 */
export const socialMediaPlatformIdSchema = z.nativeEnum(SocialMediaPlatformId);

/**
 * Zod schema for social media link input validation
 */
export const socialMediaLinkInputSchema = z.object({
	platformId: socialMediaPlatformIdSchema,
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
});

/**
 * Zod schema for social media form data validation
 */
export const socialMediaFormDataSchema = z.object({
	links: z.array(socialMediaLinkInputSchema).min(0, "At least one social media link is required"),
});

/**
 * Zod schema for social media link with ID validation
 */
export const socialMediaLinkSchema = z.object({
	id: z.string().min(1, "ID is required"),
	platformId: socialMediaPlatformIdSchema,
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
});

/**
 * Type inference from Zod schemas
 */
export type SocialMediaLinkInput = z.infer<typeof socialMediaLinkInputSchema>;
export type SocialMediaFormData = z.infer<typeof socialMediaFormDataSchema>;
export type SocialMediaLink = z.infer<typeof socialMediaLinkSchema>;
