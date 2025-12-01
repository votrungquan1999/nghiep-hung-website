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
			description:
				"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến những giải pháp tối ưu cho khách hàng.",
			quickLinks: "Liên kết nhanh",
			contactInfo: "Thông tin liên hệ",
			copyright: "© 2024 Công ty TNHH Nghiệp Hưng. Tất cả quyền được bảo lưu.",
		},
		about: {
			title: "Về Công ty",
			companyName: "Nghiệp Hưng",
			description:
				"Công ty TNHH Nghiệp Hưng được thành lập với sứ mệnh mang đến những giải pháp hệ thống ống gió tối ưu, góp phần nâng cao chất lượng không khí và môi trường sống.",
			imageAlt: "Hình ảnh công ty Nghiệp Hưng",
			features: {
				companyHistory: {
					title: "Lịch sử hình thành",
					description: "Mô tả về lịch sử hình thành của công ty sẽ được cập nhật sau.",
				},
				vision: {
					title: "Tầm nhìn",
					description:
						"Công ty TNHH Nghiệp Hưng định hướng trở thành đơn vị dẫn đầu trong lĩnh vực cung cấp giải pháp thông gió và phòng cháy chữa cháy (PCCC) tại Việt Nam, không ngừng nâng cao năng lực thi công, chất lượng sản phẩm và dịch vụ nhằm đáp ứng nhu cầu ngày càng cao của thị trường",
				},
				mission: {
					title: "Sứ mệnh",
					description:
						"Cung cấp giải pháp thông gió và PCCC chất lượng cao, an toàn và hiệu quả cho mọi công trình. Không ngừng nâng cao năng lực kỹ thuật, sản phẩm và dịch vụ, mang lại giá trị tối ưu cho khách hàng. Xây dựng thương hiệu uy tín, chuyên nghiệp, đóng góp vào sự phát triển bền vững của ngành cơ điện và xây dựng.",
				},
				coreValues: {
					title: "Giá trị cốt lõi",
					description: "7 giá trị cốt lõi định hướng hoạt động và phát triển của công ty",
				},
			},
			commitment: {
				title: "Cam kết của chúng tôi",
				items: [
					"An toàn tuyệt đối - Được kiểm định & chứng nhận bởi Trung tâm Nghiên cứu Ứng dụng KHKT PCCC & Viện Khoa học CNXD",
					"Trực tiếp sản xuất – Không qua trung gian",
					"Xưởng hiện đại, năng lực lớn – hơn 12.000m² sản phẩm/ mỗi tháng",
					"Đội ngũ kỹ thuật tay nghề cao, thi công tận nơi",
					"Đảm bảo chất lượng - đúng tiến độ - giá thành hợp lý",
					"Hỗ trợ đo vẽ, tư vấn kỹ thuật từ A-Z",
				],
				imageAlt: "Đội ngũ chuyên nghiệp",
			},
			timeline: {
				events: [
					{
						year: "2010",
						title: "Thành lập công ty",
						description:
							"Công ty được thành lập với tên Công ty TNHH Thương Mại Dịch Vụ Kỹ Thuật TRE",
					},
					{
						year: "2018",
						title: "Đổi tên công ty",
						description:
							"Công ty đổi tên mới là Công ty TNHH Nghiệp Hưng. Là nhà thầu thiết kế và thi công hệ thống cơ điện trong các công trình dân dụng và công nghiệp",
					},
					{
						year: "2020",
						title: "Mở rộng sản xuất",
						description:
							"Mở rộng thêm sản xuất ống thông gió, các hạng mục thiết kế, thi công đa dạng các hệ thống thông gió – làm mát nhà xưởng, điều hòa công nghiệp, hút khói mùi, phòng sạch,…",
					},
				],
			},
			coreValues: {
				carousel: {
					previous: "Trước",
					next: "Sau",
				},
				values: [
					{
						id: 1,
						title: "ỨNG XỬ VĂN MINH THEO 7T",
						description: "Giá trị cốt lõi về cách ứng xử văn minh trong mọi mối quan hệ",
						items: [
							"TẬN TỤY, TRUNG THÀNH đối với công ty",
							"TẬN TÌNH, CHU ĐÁO đối với khách hàng",
							"TỰ TRỌNG, CẦU TIẾN đối với bản thân",
							"THẤU HIỂU, GƯƠNG MẪU đối với cấp dưới",
							"TƯƠNG TRỢ, CỘNG TÁC đối với đồng nghiệp",
							"TÔN KÍNH, PHỤC TÙNG đối với cấp trên",
							"TRUNG THỰC, KHIÊM TỐN đối với mọi người",
						],
					},
					{
						id: 2,
						title: "HÀNH XỬ CHÍNH TRỰC THEO 7 CÔNG",
						description: "Nguyên tắc hành xử chính trực và công bằng trong mọi hoạt động",
						items: [
							"CÔNG TÂM trong phân xử",
							"CÔNG CHÍNH trong thu nhập",
							"CÔNG BẰNG trong đối đãi",
							"CÔNG MINH trong thưởng phạt",
							"CÔNG PHÁP trong hành động",
							"CÔNG LÝ trong tư duy",
							"CÔNG KHAI trong tài chính",
						],
					},
					{
						id: 3,
						title: "THỰC THI CAM KẾT THEO 7 ĐÚNG",
						description: "Cam kết thực hiện đúng mọi tiêu chuẩn và yêu cầu",
						items: [
							"ĐÚNG chất lượng",
							"ĐÚNG thời gian",
							"ĐÚNG khối lượng",
							"ĐÚNG giá trị",
							"ĐÚNG tiêu chuẩn",
							"ĐÚNG xuất xứ",
							"ĐÚNG biện pháp",
						],
					},
					{
						id: 4,
						title: "TUÂN THỦ KỶ LUẬT THEO 7 KHÔNG",
						description: "Nguyên tắc tuân thủ kỷ luật và quy định",
						items: [
							"KHÔNG vi phạm pháp luật",
							"KHÔNG vi phạm điều lệ",
							"KHÔNG vi phạm thỏa ước",
							"KHÔNG vi phạm nội quy",
							"KHÔNG vi phạm quy chế",
							"KHÔNG vi phạm quy trình",
							"KHÔNG vi phạm thuần phong mỹ tục",
						],
					},
					{
						id: 5,
						title: "TÍCH HỢP TINH HOA (6 + 1)",
						description: "Học hỏi và tích hợp tinh hoa từ các quốc gia phát triển",
						items: [
							"Khởi nghiệp ISRAEL",
							"Quản trị MỸ",
							"Công nghệ ĐỨC",
							"Kỹ năng SINGAPORE",
							"Chất lượng NHẬT",
							"Tốc độ HÀN QUỐC",
						],
					},
					{
						id: 6,
						title: "TÍCH CỰC SÁNG TẠO THEO 7 LĨNH VỰC",
						description: "Khuyến khích sáng tạo và đổi mới trong mọi lĩnh vực",
						items: [
							"Kỹ thuật",
							"Công nghệ",
							"Quản trị",
							"Kinh doanh",
							"Văn hóa",
							"Giáo dục",
							"Nghệ thuật",
						],
					},
					{
						id: 7,
						title: "CHỦ ĐỘNG HỢP TÁC THEO 7 YÊU CẦU",
						description: "Tinh thần hợp tác và làm việc nhóm hiệu quả",
						items: [
							"Khiêm nhường",
							"Kiên nhẫn",
							"Cởi mở",
							"Chân thành",
							"Hài hòa",
							"Thiện chí",
							"Thủy chung",
						],
					},
				],
			},
		},
		products: {
			title: "Sản phẩm",
			subtitle: "Chất lượng cao",
			description:
				"Chúng tôi cung cấp đa dạng các sản phẩm hệ thống ống gió chất lượng cao, đáp ứng mọi nhu cầu của khách hàng.",
			notFound: {
				title: "Không tìm thấy sản phẩm",
				description: "Sản phẩm được yêu cầu không thể tìm thấy.",
			},
			empty: {
				title: "Chưa có sản phẩm",
				description: "Hiện tại chúng tôi chưa có sản phẩm nào để hiển thị. Vui lòng quay lại sau.",
				action: "Liên hệ tư vấn",
			},
			viewAll: "Xem tất cả sản phẩm",
		},
		services: {
			title: "Dịch vụ",
			subtitle: "Chuyên nghiệp",
			description:
				"Chúng tôi cung cấp đầy đủ các dịch vụ từ tư vấn, thiết kế, thi công đến bảo trì hệ thống ống gió.",
			notFound: {
				title: "Không tìm thấy dịch vụ",
				description: "Dịch vụ được yêu cầu không thể tìm thấy.",
			},
			empty: {
				title: "Chưa có dịch vụ",
				description: "Hiện tại chúng tôi chưa có dịch vụ nào để hiển thị. Vui lòng quay lại sau.",
				action: "Liên hệ tư vấn",
			},
			viewAll: "Xem tất cả dịch vụ",
		},
		projects: {
			title: "Dự án",
			subtitle: "Tiêu biểu",
			description:
				"Khám phá những dự án đã hoàn thành của chúng tôi, từ các tòa nhà thương mại đến nhà máy công nghiệp.",
			notFound: {
				title: "Không tìm thấy dự án",
				description: "Dự án được yêu cầu không thể tìm thấy.",
			},
			empty: {
				title: "Chưa có dự án",
				description: "Hiện tại chúng tôi chưa có dự án nào để hiển thị. Vui lòng quay lại sau.",
				action: "Liên hệ tư vấn",
			},
			projectDescription: "Mô tả dự án",
			technicalSpecs: "Thông số kỹ thuật",
			projectImages: "Hình ảnh dự án",
			completionStatus: {
				completed: "Hoàn thành",
				inProgress: "Đang thực hiện",
				planning: "Đang lên kế hoạch",
			},
			filter: {
				all: "Tất cả",
				viewAll: "Xem tất cả dự án",
			},
		},
		contact: {
			title: "Liên hệ với chúng tôi",
			description:
				"Hãy để lại thông tin để được tư vấn miễn phí về giải pháp hệ thống ống gió phù hợp nhất.",
			contactInfo: {
				title: "Thông tin liên hệ",
				phone: "Điện thoại",
				email: "Email",
				address: "Địa chỉ",
				workingHours: "Giờ làm việc",
			},
			socialMedia: {
				title: "Kết nối với chúng tôi",
			},
			form: {
				title: "Gửi yêu cầu tư vấn",
				fields: {
					name: {
						label: "Họ và tên",
						placeholder: "Nhập họ và tên",
					},
					phone: {
						label: "Số điện thoại",
						placeholder: "Nhập số điện thoại",
						validation:
							"Số điện thoại chỉ được chứa số, khoảng trắng, dấu gạch ngang, dấu ngoặc đơn và dấu cộng",
					},
					email: {
						label: "Email",
						placeholder: "Nhập địa chỉ email",
					},
					subject: {
						label: "Chủ đề",
						placeholder: "Nhập chủ đề cần tư vấn",
					},
					message: {
						label: "Nội dung",
						placeholder: "Mô tả chi tiết yêu cầu của bạn...",
					},
				},
				submit: "Gửi yêu cầu tư vấn",
			},
			dialog: {
				trigger: "Liên hệ với chúng tôi",
			},
		},
		hero: {
			title: "Hệ thống ống gió chuyên nghiệp",
			description:
				"Với hơn 10 năm kinh nghiệm, chúng tôi chuyên sản xuất và thi công các hệ thống ống gió chất lượng cao cho các dự án công nghiệp và dân dụng.",
			buttons: {
				viewProducts: "Xem sản phẩm",
				contactConsultation: "Liên hệ tư vấn",
			},
			features: {
				standardDucts: "Ống gió chuẩn",
				fastService: "Dịch vụ nhanh",
				goodPrice: "Giá thành tốt",
			},
			experience: {
				years: "10+",
				label: "Năm kinh nghiệm",
			},
			imageAlt: "Hệ thống ống gió chuyên nghiệp",
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
			description:
				"Specialized in manufacturing and installing high-quality ductwork systems. With over 10 years of experience, we are committed to delivering optimal solutions for our customers.",
			quickLinks: "Quick Links",
			contactInfo: "Contact Information",
			copyright: "© 2024 Nghiep Hung Co., Ltd. All rights reserved.",
		},
		about: {
			title: "About",
			companyName: "Nghiep Hung",
			description:
				"Nghiep Hung Co., Ltd was established with the mission to provide optimal ductwork system solutions, contributing to improving air quality and living environment.",
			imageAlt: "Nghiep Hung company image",
			features: {
				companyHistory: {
					title: "Company History",
					description: "Description about the company's formation history will be updated later.",
				},
				vision: {
					title: "Vision",
					description:
						"Nghiep Hung Co., Ltd aims to become the leading unit in providing ventilation and fire protection solutions in Vietnam, continuously improving construction capacity, product quality and services to meet the increasing demands of the market",
				},
				mission: {
					title: "Mission",
					description:
						"Provide high-quality, safe and effective ventilation and fire protection solutions for all projects. Continuously improve technical capacity, products and services, bringing optimal value to customers. Build a reputable, professional brand, contributing to the sustainable development of the electrical and construction industry.",
				},
				coreValues: {
					title: "Core Values",
					description: "7 core values that guide the company's operations and development",
				},
			},
			commitment: {
				title: "Our Commitment",
				items: [
					"Absolute safety - Certified by the Center for Research and Application of Science and Technology Fire Prevention and Construction Science Institute",
					"Direct production - No intermediaries",
					"Modern factory, large capacity - over 12,000m² of products per month",
					"High-skilled technical team, on-site construction",
					"Quality assurance - on schedule - reasonable price",
					"Support measurement, technical consultation from A-Z",
				],
				imageAlt: "Professional team",
			},
			timeline: {
				events: [
					{
						year: "2010",
						title: "Company Founded",
						description: "The company was established as TRE Technical Trading Services Co., Ltd",
					},
					{
						year: "2018",
						title: "Company Renamed",
						description:
							"The company was renamed to Nghiep Hung Co., Ltd. We are a contractor for design and construction of electrical systems in civil and industrial projects",
					},
					{
						year: "2020",
						title: "Production Expansion",
						description:
							"Expanded production of ventilation ducts, diverse design and construction projects including ventilation systems - factory cooling, industrial air conditioning, smoke extraction, clean rooms, etc.",
					},
				],
			},
			coreValues: {
				carousel: {
					previous: "Previous",
					next: "Next",
				},
				values: [
					{
						id: 1,
						title: "CIVILIZED BEHAVIOR BY 7T",
						description: "Core values about civilized behavior in all relationships",
						items: [
							"DEVOTED, LOYAL to the company",
							"CARING, THOUGHTFUL to customers",
							"SELF-RESPECT, PROGRESSIVE to oneself",
							"UNDERSTANDING, EXEMPLARY to subordinates",
							"SUPPORTIVE, COLLABORATIVE to colleagues",
							"RESPECTFUL, OBEDIENT to superiors",
							"HONEST, HUMBLE to everyone",
						],
					},
					{
						id: 2,
						title: "RIGHTEOUS CONDUCT BY 7 FAIR",
						description: "Principles of righteous and fair conduct in all activities",
						items: [
							"FAIR-MINDED in judgment",
							"FAIR in income",
							"FAIR in treatment",
							"FAIR in rewards and penalties",
							"FAIR in action",
							"FAIR in thinking",
							"FAIR in finance",
						],
					},
					{
						id: 3,
						title: "COMMITMENT FULFILLMENT BY 7 CORRECT",
						description: "Commitment to fulfill all standards and requirements correctly",
						items: [
							"CORRECT quality",
							"CORRECT timing",
							"CORRECT quantity",
							"CORRECT value",
							"CORRECT standards",
							"CORRECT origin",
							"CORRECT methods",
						],
					},
					{
						id: 4,
						title: "DISCIPLINE COMPLIANCE BY 7 NO",
						description: "Principles of discipline and regulation compliance",
						items: [
							"NO legal violations",
							"NO charter violations",
							"NO agreement violations",
							"NO internal rule violations",
							"NO regulation violations",
							"NO process violations",
							"NO moral violations",
						],
					},
					{
						id: 5,
						title: "ESSENCE INTEGRATION (6 + 1)",
						description: "Learning and integrating essence from developed countries",
						items: [
							"Entrepreneurship from ISRAEL",
							"Management from USA",
							"Technology from GERMANY",
							"Skills from SINGAPORE",
							"Quality from JAPAN",
							"Speed from SOUTH KOREA",
						],
					},
					{
						id: 6,
						title: "POSITIVE CREATIVITY BY 7 FIELDS",
						description: "Encouraging creativity and innovation in all fields",
						items: [
							"Engineering",
							"Technology",
							"Management",
							"Business",
							"Culture",
							"Education",
							"Arts",
						],
					},
					{
						id: 7,
						title: "PROACTIVE COOPERATION BY 7 REQUIREMENTS",
						description: "Spirit of cooperation and effective teamwork",
						items: [
							"Humility",
							"Patience",
							"Openness",
							"Sincerity",
							"Harmony",
							"Goodwill",
							"Loyalty",
						],
					},
				],
			},
		},
		products: {
			title: "Products",
			subtitle: "High Quality",
			description:
				"We provide a diverse range of high-quality ductwork system products, meeting all customer needs.",
			notFound: {
				title: "Product Not Found",
				description: "The requested product could not be found.",
			},
			empty: {
				title: "No Products Available",
				description: "We currently don't have any products to display. Please check back later.",
				action: "Contact Consultation",
			},
			viewAll: "View all products",
		},
		services: {
			title: "Services",
			subtitle: "Professional",
			description:
				"We provide comprehensive services from consultation, design, construction to maintenance of ductwork systems.",
			notFound: {
				title: "Service Not Found",
				description: "The requested service could not be found.",
			},
			empty: {
				title: "No Services Available",
				description: "We currently don't have any services to display. Please check back later.",
				action: "Contact Consultation",
			},
			viewAll: "View all services",
		},
		projects: {
			title: "Projects",
			subtitle: "Featured",
			description:
				"Explore our completed projects, from commercial buildings to industrial facilities.",
			notFound: {
				title: "Project Not Found",
				description: "The requested project could not be found.",
			},
			empty: {
				title: "No Projects Available",
				description: "We currently don't have any projects to display. Please check back later.",
				action: "Contact Consultation",
			},
			projectDescription: "Project Description",
			technicalSpecs: "Technical Specifications",
			projectImages: "Project Images",
			completionStatus: {
				completed: "Completed",
				inProgress: "In Progress",
				planning: "Planning",
			},
			filter: {
				all: "All",
				viewAll: "View all projects",
			},
		},
		contact: {
			title: "Contact Us",
			description:
				"Leave your information to receive free consultation about the most suitable ductwork system solutions.",
			contactInfo: {
				title: "Contact Information",
				phone: "Phone",
				email: "Email",
				address: "Address",
				workingHours: "Working Hours",
			},
			socialMedia: {
				title: "Connect with Us",
			},
			form: {
				title: "Send Consultation Request",
				fields: {
					name: {
						label: "Full Name",
						placeholder: "Enter your full name",
					},
					phone: {
						label: "Phone Number",
						placeholder: "Enter your phone number",
						validation:
							"Phone number can only contain numbers, spaces, hyphens, parentheses and plus signs",
					},
					email: {
						label: "Email",
						placeholder: "Enter your email address",
					},
					subject: {
						label: "Subject",
						placeholder: "Enter consultation topic",
					},
					message: {
						label: "Message",
						placeholder: "Describe your requirements in detail...",
					},
				},
				submit: "Send Consultation Request",
			},
			dialog: {
				trigger: "Contact Us",
			},
		},
		hero: {
			title: "Professional ductwork systems",
			description:
				"With over 10 years of experience, we specialize in manufacturing and installing high-quality ductwork systems for industrial and residential projects.",
			buttons: {
				viewProducts: "View Products",
				contactConsultation: "Contact Consultation",
			},
			features: {
				standardDucts: "Standard Ducts",
				fastService: "Fast Service",
				goodPrice: "Good Price",
			},
			experience: {
				years: "10+",
				label: "Years Experience",
			},
			imageAlt: "Professional ductwork systems",
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
	// Check if the locale is a valid key in our dictionaries
	if (!(locale in dictionaries)) {
		// Only log error if it's not a static asset (image files, etc.)
		const isStaticAsset = /\.(png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map)$/i.test(locale);
		if (!isStaticAsset) {
			console.error(
				`Dictionary not found for locale: ${locale}. This should be handled by middleware.`,
			);
		}
		// Fallback to default locale if dictionary not found
		return dictionaries.vi;
	}
	return dictionaries[locale];
}

/**
 * Get all available locales
 * @returns Array of available locale keys
 */
export function getAvailableLocales() {
	return Object.keys(dictionaries) as Array<keyof typeof dictionaries>;
}
