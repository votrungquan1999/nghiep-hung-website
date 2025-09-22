import { ImageIcon } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Service } from "src/server/services/service.type";
import { ServiceImageManagementProvider } from "./edit-service-images/image-management-dialog.state";
import { ServiceImageManagement } from "./edit-service-images/image-management-dialog.ui";

interface ServiceImageDialogContentProps {
	service: Service;
}

/**
 * Server component that renders the content of the service image management dialog
 * Displays the image management interface for the service
 * @param service - The service whose images to manage
 */
export function ServiceImageDialogContent({ service }: ServiceImageDialogContentProps) {
	return (
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<ImageIcon className="size-5" />
					Manage Images: {service.name.vi}
				</DialogTitle>
			</DialogHeader>

			<ServiceImageManagementProvider>
				<ServiceImageManagement service={service} />
			</ServiceImageManagementProvider>
		</DialogContent>
	);
}
