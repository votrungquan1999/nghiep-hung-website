"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
