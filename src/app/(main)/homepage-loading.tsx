import { ArrowRight, Award, CheckCircle, Target, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { Skeleton } from "src/components/ui/skeleton";

/**
 * Loading skeleton for the homepage component
 * Shows static content (titles, headers, text) and skeletons for dynamic content
 */
export default function HomepageLoading() {
	return (
		<>
			{/* Hero Section - Static content with loading for dynamic parts */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links */}
			<section
				id="home"
				className="relative bg-gradient-to-br from-background to-accent/20 py-20 lg:py-32"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							{/* Hero Title - Static */}
							<h1 className="text-4xl lg:text-6xl font-serif font-black text-foreground mb-6 leading-tight">
								{"Hệ thống ống gió"} <span className="text-primary">{"chuyên nghiệp"}</span>
							</h1>
							<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
								{
									"Với hơn 10 năm kinh nghiệm, chúng tôi chuyên sản xuất và thi công các hệ thống ống gió chất lượng cao cho các dự án công nghiệp và dân dụng."
								}
							</p>

							{/* Hero Buttons - Static */}
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<a href="/products" className="inline-block">
									<Button size="lg" className="text-lg px-8 w-full">
										{"Xem sản phẩm"}
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</a>
								<a href="/contact" className="inline-block">
									<Button
										variant="outline"
										size="lg"
										className="text-lg px-8 bg-transparent w-full"
									>
										{"Liên hệ tư vấn"}
									</Button>
								</a>
							</div>

							{/* Hero Features - Static */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div className="flex items-center">
									<CheckCircle className="h-5 w-5 text-primary mr-2" />
									<span className="text-sm font-medium">{"Chất lượng cao"}</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="h-5 w-5 text-primary mr-2" />
									<span className="text-sm font-medium">{"Thi công nhanh"}</span>
								</div>
								<div className="flex items-center">
									<CheckCircle className="h-5 w-5 text-primary mr-2" />
									<span className="text-sm font-medium">{"Bảo hành dài hạn"}</span>
								</div>
							</div>
						</div>

						{/* Hero Image - Static */}
						<div className="relative">
							<Image
								src="/placeholder-gtu1v.png"
								alt="Hệ thống ống gió chuyên nghiệp"
								width={600}
								height={400}
								className="rounded-lg shadow-2xl"
							/>
							<div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
								<div className="text-3xl font-bold">{"10+"}</div>
								<div className="text-sm">{"Năm kinh nghiệm"}</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Section - Static content with loading for dynamic parts */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links */}
			<section id="about" className="bg-muted/30">
				{/* About Image - Static */}
				<div>
					<Image
						src="/placeholder-gtu1v.png"
						alt="Hình ảnh công ty - sẽ được cập nhật sau"
						width={1200}
						height={600}
						className="w-full h-64 lg:h-80 object-cover rounded-lg"
						priority={false}
					/>
				</div>

				<div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
					{/* About Header - Static */}
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

					{/* About Features - Static with real icons and styling */}
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Vision Feature */}
						<Card className="text-center hover:shadow-lg transition-shadow duration-300">
							<CardContent className="p-8">
								<div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-6">
									<Target className="size-8 text-primary" />
								</div>
								<h3 className="text-xl font-serif font-bold text-foreground">{"Tầm nhìn"}</h3>
							</CardContent>
						</Card>

						{/* Team Feature */}
						<Card className="text-center hover:shadow-lg transition-shadow duration-300">
							<CardContent className="p-8">
								<div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-6">
									<Users className="size-8 text-primary" />
								</div>
								<h3 className="text-xl font-serif font-bold text-foreground">{"Đội ngũ"}</h3>
							</CardContent>
						</Card>

						{/* Quality Feature */}
						<Card className="text-center hover:shadow-lg transition-shadow duration-300">
							<CardContent className="p-8">
								<div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-6">
									<Award className="size-8 text-primary" />
								</div>
								<h3 className="text-xl font-serif font-bold text-foreground">{"Chất lượng"}</h3>
							</CardContent>
						</Card>

						{/* Service Feature */}
						<Card className="text-center hover:shadow-lg transition-shadow duration-300">
							<CardContent className="p-8">
								<div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-6">
									<Wrench className="size-8 text-primary" />
								</div>
								<h3 className="text-xl font-serif font-bold text-foreground">{"Dịch vụ"}</h3>
							</CardContent>
						</Card>
					</div>

					{/* About Commitment Card - Static */}
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
											{"Sử dụng vật liệu chất lượng cao, đạt tiêu chuẩn quốc tế"}
										</p>
									</div>
									<div className="flex items-start">
										<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
										<p className="text-muted-foreground">
											{"Thi công đúng tiến độ, đảm bảo an toàn lao động"}
										</p>
									</div>
									<div className="flex items-start">
										<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
										<p className="text-muted-foreground">
											{"Hỗ trợ khách hàng 24/7, bảo hành và bảo trì định kỳ"}
										</p>
									</div>
									<div className="flex items-start">
										<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
										<p className="text-muted-foreground">
											{"Giá cả cạnh tranh, minh bạch trong báo giá"}
										</p>
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

			{/* Products Section - Static header with loading for dynamic content */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links */}
			<section id="products" className="py-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Products Header - Static */}
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

					{/* Products Grid - Loading skeletons for dynamic content */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							"round-duct",
							"square-duct",
							"accessories",
							"soundproof",
							"flexible",
							"filtration",
						].map((product) => (
							<div key={`product-${product}`} className="group">
								<div className="bg-card rounded-lg shadow-sm">
									<Skeleton className="aspect-video w-full rounded-t-lg" />
									<div className="p-6">
										<Skeleton className="h-6 w-32 mb-2" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-3/4" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Services Section - Static header with loading for dynamic content */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links */}
			<section id="services" className="py-20 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Services Header - Static */}
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

					{/* Services Grid - Loading skeletons for dynamic content */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							"installation",
							"design",
							"maintenance",
							"consultation",
							"soundproofing",
							"cleaning",
						].map((service) => (
							<div key={`service-${service}`} className="group">
								<div className="bg-card rounded-lg shadow-sm">
									<Skeleton className="aspect-video w-full rounded-t-lg" />
									<div className="p-6">
										<Skeleton className="h-6 w-40 mb-2" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-3/4" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Projects Section - Static header with loading for dynamic content */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links */}
			<section id="projects" className="py-20 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Projects Header - Static */}
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
							{"Dự án"} <span className="text-primary">{"Tiêu biểu"}</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							{
								"Khám phá những dự án đã hoàn thành của chúng tôi, từ các tòa nhà thương mại đến nhà máy công nghiệp."
							}
						</p>
					</div>

					{/* Projects Grid - Loading skeletons for dynamic content */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{["mall", "factory", "hospital", "residential", "hotel", "university"].map(
							(project) => (
								<div key={`project-${project}`} className="group">
									<div className="bg-card rounded-lg shadow-sm">
										<Skeleton className="aspect-video w-full rounded-t-lg" />
										<div className="p-6">
											<div className="flex items-center justify-between mb-3">
												<Skeleton className="h-6 w-20" />
												<Skeleton className="h-4 w-12" />
											</div>
											<Skeleton className="h-6 w-48 mb-2" />
											<div className="flex items-center mb-3">
												<Skeleton className="h-4 w-4 mr-1" />
												<Skeleton className="h-4 w-24" />
											</div>
											<div className="space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-3/4" />
											</div>
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</div>
			</section>

			{/* Contact Section - Static header with loading for dynamic content */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Fixed ID needed for navigation anchor links */}
			<section id="contact" className="py-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Contact Header - Static */}
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
							{"Liên hệ"} <span className="text-primary">{"Với chúng tôi"}</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							{
								"Chúng tôi sẵn sàng tư vấn và hỗ trợ bạn trong việc lựa chọn giải pháp hệ thống ống gió phù hợp nhất."
							}
						</p>
					</div>

					{/* Contact Content - Loading skeletons for dynamic content */}
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Contact Info - Loading */}
						<div>
							<Skeleton className="h-8 w-48 mb-6" />
							<div className="space-y-4">
								{["address", "phone1", "phone2", "email1"].map((contact) => (
									<div key={`contact-info-${contact}`} className="flex items-center">
										<Skeleton className="h-5 w-5 mr-3" />
										<Skeleton className="h-4 w-48" />
									</div>
								))}
							</div>
						</div>

						{/* Contact Form - Loading */}
						<div>
							<div className="space-y-4">
								{["name", "email", "phone", "message"].map((field) => (
									<div key={`form-field-${field}`}>
										<Skeleton className="h-4 w-24 mb-2" />
										<Skeleton className="h-10 w-full" />
									</div>
								))}
								<Skeleton className="h-10 w-32" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
