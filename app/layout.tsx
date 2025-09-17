import type { Metadata } from "next";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import type React from "react";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
	weight: ["400", "600", "700", "900"],
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

export const metadata: Metadata = {
	title: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
	description:
		"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao, phục vụ các dự án công nghiệp và dân dụng",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="vi"
			className={`${montserrat.variable} ${openSans.variable} ${roboto.variable} antialiased`}
		>
			<body className="font-sans">{children}</body>
		</html>
	);
}
