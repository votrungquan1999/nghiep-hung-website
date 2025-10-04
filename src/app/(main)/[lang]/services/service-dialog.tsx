import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
	convertToGalleryImages,
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "src/components/image-gallery/image-gallery";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "src/components/ui/dialog";
import type { Locale } from "src/lib/i18n/config";
import { getDictionary } from "src/lib/i18n/dictionaries";
import type { Service } from "src/server/services";
import { getServiceById } from "src/server/services";

interface ServiceDialogProps {
	serviceId: string;
	locale: Locale;
}

/**
 * Server component that fetches service data by ID and renders the service dialog with card trigger
 * Uses the newer image gallery system for consistent UI across admin and public interfaces
 * @param serviceId - The ID of the service to display
 * @param locale - The current locale for internationalization
 */
export default async function ServiceDialog({ serviceId, locale }: ServiceDialogProps) {
	const service: Service | null = await getServiceById(serviceId);

	if (!service) {
		return <NotFoundServiceDialog locale={locale} />;
	}

	const galleryImages = service.gallery || [];
	const serviceName = service.name[locale];
	const serviceDescription = service.description[locale];

	const convertedImages = convertToGalleryImages(
		galleryImages.map((image, index) => ({
			src: image.url,
			alt: `${serviceName} - ${index + 1}`,
		})),
	);

	const mainImage = service.gallery?.find((img) => img.isMain) || service.gallery?.[0];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
					<div className="aspect-video overflow-hidden rounded-t-lg px-0">
						<Image
							src={mainImage?.url || "/placeholder.svg"}
							alt={serviceName}
							width={400}
							height={300}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</div>
					<CardContent className="pb-6">
						<CardTitle className="text-xl font-serif font-bold text-foreground">
							{serviceName}
						</CardTitle>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
				<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
					<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
						{serviceName}
					</DialogTitle>
				</DialogHeader>

				<div className="px-6 pb-6 space-y-6">
					<GalleryRoot images={convertedImages}>
						<div className="relative">
							<GalleryImage className="mb-6" />
							<GalleryBackButton className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white">
								<ChevronLeft className="size-4" />
							</GalleryBackButton>
							<GalleryNextButton className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white">
								<ChevronRight className="size-4" />
							</GalleryNextButton>
						</div>
						<GalleryThumbnails />
					</GalleryRoot>

					<div className="border border-border rounded-lg p-6 bg-muted/30">
						<h4 className="font-serif font-bold text-xl mb-4 text-foreground">Description</h4>
						<div className="text-foreground text-lg leading-relaxed whitespace-pre-line">
							{serviceDescription}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

/**
 * Fallback component displayed when a service is not found
 * Shows a placeholder card with "Service Not Found" message
 * @param locale - The current locale for internationalization
 * @returns JSX element displaying not found service card
 */
function NotFoundServiceDialog({ locale }: { locale: Locale }) {
	const dictionary = getDictionary(locale);

	return (
		<Card className="group hover:shadow-xl transition-all duration-300 py-0 hover:-translate-y-1 cursor-pointer">
			<div className="aspect-video overflow-hidden rounded-t-lg px-0 bg-muted flex items-center justify-center">
				<p className="text-muted-foreground">{dictionary.services.notFound.title}</p>
			</div>
			<CardHeader>
				<CardTitle className="text-xl font-serif font-bold text-foreground">
					{dictionary.services.notFound.title}
				</CardTitle>
			</CardHeader>
		</Card>
	);
}
