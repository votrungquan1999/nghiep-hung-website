import { Suspense } from "react";
import ContactSection from "src/components/contact-section";
import ContactSectionDatabase from "src/components/contact-section-database";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";

export default function SuspendedContactPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
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
