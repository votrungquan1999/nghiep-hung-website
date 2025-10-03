import { Suspense } from "react";
import HomepageLoading from "src/app/(main)/[lang]/homepage-loading";
import Prefetch from "src/components/behaviors/prefetch";
import type { Locale } from "src/lib/i18n/config";
import AboutSection from "./about/about-section";
import ContactSectionDatabase from "./contact/contact-section-database";
import HeroSection from "./hero-section";
import ProductsSectionDatabase from "./products/products-section-database";
import ProjectsSectionDatabase from "./projects/projects-section-database";
import ServicesSectionDatabase from "./services/services-section-database";

/**
 * Main homepage component that displays database content for covered sections
 * Products, Services, Projects, and Contact use database data
 * About section remains static as it's not covered by admin database store
 */
export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
	const { lang: locale } = await params;

	return (
		<Suspense fallback={<HomepageLoading />}>
			<HomePageContent locale={locale} />
		</Suspense>
	);
}

async function HomePageContent({ locale }: { locale: Locale }) {
	return (
		<>
			<HeroSection />

			<AboutSection locale={locale} />

			<Prefetch url={`/${locale}/products`} />
			<Prefetch url={`/${locale}/services`} />
			<Prefetch url={`/${locale}/projects`} />
			<Prefetch url={`/${locale}/contact`} />

			<ProductsSectionDatabase locale={locale} />
			<ServicesSectionDatabase locale={locale} />
			<ProjectsSectionDatabase locale={locale} />
			<ContactSectionDatabase locale={locale} />
		</>
	);
}
