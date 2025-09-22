import { FolderOpen, Package, Phone, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Admin dashboard page
 * Provides navigation to all admin management sections
 * Redirects to login if not authenticated
 */
export default async function AdminPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Products Management */}
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-3">
							<div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
								<Package className="size-5 text-blue-600 dark:text-blue-400" />
							</div>
							<CardTitle className="text-lg">{"Products"}</CardTitle>
						</div>
						<CardDescription>{"Manage air duct products and inventory"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/admin/products">
							<Button className="w-full">{"Manage Products"}</Button>
						</Link>
					</CardContent>
				</Card>

				{/* Services Management */}
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-3">
							<div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
								<Wrench className="size-5 text-green-600 dark:text-green-400" />
							</div>
							<CardTitle className="text-lg">{"Services"}</CardTitle>
						</div>
						<CardDescription>{"Manage company services and offerings"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/admin/services">
							<Button className="w-full">{"Manage Services"}</Button>
						</Link>
					</CardContent>
				</Card>

				{/* Projects Management */}
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-3">
							<div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
								<FolderOpen className="size-5 text-purple-600 dark:text-purple-400" />
							</div>
							<CardTitle className="text-lg">{"Projects"}</CardTitle>
						</div>
						<CardDescription>{"Showcase completed projects and portfolio"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/admin/projects">
							<Button className="w-full">{"Manage Projects"}</Button>
						</Link>
					</CardContent>
				</Card>

				{/* Contact Management */}
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-3">
							<div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
								<Phone className="size-5 text-orange-600 dark:text-orange-400" />
							</div>
							<CardTitle className="text-lg">{"Contact Info"}</CardTitle>
						</div>
						<CardDescription>{"Update contact details and social media"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/admin/contact">
							<Button className="w-full">{"Manage Contact"}</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
