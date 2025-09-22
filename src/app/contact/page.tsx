"use client";

import { useEffect } from "react";
import ContactSection from "src/components/contact-section";
import Footer from "src/components/footer";
import Header from "src/components/header";

export default function ContactPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
}
