"use client"

import { Clock, Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react"
import type React from "react"
import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactDialogProps {
	children: React.ReactNode
}

export default function ContactDialog({ children }: ContactDialogProps) {
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
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl font-serif font-bold text-foreground">
						{"Liên hệ"} <span className="text-primary">{"với chúng tôi"}</span>
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
					{/* Contact Information */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle className="font-serif text-lg">{"Thông tin liên hệ"}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start">
									<Phone className="h-4 w-4 text-primary mt-1 mr-3" />
									<div>
										<p className="font-medium text-sm">{"Điện thoại"}</p>
										<p className="text-muted-foreground text-sm">{"0123 456 789"}</p>
										<p className="text-muted-foreground text-sm">{"0987 654 321"}</p>
									</div>
								</div>

								<div className="flex items-start">
									<Mail className="h-4 w-4 text-primary mt-1 mr-3" />
									<div>
										<p className="font-medium text-sm">{"Email"}</p>
										<p className="text-muted-foreground text-sm">{"info@nghiephung.com"}</p>
										<p className="text-muted-foreground text-sm">{"sales@nghiephung.com"}</p>
									</div>
								</div>

								<div className="flex items-start">
									<MapPin className="h-4 w-4 text-primary mt-1 mr-3" />
									<div>
										<p className="font-medium text-sm">{"Địa chỉ"}</p>
										<p className="text-muted-foreground text-sm">
											{"123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"}
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<Clock className="h-4 w-4 text-primary mt-1 mr-3" />
									<div>
										<p className="font-medium text-sm">{"Giờ làm việc"}</p>
										<p className="text-muted-foreground text-sm">{"Thứ 2 - Thứ 6: 8:00 - 17:30"}</p>
										<p className="text-muted-foreground text-sm">{"Thứ 7: 8:00 - 12:00"}</p>
									</div>
								</div>

								<div className="pt-4">
									<p className="font-medium text-sm mb-2">{"Kết nối với chúng tôi"}</p>
									<div className="flex space-x-2">
										<Button variant="outline" size="sm">
											<Facebook className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="sm">
											<Youtube className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="sm">
											<Linkedin className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-3">
						<Card>
							<CardHeader>
								<CardTitle className="font-serif text-lg">{"Gửi yêu cầu tư vấn"}</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid md:grid-cols-2 gap-4">
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
											rows={4}
											required
										/>
									</div>

									<Button type="submit" size="lg" className="w-full">
										{"Gửi yêu cầu tư vấn"}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
