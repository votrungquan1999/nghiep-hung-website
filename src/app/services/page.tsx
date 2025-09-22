"use client";

import { useEffect } from "react";
import ContactDialog from "src/components/contact-dialog";
import Footer from "src/components/footer";
import Header from "src/components/header";
import ServicesSection from "src/components/services-section";
import { Button } from "src/components/ui/button";

/**
 * ServicesPage component displays the dedicated services page
 * Similar structure to ProductsPage for consistency
 */
export default function ServicesPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<ServicesSection />

				<div className="text-center mb-12">
					<ContactDialog>
						<Button size="lg" className="text-lg px-8">
							{"Liên hệ tư vấn"}
						</Button>
					</ContactDialog>
				</div>
			</main>
			<Footer />
		</div>
	);
}
