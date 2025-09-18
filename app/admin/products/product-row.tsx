import { Edit, Eye, MoreHorizontal, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProductById } from "@/server/products";
import { ProductPreviewDialogContent } from "./product-preview-dialog-content";
import { ProductPreviewTrigger } from "./product-preview-trigger";
import { ProductRowDialog } from "./product-row-context.state";

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
				<div className="flex items-start space-x-4 flex-1">
					{/* Product Image */}
					<div className="relative size-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
						{mainImage ? (
							<Image
								src={mainImage.url}
								alt={product.name}
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
						<div className="flex items-center gap-3 mb-2">
							<h3 className="text-lg font-semibold text-foreground truncate">{product.name}</h3>
							<Badge
								variant={product.status === "active" ? "default" : "secondary"}
								className="flex-shrink-0"
							>
								{product.status}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<span className="size-2 rounded-full bg-blue-500"></span>
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
								<span className="size-2 rounded-full bg-orange-500"></span>
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
								<span className="size-2 rounded-full bg-green-500"></span>
								{product.gallery.length} image{product.gallery.length !== 1 ? "s" : ""}
							</span>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex items-center gap-2 ml-4">
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
							<DropdownMenuItem className="flex items-center gap-2">
								<Edit className="size-4" />
								Edit Product
							</DropdownMenuItem>
							<DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
								<Trash2 className="size-4" />
								Delete Product
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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

			{/* Dialog wrapper for preview */}
			<ProductRowDialog>
				<ProductPreviewDialogContent productId={product.id} />
			</ProductRowDialog>
		</div>
	);
}
