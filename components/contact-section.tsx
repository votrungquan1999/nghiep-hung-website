"use client"

import { Clock, Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react"
import type React from "react"
import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
	const sectionId = useId()
	const nameId = useId()
	const phoneId = useId()
	const emailId = useId()
	const subjectId = useId()
	const messageId = useId()

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle form submission here
		console.log("Form submitted:", formData)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<section id={`contact-${sectionId}`} className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
						{"Liên hệ"} <span className="text-primary">{"với chúng tôi"}</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{
							"Hãy để lại thông tin để được tư vấn miễn phí về giải pháp hệ thống ống gió phù hợp nhất."
						}
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-12">
					{/* Contact Information */}
					<div className="lg:col-span-1">
						<div className="space-y-8">
							<Card>
								<CardHeader>
									<CardTitle className="font-serif text-xl">{"Thông tin liên hệ"}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="flex items-start">
										<Phone className="h-5 w-5 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium">{"Điện thoại"}</p>
											<p className="text-muted-foreground">{"0123 456 789"}</p>
											<p className="text-muted-foreground">{"0987 654 321"}</p>
										</div>
									</div>

									<div className="flex items-start">
										<Mail className="h-5 w-5 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium">{"Email"}</p>
											<p className="text-muted-foreground">{"info@nghiephung.com"}</p>
											<p className="text-muted-foreground">{"sales@nghiephung.com"}</p>
										</div>
									</div>

									<div className="flex items-start">
										<MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium">{"Địa chỉ"}</p>
											<p className="text-muted-foreground">
												{"123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"}
											</p>
										</div>
									</div>

									<div className="flex items-start">
										<Clock className="h-5 w-5 text-primary mt-1 mr-3" />
										<div>
											<p className="font-medium">{"Giờ làm việc"}</p>
											<p className="text-muted-foreground">{"Thứ 2 - Thứ 6: 8:00 - 17:30"}</p>
											<p className="text-muted-foreground">{"Thứ 7: 8:00 - 12:00"}</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="font-serif text-xl">{"Kết nối với chúng tôi"}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex space-x-4">
										<Button variant="outline" size="icon">
											<Facebook className="h-5 w-5" />
										</Button>
										<Button variant="outline" size="icon">
											<Youtube className="h-5 w-5" />
										</Button>
										<Button variant="outline" size="icon">
											<Linkedin className="h-5 w-5" />
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle className="font-serif text-2xl">{"Gửi yêu cầu tư vấn"}</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label htmlFor={nameId} className="block text-sm font-medium mb-2">
												{"Họ và tên"} <span className="text-destructive">*</span>
											</label>
											<Input
												id={nameId}
												name="name"
												value={formData.name}
												onChange={handleChange}
												placeholder="Nhập họ và tên"
												required
											/>
										</div>
										<div>
											<label htmlFor={phoneId} className="block text-sm font-medium mb-2">
												{"Số điện thoại"} <span className="text-destructive">*</span>
											</label>
											<Input
												id={phoneId}
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												placeholder="Nhập số điện thoại"
												required
											/>
										</div>
									</div>

									<div>
										<label htmlFor={emailId} className="block text-sm font-medium mb-2">
											{"Email"} <span className="text-destructive">*</span>
										</label>
										<Input
											id={emailId}
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="Nhập địa chỉ email"
											required
										/>
									</div>

									<div>
										<label htmlFor={subjectId} className="block text-sm font-medium mb-2">
											{"Chủ đề"}
										</label>
										<Input
											id={subjectId}
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											placeholder="Nhập chủ đề cần tư vấn"
										/>
									</div>

									<div>
										<label htmlFor={messageId} className="block text-sm font-medium mb-2">
											{"Nội dung"} <span className="text-destructive">*</span>
										</label>
										<Textarea
											id={messageId}
											name="message"
											value={formData.message}
											onChange={handleChange}
											placeholder="Mô tả chi tiết yêu cầu của bạn..."
											rows={6}
											required
										/>
									</div>

									<Button type="submit" size="lg" className="w-full text-lg">
										{"Gửi yêu cầu tư vấn"}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	)
}
