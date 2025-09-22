import { FormBoundaryProvider } from "src/components/form-state/form-state.state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { ServiceRow } from "./service-row";
import { ServiceRowProvider } from "./service-row-context.state";

interface ServicesListProps {
	serviceIds: string[];
}

/**
 * Component that displays the list of services when services exist
 * Uses individual ServiceRow components that fetch their own data
 * @param serviceIds - Array of service IDs to display
 */
export function ServicesList({ serviceIds }: ServicesListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{"All Services"}</CardTitle>
				<CardDescription>{"Manage your service offerings and pricing"}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{serviceIds.map((serviceId) => (
						<FormBoundaryProvider key={serviceId}>
							<ServiceRowProvider>
								<ServiceRow serviceId={serviceId} />
							</ServiceRowProvider>
						</FormBoundaryProvider>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
