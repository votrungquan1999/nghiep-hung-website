import { Suspense } from "react";
import ContactDialog from "src/app/(main)/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";
import ProductsPageLoading from "./products-page-loading";
import ProductsSection from "./products-section";
import ProductsSectionDatabase from "./products-section-database";

export default function SuspendedProductsPage() {
	return (
		<Suspense fallback={<ProductsPageLoading />}>
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
				<ContactDialog />
			</div>
		</>
	);
}
