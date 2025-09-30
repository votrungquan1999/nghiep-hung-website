import { Save } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import {
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormSubmitMessage,
} from "src/components/form-state";
import { Button } from "src/components/ui/button";
import { getContactInfo } from "src/server/contact";
import { updateContactInformation } from "./contact.actions";
import { ContactProvider } from "./contact-context";
import { ContactDetailsFormCard, WorkingHoursFormCard } from "./contact-form-cards";
import { PreviewSection } from "./contact-preview";
import { SocialMediaFormCard } from "./social-media/social-media-form-card";

export const metadata: Metadata = {
	title: "Contact Management - Admin - Nghiệp Hưng",
	description:
		"Update contact information, working hours, and social media links in the admin panel",
};

/**
 * Contact info management page
 * Manages editable contact information that appears in the contact section and footer
 * Updates contact details, working hours, and social media links (company info is static)
 */
export default async function ContactPage() {
	await connection();
	// Fetch contact information from database
	const contactInfo = await getContactInfo();

	return (
		<ContactProvider contactInfo={contactInfo}>
			<div className="container mx-auto px-4 py-8">
				{/* Section Header */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-4">
						<div className="p-2 rounded-lg bg-primary/10">
							<Save className="size-6 text-primary" />
						</div>
						<div>
							<h1 className="text-2xl font-serif font-bold text-foreground">{"Contact"}</h1>
							<p className="text-muted-foreground">{"Update contact information"}</p>
						</div>
					</div>
				</div>

				<Form action={updateContactInformation}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<ContactDetailsFormCard />
						<WorkingHoursFormCard />
						<SocialMediaFormCard />
					</div>

					<FormErrorDisplay />

					{/* Submit Button */}
					<div className="flex justify-end pt-4">
						<Button type="submit">
							<FormSubmitMessage>
								<Save className="mr-2 size-4" />
								Save Changes
							</FormSubmitMessage>
							<FormPendingMessage>
								<Save className="mr-2 size-4" />
								Saving...
							</FormPendingMessage>
						</Button>
					</div>
				</Form>

				<PreviewSection />
			</div>
		</ContactProvider>
	);
}
