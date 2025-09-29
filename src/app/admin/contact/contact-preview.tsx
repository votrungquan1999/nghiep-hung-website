"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { useContactInfo } from "./contact-context";
import { SocialMediaContactPreview } from "./social-media/social-media-contact-preview";
import { SocialMediaFooterPreview } from "./social-media/social-media-footer-preview";

/**
 * Contact section preview component
 * Shows how contact information will appear in the contact section
 * @returns JSX element displaying contact section preview
 */
export function ContactSectionPreview() {
	const contactInfo = useContactInfo();

	return (
		<div className="bg-muted/50 p-6 rounded-lg space-y-4">
			<h4 className="text-lg font-semibold">{"Contact Section Preview"}</h4>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<div className="flex items-start">
						<Phone className="size-5 text-primary mt-1 mr-3" />
						<div>
							<p className="font-medium">{"Điện thoại"}</p>
							<p className="text-muted-foreground">{contactInfo.phone1}</p>
							<p className="text-muted-foreground">{contactInfo.phone2}</p>
						</div>
					</div>
					<div className="flex items-start">
						<Mail className="size-5 text-primary mt-1 mr-3" />
						<div>
							<p className="font-medium">{"Email"}</p>
							<p className="text-muted-foreground">{contactInfo.email1}</p>
							<p className="text-muted-foreground">{contactInfo.email2}</p>
						</div>
					</div>
					<div className="flex items-start">
						<MapPin className="size-5 text-primary mt-1 mr-3" />
						<div>
							<p className="font-medium">{"Địa chỉ"}</p>
							<p className="text-muted-foreground">{contactInfo.address}</p>
						</div>
					</div>
					<div className="flex items-start">
						<Clock className="size-5 text-primary mt-1 mr-3" />
						<div>
							<p className="font-medium">{"Giờ làm việc"}</p>
							<div className="text-muted-foreground whitespace-pre-line">
								{contactInfo.workingHours.vi}
							</div>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<SocialMediaContactPreview />
				</div>
			</div>
		</div>
	);
}

/**
 * Footer preview component
 * Shows how contact information will appear in the footer
 * @returns JSX element displaying footer preview
 */
export function FooterPreview() {
	const contactInfo = useContactInfo();

	// Static company information (not editable)
	const staticCompanyInfo = {
		companyName: "Công ty TNHH Nghiệp Hưng",
		description:
			"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến những giải pháp tối ưu cho khách hàng.",
		copyright: "© 2024 Công ty TNHH Nghiệp Hưng. Tất cả quyền được bảo lưu.",
	};

	return (
		<div className="bg-primary text-primary-foreground p-6 rounded-lg space-y-4">
			<h4 className="text-lg font-semibold">{"Footer Preview"}</h4>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h3 className="text-xl font-serif font-bold">{staticCompanyInfo.companyName}</h3>
					<p className="text-primary-foreground/80 leading-relaxed">
						{staticCompanyInfo.description}
					</p>
					<SocialMediaFooterPreview />
				</div>
				<div className="space-y-4">
					<div className="flex items-start">
						<MapPin className="size-5 mt-1 mr-3 flex-shrink-0" />
						<p className="text-primary-foreground/80 text-sm">{contactInfo.address}</p>
					</div>
					<div className="flex items-center">
						<Phone className="size-5 mr-3 flex-shrink-0" />
						<p className="text-primary-foreground/80 text-sm">{contactInfo.phone1}</p>
					</div>
					<div className="flex items-center">
						<Mail className="size-5 mr-3 flex-shrink-0" />
						<p className="text-primary-foreground/80 text-sm">{contactInfo.email1}</p>
					</div>
				</div>
			</div>
			<div className="border-t border-primary-foreground/20 pt-4 text-center">
				<p className="text-primary-foreground/60 text-sm">{staticCompanyInfo.copyright}</p>
			</div>
		</div>
	);
}

/**
 * Preview section card component
 * Shows how contact information will appear in both contact section and footer
 * @returns JSX element displaying preview section
 */
export function PreviewSection() {
	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>{"Preview"}</CardTitle>
				<CardDescription>
					{"How your contact information will appear in the contact section and footer"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					<ContactSectionPreview />
					<FooterPreview />
				</div>
			</CardContent>
		</Card>
	);
}
