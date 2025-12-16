import type { Metadata } from "next";
import { Suspense } from "react";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import { generateContactMetadata } from "src/lib/seo/metadata";
import ContactPageLoading from "./contact-page-loading";
import ContactSectionDatabase from "./contact-section-database";

interface ContactPageProps {
	params: Promise<{ lang: Locale }>;
}

/**
 * Generate metadata for contact page
 * @param params - Route parameters including locale
 * @returns Metadata object
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang: locale } = await params;
	return generateContactMetadata(locale);
}

export default function SuspendedContactPage({ params }: ContactPageProps) {
	return (
		<Suspense fallback={<ContactPageLoading />}>
			<ContactPage params={params} />
		</Suspense>
	);
}

/**
 * Contact page that displays database content
 * Always uses database data instead of static content
 * @param params - Route parameters including the language locale
 */
async function ContactPage({ params }: ContactPageProps) {
	const { lang: locale } = await params;

	return (
		<>
			<ScrollToTopHandler />
			<ContactSectionDatabase locale={locale} />
		</>
	);
}
