# Image Gallery Component

A flexible, composable image gallery component with navigation functionality.

## Usage

### Basic Usage

```tsx
import { GalleryRoot, GalleryImage, GalleryThumbnails, convertToGalleryImages } from "@/components/image-gallery/image-gallery"

const images = [
  { src: "/image1.jpg", alt: "Image 1" },
  { src: "/image2.jpg", alt: "Image 2" },
  { src: "/image3.jpg", alt: "Image 3" },
]

function MyGallery() {
  return (
    <GalleryRoot images={images}>
      <GalleryImage />
      <GalleryThumbnails />
    </GalleryRoot>
  )
}
```

### With Navigation Buttons

```tsx
import { 
  GalleryRoot, 
  GalleryImage, 
  GalleryThumbnails, 
  GalleryNextButton, 
  GalleryBackButton 
} from "@/components/image-gallery/image-gallery"
import { ChevronLeft, ChevronRight } from "lucide-react"

function MyGallery() {
  return (
    <GalleryRoot images={images}>
      <div className="relative">
        <GalleryImage />
        <GalleryBackButton className="absolute left-4 top-1/2 -translate-y-1/2">
          <ChevronLeft className="h-4 w-4" />
        </GalleryBackButton>
        <GalleryNextButton className="absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronRight className="h-4 w-4" />
        </GalleryNextButton>
      </div>
      <GalleryThumbnails />
    </GalleryRoot>
  )
}
```

### With Custom Buttons (asChild)

```tsx
import { Button } from "@/components/ui/button"

function MyGallery() {
  return (
    <GalleryRoot images={images}>
      <GalleryImage />
      <div className="flex gap-2">
        <GalleryBackButton asChild>
          <Button variant="outline">Previous</Button>
        </GalleryBackButton>
        <GalleryNextButton asChild>
          <Button variant="outline">Next</Button>
        </GalleryNextButton>
      </div>
      <GalleryThumbnails />
    </GalleryRoot>
  )
}
```

### Converting String Arrays

```tsx
import { convertToGalleryImages } from "@/components/image-gallery/image-gallery"

const stringImages = ["/image1.jpg", "/image2.jpg", "/image3.jpg"]
const galleryImages = convertToGalleryImages(stringImages)

function MyGallery() {
  return (
    <GalleryRoot images={galleryImages}>
      <GalleryImage />
      <GalleryThumbnails />
    </GalleryRoot>
  )
}
```

## Components

| Component | Prop | Description |
|-----------|------|-------------|
| `GalleryRoot` | `images` | Array of ImageGalleryImage objects to display |
| | `children` | React children components to render inside the gallery |
| `GalleryImage` | `aspectRatio` | CSS aspect ratio class (default: "aspect-video") |
| `GalleryThumbnails` | - | No props required (reads from context) |
| `GalleryNextButton` | `children` | Content to display inside the button |
| | `asChild` | Render as child component using Radix Slot |
| `GalleryBackButton` | `children` | Content to display inside the button |
| | `asChild` | Render as child component using Radix Slot |
| `convertToGalleryImages` | `images` | Array of strings or ImageGalleryImage objects to convert |

## Features

- ✅ Automatic looping (next/back buttons loop around)
- ✅ Image count injected directly to provider
- ✅ Context-based image access (no props needed for GalleryImage/GalleryThumbnails)
- ✅ Composable component pattern
- ✅ TypeScript support
- ✅ Customizable styling
- ✅ asChild pattern with Radix Slot for custom buttons
- ✅ No useEffect needed - image count injected directly
