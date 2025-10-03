/**
 * Contact form action handler
 * Handles form submission and validation using server-side validation
 */

import type { FormResult } from "src/components/form-state/form-state.type";

/**
 * Contact form data interface
 */
export interface ContactFormData {
	name: string;
	phone: string;
	email: string;
	subject: string;
	message: string;
}

/**
 * Contact form submission handler
 * @param formData - Form data from the form submission
 * @returns Promise that resolves to success/error result
 */
export async function handleContactFormSubmission(formData: FormData): Promise<FormResult> {
	try {
		// Extract form data
		const data: ContactFormData = {
			name: formData.get("name") as string,
			phone: formData.get("phone") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
		};

		// Basic validation
		if (!data.name?.trim()) {
			return {
				success: false,
				error: "Họ và tên là bắt buộc",
			};
		}

		if (!data.phone?.trim()) {
			return {
				success: false,
				error: "Số điện thoại là bắt buộc",
			};
		}

		if (!data.email?.trim()) {
			return {
				success: false,
				error: "Email là bắt buộc",
			};
		}

		if (!data.message?.trim()) {
			return {
				success: false,
				error: "Nội dung là bắt buộc",
			};
		}

		// TODO: Implement actual form submission logic here
		// For now, simulate a successful submission
		console.log("Contact form submission:", data);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Return success result
		return {
			success: true,
			refresh: true,
		};
	} catch (error) {
		console.error("Contact form submission error:", error);
		return {
			success: false,
			error: "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.",
		};
	}
}
