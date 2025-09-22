import SplashScreenProvider from "@/app/splash-screen-provider";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProductsSection from "@/components/products-section";
import ProductsSectionDatabase from "@/components/products-section-database";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import { FeatureFlag, getFeatureFlag } from "@/lib/cookies";

/**
 * Main homepage component that conditionally displays static or database content
 * based on the use_database_value feature flag cookie
 */
export default async function HomePage() {
	// Read the feature flag to determine which products section to display
	const useDatabaseValue = await getFeatureFlag(FeatureFlag.USE_DATABASE_VALUE, false);

	return (
		<SplashScreenProvider>
			<div className="min-h-screen">
				<Header />
				<main>
					<HeroSection />
					<AboutSection />
					{useDatabaseValue ? <ProductsSectionDatabase /> : <ProductsSection />}
					<ServicesSection />
					<ProjectsSection />
					<ContactSection />
				</main>
				<Footer />
			</div>
		</SplashScreenProvider>
	);
}
