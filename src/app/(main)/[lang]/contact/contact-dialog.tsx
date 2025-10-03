import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { ContactForm } from "src/app/(main)/[lang]/contact/contact-form";
import { getSocialMediaPlatform } from "src/app/admin/contact/social-media.config";
import { Button } from "src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import { CACHE_TAGS } from "src/lib/cache-tags";
import { getContactInfo } from "src/server/contact";

/**
 * Contact dialog component
 * A complete contact dialog with built-in trigger and form using the new contact form system
 * Fetches real contact information from the database
 */
export default async function ContactDialog() {
	"use cache";
	cacheTag(CACHE_TAGS.CONTACT);

	const contactInfo = await getContactInfo();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Liên hệ với chúng tôi</Button>
			</DialogTrigger>
			<DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl font-serif font-bold text-foreground">
						{"Liên hệ"} <span className="text-primary">{"với chúng tôi"}</span>
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
					{/* Contact Information */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle className="font-serif text-lg">{"Thông tin liên hệ"}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* Phone Numbers */}
								{(contactInfo.phone1 || contactInfo.phone2) && (
									<div className="flex items-start">
										<Phone className="h-4 w-4 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium text-sm">{"Điện thoại"}</p>
											{contactInfo.phone1 && (
												<p className="text-muted-foreground text-sm">{contactInfo.phone1}</p>
											)}
											{contactInfo.phone2 && (
												<p className="text-muted-foreground text-sm">{contactInfo.phone2}</p>
											)}
										</div>
									</div>
								)}

								{/* Email Addresses */}
								{(contactInfo.email1 || contactInfo.email2) && (
									<div className="flex items-start">
										<Mail className="h-4 w-4 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium text-sm">{"Email"}</p>
											{contactInfo.email1 && (
												<p className="text-muted-foreground text-sm">{contactInfo.email1}</p>
											)}
											{contactInfo.email2 && (
												<p className="text-muted-foreground text-sm">{contactInfo.email2}</p>
											)}
										</div>
									</div>
								)}

								{/* Address */}
								{contactInfo.address && (
									<div className="flex items-start">
										<MapPin className="h-4 w-4 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium text-sm">{"Địa chỉ"}</p>
											<p className="text-muted-foreground text-sm">{contactInfo.address}</p>
										</div>
									</div>
								)}

								{/* Working Hours */}
								{contactInfo.workingHours.vi && (
									<div className="flex items-start">
										<Clock className="h-4 w-4 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium text-sm">{"Giờ làm việc"}</p>
											<p className="text-muted-foreground text-sm">{contactInfo.workingHours.vi}</p>
										</div>
									</div>
								)}

								{/* Social Media Links */}
								{contactInfo.socialMedia.length > 0 && (
									<div className="pt-4">
										<p className="font-medium text-sm mb-2">{"Kết nối với chúng tôi"}</p>
										<div className="flex flex-wrap gap-2">
											{contactInfo.socialMedia.map((link) => {
												const platform = getSocialMediaPlatform(link.platformId);
												if (!platform) return null;

												const IconComponent = platform.icon;
												return (
													<Button key={link.id} variant="outline" size="sm" asChild>
														<a
															href={link.url}
															target="_blank"
															rel="noopener noreferrer"
															className={`${platform.color} hover:bg-muted`}
														>
															<IconComponent className="h-4 w-4" />
														</a>
													</Button>
												);
											})}
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-3">
						<Card>
							<CardHeader>
								<CardTitle className="font-serif text-lg">{"Gửi yêu cầu tư vấn"}</CardTitle>
							</CardHeader>
							<CardContent>
								<ContactForm />
							</CardContent>
						</Card>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
