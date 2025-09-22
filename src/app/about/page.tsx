"use client";

import { useEffect } from "react";
import AboutSection from "src/components/about-section";
import Footer from "src/components/footer";
import Header from "src/components/header";

export default function AboutPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<AboutSection />
			</main>
			<Footer />
		</div>
	);
}
