import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import AboutSection from "./about-section";

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
