import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import { AdminNavigation } from "src/components/admin/admin-navigation";
import { requireAdminAuth } from "src/lib/admin-auth";

export const metadata: Metadata = {
	title: "Admin - Nghiệp Hưng",
	description: "Trang quản trị website Nghiệp Hưng",
};

function CheckingAdminAuth() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/30">
			<div className="flex items-center space-x-2">
				<Loader2 className="size-6 animate-spin text-primary" />
				<span>{"Đang kiểm tra phiên đăng nhập..."}</span>
			</div>
		</div>
	);
}

/**
 * Admin layout component
 * Wraps all admin pages with consistent layout and navigation
 * Redirects to login if not authenticated
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<CheckingAdminAuth />}>
			<AdminLayoutContent>{children}</AdminLayoutContent>
		</Suspense>
	);
}

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
	// This will redirect to login if not authenticated
	await requireAdminAuth();

	return (
		<div className="min-h-screen bg-background">
			<AdminNavigation />
			{children}
		</div>
	);
}
