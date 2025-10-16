/**
 * Internationalization configuration for the Nghiệp Hưng website
 * Supports Vietnamese (vi) and English (en) languages
 */

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const localeNames: Record<Locale, string> = {
	vi: "Tiếng Việt",
	en: "English",
};

/**
 * Language detection configuration
 */
export const languageDetection = {
	// Cookie name for storing language preference
	cookieName: "NEXT_LOCALE",

	// Cookie options
	cookieOptions: {
		maxAge: 60 * 60 * 24 * 365, // 1 year
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax" as const,
	},
} as const;

/**
 * URL structure configuration
 */
export const urlConfig = {
	// Base URL for the website
	baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://nghiephung.com",

	// Whether to use trailing slashes
	trailingSlash: false,

	// Redirect configuration
	redirects: {
		// Redirect root to default language
		root: true,
		// Redirect old URLs without language prefix
		legacy: true,
	},
} as const;

/**
 * SEO configuration for each language
 */
export const seoConfig: Record<
	Locale,
	{
		locale: string;
		direction: "ltr" | "rtl";
		charset: string;
	}
> = {
	vi: {
		locale: "vi_VN",
		direction: "ltr",
		charset: "utf-8",
	},
	en: {
		locale: "en_US",
		direction: "ltr",
		charset: "utf-8",
	},
} as const;
