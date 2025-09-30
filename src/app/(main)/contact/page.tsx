import { Suspense } from "react";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";
import ContactPageLoading from "./contact-page-loading";
import ContactSection from "./contact-section";
import ContactSectionDatabase from "./contact-section-database";

export default function SuspendedContactPage() {
	return (
		<Suspense fallback={<ContactPageLoading />}>
			<ContactPage />
		</Suspense>
	);
}

/**
 * Contact page that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
async function ContactPage() {
	// Read the feature flag to determine which contact section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<>
			<ScrollToTopHandler />
			{useDatabaseValue ? <ContactSectionDatabase /> : <ContactSection />}
		</>
	);
}
