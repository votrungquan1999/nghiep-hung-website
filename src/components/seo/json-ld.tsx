/**
 * JSON-LD Structured Data Components
 * Provides schema markup for search engines to better understand website content
 */

interface OrganizationSchemaProps {
	locale: "vi" | "en";
}

/**
 * Organization Schema JSON-LD
 * Provides structured data about the business for search engines
 * @param locale - The current locale
 */
export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
	const isVietnamese = locale === "vi";
	const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://nghiephung.com";

	const schema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: isVietnamese ? "Công ty TNHH Nghiệp Hưng" : "Nghiep Hung Co., Ltd",
		alternateName: "Nghiệp Hưng",
		url: baseUrl,
		logo: `${baseUrl}/nghiep_hung_logo_full.svg`,
		image: `${baseUrl}/construction_placeholder.png`,
		description: isVietnamese
			? "Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng"
			: "Professional air duct manufacturing and installation services for industrial and residential projects",
		address: {
			"@type": "PostalAddress",
			addressCountry: "VN",
			addressLocality: isVietnamese ? "Thành phố Hồ Chí Minh" : "Ho Chi Minh City",
		},
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer service",
			availableLanguage: ["vi", "en"],
		},
		sameAs: [
			// Add social media links here when available
			// "https://facebook.com/nghiephung",
			// "https://linkedin.com/company/nghiephung",
		],
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires embedding JSON
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

/**
 * Website Schema JSON-LD
 * Provides structured data about the website
 * @param locale - The current locale
 */
export function WebsiteSchema({ locale }: { locale: "vi" | "en" }) {
	const isVietnamese = locale === "vi";
	const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://nghiephung.com";

	const schema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: isVietnamese ? "Nghiệp Hưng" : "Nghiep Hung",
		url: baseUrl,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${baseUrl}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		inLanguage: [
			{
				"@type": "Language",
				name: "Vietnamese",
				alternateName: "vi",
			},
			{
				"@type": "Language",
				name: "English",
				alternateName: "en",
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires embedding JSON
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

/**
 * BreadcrumbList Schema JSON-LD
 * Provides breadcrumb navigation structure for search engines
 * @param items - Array of breadcrumb items with name and URL
 */
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires embedding JSON
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
