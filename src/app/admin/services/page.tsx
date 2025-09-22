import { Wrench } from "lucide-react";
import { Card, CardContent } from "src/components/ui/card";
import { getServiceCounts, getServiceIds } from "src/server/services";
import CreateServiceDialog from "./create-service-dialog/create-service-dialog";
import { EmptyStateWithDialog } from "./empty-state-with-dialog";
import { ServicesList } from "./services-list";

/**
 * Services management page
 * Manages company services and offerings
 * Uses efficient queries to check for services and display them
 */
export default async function ServicesPage() {
	// Fetch service IDs and counts efficiently
	const [serviceIds, serviceCounts] = await Promise.all([getServiceIds(), getServiceCounts()]);

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
				<CreateServiceDialog />
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="border-l-4 border-l-blue-500">
					<CardContent className="px-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-4xl font-bold text-blue-600">{serviceIds.length}</p>
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
								<p className="text-4xl font-bold text-green-600">{serviceCounts.active}</p>
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
								<p className="text-4xl font-bold text-yellow-600">{serviceCounts.draft}</p>
								<p className="text-sm font-medium text-muted-foreground mt-1">{"Draft Services"}</p>
							</div>
							<div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
								<Wrench className="size-8 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Services List */}
			{serviceIds.length === 0 ? (
				<EmptyStateWithDialog />
			) : (
				<ServicesList serviceIds={serviceIds} />
			)}
		</div>
	);
}
