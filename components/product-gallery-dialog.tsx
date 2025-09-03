"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

interface ProductGalleryDialogProps {
	product: {
		name: string
		description: string
		gallery: string[]
	}
	children: React.ReactNode
}

export default function ProductGalleryDialog({ product, children }: ProductGalleryDialogProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const nextImage = () => {
		if (product.gallery && product.gallery.length > 0) {
			setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length)
		}
	}

	const prevImage = () => {
		if (product.gallery && product.gallery.length > 0) {
			setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
		}
	}

	const galleryImages = product.gallery || []
	const hasMultipleImages = galleryImages.length > 1

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
				<DialogHeader className="p-6 pb-0 sticky top-0 bg-background z-10">
					<DialogTitle className="text-2xl font-serif font-bold text-foreground pr-8">
						{product.name}
					</DialogTitle>
				</DialogHeader>

				<div className="px-6 pb-6">
					<div className="relative w-full mb-6 bg-muted rounded-lg overflow-hidden">
						<div className="aspect-video w-full">
							<Image
								src={galleryImages[currentImageIndex] || "/placeholder.svg"}
								alt={`${product.name} - ${currentImageIndex + 1}`}
								fill
								className="object-contain"
							/>
						</div>

						{hasMultipleImages && (
							<>
								<Button
									variant="secondary"
									size="icon"
									className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
									onClick={prevImage}
								>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="secondary"
									size="icon"
									className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
									onClick={nextImage}
								>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</>
						)}
					</div>

					{hasMultipleImages && (
						<div className="flex justify-center space-x-2 mb-6">
							{galleryImages.map((_, index) => (
								<button
									// biome-ignore lint/suspicious/noArrayIndexKey: this is ok since we have no plan to change the image's order
									key={index}
									type="button"
									onClick={() => setCurrentImageIndex(index)}
									className={`w-3 h-3 rounded-full transition-colors ${
										index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30"
									}`}
								/>
							))}
						</div>
					)}

					<p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
