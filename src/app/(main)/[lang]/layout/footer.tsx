import { Mail, MapPin, Phone } from "lucide-react";
import { unstable_cacheTag as cacheTag } from "next/cache";
import Image from "next/image";
import { getSocialMediaPlatform } from "src/app/admin/contact/social-media.config";
import LocaleLink from "src/components/behaviors/LocaleLink";
import { CACHE_TAGS } from "src/lib/cache-tags";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { getContactInfo } from "src/server/contact";

/**
 * Footer component that displays company information, quick links, and contact details
 * @param locale - The current locale for internationalization
 */
export default async function Footer({ locale }: { locale: Locale }) {
	"use cache";
	cacheTag(CACHE_TAGS.CONTACT);

	const contactInfo = await getContactInfo();
	const dictionary = getDictionary(locale);

	return (
		<footer className="bg-primary text-primary-foreground">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="lg:col-span-2">
						<Image
							src="/nghiep_hung_logo_full.svg"
							alt="Nghiệp Hưng"
							width={48}
							height={48}
							className="h-12 w-auto mb-6"
						/>
						<h3 className="text-xl font-serif font-bold mb-4">{dictionary.footer.companyName}</h3>
						<p className="text-primary-foreground/80 mb-6 leading-relaxed">
							{dictionary.footer.description}
						</p>
						{contactInfo.socialMedia.length > 0 && (
							<div className="flex space-x-4">
								{contactInfo.socialMedia.map((link) => {
									const platform = getSocialMediaPlatform(link.platformId);
									if (!platform) return null;

									const Icon = platform.icon;

									return (
										<a
											key={link.id}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center size-10 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
											aria-label={`Visit our ${platform.name} page`}
										>
											<Icon className="size-5" />
										</a>
									);
								})}
							</div>
						)}
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-serif font-bold mb-6">{dictionary.footer.quickLinks}</h4>
						<ul className="space-y-3">
							<li>
								<LocaleLink
									href="/about"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{dictionary.nav.about}
								</LocaleLink>
							</li>
							<li>
								<LocaleLink
									href="/products"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{dictionary.nav.products}
								</LocaleLink>
							</li>
							<li>
								<LocaleLink
									href="/services"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{dictionary.nav.services}
								</LocaleLink>
							</li>
							<li>
								<LocaleLink
									href="/projects"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{dictionary.nav.projects}
								</LocaleLink>
							</li>
							<li>
								<LocaleLink
									href="/contact"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{dictionary.nav.contact}
								</LocaleLink>
							</li>
							<li>
								<LocaleLink
									href="/privacy-policy"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{dictionary.nav.privacyPolicy}
								</LocaleLink>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-lg font-serif font-bold mb-6">{dictionary.footer.contactInfo}</h4>
						<div className="space-y-4">
							{contactInfo.address && (
								<div className="flex items-start">
									<MapPin className="size-5 mt-1 mr-3 flex-shrink-0" />
									<p className="text-primary-foreground/80 text-sm">{contactInfo.address}</p>
								</div>
							)}
							{contactInfo.phone1 && (
								<div className="flex items-center">
									<Phone className="size-5 mr-3 flex-shrink-0" />
									<p className="text-primary-foreground/80 text-sm">{contactInfo.phone1}</p>
								</div>
							)}
							{contactInfo.phone2 && (
								<div className="flex items-center">
									<Phone className="size-5 mr-3 flex-shrink-0" />
									<p className="text-primary-foreground/80 text-sm">{contactInfo.phone2}</p>
								</div>
							)}
							{contactInfo.email1 && (
								<div className="flex items-center">
									<Mail className="size-5 mr-3 flex-shrink-0" />
									<p className="text-primary-foreground/80 text-sm">{contactInfo.email1}</p>
								</div>
							)}
							{contactInfo.email2 && (
								<div className="flex items-center">
									<Mail className="size-5 mr-3 flex-shrink-0" />
									<p className="text-primary-foreground/80 text-sm">{contactInfo.email2}</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
					<p className="text-primary-foreground/60 text-sm">{dictionary.footer.copyright}</p>
				</div>
			</div>
		</footer>
	);
}
