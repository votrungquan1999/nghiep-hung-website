import { Calendar, Edit, FolderOpen, MapPin, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectPreviewDialog } from "./project-preview-dialog"

/**
 * Projects management page
 * Static version for UI assessment
 * Showcases completed projects and portfolio
 */
export default async function ProjectsPage() {
	// Mock data for UI demonstration
	const mockProjects = [
		{
			id: "1",
			title: "Shopping Mall Ventilation System",
			description: "Complete air duct installation for a modern shopping mall with 50+ stores",
			location: "Ho Chi Minh City",
			client: "Vincom Shopping Mall",
			status: "completed",
			completionDate: "2024-01-15",
			gallery: [
				"/shopping-mall-ducts.png",
				"/mall-ventilation-installation.png",
				"/modern-mall-air-ducts.png",
			],
			category: "Commercial",
			duration: "3 months",
		},
		{
			id: "2",
			title: "Industrial Factory Duct Work",
			description: "Large-scale air duct system for industrial manufacturing facility",
			location: "Binh Duong Province",
			client: "Samsung Electronics",
			status: "completed",
			completionDate: "2023-12-20",
			gallery: [
				"/factory-duct-installation.png",
				"/industrial-air-ducts.png",
				"/duct-installation-team.png",
			],
			category: "Industrial",
			duration: "6 months",
		},
		{
			id: "3",
			title: "Residential Complex Installation",
			description: "Air duct systems for luxury residential complex with 200+ units",
			location: "District 7, HCMC",
			client: "Vinhomes",
			status: "completed",
			completionDate: "2023-11-10",
			gallery: ["/modern-mall-air-ducts.png", "/commercial-duct-work-completion.png"],
			category: "Residential",
			duration: "4 months",
		},
		{
			id: "4",
			title: "Hospital Air Filtration System",
			description: "Specialized air filtration and duct system for medical facility",
			location: "Hanoi",
			client: "Bach Mai Hospital",
			status: "in-progress",
			completionDate: "2024-03-15",
			gallery: [
				"/air-filtration-system.png",
				"/air-filter-installation.png",
				"/air-purifier-installation.png",
			],
			category: "Healthcare",
			duration: "5 months",
		},
		{
			id: "5",
			title: "Office Building Renovation",
			description: "Complete air duct renovation for 20-story office building",
			location: "District 1, HCMC",
			client: "Saigon Trade Center",
			status: "completed",
			completionDate: "2023-10-05",
			gallery: ["/commercial-duct-work-completion.png", "/duct-installation-team.png"],
			category: "Commercial",
			duration: "2 months",
		},
		{
			id: "6",
			title: "Soundproof Studio Installation",
			description: "Specialized soundproof air duct system for recording studio",
			location: "District 3, HCMC",
			client: "Music Studio Pro",
			status: "draft",
			completionDate: "2024-04-30",
			gallery: [
				"/soundproof-air-duct-installation.png",
				"/soundproof-air-duct.png",
				"/soundproof-materials.png",
			],
			category: "Specialized",
			duration: "1 month",
		},
	]

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Section Header and Action Bar */}
			<div className="flex items-center justify-between mb-6">
				{/* Section Header */}
				<div className="flex items-center space-x-4">
					<div className="p-2 rounded-lg bg-primary/10">
						<FolderOpen className="size-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl font-serif font-bold text-foreground">{"Projects"}</h1>
						<p className="text-muted-foreground">{"Showcase completed projects"}</p>
					</div>
				</div>

				{/* Add New Button */}
				<form>
					<Button type="submit">
						<Plus className="mr-2 size-4" />
						{"Add New Project"}
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
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Total Projects"}</p>
							</div>
							<div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
								<FolderOpen className="size-8 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-green-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-green-600">{"4"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Completed"}</p>
							</div>
							<div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
								<FolderOpen className="size-8 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-yellow-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-yellow-600">{"1"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"In Progress"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<FolderOpen className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-l-4 border-l-purple-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-purple-600">{"1"}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft"}</p>
							</div>
							<div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
								<FolderOpen className="size-8 text-purple-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Projects Grid */}
			<form>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mockProjects.map((project) => (
						<Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
							<div className="aspect-video overflow-hidden">
								<Image
									src={project.gallery[0]}
									alt={project.title}
									width={400}
									height={225}
									className="size-full object-cover"
								/>
							</div>
							<CardContent className="p-4">
								<div className="space-y-3">
									<div className="flex items-start justify-between">
										<h3 className="font-semibold text-foreground line-clamp-2">{project.title}</h3>
										<Badge
											variant={
												project.status === "completed"
													? "default"
													: project.status === "in-progress"
														? "secondary"
														: "outline"
											}
										>
											{project.status}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-2">
										{project.description}
									</p>
									<div className="space-y-2 text-xs text-muted-foreground">
										<div className="flex items-center space-x-1">
											<MapPin className="size-3" />
											<span>{project.location}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Calendar className="size-3" />
											<span>
												{"Completed: "}
												{project.completionDate}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span>
												{"Client: "}
												{project.client}
											</span>
											<span>
												{"Duration: "}
												{project.duration}
											</span>
										</div>
										<div className="pt-1">
											<Badge variant="outline" className="text-xs">
												{project.category}
											</Badge>
										</div>
									</div>
									<div className="flex items-center space-x-2 pt-2">
										<ProjectPreviewDialog project={project} />
										<Button type="button" variant="ghost" size="sm" className="flex-1">
											<Edit className="mr-1 size-3" />
											{"Edit"}
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="size-3" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</form>
		</div>
	)
}
