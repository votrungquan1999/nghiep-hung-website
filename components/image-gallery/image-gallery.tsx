import type { ImageGalleryImage } from "./image-gallery.type"
import {
	GalleryBackButton,
	GalleryImage,
	GalleryNextButton,
	GalleryRoot,
	GalleryThumbnails,
} from "./image-gallery.ui"

/**
 * Helper function to convert string array to ImageGalleryImage array
 */
function convertToGalleryImages(images: (string | ImageGalleryImage)[]): ImageGalleryImage[] {
	return images.map((img, index) => ({
		src: typeof img === "string" ? img : img.src,
		alt: typeof img === "string" ? `Gallery image ${index + 1}` : img.alt,
	}))
}

// Export individual components for composition
export {
	GalleryRoot,
	GalleryImage,
	GalleryThumbnails,
	GalleryNextButton,
	GalleryBackButton,
	convertToGalleryImages,
}
