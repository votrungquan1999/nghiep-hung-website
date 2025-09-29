import SplashScreenProvider from "src/app/splash-screen-provider";
import AboutSection from "src/components/about-section";
import ContactSection from "src/components/contact-section";
import Footer from "src/components/footer";
import Header from "src/components/header";
import HeroSection from "src/components/hero-section";
import ProductsSection from "src/components/products-section";
import ProductsSectionDatabase from "src/components/products-section-database";
import ProjectsSection from "src/components/projects-section";
import ProjectsSectionDatabase from "src/components/projects-section-database";
import ServicesSection from "src/components/services-section";
import ServicesSectionDatabase from "src/components/services-section-database";
import { FeatureFlag, getFeatureFlag } from "src/lib/cookies";

/**
 * Main homepage component that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
export default async function HomePage() {
	// Read the feature flag to determine which sections to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<SplashScreenProvider>
			<div className="min-h-screen">
				<Header />
				<main>
					<HeroSection />
					<AboutSection />
					{useDatabaseValue ? <ProductsSectionDatabase /> : <ProductsSection />}
					{useDatabaseValue ? <ServicesSectionDatabase /> : <ServicesSection />}
					{useDatabaseValue ? <ProjectsSectionDatabase /> : <ProjectsSection />}
					<ContactSection />
				</main>
				<Footer />
			</div>
		</SplashScreenProvider>
	);
}
