import { Plus, Upload } from "lucide-react"
import {
	ImageUploadArea,
	ImageUploadError,
	ImageUploadProgress,
	ImageUploadReview,
	ImageUploadRoot,
	ImageUploadTrigger,
} from "@/components/image-upload"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProductImageSelectionProvider } from "./product-image-dialog.state"
import { ProductImageRenderer } from "./product-image-renderer"

/**
 * Create product dialog server component
 * Self-contained dialog for creating new products with uncontrolled inputs
 * All text content is hardcoded in the server component
 */
export default function CreateProductDialog() {
	return (
		<ProductImageSelectionProvider>
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						<Plus className="mr-2 size-4" />
						Add New Product
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
					<DialogHeader>
						<DialogTitle>Create New Product</DialogTitle>
					</DialogHeader>

					<form className="space-y-6">
						{/* Product Name */}
						<div className="space-y-2">
							<label htmlFor="product-name" className="text-sm font-medium text-foreground">
								Product Name
							</label>
							{/* biome-ignore lint: Static ID needed for form accessibility */}
							<Input id="product-name" name="productName" placeholder="Enter product name" />
						</div>

						{/* Product Description */}
						<div className="space-y-2">
							<label htmlFor="product-description" className="text-sm font-medium text-foreground">
								Product Description
							</label>
							{/* biome-ignore lint: Static ID needed for form accessibility */}
							<Textarea
								id="product-description"
								name="productDescription"
								placeholder="Enter product description"
								rows={4}
							/>
						</div>

						{/* Image Upload Section */}
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="text-sm font-medium text-foreground">Product Images</div>
								<p className="text-xs text-muted-foreground">
									Upload multiple images and click on any image to set it as the main product image
								</p>
							</div>

							<ImageUploadRoot maxFiles={10} maxFileSize={5 * 1024 * 1024} name="productImages">
								{/* Upload Trigger */}
								<ImageUploadTrigger asChild>
									<Button type="button" variant="outline" className="w-full">
										<Upload className="mr-2 size-4" />
										Select Images
									</Button>
								</ImageUploadTrigger>

								{/* Drop Zone */}
								<ImageUploadArea className="h-32 w-full flex items-center justify-center">
									<div className="text-center text-muted-foreground">
										<Upload className="mx-auto size-8 mb-2" />
										<p className="text-sm">Drag and drop images here, or click to select</p>
									</div>
								</ImageUploadArea>

								{/* Upload Progress */}
								<ImageUploadProgress />

								{/* Upload Errors */}
								<ImageUploadError />

								{/* Image Review with Custom Component */}
								<ImageUploadReview ImageComponent={ProductImageRenderer} />
							</ImageUploadRoot>
						</div>

						{/* Form Actions */}
						<div className="flex justify-end space-x-2 pt-4">
							<Button type="button" variant="outline">
								Cancel
							</Button>
							<Button type="submit">Create Product</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</ProductImageSelectionProvider>
	)
}
