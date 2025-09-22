"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { Form } from "src/components/form-state";
import {
	ImageUploadArea,
	ImageUploadError,
	ImageUploadProgress,
	ImageUploadReview,
	ImageUploadRoot,
	ImageUploadTrigger,
} from "src/components/image-upload";
import { Button } from "src/components/ui/button";
import type { Service } from "src/server/services/service.type";
import { ServiceImageRenderer } from "../create-service-dialog/service-image-renderer";
import { addServiceImages } from "./image-management.actions";
import { useServiceImageManagementState } from "./image-management-dialog.state";

interface ServiceImageManagementProps {
	service: Service;
}

/**
 * Service image management component
 * Allows adding new images to an existing service
 * @param service - The service to manage images for
 */
export function ServiceImageManagement({ service }: ServiceImageManagementProps) {
	const state = useServiceImageManagementState();

	return (
		<div className="space-y-6">
			{/* Current Images */}
			<div className="space-y-4">
				<div className="text-sm font-medium text-foreground">Current Images</div>
				<div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
					{service.gallery.map((image, index) => (
						<div
							key={image.key}
							className="relative aspect-square rounded-lg overflow-hidden border-2 border-border"
						>
							<Image
								src={image.url}
								alt={`${service.name.en} ${index + 1}`}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
							/>
							{image.isMain && (
								<div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
									<span className="text-xs font-medium">Main</span>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Add New Images */}
			<div className="space-y-4">
				<div className="text-sm font-medium text-foreground">Add New Images</div>
				<Form action={addServiceImages}>
					<input type="hidden" name="serviceId" value={service.id} />
					<input type="hidden" name="selectedImageIndex" value={state.selectedMainImageId || ""} />

					<ImageUploadRoot maxFiles={10} maxFileSize={5 * 1024 * 1024} name="serviceImages">
						<ImageUploadArea
							className="p-8 w-full flex items-center justify-center"
							clickable={false}
						>
							<div className="text-center text-muted-foreground space-y-4">
								<div className="flex flex-col items-center space-y-2">
									<div className="size-16 rounded-full bg-muted flex items-center justify-center">
										<Upload className="size-8 text-muted-foreground" />
									</div>
									<div className="space-y-1">
										<h3 className="text-sm font-medium text-foreground">Upload New Images</h3>
										<p className="text-xs text-muted-foreground">
											Drag and drop your images here, or click the button below to select files
										</p>
									</div>
								</div>

								<ImageUploadTrigger asChild>
									<Button
										type="button"
										variant="outline"
										className="bg-white border-border hover:bg-muted"
									>
										<Upload className="mr-2 size-4" />
										Select Images
									</Button>
								</ImageUploadTrigger>
							</div>
						</ImageUploadArea>
						<ImageUploadProgress />
						<ImageUploadError />
						<ImageUploadReview
							ImageComponent={ServiceImageRenderer}
							className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
						/>
					</ImageUploadRoot>

					<div className="flex justify-end space-x-2 pt-4">
						<Button type="submit">Add Images</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
