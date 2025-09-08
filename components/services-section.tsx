"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductGalleryDialog from "./product-gallery-dialog"

/**
 * ServicesSection component displays the services offered by the company
 * Uses the same structure as ProductsSection for consistency
 */
export default function ServicesSection() {
	const services = [
		{
			name: "Thi công hệ thống ống gió",
			description:
				"Dịch vụ thi công hệ thống ống gió chuyên nghiệp cho các công trình dân dụng và công nghiệp. Đội ngũ kỹ thuật viên giàu kinh nghiệm đảm bảo chất lượng thi công cao nhất.",
			image: "/duct-installation-team.png",
			gallery: [
				"/duct-installation-team.png",
				"/factory-duct-installation.png",
				"/commercial-duct-work-completion.png",
			],
		},
		{
			name: "Thiết kế hệ thống thông gió",
			description:
				"Thiết kế hệ thống thông gió tối ưu cho từng không gian. Sử dụng phần mềm chuyên nghiệp để tính toán và mô phỏng luồng khí, đảm bảo hiệu quả và tiết kiệm năng lượng.",
			image: "/modern-mall-air-ducts.png",
			gallery: [
				"/modern-mall-air-ducts.png",
				"/mall-ventilation-installation.png",
				"/shopping-mall-ducts.png",
			],
		},
		{
			name: "Bảo trì và sửa chữa",
			description:
				"Dịch vụ bảo trì định kỳ và sửa chữa hệ thống ống gió. Kiểm tra, vệ sinh và thay thế các bộ phận hư hỏng để đảm bảo hệ thống hoạt động ổn định và hiệu quả.",
			image: "/air-filter-installation.png",
			gallery: [
				"/air-filter-installation.png",
				"/air-filtration-system.png",
				"/air-purifier-installation.png",
			],
		},
		{
			name: "Tư vấn giải pháp",
			description:
				"Tư vấn giải pháp hệ thống thông gió phù hợp với nhu cầu và ngân sách. Đội ngũ chuyên gia sẽ khảo sát thực địa và đưa ra phương án tối ưu nhất.",
			image: "/industrial-air-ducts.png",
			gallery: [
				"/industrial-air-ducts.png",
				"/factory-duct-installation.png",
				"/commercial-duct-work-completion.png",
			],
		},
		{
			name: "Lắp đặt hệ thống cách âm",
			description:
				"Dịch vụ lắp đặt hệ thống cách âm chuyên nghiệp cho ống gió. Sử dụng vật liệu cách âm cao cấp, giúp giảm thiểu tiếng ồn và tạo môi trường làm việc yên tĩnh.",
			image: "/soundproof-materials.png",
			gallery: [
				"/soundproof-materials.png",
				"/soundproof-air-duct-installation.png",
				"/acoustic-air-duct-system.png",
			],
		},
		{
			name: "Vệ sinh hệ thống ống gió",
			description:
				"Dịch vụ vệ sinh chuyên sâu hệ thống ống gió, loại bỏ bụi bẩn, vi khuẩn và các chất gây ô nhiễm. Đảm bảo chất lượng không khí sạch và an toàn cho sức khỏe.",
			image: "/air-filtration-system.png",
			gallery: [
				"/air-filtration-system.png",
				"/air-filter-installation.png",
				"/air-purifier-installation.png",
			],
		},
	]

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="services" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Dịch vụ"} <span className="text-primary">{"Chuyên nghiệp"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Chúng tôi cung cấp đầy đủ các dịch vụ từ tư vấn, thiết kế, thi công đến bảo trì hệ thống ống gió."
						}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service) => (
						<ProductGalleryDialog key={service.name} product={service}>
							<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
								<div className="aspect-video overflow-hidden rounded-t-lg px-0">
									<Image
										src={service.image || "/placeholder.svg"}
										alt={service.name}
										width={400}
										height={300}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<CardHeader>
									<CardTitle className="text-xl font-serif font-bold text-foreground">
										{service.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4 leading-relaxed">
										{service.description}
									</p>
								</CardContent>
							</Card>
						</ProductGalleryDialog>
					))}
				</div>
			</div>
		</section>
	)
}
