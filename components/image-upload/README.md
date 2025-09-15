# Image Upload Component

A flexible, composable image upload component with drag-and-drop functionality, file validation, and preview capabilities.

## Usage

### Basic Usage

```tsx
import { 
  ImageUploadRoot, 
  ImageUploadTrigger, 
  ImageUploadArea, 
  ImageUploadReview, 
  ImageUploadError 
} from "@/components/image-upload"

function MyImageUpload() {
  return (
    <ImageUploadRoot maxFiles={5} maxFileSize={10 * 1024 * 1024}>
      <ImageUploadArea className="p-8 text-center">
        <p>Drag and drop images here or click to select</p>
      </ImageUploadArea>
      <ImageUploadTrigger asChild>
        <Button>Select Images</Button>
      </ImageUploadTrigger>
      <ImageUploadReview />
      <ImageUploadError />
    </ImageUploadRoot>
  )
}
```

### With Custom Styling

```tsx
import { Button } from "@/components/ui/button"
import { Upload, Image as ImageIcon } from "lucide-react"

function CustomImageUpload() {
  return (
    <ImageUploadRoot 
      maxFiles={10} 
      acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
      maxFileSize={5 * 1024 * 1024} // 5MB
    >
      <div className="space-y-4">
        <ImageUploadArea className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-lg font-medium">Upload Images</p>
            <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
          </div>
        </ImageUploadArea>
        
        <div className="flex gap-2">
          <ImageUploadTrigger asChild>
            <Button variant="outline">
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </ImageUploadTrigger>
        </div>
        
        <ImageUploadReview className="grid grid-cols-3 gap-4" />
        <ImageUploadError />
      </div>
    </ImageUploadRoot>
  )
}
```

### With Progress Indicator

```tsx
import { 
  ImageUploadRoot, 
  ImageUploadArea, 
  ImageUploadReview, 
  ImageUploadProgress,
  ImageUploadError 
} from "@/components/image-upload"

function UploadWithProgress() {
  return (
    <ImageUploadRoot>
      <ImageUploadArea>
        <p>Drop images here</p>
      </ImageUploadArea>
      <ImageUploadReview />
      <ImageUploadProgress showPercentage={true} />
      <ImageUploadError />
    </ImageUploadRoot>
  )
}
```

### With Custom Image Component

```tsx
import { ImageUploadRoot, ImageUploadReview } from "@/components/image-upload"
import { Card, CardContent } from "@/components/ui/card"

function CustomImageComponent({ src, alt, file, ...props }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-32 object-cover"
          {...props}
        />
        <div className="p-2">
          <p className="text-xs font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function CustomImageUpload() {
  return (
    <ImageUploadRoot>
      <ImageUploadArea>
        <p>Upload images</p>
      </ImageUploadArea>
      <ImageUploadReview ImageComponent={CustomImageComponent} />
    </ImageUploadRoot>
  )
}
```

## Components

| Component | Props | Description |
|-----------|-------|-------------|
| `ImageUploadRoot` | `maxFiles`, `acceptedTypes`, `maxFileSize`, `inputId`, `children` | Root provider component that manages upload state |
| `ImageUploadTrigger` | `children`, `asChild`, `className` | Button/trigger element to open file selection |
| `ImageUploadArea` | `className`, `disabled`, `children`, `asChild` | Drag and drop area for file uploads |
| `ImageUploadReview` | `className`, `ImageComponent` | Grid display of uploaded images with remove functionality |
| `ImageUploadProgress` | `className`, `showPercentage` | Progress indicator during uploads |
| `ImageUploadError` | `className`, `variant` | Error message display component |

## Props Reference

### ImageUploadRoot

```tsx
interface ImageUploadRootProps {
  children: React.ReactNode
  maxFiles?: number                    // Default: 10
  acceptedTypes?: string[]            // Default: ["image/*"]
  maxFileSize?: number                // Default: 5MB
  inputId?: string                    // Optional custom input ID
}
```

### ImageUploadTrigger

```tsx
interface ImageUploadTriggerProps {
  children: React.ReactNode
  asChild?: boolean                   // Default: false
  className?: string
}
```

### ImageUploadArea

```tsx
interface ImageUploadAreaProps {
  className?: string
  disabled?: boolean                  // Default: false
  children?: React.ReactNode
  asChild?: boolean                   // Default: false
}
```

### ImageUploadReview

```tsx
interface ImageUploadReviewProps {
  className?: string
  ImageComponent?: React.ComponentType<{
    src: string
    alt: string
    file: ImageUploadFile
  } & React.ComponentProps<typeof Image>>
}
```

### ImageUploadProgress

```tsx
interface ImageUploadProgressProps {
  className?: string
  showPercentage?: boolean            // Default: true
}
```

### ImageUploadError

```tsx
interface ImageUploadErrorProps {
  className?: string
  variant?: "default" | "destructive" // Default: "destructive"
}
```

## State Management

The component uses a reducer-based context for state management. You can access the state and dispatch functions:

```tsx
import { useImageUploadState, useImageUploadDispatch } from "@/components/image-upload/image-upload.state"
import { ImageUploadActionType } from "@/components/image-upload/image-upload.type"

function MyComponent() {
  const state = useImageUploadState()
  const dispatch = useImageUploadDispatch()

  // Access uploaded files
  console.log(state.files)
  
  // Access errors
  console.log(state.errors)
  
  // Access upload progress
  console.log(state.uploadProgress)
  
  // Clear all files
  const handleClear = () => {
    dispatch({ type: ImageUploadActionType.Reset })
  }
  
  // Remove specific file
  const handleRemove = (fileId: string) => {
    dispatch({ type: ImageUploadActionType.RemoveFile, payload: fileId })
  }
}
```

## File Validation

The component automatically validates files based on:

- **File Type**: Only accepts specified MIME types (default: all image types)
- **File Size**: Rejects files larger than `maxFileSize` (default: 5MB)
- **File Count**: Limits to `maxFiles` (default: 10)

Validation errors are automatically displayed using the `ImageUploadError` component.

## Features

- ✅ Drag and drop file upload
- ✅ Click to select files
- ✅ File type validation
- ✅ File size validation
- ✅ Maximum file count validation
- ✅ Image preview with remove functionality
- ✅ Upload progress indicator
- ✅ Error handling and display
- ✅ Composable component pattern
- ✅ TypeScript support
- ✅ Customizable styling
- ✅ asChild pattern with Radix Slot
- ✅ Context-based state management
- ✅ Automatic file cleanup (URL.revokeObjectURL)

## File Structure

```
components/image-upload/
├── index.tsx              # Main component exports
├── image-upload.state.tsx # State management with reducer context
├── image-upload.type.ts   # TypeScript type definitions
└── README.md             # This documentation
```

## Examples

### Product Image Upload

```tsx
function ProductImageUpload() {
  return (
    <ImageUploadRoot 
      maxFiles={8} 
      acceptedTypes={["image/jpeg", "image/png"]}
      maxFileSize={2 * 1024 * 1024} // 2MB
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Product Images</label>
          <p className="text-xs text-muted-foreground">
            Upload up to 8 images (JPEG/PNG, max 2MB each)
          </p>
        </div>
        
        <ImageUploadArea className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-6 w-6 text-gray-400" />
            <p className="text-sm">Drag images here or click to select</p>
          </div>
        </ImageUploadArea>
        
        <ImageUploadReview className="grid grid-cols-4 gap-4" />
        <ImageUploadError />
      </div>
    </ImageUploadRoot>
  )
}
```

### Gallery Image Upload

```tsx
function GalleryImageUpload() {
  return (
    <ImageUploadRoot maxFiles={20}>
      <ImageUploadArea className="min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium">Add Images to Gallery</p>
          <p className="text-sm text-gray-500">Drag and drop or click to select</p>
        </div>
      </ImageUploadArea>
      
      <ImageUploadReview className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
      <ImageUploadError />
    </ImageUploadRoot>
  )
}
```
