"use client"

import { useEffect, useState } from "react"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProductsSection from "@/components/products-section"
import ProjectsSection from "@/components/projects-section"
import SplashScreen from "@/components/splash-screen"

export default function HomePage() {
	const [showSplash, setShowSplash] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSplash(false)
		}, 3500) // Slightly longer to account for animations

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!showSplash && window.location.hash) {
			const hash = window.location.hash
			setTimeout(() => {
				const element = document.querySelector(hash)
				if (element) {
					element.scrollIntoView({ behavior: "smooth" })
				}
			}, 100) // Small delay to ensure page is rendered
		}
	}, [showSplash])

	return (
		<>
			{showSplash && <SplashScreen />}
			{!showSplash && (
				<div className="min-h-screen">
					<Header />
					<main>
						<HeroSection />
						<AboutSection />
						<ProductsSection />
						<ProjectsSection />
						<ContactSection />
					</main>
					<Footer />
				</div>
			)}
		</>
	)
}
