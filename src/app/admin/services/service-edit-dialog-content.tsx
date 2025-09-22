import { Edit } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Service } from "src/server/services/service.type";
import { EditServiceForm } from "./edit-service-dialog/edit-service-form";

interface ServiceEditDialogContentProps {
	service: Service;
}

/**
 * Server component that renders the content of the service edit dialog
 * Fetches service data and displays edit form
 * @param service - The service to edit
 */
export function ServiceEditDialogContent({ service }: ServiceEditDialogContentProps) {
	return (
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Edit className="size-5" />
					Edit Service: {service.name.en}
				</DialogTitle>
			</DialogHeader>

			<EditServiceForm service={service} />
		</DialogContent>
	);
}
