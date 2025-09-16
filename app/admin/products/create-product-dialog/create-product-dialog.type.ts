/**
 * Product-related types and interfaces for create product dialog
 */

export interface Product {
	id: string
	name: string
	description: string
	category: string
	price: string
	status: ProductStatus
	gallery: ProductImage[]
	createdAt: Date
	updatedAt: Date
}

export interface ProductImage {
	key: string
	url: string
	isMain: boolean
	uploadedAt: Date
}

export enum ProductStatus {
	Active = "active",
	Draft = "draft",
	Archived = "archived",
}

export interface CreateProductData {
	name: string
	description: string
	category: string
	price: string
	images: File[]
}

export interface CreateProductResult {
	success: boolean
	productId?: string
	error?: string
}

export interface S3UploadResult {
	key: string
	url: string
}

export interface ProductImageSelectionState {
	selectedMainImageId: string | null
	isSubmitting: boolean
	error: string | null
}

export enum ProductImageSelectionActionType {
	SetMainImage = "SET_MAIN_IMAGE",
	SetSubmitting = "SET_SUBMITTING",
	SetError = "SET_ERROR",
	Reset = "RESET",
}

export type ProductImageSelectionAction =
	| { type: ProductImageSelectionActionType.SetMainImage; payload: string | null }
	| { type: ProductImageSelectionActionType.SetSubmitting; payload: boolean }
	| { type: ProductImageSelectionActionType.SetError; payload: string | null }
	| { type: ProductImageSelectionActionType.Reset }
