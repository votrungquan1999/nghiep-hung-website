"use client";

import { FieldError, FormField, FormInput, FormLabel } from "src/components/form-field";
import { Form, FormErrorDisplay, SubmitButton } from "src/components/form-state";
import { Textarea } from "src/components/ui/textarea";
import { handleContactFormSubmission } from "./contact-form.actions";

/**
 * Contact form component
 * Renders the contact form using the form field system (uncontrolled)
 */
export function ContactForm() {
	return (
		<Form action={handleContactFormSubmission}>
			<FormErrorDisplay />

			<div className="space-y-6">
				<div className="grid md:grid-cols-2 gap-6">
					<FormField fieldId="name" name="name" required>
						<FormLabel>Họ và tên</FormLabel>
						<FormInput type="text" placeholder="Nhập họ và tên" />
						<FieldError />
					</FormField>

					<FormField
						fieldId="phone"
						name="phone"
						required
						pattern="[0-9+\-\s()]+"
						title="Số điện thoại chỉ được chứa số, khoảng trắng, dấu gạch ngang, dấu ngoặc đơn và dấu cộng"
					>
						<FormLabel>Số điện thoại</FormLabel>
						<FormInput type="tel" placeholder="Nhập số điện thoại" />
						<FieldError />
					</FormField>
				</div>

				<FormField fieldId="email" name="email" required>
					<FormLabel>Email</FormLabel>
					<FormInput type="email" placeholder="Nhập địa chỉ email" />
					<FieldError />
				</FormField>

				<FormField fieldId="subject" name="subject">
					<FormLabel>Chủ đề</FormLabel>
					<FormInput type="text" placeholder="Nhập chủ đề cần tư vấn" />
					<FieldError />
				</FormField>

				<FormField fieldId="message" name="message" required>
					<FormLabel>Nội dung</FormLabel>
					<Textarea
						placeholder="Mô tả chi tiết yêu cầu của bạn..."
						rows={6}
						className="min-h-[80px]"
					/>
					<FieldError />
				</FormField>

				<SubmitButton className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
					Gửi yêu cầu tư vấn
				</SubmitButton>
			</div>
		</Form>
	);
}
