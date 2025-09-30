import { Suspense } from "react";
import HomepageLoading from "src/app/(main)/homepage-loading";
import Prefetch from "src/components/behaviors/prefetch";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";
import { setTimeout } from "timers/promises";
import AboutSection from "./about/about-section";
import ContactSection from "./contact/contact-section";
import ContactSectionDatabase from "./contact/contact-section-database";
import HeroSection from "./hero-section";
import ProductsSection from "./products/products-section";
import ProductsSectionDatabase from "./products/products-section-database";
import ProjectsSection from "./projects/projects-section";
import ProjectsSectionDatabase from "./projects/projects-section-database";
import ServicesSection from "./services/services-section";
import ServicesSectionDatabase from "./services/services-section-database";

/**
 * Main homepage component that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
export default async function HomePage() {
	return (
		<Suspense fallback={<HomepageLoading />}>
			<HomePageContent />
		</Suspense>
	);
}

async function HomePageContent() {
	// await setTimeout(0);
	// Read the feature flag to determine which sections to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	await setTimeout(10000);

	return (
		<>
			<HeroSection />

			<AboutSection />

			<Prefetch url="/products" />
			<Prefetch url="/services" />
			<Prefetch url="/projects" />
			<Prefetch url="/contact" />

			{useDatabaseValue ? <ProductsSectionDatabase /> : <ProductsSection />}
			{useDatabaseValue ? <ServicesSectionDatabase /> : <ServicesSection />}
			{useDatabaseValue ? <ProjectsSectionDatabase /> : <ProjectsSection />}
			{useDatabaseValue ? <ContactSectionDatabase /> : <ContactSection />}
		</>
	);

	// return (
	// 	<div className="min-h-screen">
	// 		<Header />
	// 		<main>
	// 			<HeroSection />

	// 			<AboutSection />

	// 			<Prefetch url="/products" />
	// 			<Prefetch url="/services" />
	// 			<Prefetch url="/projects" />
	// 			<Prefetch url="/contact" />

	// 			{useDatabaseValue ? <ProductsSectionDatabase /> : <ProductsSection />}
	// 			{useDatabaseValue ? <ServicesSectionDatabase /> : <ServicesSection />}
	// 			{useDatabaseValue ? <ProjectsSectionDatabase /> : <ProjectsSection />}
	// 			{useDatabaseValue ? <ContactSectionDatabase /> : <ContactSection />}
	// 		</main>
	// 		<Footer />
	// 	</div>
	// );
}
