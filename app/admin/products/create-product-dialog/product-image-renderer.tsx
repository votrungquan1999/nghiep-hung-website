"use client"

import { Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
	ProductImageSelectionActionType,
	useProductImageSelectionDispatch,
	useProductImageSelectionState,
} from "./product-image-dialog.state"

interface ProductImageRendererProps extends React.ComponentProps<typeof Image> {
	file: {
		id: string
		preview: string
		name: string
	}
}

/**
 * Custom image renderer for product creation with main image selection
 * Replaces Next.js Image component and adds main image selection functionality
 * @param file - The file object containing id, preview, and name
 * @param imageProps - Additional props to pass to the Next.js Image component
 * @returns JSX element for the image with selection functionality
 */
export function ProductImageRenderer({ file, ...imageProps }: ProductImageRendererProps) {
	const state = useProductImageSelectionState()
	const dispatch = useProductImageSelectionDispatch()

	const isMainImage = state.selectedMainImageId === file.id

	const handleSelectMain = (fileId: string) => {
		dispatch({ type: ProductImageSelectionActionType.SetMainImage, payload: fileId })
	}

	return (
		// <div className="space-y-2">
		<button
			type="button"
			className={cn(
				"relative w-full h-full rounded-lg overflow-hidden border-2 transition-colors",
				isMainImage
					? "border-primary ring-2 ring-primary/20"
					: "border-border hover:border-primary/50",
			)}
			onClick={() => handleSelectMain(file.id)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					handleSelectMain(file.id)
				}
			}}
		>
			<Image {...imageProps} />
			{isMainImage && (
				<div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
					<Check className="size-4" />
				</div>
			)}
		</button>
	)
}
