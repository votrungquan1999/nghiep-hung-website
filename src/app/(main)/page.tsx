import { Suspense } from "react";
import AboutSection from "src/components/about-section";
import Prefetch from "src/components/behaviors/prefetch";
import ContactSection from "src/components/contact-section";
import ContactSectionDatabase from "src/components/contact-section-database";
import HeroSection from "src/components/hero-section";
import ProductsSection from "src/components/products-section";
import ProductsSectionDatabase from "src/components/products-section-database";
import ProjectsSection from "src/components/projects-section";
import ProjectsSectionDatabase from "src/components/projects-section-database";
import ServicesSection from "src/components/services-section";
import ServicesSectionDatabase from "src/components/services-section-database";
import { FeatureFlag, getFeatureFlag } from "src/lib/feature-flag";

/**
 * Main homepage component that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
export default async function HomePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomePageContent />
		</Suspense>
	);
}

async function HomePageContent() {
	// await setTimeout(0);
	// Read the feature flag to determine which sections to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

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
