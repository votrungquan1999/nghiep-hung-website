/**
 * Server component that fetches contact information from database and renders the contact section
 * Has the same structure as the static contact-section.tsx but uses database data
 */

import { unstable_cacheTag as cacheTag } from "next/cache";
import { getSocialMediaPlatform } from "src/app/admin/contact/social-media.config";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getContactInfo } from "src/server/contact";
import { ContactForm } from "./contact-form";

/**
 * Server component that fetches contact information from database
 * Has the exact same structure as the static contact-section.tsx
 */
export default async function ContactSectionDatabase() {
	"use cache";
	cacheTag(CACHE_TAGS.CONTACT);

	const contactInfo = await getContactInfo();

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="contact" className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Liên hệ"} <span className="text-primary">{"với chúng tôi"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Hãy để lại thông tin để được tư vấn miễn phí về giải pháp hệ thống ống gió phù hợp nhất."
						}
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-12">
					{/* Contact Information */}
					<div className="lg:col-span-1">
						<div className="space-y-8">
							<div className="bg-card text-card-foreground rounded-lg shadow-sm border p-6">
								<h3 className="font-serif text-xl mb-6">{"Thông tin liên hệ"}</h3>
								<div className="space-y-6">
									<div className="flex items-start">
										<div className="h-5 w-5 text-primary mt-1 mr-3">📞</div>
										<div>
											<p className="font-medium">{"Điện thoại"}</p>
											{contactInfo.phone1 && (
												<p className="text-muted-foreground">{contactInfo.phone1}</p>
											)}
											{contactInfo.phone2 && (
												<p className="text-muted-foreground">{contactInfo.phone2}</p>
											)}
										</div>
									</div>

									<div className="flex items-start">
										<div className="h-5 w-5 text-primary mt-1 mr-3">✉️</div>
										<div>
											<p className="font-medium">{"Email"}</p>
											{contactInfo.email1 && (
												<p className="text-muted-foreground">{contactInfo.email1}</p>
											)}
											{contactInfo.email2 && (
												<p className="text-muted-foreground">{contactInfo.email2}</p>
											)}
										</div>
									</div>

									<div className="flex items-start">
										<div className="h-5 w-5 text-primary mt-1 mr-3">📍</div>
										<div>
											<p className="font-medium">{"Địa chỉ"}</p>
											{contactInfo.address && (
												<p className="text-muted-foreground">{contactInfo.address}</p>
											)}
										</div>
									</div>

									<div className="flex items-start">
										<div className="h-5 w-5 text-primary mt-1 mr-3">🕒</div>
										<div>
											<p className="font-medium">{"Giờ làm việc"}</p>
											{contactInfo.workingHours.vi && (
												<p className="text-muted-foreground">{contactInfo.workingHours.vi}</p>
											)}
										</div>
									</div>
								</div>
							</div>

							{contactInfo.socialMedia.length > 0 && (
								<div className="bg-card text-card-foreground rounded-lg shadow-sm border p-6">
									<h3 className="font-serif text-xl mb-6">{"Kết nối với chúng tôi"}</h3>
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
													className="inline-flex items-center justify-center size-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
													aria-label={`Visit our ${platform.name} page`}
												>
													<Icon className="size-5" />
												</a>
											);
										})}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<div className="bg-card text-card-foreground rounded-lg shadow-sm border p-6">
							<h3 className="font-serif text-2xl mb-6">{"Gửi yêu cầu tư vấn"}</h3>
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
