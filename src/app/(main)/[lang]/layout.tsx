import type React from "react";
import { Suspense } from "react";
import type { Locale } from "src/lib/i18n/config";
import SplashScreenProvider from "../../splash-screen-provider";
import Footer from "./layout/footer";
import FooterLoading from "./layout/footer-loading";
import Header from "./layout/header";
import HeaderLoading from "./layout/header-loading";

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "vi" }];
}

/**
 * Layout for the main route group that includes header and footer
 * This layout wraps all main pages (about, contact, products, projects, services, etc.)
 * @param params - Route parameters including the language locale
 * @param children - Child components to render
 */
export default async function MainLayout({
	params,
	children,
}: Readonly<{
	params: Promise<{ lang: Locale }>;
	children: React.ReactNode;
}>) {
	const { lang: locale } = await params;

	return (
		<SplashScreenProvider>
			<div className="min-h-screen">
				<Suspense fallback={<HeaderLoading />}>
					<Header locale={locale} />
				</Suspense>
				<main>{children}</main>
				<Suspense fallback={<FooterLoading />}>
					<Footer />
				</Suspense>
			</div>
		</SplashScreenProvider>
	);
}
