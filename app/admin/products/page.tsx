import { Edit, Eye, Package, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Products management page
 * Static version for UI assessment
 * Manages air duct products and inventory
 */
export default async function ProductsPage() {
	// Mock data for UI demonstration
	const mockProducts = [
		{
			id: "1",
			name: "Round Air Ducts",
			description: "High-quality round air ducts for industrial applications",
			category: "Ducts",
			price: "Contact for pricing",
			status: "active",
			image: "/round-air-ducts.png",
			createdAt: "2024-01-15",
		},
		{
			id: "2",
			name: "Square Air Ducts",
			description: "Durable square air ducts for commercial installations",
			category: "Ducts",
			price: "Contact for pricing",
			status: "active",
			image: "/square-air-ducts.png",
			createdAt: "2024-01-10",
		},
		{
			id: "3",
			name: "Flexible Air Ducts",
			description: "Flexible air duct systems for easy installation",
			category: "Flexible Systems",
			price: "Contact for pricing",
			status: "active",
			image: "/flexible-air-duct-coil.png",
			createdAt: "2024-01-05",
		},
		{
			id: "4",
			name: "Soundproof Air Ducts",
			description: "Soundproof air ducts for noise-sensitive environments",
			category: "Specialized",
			price: "Contact for pricing",
			status: "draft",
			image: "/soundproof-air-duct.png",
			createdAt: "2024-01-01",
		},
	]

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<Package className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">{"Products"}</h1>
						<p className="text-muted-foreground">{"Manage air duct products"}</p>
					</div>
				</div>

				{/* Add New Button */}
				<form>
					<Button type="submit">
						<Plus className="mr-2 size-4" />
						{"Add New Product"}
					</Button>
				</form>
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{"12"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Total Products"}</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<Package className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">{"10"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">
									{"Active Products"}
								</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<Package className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">{"2"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft Products"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Package className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-purple-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-purple-600">{"4"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Categories"}</p>
							</div>
							<div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
								<Package className="size-8 text-purple-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Products List */}
			<Card>
				<CardHeader>
					<CardTitle>{"All Products"}</CardTitle>
					<CardDescription>{"Manage your product catalog and inventory"}</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="space-y-4">
							{mockProducts.map((product) => (
								<div
									key={product.id}
									className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
								>
									<div className="flex items-center space-x-4">
										<div className="size-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
											<Image
												src={product.image}
												alt={product.name}
												width={64}
												height={64}
												className="size-full object-cover"
											/>
										</div>
										<div className="space-y-1">
											<div className="flex items-center space-x-2">
												<h3 className="font-semibold text-foreground">{product.name}</h3>
												<Badge variant={product.status === "active" ? "default" : "secondary"}>
													{product.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">{product.description}</p>
											<div className="flex items-center space-x-4 text-xs text-muted-foreground">
												<span>
													{"Category: "}
													{product.category}
												</span>
												<span>
													{"Price: "}
													{product.price}
												</span>
												<span>
													{"Created: "}
													{product.createdAt}
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
