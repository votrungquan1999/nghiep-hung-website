import { Suspense } from "react";
import HomepageLoading from "src/app/(main)/homepage-loading";
import Prefetch from "src/components/behaviors/prefetch";
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
export default async function HomePage() {
	return (
		<Suspense fallback={<HomepageLoading />}>
			<HomePageContent />
		</Suspense>
	);
}

async function HomePageContent() {
	return (
		<>
			<HeroSection />

			<AboutSection />

			<Prefetch url="/products" />
			<Prefetch url="/services" />
			<Prefetch url="/projects" />
			<Prefetch url="/contact" />

			<ProductsSectionDatabase />
			<ServicesSectionDatabase />
			<ProjectsSectionDatabase />
			<ContactSectionDatabase />
		</>
	);
}
