"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn, useSession } from "@/lib/auth-client"
import { Chrome, Loader2, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Admin login page component
 * Handles Google OAuth authentication for admin access
 */
export default function AdminLoginPage() {
	const router = useRouter()
	const { data: session, isPending } = useSession()
	const [isLoading, setIsLoading] = useState(false)

	// Redirect if already logged in and authorized
	useEffect(() => {
		if (session?.user) {
			// Check if user is authorized admin
			const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || []
			if (adminEmails.includes(session.user.email)) {
				router.push("/admin")
			} else {
				router.push("/admin/unauthorized")
			}
		}
	}, [session, router])

	/**
	 * Handle Google OAuth sign-in
	 */
	const handleGoogleSignIn = async () => {
		setIsLoading(true)
		try {
			await signIn.social({
				provider: "google",
				callbackURL: "/admin",
			})
		} catch (error) {
			console.error("Login error:", error)
			setIsLoading(false)
		}
	}

	if (isPending) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-muted/30">
				<div className="flex items-center space-x-2">
					<Loader2 className="size-6 animate-spin text-primary" />
					<span>{"Đang kiểm tra phiên đăng nhập..."}</span>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center space-y-4">
					<div className="flex justify-center">
						<ShieldCheck className="size-12 text-primary" />
					</div>
					<CardTitle className="text-2xl font-serif font-bold">{"Đăng nhập Admin"}</CardTitle>
					<CardDescription>{"Đăng nhập với Google để truy cập trang quản trị"}</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={handleGoogleSignIn}
						disabled={isLoading}
						className="w-full text-lg py-6"
						size="lg"
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 size-5 animate-spin" />
								{"Đang xử lý..."}
							</>
						) : (
							<>
								<Chrome className="mr-2 size-5" />
								{"Đăng nhập với Google"}
							</>
						)}
					</Button>

					<div className="mt-6 text-center text-sm text-muted-foreground">
						<p>{"Chỉ tài khoản được ủy quyền mới có thể truy cập"}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
