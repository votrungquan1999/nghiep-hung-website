"use client";

import { AlertTriangle, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { signOut } from "src/lib/auth-client";

/**
 * Unauthorized access page for admin area
 * Shows when user is logged in but not authorized as admin
 */
export default function UnauthorizedPage() {
	/**
	 * Handle user sign out
	 */
	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center space-y-4">
					<div className="flex justify-center">
						<AlertTriangle className="size-12 text-destructive" />
					</div>
					<CardTitle className="text-2xl font-serif font-bold">
						{"Không có quyền truy cập"}
					</CardTitle>
					<CardDescription>
						{"Tài khoản của bạn không có quyền truy cập vào khu vực quản trị"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-center text-sm text-muted-foreground mb-6">
						<p>{"Vui lòng liên hệ quản trị viên để được cấp quyền truy cập."}</p>
					</div>

					<div className="flex flex-col space-y-3">
						<Link href="/">
							<Button variant="default" className="w-full">
								<Home className="mr-2 size-4" />
								{"Về trang chủ"}
							</Button>
						</Link>

						<Button variant="outline" className="w-full" onClick={handleSignOut}>
							<LogOut className="mr-2 size-4" />
							{"Đăng xuất"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
