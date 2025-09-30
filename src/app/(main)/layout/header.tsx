import { Mail, Phone } from "lucide-react";
import { unstable_cacheTag as cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getContactInfo } from "src/server/contact";
import { MobileHeader } from "./mobile-header";

/**
 * Header component that renders desktop navigation, contact info, and mobile header
 */
export default async function Header() {
	"use cache";
	cacheTag(CACHE_TAGS.CONTACT);
	const contactInfo = await getContactInfo();

	const navigation = [
		{ name: "Trang chủ", href: "/" },
		{ name: "Giới thiệu", href: "/about" },
		{ name: "Sản phẩm", href: "/products" },
		{ name: "Dịch vụ", href: "/services" },
		{ name: "Dự án", href: "/projects" },
		{ name: "Liên hệ", href: "/contact" },
	];

	return (
		<header className="bg-card shadow-sm border-b border-border sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link href="/">
							<Image
								src="/nghiep_hung_logo_full.svg"
								alt="Nghiệp Hưng"
								width={40}
								height={40}
								className="h-10 w-auto cursor-pointer"
							/>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								prefetch={true}
								className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Contact Info */}
					<div className="hidden lg:flex items-center space-x-4">
						{contactInfo.phone1 && (
							<div className="flex items-center text-sm text-muted-foreground">
								<Phone className="h-4 w-4 mr-1" />
								<span>{contactInfo.phone1}</span>
							</div>
						)}
						{contactInfo.email1 && (
							<div className="flex items-center text-sm text-muted-foreground">
								<Mail className="h-4 w-4 mr-1" />
								<span>{contactInfo.email1}</span>
							</div>
						)}
					</div>

					{/* Mobile Header */}
					<MobileHeader navigation={navigation} />
				</div>
			</div>
		</header>
	);
}
