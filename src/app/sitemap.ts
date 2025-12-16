import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap generation
 * Includes all static pages (in both languages)
 * Helps search engines discover and index all pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://nghiephung.com";
	const currentDate = new Date();

	// Static pages for both languages
	const staticPages: MetadataRoute.Sitemap = [
		// Vietnamese pages
		{
			url: `${baseUrl}/vi`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/vi/about`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/vi/products`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/vi/services`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/vi/projects`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/vi/contact`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/vi/privacy-policy`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		// English pages
		{
			url: `${baseUrl}/en`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/en/about`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/en/products`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/en/services`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/en/projects`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/en/contact`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/en/privacy-policy`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	return staticPages;
}
