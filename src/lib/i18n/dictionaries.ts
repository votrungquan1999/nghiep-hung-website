/**
 * Translation dictionaries for Vietnamese and English
 * Contains static UI text and common elements
 */

import type { DictionaryForLocale } from "./types";

export const dictionaries: DictionaryForLocale = {
	vi: {
		nav: {
			home: "Trang chủ",
			about: "Giới thiệu",
			products: "Sản phẩm",
			services: "Dịch vụ",
			projects: "Dự án",
			contact: "Liên hệ",
			privacyPolicy: "Chính sách bảo mật",
		},
		common: {
			loading: "Đang tải...",
			error: "Có lỗi xảy ra",
			success: "Thành công",
			cancel: "Hủy",
			confirm: "Xác nhận",
			save: "Lưu",
			edit: "Chỉnh sửa",
			delete: "Xóa",
			close: "Đóng",
			back: "Quay lại",
			next: "Tiếp theo",
			previous: "Trước đó",
			search: "Tìm kiếm",
			filter: "Lọc",
			sort: "Sắp xếp",
			view: "Xem",
			readMore: "Đọc thêm",
			showLess: "Thu gọn",
		},
		form: {
			required: "Trường này là bắt buộc",
			invalidEmail: "Email không hợp lệ",
			invalidPhone: "Số điện thoại không hợp lệ",
			minLength: "Tối thiểu {min} ký tự",
			maxLength: "Tối đa {max} ký tự",
			submit: "Gửi",
			submitting: "Đang gửi...",
			success: "Gửi thành công",
			error: "Gửi thất bại",
		},
		footer: {
			companyName: "Công ty TNHH Nghiệp Hưng",
			description: "Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao",
			address: "Địa chỉ: [Địa chỉ công ty]",
			phone: "Điện thoại: [Số điện thoại]",
			email: "Email: [Email công ty]",
			copyright: "© 2024 Công ty TNHH Nghiệp Hưng",
			allRightsReserved: "Tất cả quyền được bảo lưu",
		},
		meta: {
			title: "Công ty TNHH Nghiệp Hưng - Hệ thống ống gió chuyên nghiệp",
			description:
				"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao cho công nghiệp và dân dụng",
			keywords: "ống gió, hệ thống thông gió, công nghiệp, dân dụng, Nghiệp Hưng",
		},
	},
	en: {
		nav: {
			home: "Home",
			about: "About",
			products: "Products",
			services: "Services",
			projects: "Projects",
			contact: "Contact",
			privacyPolicy: "Privacy Policy",
		},
		common: {
			loading: "Loading...",
			error: "An error occurred",
			success: "Success",
			cancel: "Cancel",
			confirm: "Confirm",
			save: "Save",
			edit: "Edit",
			delete: "Delete",
			close: "Close",
			back: "Back",
			next: "Next",
			previous: "Previous",
			search: "Search",
			filter: "Filter",
			sort: "Sort",
			view: "View",
			readMore: "Read More",
			showLess: "Show Less",
		},
		form: {
			required: "This field is required",
			invalidEmail: "Invalid email address",
			invalidPhone: "Invalid phone number",
			minLength: "Minimum {min} characters",
			maxLength: "Maximum {max} characters",
			submit: "Submit",
			submitting: "Submitting...",
			success: "Submitted successfully",
			error: "Submission failed",
		},
		footer: {
			companyName: "Nghiep Hung Co., Ltd",
			description: "Specialized in manufacturing and installing high-quality ductwork systems",
			address: "Address: [Company Address]",
			phone: "Phone: [Company Phone]",
			email: "Email: [Company Email]",
			copyright: "© 2024 Nghiep Hung Co., Ltd",
			allRightsReserved: "All rights reserved",
		},
		meta: {
			title: "Nghiep Hung Co., Ltd - Professional Ductwork Systems",
			description:
				"Specialized in manufacturing and installing high-quality ductwork systems for industrial and residential applications",
			keywords: "ductwork, ventilation systems, industrial, residential, Nghiep Hung",
		},
	},
};

/**
 * Get dictionary for a specific locale
 * @param locale - The locale to get dictionary for
 * @returns Dictionary object for the locale
 */
export function getDictionary(locale: keyof typeof dictionaries) {
	const dictionary = dictionaries[locale];
	if (!dictionary) {
		console.error(`Dictionary not found for locale: ${locale}`);
		// Fallback to default locale if dictionary not found
		return dictionaries.vi;
	}
	return dictionary;
}

/**
 * Get all available locales
 * @returns Array of available locale keys
 */
export function getAvailableLocales() {
	return Object.keys(dictionaries) as Array<keyof typeof dictionaries>;
}
