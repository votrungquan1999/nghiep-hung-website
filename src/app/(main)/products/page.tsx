import { Suspense } from "react";
import ContactDialog from "src/app/(main)/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import ProductsPageLoading from "./products-page-loading";
import ProductsSectionDatabase from "./products-section-database";

export default function SuspendedProductsPage() {
	return (
		<Suspense fallback={<ProductsPageLoading />}>
			<ProductsPage />
		</Suspense>
	);
}

/**
 * Products page that displays database content
 * Always uses database data instead of static content
 */
async function ProductsPage() {
	return (
		<>
			<ScrollToTopHandler />
			<ProductsSectionDatabase />
			<div className="text-center mb-12">
				<ContactDialog />
			</div>
		</>
	);
}
