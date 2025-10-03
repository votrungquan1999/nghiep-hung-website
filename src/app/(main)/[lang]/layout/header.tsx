import { Mail, Phone } from "lucide-react";
import { unstable_cacheTag as cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "src/components/language-toggle";
import { CACHE_TAGS } from "src/lib/cache-tags";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { getContactInfo } from "src/server/contact";
import { MobileHeader } from "./mobile-header";

/**
 * Header component that renders desktop navigation, contact info, and mobile header
 * @param locale - The current locale for internationalization
 */
export default async function Header({ locale }: { locale: Locale }) {
	"use cache";
	cacheTag(CACHE_TAGS.CONTACT);
	const contactInfo = await getContactInfo();
	const dictionary = getDictionary(locale);

	const navigation = [
		{ name: dictionary.nav.home, href: `/${locale}` },
		{ name: dictionary.nav.about, href: `/${locale}/about` },
		{ name: dictionary.nav.products, href: `/${locale}/products` },
		{ name: dictionary.nav.services, href: `/${locale}/services` },
		{ name: dictionary.nav.projects, href: `/${locale}/projects` },
		{ name: dictionary.nav.contact, href: `/${locale}/contact` },
	];

	return (
		<header className="bg-card shadow-sm border-b border-border sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link href={`/${locale}`}>
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

					{/* Contact Info and Language Switcher */}
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

						<LanguageSwitcher currentLang={locale} />
					</div>

					{/* Mobile Header */}
					<MobileHeader navigation={navigation} locale={locale} />
				</div>
			</div>
		</header>
	);
}
