import { FolderOpen, Home, Package, Phone, Shield, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { AdminAccountDisplay } from "./admin-account-display";
import { AdminNavigationItem } from "./admin-navigation-item";

/**
 * Admin navigation component
 * Provides consistent navigation across all admin pages
 * Server component that composes navigation items with client-side active state
 */
export function AdminNavigation() {
	const navigationItems = [
		{
			href: "/admin",
			label: "Dashboard",
			icon: Shield,
			description: "Overview and quick access",
		},
		{
			href: "/admin/products",
			label: "Products",
			icon: Package,
			description: "Manage air duct products",
		},
		{
			href: "/admin/services",
			label: "Services",
			icon: Wrench,
			description: "Manage company services",
		},
		{
			href: "/admin/projects",
			label: "Projects",
			icon: FolderOpen,
			description: "Showcase completed projects",
		},
		{
			href: "/admin/contact",
			label: "Contact",
			icon: Phone,
			description: "Update contact information",
		},
	];

	return (
		<div className="border-b border-border bg-card">
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					{/* Back to Homepage - Left Side */}
					<div className="flex items-center">
						<Link href="/">
							<Button variant="outline" size="sm">
								<Home className="mr-2 size-4" />
								Back to Homepage
							</Button>
						</Link>
					</div>

					{/* Navigation Menu and Account - Right Side */}
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							{navigationItems.map((item) => (
								<AdminNavigationItem key={item.href} href={item.href}>
									<item.icon className="size-4" />
									<span>{item.label}</span>
								</AdminNavigationItem>
							))}
						</div>
						<AdminAccountDisplay />
					</div>
				</div>

				{/* Mobile Navigation */}
				<div className="md:hidden mt-4">
					<div className="flex flex-wrap gap-2 items-center">
						{navigationItems.map((item) => (
							<AdminNavigationItem key={item.href} href={item.href}>
								<item.icon className="size-4" />
								<span>{item.label}</span>
							</AdminNavigationItem>
						))}
						<AdminAccountDisplay />
					</div>
				</div>
			</div>
		</div>
	);
}
