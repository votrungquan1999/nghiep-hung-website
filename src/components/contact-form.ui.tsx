"use client";

import { useId } from "react";

/**
 * Client component for contact form with proper accessibility
 * Uses useId for unique form field IDs
 */
export function ContactForm() {
	const nameId = useId();
	const phoneId = useId();
	const emailId = useId();
	const subjectId = useId();
	const messageId = useId();

	return (
		<form className="space-y-6">
			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<label htmlFor={nameId} className="block text-sm font-medium mb-2">
						{"Họ và tên"} <span className="text-destructive">*</span>
					</label>
					<input
						id={nameId}
						name="name"
						type="text"
						placeholder="Nhập họ và tên"
						required
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<div>
					<label htmlFor={phoneId} className="block text-sm font-medium mb-2">
						{"Số điện thoại"} <span className="text-destructive">*</span>
					</label>
					<input
						id={phoneId}
						name="phone"
						type="tel"
						placeholder="Nhập số điện thoại"
						required
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
			</div>

			<div>
				<label htmlFor={emailId} className="block text-sm font-medium mb-2">
					{"Email"} <span className="text-destructive">*</span>
				</label>
				<input
					id={emailId}
					name="email"
					type="email"
					placeholder="Nhập địa chỉ email"
					required
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<div>
				<label htmlFor={subjectId} className="block text-sm font-medium mb-2">
					{"Chủ đề"}
				</label>
				<input
					id={subjectId}
					name="subject"
					type="text"
					placeholder="Nhập chủ đề cần tư vấn"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<div>
				<label htmlFor={messageId} className="block text-sm font-medium mb-2">
					{"Nội dung"} <span className="text-destructive">*</span>
				</label>
				<textarea
					id={messageId}
					name="message"
					placeholder="Mô tả chi tiết yêu cầu của bạn..."
					rows={6}
					required
					className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<button
				type="submit"
				className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
			>
				{"Gửi yêu cầu tư vấn"}
			</button>
		</form>
	);
}
