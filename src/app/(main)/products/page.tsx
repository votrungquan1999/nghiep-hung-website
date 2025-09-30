import { Suspense } from "react";
import ContactDialog from "src/components/contact-dialog";
import ProductsSection from "src/components/products-section";
import ProductsSectionDatabase from "src/components/products-section-database";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import { Button } from "src/components/ui/button";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";

export default function SuspendedProductsPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProductsPage />
		</Suspense>
	);
}

/**
 * Products page that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
async function ProductsPage() {
	// Read the feature flag to determine which products section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<>
			<ScrollToTopHandler />
			{useDatabaseValue ? <ProductsSectionDatabase /> : <ProductsSection />}
			<div className="text-center mb-12">
				<ContactDialog>
					<Button size="lg" className="text-lg px-8">
						{"Liên hệ tư vấn"}
					</Button>
				</ContactDialog>
			</div>
		</>
	);
}
