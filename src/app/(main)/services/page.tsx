import { Suspense } from "react";
import ContactDialog from "src/app/(main)/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";
import ServicesPageLoading from "./services-page-loading";
import ServicesSection from "./services-section";
import ServicesSectionDatabase from "./services-section-database";

export default function SuspendedServicesPage() {
	return (
		<Suspense fallback={<ServicesPageLoading />}>
			<ServicesPage />
		</Suspense>
	);
}

/**
 * Services page that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
async function ServicesPage() {
	// Read the feature flag to determine which services section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<>
			<ScrollToTopHandler />
			{useDatabaseValue ? <ServicesSectionDatabase /> : <ServicesSection />}
			<div className="text-center mb-12">
				<ContactDialog />
			</div>
		</>
	);
}
