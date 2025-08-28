"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
