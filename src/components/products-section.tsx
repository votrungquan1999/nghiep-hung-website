"use client";

import Image from "next/image";
import ProductGalleryDialog from "src/components/product-gallery-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";

export default function ProductsSection() {
	const products = [
		{
			name: "Ống gió tròn",
			description:
				"Ống gió tròn chất lượng cao, phù hợp cho các hệ thống thông gió dân dụng và công nghiệp. Được sản xuất từ vật liệu cao cấp, đảm bảo độ bền và hiệu suất tối ưu.",
			image: "/round-air-ducts.png",
			gallery: [
				"/round-air-ducts.png",
				"/round-air-duct-installation.png",
				"/round-air-duct-factory.png",
			],
		},
		{
			name: "Ống gió vuông",
			description:
				"Ống gió vuông được sản xuất theo tiêu chuẩn, tối ưu cho không gian lắp đặt. Thiết kế vuông vắn giúp tiết kiệm không gian và dễ dàng lắp đặt trong các công trình.",
			image: "/square-air-ducts.png",
			gallery: [
				"/square-air-ducts.png",
				"/square-air-duct-system.png",
				"/square-air-duct-manufacturing.png",
			],
		},
		{
			name: "Phụ kiện ống gió",
			description:
				"Đầy đủ các loại phụ kiện: cút nối, van điều chỉnh, miệng thổi, miệng hút. Tất cả phụ kiện đều được kiểm tra chất lượng nghiêm ngặt trước khi xuất xưởng.",
			image: "/air-duct-accessories.png",
			gallery: ["/air-duct-accessories.png", "/air-duct-fittings.png", "/air-duct-valves.png"],
		},
		{
			name: "Hệ thống cách âm",
			description:
				"Giải pháp cách âm chuyên nghiệp cho hệ thống ống gió, giảm thiểu tiếng ồn. Sử dụng vật liệu cách âm cao cấp, đảm bảo môi trường yên tĩnh và thoải mái.",
			image: "/soundproof-air-duct.png",
			gallery: [
				"/soundproof-air-duct.png",
				"/soundproof-air-duct-installation.png",
				"/acoustic-air-duct-system.png",
			],
		},
		{
			name: "Ống gió mềm",
			description:
				"Ống gió mềm linh hoạt, dễ lắp đặt trong các không gian hẹp và phức tạp. Chất liệu mềm dẻo nhưng vẫn đảm bảo độ bền và khả năng chịu áp lực cao.",
			image: "/placeholder-tka3n.png",
			gallery: [
				"/placeholder-tka3n.png",
				"/flexible-air-duct-installation.png",
				"/flexible-air-duct-coil.png",
			],
		},
		{
			name: "Hệ thống lọc khí",
			description:
				"Hệ thống lọc khí hiện đại, đảm bảo chất lượng không khí trong nhà. Công nghệ lọc tiên tiến giúp loại bỏ bụi bẩn, vi khuẩn và các chất gây ô nhiễm.",
			image: "/placeholder-pt0v2.png",
			gallery: [
				"/placeholder-pt0v2.png",
				"/air-filtration-system.png",
				"/air-purifier-installation.png",
			],
		},
	];

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="products" className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Sản phẩm"} <span className="text-primary">{"Chất lượng cao"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Chúng tôi cung cấp đa dạng các sản phẩm hệ thống ống gió chất lượng cao, đáp ứng mọi nhu cầu của khách hàng."
						}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{products.map((product) => (
						<ProductGalleryDialog key={product.name} product={product}>
							<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
								<div className="aspect-video overflow-hidden rounded-t-lg px-0">
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										width={400}
										height={300}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<CardHeader>
									<CardTitle className="text-xl font-serif font-bold text-foreground">
										{product.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4 leading-relaxed">
										{product.description}
									</p>
								</CardContent>
							</Card>
						</ProductGalleryDialog>
					))}
				</div>
			</div>
		</section>
	);
}
