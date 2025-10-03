import { Suspense } from "react";
import ContactDialog from "src/app/(main)/[lang]/contact/contact-dialog";
import ScrollToTopHandler from "src/components/scroll-to-top-handler";
import type { Locale } from "src/lib/i18n/config";
import ProductsPageLoading from "./products-page-loading";
import ProductsSectionDatabase from "./products-section-database";

interface ProductsPageProps {
	params: Promise<{ lang: Locale }>;
}

export default function SuspendedProductsPage({ params }: ProductsPageProps) {
	return (
		<Suspense fallback={<ProductsPageLoading />}>
			<ProductsPage params={params} />
		</Suspense>
	);
}

/**
 * Products page that displays database content
 * Always uses database data instead of static content
 * @param params - Route parameters including the language locale
 */
async function ProductsPage({ params }: ProductsPageProps) {
	const { lang: locale } = await params;

	return (
		<>
			<ScrollToTopHandler />
			<ProductsSectionDatabase locale={locale} />
			<div className="text-center mb-12">
				<ContactDialog locale={locale} />
			</div>
		</>
	);
}
