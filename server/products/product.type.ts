/**
 * Product types and interfaces
 * Used by both client and server components
 */

/**
 * Database document type for products stored in MongoDB
 * This represents the raw document structure in the database
 */
export interface ProductDocument {
	id: string;
	name: string;
	description: string;
	status: ProductStatus;
	gallery: ProductImageDocument[];
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Database document type for product images stored in MongoDB
 * This represents the raw document structure in the database
 */
export interface ProductImageDocument {
	key: string;
	url: string;
	isMain: boolean;
	uploadedAt?: Date;
}

/**
 * Client-facing product interface
 * This is the clean interface used by components
 */
export interface Product {
	id: string;
	name: string;
	description: string;
	status: ProductStatus;
	gallery: ProductImage[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductImage {
	key: string;
	url: string;
	isMain: boolean;
	uploadedAt?: Date;
}

export enum ProductStatus {
	Active = "active",
	Draft = "draft",
	Archived = "archived",
}

export interface CreateProductData {
	name: string;
	description: string;
	status: ProductStatus;
	images: File[];
}
