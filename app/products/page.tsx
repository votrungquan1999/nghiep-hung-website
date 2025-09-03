"use client"

import { useEffect } from "react"
import ContactDialog from "@/components/contact-dialog"
import Footer from "@/components/footer"
import Header from "@/components/header"
import ProductsSection from "@/components/products-section"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<ProductsSection />

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
	)
}
