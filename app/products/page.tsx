import ContactDialog from "@/components/contact-dialog";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductsSection from "@/components/products-section";
import ProductsSectionDatabase from "@/components/products-section-database";
import ScrollToTopHandler from "@/components/scroll-to-top-handler";
import { Button } from "@/components/ui/button";
import { FeatureFlag, getFeatureFlag } from "@/lib/cookies";

/**
 * Products page that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
export default async function ProductsPage() {
	// Read the feature flag to determine which products section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<div className="min-h-screen bg-background">
			<ScrollToTopHandler />

			<Header />
			<main>
				{useDatabaseValue ? <ProductsSectionDatabase /> : <ProductsSection />}

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
