/**
 * Product-related types and interfaces for create product dialog
 */

export interface Product {
	id: string;
	name: string;
	description: string;
	category: string;
	price: string;
	status: ProductStatus;
	gallery: ProductImage[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductImage {
	key: string;
	url: string;
	isMain: boolean;
	uploadedAt: Date;
}

export enum ProductStatus {
	Active = "active",
	Draft = "draft",
	Archived = "archived",
}

export interface CreateProductData {
	name: string;
	description: string;
	category: string;
	price: string;
	images: File[];
}

export interface S3UploadResult {
	key: string;
	url: string;
}

export interface ProductImageSelectionState {
	selectedMainImageId: string | null;
}

export enum ProductImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
}

export type ProductImageSelectionAction = {
	type: ProductImageSelectionActionType.SetMainImage;
	payload: string | null;
};
