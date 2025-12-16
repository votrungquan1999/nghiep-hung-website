import type { Metadata } from "next";
import type { Locale } from "src/lib/i18n/config";
import { generatePrivacyPolicyMetadata } from "src/lib/seo/metadata";

/**
 * Generate metadata for privacy policy page
 * @param params - Route parameters including locale
 * @returns Metadata object
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang: locale } = await params;
	return generatePrivacyPolicyMetadata(locale);
}

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="prose prose-lg max-w-none">
					<h1 className="text-4xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>

					<p className="text-muted-foreground mb-8">Last updated: Sep 30, 2025</p>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">1. Introduction</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							Nghiep Hung Co., Ltd. ("we", "our", "us") is committed to protecting the privacy and
							personal information of our customers, partners, and website users. This privacy
							policy describes how we collect, use, store, and protect your personal information.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							2. Information We Collect
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							We may collect the following types of information:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
							<li>Contact information: name, email, phone number, address</li>
							<li>Business information: company name, position, industry</li>
							<li>Technical information: IP address, browser type, access time</li>
							<li>Project information: quote requests, technical specifications</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							3. How We Use Information
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							The collected information will be used for the following purposes:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
							<li>Provide consultation and quotation services</li>
							<li>Contact and support customers</li>
							<li>Improve service quality</li>
							<li>Send information about new products and services</li>
							<li>Comply with legal requirements</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							4. Authentication and Login
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							When you log into our admin system through Google OAuth:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
							<li>
								We only access basic Google account information (name, email, and profile image)
							</li>
							<li>We only use non-sensitive scopes</li>
							<li>We do not access other sensitive or private data in your Google account</li>
							<li>Login information is encrypted and secured</li>
							<li>You can revoke access at any time through your Google account settings</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							5. Information Sharing
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							We do not sell, rent, or share your personal information with third parties, except in
							the following cases:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
							<li>With your explicit consent</li>
							<li>As required by law</li>
							<li>
								With trusted partners who assist in providing services (bound by confidentiality
								agreements)
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							6. Information Security
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							We implement appropriate technical and administrative security measures to protect
							personal information from unauthorized access, use, disclosure, modification, or
							destruction.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							7. Cookies and Tracking Technologies
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							Our website uses cookies to improve user experience. You can disable cookies in your
							browser settings, however this may affect some website functionality.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">8. Your Rights</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							You have the following rights regarding your personal information:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
							<li>Request access to and view personal information</li>
							<li>Request correction of inaccurate information</li>
							<li>Request deletion of personal information</li>
							<li>Request restriction of information processing</li>
							<li>Withdraw consent (where applicable)</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							9. Information Storage
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							We only store personal information for as long as necessary to fulfill the stated
							purposes or as required by law.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">
							10. Policy Changes
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							We may update this privacy policy from time to time. Any changes will be posted on the
							website and take effect immediately upon posting.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-serif font-semibold text-primary mb-4">11. Contact</h2>
						<p className="text-muted-foreground leading-relaxed mb-4">
							If you have any questions about this privacy policy or wish to exercise your rights,
							please contact us:
						</p>
						<div className="bg-muted p-6 rounded-lg">
							<p className="font-semibold text-primary mb-2">Nghiep Hung Co., Ltd.</p>
							<p className="text-muted-foreground mb-1">
								<strong>Address:</strong> 123 ABC Street, XYZ Ward, District 1, Ho Chi Minh City
							</p>
							<p className="text-muted-foreground mb-1">
								<strong>Phone:</strong> 0123 456 789
							</p>
							<p className="text-muted-foreground">
								<strong>Email:</strong> info@nghiephung.com
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
