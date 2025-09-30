import type React from "react";
import { Suspense } from "react";
import SplashScreenProvider from "../splash-screen-provider";
import Footer from "./layout/footer";
import FooterLoading from "./layout/footer-loading";
import Header from "./layout/header";
import HeaderLoading from "./layout/header-loading";

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
				<Suspense fallback={<HeaderLoading />}>
					<Header />
				</Suspense>
				<main>{children}</main>
				<Suspense fallback={<FooterLoading />}>
					<Footer />
				</Suspense>
			</div>
		</SplashScreenProvider>
	);
}
