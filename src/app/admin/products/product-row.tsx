import { Edit, Eye, ImageIcon, MoreHorizontal, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import {
	CancelButton,
	ConfirmButton,
	ConfirmDialog,
	Form,
	FormErrorDisplay,
	FormPendingMessage,
	FormSubmitMessage,
	SubmitButton,
} from "src/components/form-state";
import { Badge } from "src/components/ui/badge";
import { Button } from "src/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "src/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { getProductById } from "src/server/products";
import { deleteProductAction } from "./delete-product.actions";
import {
	ProductEditTrigger,
	ProductImageTrigger,
	ProductPreviewTrigger,
} from "./product-dialog-triggers";
import { ProductEditDialogContent } from "./product-edit-dialog-content";
import { ProductImageDialogContent } from "./product-image-dialog-content";
import { ProductPreviewDialogContent } from "./product-preview-dialog-content";
import { ProductRowDialog } from "./product-row-context.ui";

interface ProductRowProps {
	productId: string;
}

/**
 * Individual product row component that fetches and displays a single product
 * Features a modern card-based design with improved layout and interactions
 * @param productId - The ID of the product to display
 */
export async function ProductRow({ productId }: ProductRowProps) {
	const product = await getProductById(productId);

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	const mainImage = product.gallery.find((img) => img.isMain) || product.gallery[0];

	return (
		<div className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-primary/20">
			{/* Product Header */}
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-start space-x-4 flex-1 min-w-0">
					{/* Product Image */}
					<div className="relative size-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
						{mainImage ? (
							<Image
								src={mainImage.url}
								alt={product.name.en}
								fill
								className="object-cover"
								sizes="80px"
							/>
						) : (
							<div className="size-full flex items-center justify-center">
								<Package className="size-8 text-muted-foreground" />
							</div>
						)}
					</div>

					{/* Product Info */}
					<div className="flex-1 min-w-0">
						<div className="mb-2">
							<h3 className="text-lg font-semibold text-foreground truncate">{product.name.en}</h3>
							<p className="text-sm text-muted-foreground truncate">{product.name.vi}</p>
						</div>
						<div className="text-sm text-muted-foreground mb-3 min-w-0 max-w-full">
							<p className="truncate mb-1 whitespace-nowrap overflow-hidden">
								<strong>EN:</strong> {product.description.en}
							</p>
							<p className="truncate whitespace-nowrap overflow-hidden">
								<strong>VI:</strong> {product.description.vi}
							</p>
						</div>
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<span className="size-2 rounded-full bg-primary"></span>
								Created{" "}
								{new Date(product.createdAt).toLocaleString(undefined, {
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
							<span className="flex items-center gap-1">
								<span className="size-2 rounded-full bg-secondary"></span>
								Updated{" "}
								{new Date(product.updatedAt).toLocaleString(undefined, {
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
							<span className="flex items-center gap-1">
								<span className="size-2 rounded-full bg-success"></span>
								{product.gallery.length} image{product.gallery.length !== 1 ? "s" : ""}
							</span>
						</div>
					</div>
				</div>

				{/* Status and Actions */}
				<div className="flex items-center gap-3 ml-4">
					<Badge
						variant={product.status === "active" ? "default" : "secondary"}
						className="flex-shrink-0"
					>
						{product.status}
					</Badge>
					<Form action={deleteProductAction} confirmBeforeSubmit>
						<input type="hidden" name="productId" value={product.id} />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm">
									<MoreHorizontal className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<ProductPreviewTrigger className="flex items-center gap-2 w-full">
									<Eye className="size-4" />
									View Details
								</ProductPreviewTrigger>
								<ProductEditTrigger className="flex items-center gap-2 w-full">
									<Edit className="size-4" />
									Edit Product
								</ProductEditTrigger>
								<ProductImageTrigger className="flex items-center gap-2 w-full">
									<ImageIcon className="size-4" />
									Manage Images
								</ProductImageTrigger>
								<SubmitButton asChild className="flex items-center gap-2 w-full">
									<DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
										<Trash2 className="size-4" />
										Delete Product
									</DropdownMenuItem>
								</SubmitButton>
							</DropdownMenuContent>
						</DropdownMenu>
						{/* Delete Confirm Dialog */}
						<ConfirmDialog>
							<DialogContent className="sm:max-w-2xl bg-white">
								<DialogHeader className="space-y-3">
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-full bg-destructive/10 flex-shrink-0">
											<Trash2 className="size-5 text-destructive" />
										</div>
										<div className="space-y-1">
											<DialogTitle>Delete Product</DialogTitle>
											<DialogDescription>
												This action cannot be undone. The product will be permanently removed.
											</DialogDescription>
										</div>
									</div>
								</DialogHeader>
								<div className="space-y-3">
									<div className="p-4 bg-muted/50 rounded-lg border">
										<div className="mb-2">
											<p className="font-medium text-foreground">{product.name.en}</p>
											<p className="text-sm text-muted-foreground">{product.name.vi}</p>
										</div>
										<div className="text-sm text-muted-foreground leading-relaxed mb-3">
											<p className="mb-1">
												<strong>EN:</strong> {product.description.en}
											</p>
											<p>
												<strong>VI:</strong> {product.description.vi}
											</p>
										</div>
										<div className="flex items-center gap-4 text-xs text-muted-foreground">
											<span className="flex items-center gap-1">
												<span className="size-2 rounded-full bg-destructive"></span>
												{product.gallery.length} image{product.gallery.length !== 1 ? "s" : ""} will
												be deleted
											</span>
										</div>
									</div>
									<FormErrorDisplay />
								</div>

								<DialogFooter className="gap-2">
									<CancelButton>Cancel</CancelButton>
									<ConfirmButton variant="destructive">
										<FormSubmitMessage>Delete Product</FormSubmitMessage>
										<FormPendingMessage>Deleting...</FormPendingMessage>
									</ConfirmButton>
								</DialogFooter>
							</DialogContent>
						</ConfirmDialog>
					</Form>
				</div>
			</div>
			{/* Product Gallery Preview */}
			{product.gallery.length > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-2">
					{product.gallery.slice(0, 4).map((image, index) => (
						<div
							key={image.key}
							className="relative size-12 rounded-md bg-muted overflow-hidden flex-shrink-0"
						>
							<Image
								src={image.url}
								alt={`${product.name} ${index + 1}`}
								fill
								className="object-cover"
								sizes="48px"
							/>
						</div>
					))}
					{product.gallery.length > 4 && (
						<div className="size-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
							<span className="text-xs font-medium text-muted-foreground">
								+{product.gallery.length - 4}
							</span>
						</div>
					)}
				</div>
			)}
			{/* Dialog wrappers for preview and edit */}
			<ProductRowDialog type="preview">
				<ProductPreviewDialogContent productId={product.id} />
			</ProductRowDialog>

			<ProductRowDialog type="edit">
				<ProductEditDialogContent product={product} />
			</ProductRowDialog>

			{/* Image Management Dialog */}
			<ProductRowDialog type="image">
				<ProductImageDialogContent product={product} />
			</ProductRowDialog>
		</div>
	);
}
