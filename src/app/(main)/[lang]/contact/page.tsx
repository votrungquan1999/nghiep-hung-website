import { Suspense } from "react";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import ContactPageLoading from "./contact-page-loading";
import ContactSectionDatabase from "./contact-section-database";

export default function SuspendedContactPage() {
	return (
		<Suspense fallback={<ContactPageLoading />}>
			<ContactPage />
		</Suspense>
	);
}

/**
 * Contact page that displays database content
 * Always uses database data instead of static content
 */
async function ContactPage() {
	return (
		<>
			<ScrollToTopHandler />
			<ContactSectionDatabase />
		</>
	);
}

