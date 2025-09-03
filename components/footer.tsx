import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
	return (
		<footer className="bg-primary text-primary-foreground">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="lg:col-span-2">
						<Image
							src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nghiep_hung_plain_logo-bo8NvtY3Ac4J5ov1Sd1IE8XYX9Y1dH.svg"
							alt="Nghiệp Hưng"
							width={120}
							height={48}
							className="h-12 w-auto mb-6 brightness-0 invert"
						/>
						<h3 className="text-xl font-serif font-bold mb-4">{"Công ty TNHH Nghiệp Hưng"}</h3>
						<p className="text-primary-foreground/80 mb-6 leading-relaxed">
							{
								"Chuyên sản xuất và thi công hệ thống ống gió chất lượng cao. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến những giải pháp tối ưu cho khách hàng."
							}
						</p>
						<div className="flex space-x-4">
							<Button variant="secondary" size="icon">
								<Facebook className="h-5 w-5" />
							</Button>
							<Button variant="secondary" size="icon">
								<Youtube className="h-5 w-5" />
							</Button>
							<Button variant="secondary" size="icon">
								<Linkedin className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-serif font-bold mb-6">{"Liên kết nhanh"}</h4>
						<ul className="space-y-3">
							<li>
								<Link
									href="/about"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{"Giới thiệu"}
								</Link>
							</li>
							<li>
								<Link
									href="/products"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{"Sản phẩm"}
								</Link>
							</li>
							<li>
								<Link
									href="/projects"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{"Dự án"}
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
								>
									{"Liên hệ"}
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-lg font-serif font-bold mb-6">{"Thông tin liên hệ"}</h4>
						<div className="space-y-4">
							<div className="flex items-start">
								<MapPin className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
								<p className="text-primary-foreground/80 text-sm">
									{"123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"}
								</p>
							</div>
							<div className="flex items-center">
								<Phone className="h-5 w-5 mr-3 flex-shrink-0" />
								<p className="text-primary-foreground/80 text-sm">{"0123 456 789"}</p>
							</div>
							<div className="flex items-center">
								<Mail className="h-5 w-5 mr-3 flex-shrink-0" />
								<p className="text-primary-foreground/80 text-sm">{"info@nghiephung.com"}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
					<p className="text-primary-foreground/60 text-sm">
						{"© 2024 Công ty TNHH Nghiệp Hưng. Tất cả quyền được bảo lưu."}
					</p>
				</div>
			</div>
		</footer>
	)
}
