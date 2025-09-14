import { Home, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Admin landing page
 * Simple protected admin area
 * Redirects to login if not authenticated
 */
export default async function AdminPage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="max-w-md w-full space-y-6">
				{/* Header */}
				<div className="text-center space-y-2">
					<div className="flex justify-center">
						<div className="p-3 rounded-full bg-primary/10">
							<Shield className="size-8 text-primary" />
						</div>
					</div>
					<h1 className="text-3xl font-serif font-bold text-foreground">{"Admin Area"}</h1>
					<p className="text-muted-foreground">{"Welcome to the protected admin section"}</p>
				</div>

				{/* Info Card */}
				<Card>
					<CardHeader>
						<CardTitle className="text-center">{"Admin Access"}</CardTitle>
						<CardDescription className="text-center">
							{"You have successfully accessed the protected admin area."}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-center space-y-2">
							<p className="text-sm text-muted-foreground">
								{"This is a simple admin landing page protected by authentication."}
							</p>
						</div>

						<div className="pt-4">
							<Link href="/" className="block">
								<Button className="w-full" variant="outline">
									<Home className="mr-2 size-4" />
									{"Back to Homepage"}
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
