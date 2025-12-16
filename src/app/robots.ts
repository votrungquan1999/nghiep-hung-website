import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration
 * Allows all crawlers to access all pages except admin and API routes
 * Specifies sitemap location for search engines
 */
export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://nghiephung.com";

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/api"],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
