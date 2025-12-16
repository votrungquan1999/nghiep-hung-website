import type { Metadata } from "next";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import { generateAboutMetadata } from "src/lib/seo/metadata";
import AboutSection from "./about-section";

/**
 * Generate metadata for about page
 * @param params - Route parameters including locale
 * @returns Metadata object
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang: locale } = await params;
	return generateAboutMetadata(locale);
}

/**
 * About page component that displays company information and values
 * @param params - Route parameters including the language locale
 */
export default async function AboutPage({
	params,
}: Readonly<{
	params: Promise<{ lang: Locale }>;
}>) {
	const { lang: locale } = await params;

	return (
		<>
			<ScrollToTopHandler />
			<AboutSection locale={locale} />
		</>
	);
}
