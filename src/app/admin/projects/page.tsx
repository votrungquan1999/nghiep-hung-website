import {
	Building,
	Calendar,
	Edit,
	FolderOpen,
	MapPin,
	MoreVertical,
	Plus,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "src/components/ui/badge";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { ProjectPreviewDialog } from "./project-preview-dialog";

/**
 * Projects management page
 * Static version for UI assessment
 * Showcases completed projects and portfolio
 */
export default async function ProjectsPage() {
	// Mock data for UI demonstration - matching main projects section structure
	const mockProjects = [
		{
			id: "1",
			name: {
				en: "Vincom Shopping Center",
				vi: "Trung tâm thương mại Vincom",
			},
			category: {
				en: "Commercial",
				vi: "Thương mại",
			},
			location: "TP. Hồ Chí Minh",
			year: "2023",
			description: {
				en: "Air duct system installation for shopping center with 50,000m² area, including ventilation, air conditioning and smoke control systems.",
				vi: "Thi công hệ thống ống gió cho trung tâm thương mại với diện tích 50,000m², bao gồm hệ thống thông gió, điều hòa không khí và xử lý khói.",
			},
			mainImage: "/modern-mall-air-ducts.png",
			images: [
				"/shopping-mall-ducts.png",
				"/mall-ventilation-installation.png",
				"/commercial-duct-work-completion.png",
			],
			specs: {
				en: [
					"Area: 50,000m²",
					"Construction time: 6 months",
					"Duct type: Round and square",
					"System: Ventilation + Air conditioning",
				],
				vi: [
					"Diện tích: 50,000m²",
					"Thời gian thi công: 6 tháng",
					"Loại ống gió: Tròn và vuông",
					"Hệ thống: Thông gió + Điều hòa",
				],
			},
			visibilityStatus: "active" as const, // Whether to show on main page
			completionStatus: "completed" as const, // Project completion status
		},
		{
			id: "2",
			name: {
				en: "Samsung Manufacturing Plant",
				vi: "Nhà máy sản xuất Samsung",
			},
			category: {
				en: "Industrial",
				vi: "Công nghiệp",
			},
			location: "Bắc Ninh",
			year: "2023",
			description: {
				en: "Industrial air duct system installation for electronics factory, ensuring clean production environment and precise temperature control.",
				vi: "Lắp đặt hệ thống ống gió công nghiệp cho nhà máy điện tử, đảm bảo môi trường sản xuất sạch và kiểm soát nhiệt độ chính xác.",
			},
			mainImage: "/industrial-air-ducts.png",
			images: ["/factory-duct-installation.png", "/duct-installation-team.png"],
			specs: {
				en: [
					"Area: 80,000m²",
					"Construction time: 8 months",
					"Standard: Clean room Class 1000",
					"System: Air filtration + Temperature control",
				],
				vi: [
					"Diện tích: 80,000m²",
					"Thời gian thi công: 8 tháng",
					"Tiêu chuẩn: Clean room Class 1000",
					"Hệ thống: Lọc khí + Kiểm soát nhiệt độ",
				],
			},
			visibilityStatus: "active" as const,
			completionStatus: "completed" as const,
		},
		{
			id: "3",
			name: {
				en: "International General Hospital",
				vi: "Bệnh viện Đa khoa Quốc tế",
			},
			category: {
				en: "Healthcare",
				vi: "Y tế",
			},
			location: "Hà Nội",
			year: "2022",
			description: {
				en: "Air duct system installation for hospital with strict requirements for hygiene and infection control.",
				vi: "Thi công hệ thống ống gió cho bệnh viện với yêu cầu khắt khe về vệ sinh và kiểm soát nhiễm khuẩn.",
			},
			mainImage: "/air-filtration-system.png",
			images: ["/air-filter-installation.png", "/air-purifier-installation.png"],
			specs: {
				en: [
					"Area: 30,000m²",
					"Construction time: 5 months",
					"Standard: International medical",
					"System: Negative/Positive pressure",
				],
				vi: [
					"Diện tích: 30,000m²",
					"Thời gian thi công: 5 tháng",
					"Tiêu chuẩn: Y tế quốc tế",
					"Hệ thống: Áp suất âm/dương",
				],
			},
			visibilityStatus: "active" as const,
			completionStatus: "completed" as const,
		},
		{
			id: "4",
			name: {
				en: "Landmark Luxury Apartments",
				vi: "Khu căn hộ cao cấp Landmark",
			},
			category: {
				en: "Residential",
				vi: "Dân dụng",
			},
			location: "TP. Hồ Chí Minh",
			year: "2022",
			description: {
				en: "Air duct system installation for 500 luxury apartments, optimizing space and energy efficiency.",
				vi: "Lắp đặt hệ thống ống gió cho 500 căn hộ cao cấp, tối ưu hóa không gian và hiệu quả năng lượng.",
			},
			mainImage: "/placeholder.svg?height=400&width=600",
			images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
			specs: {
				en: [
					"Units: 500 apartments",
					"Construction time: 12 months",
					"Duct type: Flexible + Rigid",
					"System: VRV + Fresh Air",
				],
				vi: [
					"Số căn hộ: 500 căn",
					"Thời gian thi công: 12 tháng",
					"Loại ống gió: Mềm + Cứng",
					"Hệ thống: VRV + Fresh Air",
				],
			},
			visibilityStatus: "active" as const,
			completionStatus: "completed" as const,
		},
		{
			id: "5",
			name: {
				en: "InterContinental 5-Star Hotel",
				vi: "Khách sạn 5 sao InterContinental",
			},
			category: {
				en: "Hospitality",
				vi: "Khách sạn",
			},
			location: "Đà Nẵng",
			year: "2021",
			description: {
				en: "Air duct system installation for 5-star hotel with 300 rooms, ensuring international standards for air quality.",
				vi: "Thi công hệ thống ống gió cho khách sạn 5 sao với 300 phòng, đảm bảo tiêu chuẩn quốc tế về chất lượng không khí.",
			},
			mainImage: "/placeholder.svg?height=400&width=600",
			images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
			specs: {
				en: [
					"Rooms: 300 rooms",
					"Construction time: 10 months",
					"Standard: 5-star international",
					"System: Central + Distributed",
				],
				vi: [
					"Số phòng: 300 phòng",
					"Thời gian thi công: 10 tháng",
					"Tiêu chuẩn: 5 sao quốc tế",
					"Hệ thống: Trung tâm + Phân tán",
				],
			},
			visibilityStatus: "active" as const,
			completionStatus: "completed" as const,
		},
		{
			id: "6",
			name: {
				en: "FPT University Campus",
				vi: "Trường Đại học FPT",
			},
			category: {
				en: "Education",
				vi: "Giáo dục",
			},
			location: "Hà Nội",
			year: "2021",
			description: {
				en: "Ventilation system installation for university campus with multiple buildings and specialized laboratories.",
				vi: "Lắp đặt hệ thống thông gió cho khuôn viên đại học với nhiều tòa nhà và phòng thí nghiệm chuyên dụng.",
			},
			mainImage: "/placeholder.svg?height=400&width=600",
			images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
			specs: {
				en: [
					"Area: 40,000m²",
					"Construction time: 7 months",
					"Buildings: 8 buildings",
					"System: Natural + Mechanical ventilation",
				],
				vi: [
					"Diện tích: 40,000m²",
					"Thời gian thi công: 7 tháng",
					"Số tòa nhà: 8 tòa",
					"Hệ thống: Thông gió tự nhiên + Cơ khí",
				],
			},
			visibilityStatus: "active" as const,
			completionStatus: "completed" as const,
		},
		{
			id: "7",
			name: {
				en: "Professional Recording Studio",
				vi: "Dự án Studio Ghi âm",
			},
			category: {
				en: "Specialized",
				vi: "Chuyên biệt",
			},
			location: "Quận 3, TP.HCM",
			year: "2024",
			description: {
				en: "Specialized soundproof air duct system installation for professional recording studio.",
				vi: "Lắp đặt hệ thống ống gió chống ồn chuyên dụng cho studio ghi âm chuyên nghiệp.",
			},
			mainImage: "/soundproof-air-duct-installation.png",
			images: ["/soundproof-air-duct.png", "/soundproof-materials.png"],
			specs: {
				en: [
					"Area: 200m²",
					"Construction time: 1 month",
					"Standard: 50dB soundproofing",
					"System: Soundproof air ducts",
				],
				vi: [
					"Diện tích: 200m²",
					"Thời gian thi công: 1 tháng",
					"Tiêu chuẩn: Chống ồn 50dB",
					"Hệ thống: Ống gió chống ồn",
				],
			},
			visibilityStatus: "draft" as const,
			completionStatus: "in-progress" as const,
		},
		{
			id: "8",
			name: {
				en: "New Manufacturing Plant Project",
				vi: "Dự án Nhà máy Mới",
			},
			category: {
				en: "Industrial",
				vi: "Công nghiệp",
			},
			location: "Bình Dương",
			year: "2024",
			description: {
				en: "New manufacturing plant project currently in design phase and preparing for construction.",
				vi: "Dự án nhà máy sản xuất mới đang trong giai đoạn thiết kế và chuẩn bị thi công.",
			},
			mainImage: "/placeholder.svg?height=400&width=600",
			images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
			specs: {
				en: [
					"Area: 100,000m²",
					"Construction time: 12 months",
					"Standard: ISO 14001",
					"System: Industrial ventilation",
				],
				vi: [
					"Diện tích: 100,000m²",
					"Thời gian thi công: 12 tháng",
					"Tiêu chuẩn: ISO 14001",
					"Hệ thống: Thông gió công nghiệp",
				],
			},
			visibilityStatus: "draft" as const,
			completionStatus: "in-progress" as const,
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<FolderOpen className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">
							{"Projects Management"}
						</h1>
						<p className="text-muted-foreground">{"Manage and display completed projects"}</p>
					</div>
				</div>

				{/* Add New Button */}
				<form>
					<Button type="submit">
						<Plus className="mr-2 size-4" />
						{"Add New Project"}
					</Button>
				</form>
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{mockProjects.length}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Total Projects"}</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<FolderOpen className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">
									{mockProjects.filter((p) => p.visibilityStatus === "active").length}
								</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Active"}</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<Building className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">
									{mockProjects.filter((p) => p.visibilityStatus === "draft").length}
								</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Edit className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-purple-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-purple-600">
									{mockProjects.filter((p) => p.completionStatus === "completed").length}
								</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Completed"}</p>
							</div>
							<div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
								<Calendar className="size-8 text-purple-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Projects Table */}
			<div className="bg-card rounded-lg border">
				<div className="px-6 py-4 border-b">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-foreground">Projects</h2>
						<div className="text-sm text-muted-foreground">{mockProjects.length} total</div>
					</div>
				</div>

				<div className="divide-y">
					{mockProjects.map((project) => (
						<div key={project.id} className="p-6 hover:bg-muted/50 transition-colors">
							<div className="flex items-center space-x-4">
								{/* Project Image */}
								<div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
									<Image
										src={project.mainImage || "/placeholder.svg"}
										alt={project.name.en}
										width={96}
										height={96}
										className="size-full object-cover"
									/>
								</div>

								{/* Project Info */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center space-x-3 mb-1">
										<h3 className="text-lg font-semibold text-foreground truncate">
											{project.name.en}
										</h3>
										{/* Status Badges */}
										<div className="flex items-center space-x-2">
											<Badge
												variant={project.visibilityStatus === "active" ? "default" : "secondary"}
												className="text-xs"
											>
												{project.visibilityStatus === "active" ? "Active" : "Draft"}
											</Badge>
											<Badge
												variant={project.completionStatus === "completed" ? "default" : "outline"}
												className="text-xs"
											>
												{project.completionStatus === "completed" ? "Completed" : "In Progress"}
											</Badge>
										</div>
									</div>
									<p className="text-sm text-muted-foreground truncate mb-2">{project.name.vi}</p>
									<div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
										<div className="flex items-center">
											<MapPin className="size-4 mr-1" />
											{project.location}
										</div>
										<div className="flex items-center">
											<Calendar className="size-4 mr-1" />
											{project.year}
										</div>
										<Badge variant="outline" className="text-xs">
											{project.category.en}
										</Badge>
									</div>
									<div className="text-sm text-muted-foreground mb-3 min-w-0 max-w-full">
										<p className="truncate mb-1 whitespace-nowrap overflow-hidden">
											<strong>EN:</strong> {project.description.en}
										</p>
										<p className="truncate whitespace-nowrap overflow-hidden">
											<strong>VI:</strong> {project.description.vi}
										</p>
									</div>
								</div>

								{/* Actions */}
								<div className="self-stretch flex items-start">
									{/* Actions Dropdown */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
												<MoreVertical className="size-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<ProjectPreviewDialog project={project} />
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Edit className="mr-2 size-4" />
												Edit Project Info
											</DropdownMenuItem>
											<DropdownMenuItem>
												<FolderOpen className="mr-2 size-4" />
												Edit Images
											</DropdownMenuItem>
											<DropdownMenuItem className="text-destructive focus:text-destructive">
												<Trash2 className="mr-2 size-4" />
												Delete Project
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
