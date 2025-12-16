import type { Metadata } from "next";
import type { Locale } from "src/lib/i18n/config";

/**
 * Base URL for the site
 */
const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://nghiephung.com";

/**
 * Default OG image configuration
 */
const defaultOgImage = {
	url: "/construction_placeholder.png",
	width: 1200,
	height: 630,
	alt: "Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
};

/**
 * Generate metadata for homepage
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generateHomeMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Trang chủ - Nghiệp Hưng" : "Home - Nghiep Hung Air Duct Systems",
		description: isVietnamese
			? "Công ty TNHH Nghiệp Hưng - Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng tại Việt Nam"
			: "Nghiep Hung Co., Ltd - Professional air duct manufacturing and installation services for industrial and residential projects in Vietnam",
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: {
				vi: `${baseUrl}/vi`,
				en: `${baseUrl}/en`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}`,
			title: isVietnamese
				? "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp"
				: "Nghiep Hung Co., Ltd - Professional Air Duct Systems",
			description: isVietnamese
				? "Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao"
				: "Professional air duct manufacturing and installation services",
			images: [defaultOgImage],
		},
	};
}

/**
 * Generate metadata for about page
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generateAboutMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Về chúng tôi" : "About Us",
		description: isVietnamese
			? "Tìm hiểu về Nghiệp Hưng - Công ty hàng đầu trong lĩnh vực sản xuất và thi công hệ thống ống gió. Tầm nhìn, sứ mệnh và giá trị cốt lõi của chúng tôi"
			: "Learn about Nghiep Hung - Leading company in air duct manufacturing and installation. Our vision, mission, and core values",
		alternates: {
			canonical: `${baseUrl}/${locale}/about`,
			languages: {
				vi: `${baseUrl}/vi/about`,
				en: `${baseUrl}/en/about`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}/about`,
			title: isVietnamese ? "Về chúng tôi - Nghiệp Hưng" : "About Us - Nghiep Hung",
			images: [defaultOgImage],
		},
	};
}

/**
 * Generate metadata for products page
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generateProductsMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Sản phẩm" : "Products",
		description: isVietnamese
			? "Khám phá danh mục sản phẩm ống gió chất lượng cao của Nghiệp Hưng - Ống gió tròn, ống gió vuông, phụ kiện và thiết bị thông gió"
			: "Explore Nghiep Hung's high-quality air duct products - Round ducts, rectangular ducts, accessories and ventilation equipment",
		alternates: {
			canonical: `${baseUrl}/${locale}/products`,
			languages: {
				vi: `${baseUrl}/vi/products`,
				en: `${baseUrl}/en/products`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}/products`,
			title: isVietnamese ? "Sản phẩm - Nghiệp Hưng" : "Products - Nghiep Hung",
			images: [defaultOgImage],
		},
	};
}

/**
 * Generate metadata for services page
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generateServicesMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Dịch vụ" : "Services",
		description: isVietnamese
			? "Dịch vụ thi công và lắp đặt hệ thống ống gió chuyên nghiệp của Nghiệp Hưng - Tư vấn thiết kế, thi công lắp đặt và bảo trì hệ thống thông gió"
			: "Professional air duct installation services by Nghiep Hung - Design consultation, installation and maintenance of ventilation systems",
		alternates: {
			canonical: `${baseUrl}/${locale}/services`,
			languages: {
				vi: `${baseUrl}/vi/services`,
				en: `${baseUrl}/en/services`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}/services`,
			title: isVietnamese ? "Dịch vụ - Nghiệp Hưng" : "Services - Nghiep Hung",
			images: [defaultOgImage],
		},
	};
}

/**
 * Generate metadata for projects page
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generateProjectsMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Dự án" : "Projects",
		description: isVietnamese
			? "Khám phá các dự án tiêu biểu của Nghiệp Hưng - Hệ thống ống gió cho nhà máy, văn phòng, khu dân cư và các công trình công nghiệp"
			: "Explore Nghiep Hung's featured projects - Air duct systems for factories, offices, residential areas and industrial facilities",
		alternates: {
			canonical: `${baseUrl}/${locale}/projects`,
			languages: {
				vi: `${baseUrl}/vi/projects`,
				en: `${baseUrl}/en/projects`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}/projects`,
			title: isVietnamese ? "Dự án - Nghiệp Hưng" : "Projects - Nghiep Hung",
			images: [defaultOgImage],
		},
	};
}

/**
 * Generate metadata for contact page
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generateContactMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Liên hệ" : "Contact Us",
		description: isVietnamese
			? "Liên hệ với Nghiệp Hưng để được tư vấn về hệ thống ống gió - Địa chỉ, số điện thoại, email và form liên hệ trực tuyến"
			: "Contact Nghiep Hung for air duct system consultation - Address, phone, email and online contact form",
		alternates: {
			canonical: `${baseUrl}/${locale}/contact`,
			languages: {
				vi: `${baseUrl}/vi/contact`,
				en: `${baseUrl}/en/contact`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}/contact`,
			title: isVietnamese ? "Liên hệ - Nghiệp Hưng" : "Contact Us - Nghiep Hung",
			images: [defaultOgImage],
		},
	};
}

/**
 * Generate metadata for privacy policy page
 * @param locale - The current locale
 * @returns Metadata object
 */
export function generatePrivacyPolicyMetadata(locale: Locale): Metadata {
	const isVietnamese = locale === "vi";

	return {
		title: isVietnamese ? "Chính sách bảo mật" : "Privacy Policy",
		description: isVietnamese
			? "Chính sách bảo mật thông tin của Nghiệp Hưng - Cam kết bảo vệ thông tin cá nhân của khách hàng"
			: "Nghiep Hung's Privacy Policy - Commitment to protecting customer personal information",
		alternates: {
			canonical: `${baseUrl}/${locale}/privacy-policy`,
			languages: {
				vi: `${baseUrl}/vi/privacy-policy`,
				en: `${baseUrl}/en/privacy-policy`,
			},
		},
		openGraph: {
			url: `${baseUrl}/${locale}/privacy-policy`,
			title: isVietnamese ? "Chính sách bảo mật - Nghiệp Hưng" : "Privacy Policy - Nghiep Hung",
			images: [defaultOgImage],
		},
		robots: {
			index: false,
			follow: true,
		},
	};
}
