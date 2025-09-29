import ContactDialog from "src/components/contact-dialog";
import Footer from "src/components/footer";
import Header from "src/components/header";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import ServicesSection from "src/components/services-section";
import ServicesSectionDatabase from "src/components/services-section-database";
import { Button } from "src/components/ui/button";
import { FeatureFlag, getFeatureFlag } from "src/lib/cookies";

/**
 * Services page that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
export default async function ServicesPage() {
	// Read the feature flag to determine which services section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<div className="min-h-screen bg-background">
			<ScrollToTopHandler />

			<Header />
			<main>
				{useDatabaseValue ? <ServicesSectionDatabase /> : <ServicesSection />}

				<div className="text-center mb-12">
					<ContactDialog>
						<Button size="lg" className="text-lg px-8">
							{"Liên hệ tư vấn"}
						</Button>
					</ContactDialog>
				</div>
			</main>
			<Footer />
		</div>
	);
}
