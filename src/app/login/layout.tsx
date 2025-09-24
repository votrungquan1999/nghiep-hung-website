import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
	title: "Admin Login - Nghiệp Hưng",
	description: "Đăng nhập trang quản trị website Nghiệp Hưng",
};

/**
 * Admin login layout component
 * Provides basic layout without authentication checks
 */
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
	return <div className="min-h-screen bg-background">{children}</div>;
}
