import type { Metadata } from "next";
import type React from "react";
import { AdminNavigation } from "src/components/admin/admin-navigation";
import { requireAdminAuth } from "src/lib/admin-auth";

export const metadata: Metadata = {
	title: "Admin - Nghiệp Hưng",
	description: "Trang quản trị website Nghiệp Hưng",
};

/**
 * Admin layout component
 * Wraps all admin pages with consistent layout and navigation
 * Redirects to login if not authenticated
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	// This will redirect to login if not authenticated
	await requireAdminAuth();

	return (
		<div className="min-h-screen bg-background">
			<AdminNavigation />
			{children}
		</div>
	);
}
