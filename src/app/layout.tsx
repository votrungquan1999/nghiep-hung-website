import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Montserrat, Open_Sans, Raleway, Roboto } from "next/font/google";
import type React from "react";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
	weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-open-sans",
	weight: ["400", "500", "600"],
});

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
	weight: ["400", "500", "700"],
});

const raleway = Raleway({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-raleway",
	weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://nghiephung.com"),
	title: {
		default: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
		template: "%s | Nghiệp Hưng",
	},
	description:
		"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng",
	keywords: [
		"ống gió",
		"hệ thống thông gió",
		"thi công ống gió",
		"sản xuất ống gió",
		"ống gió công nghiệp",
		"nghiệp hưng",
		"air duct",
		"ventilation system",
	],
	authors: [{ name: "Nghiệp Hưng" }],
	creator: "Nghiệp Hưng",
	publisher: "Nghiệp Hưng",
	generator: "v0.app",
	icons: {
		icon: "/nghiep_hung_logo_no_bg.svg",
		shortcut: "/nghiep_hung_logo_no_bg.svg",
		apple: "/nghiep_hung_logo_no_bg.svg",
	},
	openGraph: {
		type: "website",
		locale: "vi_VN",
		alternateLocale: ["en_US"],
		siteName: "Nghiệp Hưng",
		title: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
		description:
			"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng",
		images: [
			{
				url: "/construction_placeholder.png",
				width: 1200,
				height: 630,
				alt: "Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
		description:
			"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng",
		images: ["/construction_placeholder.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="vi"
			className={`${montserrat.variable} ${openSans.variable} ${roboto.variable} ${raleway.variable} antialiased`}
		>
			<body className="font-sans">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
