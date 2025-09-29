"use client";

import { Clock, Phone } from "lucide-react";
import { FormField, FormHelpText, FormInput, FormLabel } from "src/components/form-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Textarea } from "src/components/ui/textarea";
import { useAddress, useEmailAddresses, usePhoneNumbers, useWorkingHours } from "./contact-context";

/**
 * Contact details form card component
 * Displays and manages contact details form using context
 * @returns JSX element displaying contact details form card
 */
export function ContactDetailsFormCard() {
	const { phone1, phone2, updatePhone1, updatePhone2 } = usePhoneNumbers();
	const { email1, email2, updateEmail1, updateEmail2 } = useEmailAddresses();
	const { address, updateAddress } = useAddress();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Phone className="size-5" />
					<span>Contact Details</span>
				</CardTitle>
				<CardDescription>
					Phone numbers, emails, and address shown in contact section and footer
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<FormField
					fieldId="phone1"
					label="Primary Phone"
					value={phone1}
					placeholder="0123 456 789"
					helpText="Main contact number displayed prominently"
				>
					<FormLabel>Primary Phone</FormLabel>
					<FormInput onChange={(e) => updatePhone1(e.target.value)} />
					<FormHelpText />
				</FormField>

				<FormField
					fieldId="phone2"
					label="Secondary Phone"
					value={phone2}
					placeholder="0987 654 321"
					helpText="Alternative contact number"
				>
					<FormLabel>Secondary Phone</FormLabel>
					<FormInput onChange={(e) => updatePhone2(e.target.value)} />
					<FormHelpText />
				</FormField>

				<FormField
					fieldId="email1"
					label="Primary Email"
					value={email1}
					type="email"
					placeholder="info@nghiephung.com"
					helpText="Main email address for inquiries"
				>
					<FormLabel>Primary Email</FormLabel>
					<FormInput onChange={(e) => updateEmail1(e.target.value)} />
					<FormHelpText />
				</FormField>

				<FormField
					fieldId="email2"
					label="Secondary Email"
					value={email2}
					type="email"
					placeholder="sales@nghiephung.com"
					helpText="Alternative email address"
				>
					<FormLabel>Secondary Email</FormLabel>
					<FormInput onChange={(e) => updateEmail2(e.target.value)} />
					<FormHelpText />
				</FormField>

				<FormField
					fieldId="address"
					label="Address"
					value={address}
					placeholder="Enter full address"
					helpText="Complete business address for contact section"
				>
					<FormLabel>Address</FormLabel>
					<FormInput asChild>
						<Textarea
							rows={3}
							onChange={(e) => updateAddress(e.target.value)}
							className="resize-none"
						/>
					</FormInput>
					<FormHelpText />
				</FormField>
			</CardContent>
		</Card>
	);
}

/**
 * Working hours form card component
 * Displays and manages working hours form using simple text inputs
 * @returns JSX element displaying working hours form card
 */
export function WorkingHoursFormCard() {
	const { workingHours, updateWorkingHoursEn, updateWorkingHoursVi } = useWorkingHours();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Clock className="size-5" />
					<span>Working Hours</span>
				</CardTitle>
				<CardDescription>
					Enter your business hours in both English and Vietnamese. This text will be displayed in
					the contact section and footer.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<FormField
					fieldId="workingHoursEn"
					label="Working Hours (English)"
					value={workingHours.en}
					placeholder="Monday - Friday: 8:00 AM - 5:30 PM&#10;Saturday: 8:00 AM - 12:00 PM&#10;Sunday: Closed"
					helpText="Working hours text displayed in English. Use multiple lines for different time periods."
				>
					<FormLabel>Working Hours (English)</FormLabel>
					<FormInput asChild>
						<Textarea
							rows={4}
							onChange={(e) => updateWorkingHoursEn(e.target.value)}
							className="resize-none"
						/>
					</FormInput>
					<FormHelpText />
				</FormField>

				<FormField
					fieldId="workingHoursVi"
					label="Working Hours (Vietnamese)"
					value={workingHours.vi}
					placeholder="Thứ 2 - Thứ 6: 08:00 - 17:30&#10;Thứ 7: 08:00 - 12:00&#10;Chủ nhật: Nghỉ"
					helpText="Working hours text displayed in Vietnamese. Use multiple lines for different time periods."
				>
					<FormLabel>Working Hours (Vietnamese)</FormLabel>
					<FormInput asChild>
						<Textarea
							rows={4}
							onChange={(e) => updateWorkingHoursVi(e.target.value)}
							className="resize-none"
						/>
					</FormInput>
					<FormHelpText />
				</FormField>
			</CardContent>
		</Card>
	);
}
