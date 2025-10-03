"use client";

import { FieldError, FormField, FormInput, FormLabel } from "src/components/form-field";
import { Form, FormErrorDisplay, SubmitButton } from "src/components/form-state";
import { Textarea } from "src/components/ui/textarea";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import { handleContactFormSubmission } from "./contact-form.actions";

interface ContactFormProps {
	locale: Locale;
}

/**
 * Contact form component
 * Renders the contact form using the form field system (uncontrolled)
 * @param locale - The current locale for internationalization
 */
export function ContactForm({ locale }: ContactFormProps) {
	const dictionary = getDictionary(locale);
	return (
		<Form action={handleContactFormSubmission}>
			<FormErrorDisplay />

			<div className="space-y-6">
				<div className="grid md:grid-cols-2 gap-6">
					<FormField fieldId="name" name="name" required>
						<FormLabel>{dictionary.contact.form.fields.name.label}</FormLabel>
						<FormInput type="text" placeholder={dictionary.contact.form.fields.name.placeholder} />
						<FieldError />
					</FormField>

					<FormField
						fieldId="phone"
						name="phone"
						required
						pattern="[0-9+\-\s()]+"
						title={dictionary.contact.form.fields.phone.validation}
					>
						<FormLabel>{dictionary.contact.form.fields.phone.label}</FormLabel>
						<FormInput type="tel" placeholder={dictionary.contact.form.fields.phone.placeholder} />
						<FieldError />
					</FormField>
				</div>

				<FormField fieldId="email" name="email" required>
					<FormLabel>{dictionary.contact.form.fields.email.label}</FormLabel>
					<FormInput type="email" placeholder={dictionary.contact.form.fields.email.placeholder} />
					<FieldError />
				</FormField>

				<FormField fieldId="subject" name="subject">
					<FormLabel>{dictionary.contact.form.fields.subject.label}</FormLabel>
					<FormInput type="text" placeholder={dictionary.contact.form.fields.subject.placeholder} />
					<FieldError />
				</FormField>

				<FormField fieldId="message" name="message" required>
					<FormLabel>{dictionary.contact.form.fields.message.label}</FormLabel>
					<Textarea
						placeholder={dictionary.contact.form.fields.message.placeholder}
						rows={6}
						className="min-h-[80px]"
					/>
					<FieldError />
				</FormField>

				<SubmitButton className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
					{dictionary.contact.form.submit}
				</SubmitButton>
			</div>
		</Form>
	);
}
