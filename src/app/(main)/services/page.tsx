import { Suspense } from "react";
import ContactDialog from "src/app/(main)/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import ServicesPageLoading from "./services-page-loading";
import ServicesSectionDatabase from "./services-section-database";

export default function SuspendedServicesPage() {
	return (
		<Suspense fallback={<ServicesPageLoading />}>
			<ServicesPage />
		</Suspense>
	);
}

/**
 * Services page that displays database content
 * Always uses database data instead of static content
 */
async function ServicesPage() {
	return (
		<>
			<ScrollToTopHandler />
			<ServicesSectionDatabase />
			<div className="text-center mb-12">
				<ContactDialog />
			</div>
		</>
	);
}
