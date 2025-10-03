import { Award, Target, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { CompanyHistoryTimeline } from "./company-history-timeline";
import { CoreValuesCarousel } from "./core-values-carousel";
import FeatureCard from "./feature-card.ui";

/**
 * About section component that displays company overview with interactive feature cards
 * Each feature card opens a dialog when clicked to show detailed description
 */
export default function AboutSection() {
	const features = [
		{
			icon: Users,
			title: "Lịch sử hình thành",
			description: "Mô tả về lịch sử hình thành của công ty sẽ được cập nhật sau.",
			customDialogContent: <CompanyHistoryTimeline />,
		},
		{
			icon: Target,
			title: "Tầm nhìn",
			description:
				"Công ty TNHH Nghiệp Hưng định hướng trở thành đơn vị dẫn đầu trong lĩnh vực cung cấp giải pháp thông gió và phòng cháy chữa cháy (PCCC) tại Việt Nam, không ngừng nâng cao năng lực thi công, chất lượng sản phẩm và dịch vụ nhằm đáp ứng nhu cầu ngày càng cao của thị trường",
		},
		{
			icon: Award,
			title: "Sứ mệnh",
			description:
				"Cung cấp giải pháp thông gió và PCCC chất lượng cao, an toàn và hiệu quả cho mọi công trình. Không ngừng nâng cao năng lực kỹ thuật, sản phẩm và dịch vụ, mang lại giá trị tối ưu cho khách hàng. Xây dựng thương hiệu uy tín, chuyên nghiệp, đóng góp vào sự phát triển bền vững của ngành cơ điện và xây dựng.",
		},
		{
			icon: Wrench,
			title: "Giá trị cốt lõi",
			description: "7 giá trị cốt lõi định hướng hoạt động và phát triển của công ty",
			customDialogContent: <CoreValuesCarousel />,
		},
	];

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links
		<section id="about" className="bg-muted/30">
			{/* About image - full width */}
			<div>
				<Image
					src="/about-image.png"
					alt="Hình ảnh công ty Nghiệp Hưng"
					width={1200}
					height={600}
					className="w-full h-64 lg:h-80 object-cover rounded-lg"
					priority={false}
				/>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Về Công ty"} <span className="text-primary">{"Nghiệp Hưng"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Công ty TNHH Nghiệp Hưng được thành lập với sứ mệnh mang đến những giải pháp hệ thống ống gió tối ưu, góp phần nâng cao chất lượng không khí và môi trường sống."
						}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* <CarouselRoot className=""> */}
					{features.map((feature) => (
						<FeatureCard
							key={feature.title}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							customDialogContent={feature.customDialogContent}
						/>
					))}
					{/* </CarouselRoot> */}
				</div>

				<div className="mt-16 bg-card rounded-2xl p-8 lg:p-12 shadow-lg">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-6">
								{"Cam kết của chúng tôi"}
							</h3>
							<div className="space-y-4">
								<div className="flex items-start">
									<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
									<p className="text-muted-foreground">
										{
											"An toàn tuyệt đối - Được kiểm định & chứng nhận bởi Trung tâm Nghiên cứu Ứng dụng KHKT PCCC & Viện Khoa học CNXD"
										}
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
									<p className="text-muted-foreground">
										{"Trực tiếp sản xuất – Không qua trung gian"}
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
									<p className="text-muted-foreground">
										{"Xưởng hiện đại, năng lực lớn – hơn 12.000m² sản phẩm/ mỗi tháng"}
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
									<p className="text-muted-foreground">
										{"Đội ngũ kỹ thuật tay nghề cao, thi công tận nơi"}
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
									<p className="text-muted-foreground">
										{"Đảm bảo chất lượng - đúng tiến độ - giá thành hợp lý"}
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
									<p className="text-muted-foreground">{"Hỗ trợ đo vẽ, tư vấn kỹ thuật từ A-Z"}</p>
								</div>
							</div>
						</div>
						<div>
							<Image
								src="/duct-installation-team.png"
								alt="Đội ngũ chuyên nghiệp"
								width={600}
								height={400}
								className="rounded-lg shadow-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
