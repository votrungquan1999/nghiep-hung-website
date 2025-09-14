import { Edit, Eye, Plus, Trash2, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Services management page
 * Static version for UI assessment
 * Manages company services and offerings
 */
export default async function ServicesPage() {
	// Mock data for UI demonstration
	const mockServices = [
		{
			id: "1",
			name: "Air Duct Installation",
			description:
				"Professional installation of air duct systems for residential and commercial buildings",
			category: "Installation",
			price: "Custom Quote",
			status: "active",
			icon: "🔧",
			createdAt: "2024-01-15",
		},
		{
			id: "2",
			name: "Duct Maintenance",
			description: "Regular maintenance and cleaning services for air duct systems",
			category: "Maintenance",
			price: "Starting from $150",
			status: "active",
			icon: "🧹",
			createdAt: "2024-01-10",
		},
		{
			id: "3",
			name: "Air Filtration Systems",
			description: "Installation and maintenance of advanced air filtration systems",
			category: "Specialized",
			price: "Custom Quote",
			status: "active",
			icon: "🌬️",
			createdAt: "2024-01-05",
		},
		{
			id: "4",
			name: "Soundproof Duct Work",
			description: "Specialized soundproof air duct installation for noise-sensitive environments",
			category: "Specialized",
			price: "Custom Quote",
			status: "active",
			icon: "🔇",
			createdAt: "2024-01-01",
		},
		{
			id: "5",
			name: "Emergency Repair",
			description: "24/7 emergency air duct repair services",
			category: "Emergency",
			price: "Emergency Rates",
			status: "active",
			icon: "🚨",
			createdAt: "2023-12-20",
		},
		{
			id: "6",
			name: "Consultation Services",
			description: "Expert consultation for air duct system design and optimization",
			category: "Consultation",
			price: "Hourly Rate",
			status: "draft",
			icon: "💡",
			createdAt: "2023-12-15",
		},
	]

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<Wrench className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">{"Services"}</h1>
						<p className="text-muted-foreground">{"Manage company services"}</p>
					</div>
				</div>

				{/* Add New Button */}
				<form>
					<Button type="submit">
						<Plus className="mr-2 size-4" />
						{"Add New Service"}
					</Button>
				</form>
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{"6"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Total Services"}</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<Wrench className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">{"5"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">
									{"Active Services"}
								</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<Wrench className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">{"1"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft Services"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Wrench className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-purple-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-purple-600">{"5"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Categories"}</p>
							</div>
							<div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
								<Wrench className="size-8 text-purple-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Services List */}
			<Card>
				<CardHeader>
					<CardTitle>{"All Services"}</CardTitle>
					<CardDescription>{"Manage your service offerings and pricing"}</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="space-y-4">
							{mockServices.map((service) => (
								<div
									key={service.id}
									className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
								>
									<div className="flex items-center space-x-4">
										<div className="size-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
											{service.icon}
										</div>
										<div className="space-y-1">
											<div className="flex items-center space-x-2">
												<h3 className="font-semibold text-foreground">{service.name}</h3>
												<Badge variant={service.status === "active" ? "default" : "secondary"}>
													{service.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">{service.description}</p>
											<div className="flex items-center space-x-4 text-xs text-muted-foreground">
												<span>
													{"Category: "}
													{service.category}
												</span>
												<span>
													{"Price: "}
													{service.price}
												</span>
												<span>
													{"Created: "}
													{service.createdAt}
												</span>
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<Button type="button" variant="ghost" size="sm">
											<Eye className="size-4" />
										</Button>
										<Button type="button" variant="ghost" size="sm">
											<Edit className="size-4" />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="size-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
