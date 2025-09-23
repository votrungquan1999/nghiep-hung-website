import { ImageIcon } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "src/components/ui/dialog";
import type { Service } from "src/server/services/service.type";
import { ServiceImageManagementProvider } from "./edit-service-images/image-management-dialog.state";
import type { ExistingImage } from "./edit-service-images/image-management-dialog.type";
import { ServiceImageManagementContent } from "./edit-service-images/image-management-dialog.ui";

interface ServiceImageDialogContentProps {
	service: Service;
}

/**
 * Server component that renders the content of the service image management dialog
 * Displays the image management interface for the service
 * @param service - The service whose images to manage
 */
export function ServiceImageDialogContent({ service }: ServiceImageDialogContentProps) {
	// Convert service images to the expected format
	const existingImages: ExistingImage[] = service.gallery.map((image) => ({
		id: image.key,
		type: "existing" as const,
		url: image.url,
		name: `Service image ${image.key}`,
	}));

	// Find the main image
	const mainImage = service.gallery.find((img) => img.isMain);
	const mainImageId = mainImage ? mainImage.key : null;

	return (
		<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<ImageIcon className="size-5" />
					Manage Images: {service.name.vi}
				</DialogTitle>
			</DialogHeader>

			<ServiceImageManagementProvider existingImages={existingImages} mainImageId={mainImageId}>
				<ServiceImageManagementContent serviceId={service.id} />
			</ServiceImageManagementProvider>
		</DialogContent>
	);
}
