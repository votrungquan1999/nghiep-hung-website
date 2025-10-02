/**
 * Core values data structure for the company
 * Contains 7 main core values with their detailed descriptions
 */

export interface CoreValue {
	id: number;
	title: string;
	description: string;
	items: string[];
}

export const coreValues: CoreValue[] = [
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
		items: ["Kỹ thuật", "Công nghệ", "Quản trị", "Kinh doanh", "Văn hóa", "Giáo dục", "Nghệ thuật"],
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
];
