"use client";

import { useEffect } from "react";
import Footer from "src/components/footer";
import Header from "src/components/header";
import ProjectsSection from "src/components/projects-section";

export default function ProjectsPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<ProjectsSection />
			</main>
			<Footer />
		</div>
	);
}
