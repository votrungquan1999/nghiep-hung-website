import { Suspense } from "react";
import ContactDialog from "src/app/(main)/[lang]/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import ServicesPageLoading from "./services-page-loading";
import ServicesSectionDatabase from "./services-section-database";

interface ServicesPageProps {
	params: Promise<{ lang: Locale }>;
}

export default function SuspendedServicesPage({ params }: ServicesPageProps) {
	return (
		<Suspense fallback={<ServicesPageLoading />}>
			<ServicesPage params={params} />
		</Suspense>
	);
}

/**
 * Services page that displays database content
 * Always uses database data instead of static content
 * @param params - Route parameters including the language locale
 */
async function ServicesPage({ params }: ServicesPageProps) {
	const { lang: locale } = await params;

	return (
		<>
			<ScrollToTopHandler />
			<ServicesSectionDatabase locale={locale} viewAll />
			<div className="text-center mb-12">
				<ContactDialog locale={locale} />
			</div>
		</>
	);
}
