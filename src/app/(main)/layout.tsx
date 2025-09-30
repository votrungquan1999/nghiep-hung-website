import type React from "react";
import Footer from "src/components/footer";
import Header from "src/components/header";
import SplashScreenProvider from "../splash-screen-provider";

/**
 * Layout for the main route group that includes header and footer
 * This layout wraps all main pages (about, contact, products, projects, services, etc.)
 */
export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SplashScreenProvider>
			<div className="min-h-screen">
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</SplashScreenProvider>
	);
}
