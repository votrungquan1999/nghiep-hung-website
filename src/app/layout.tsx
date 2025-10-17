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
	title: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
	description:
		"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng",
	generator: "v0.app",
	icons: {
		icon: "/nghiep_hung_logo_no_bg.svg",
		shortcut: "/nghiep_hung_logo_no_bg.svg",
		apple: "/nghiep_hung_logo_no_bg.svg",
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
