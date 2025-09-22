/**
 * Service types and interfaces
 * Used by both client and server components
 */

/**
 * Multilingual text content for services
 */
export interface MultilingualText {
	en: string;
	vi: string;
}

/**
 * Database document type for services stored in MongoDB
 * This represents the raw document structure in the database
 */
export interface ServiceDocument {
	id: string;
	name: MultilingualText;
	description: MultilingualText;
	status: ServiceStatus;
	gallery: ServiceImageDocument[];
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Database document type for service images stored in MongoDB
 * This represents the raw document structure in the database
 */
export interface ServiceImageDocument {
	key: string;
	url: string;
	isMain: boolean;
	uploadedAt?: Date;
}

/**
 * Client-facing service interface
 * This is the clean interface used by components
 */
export interface Service {
	id: string;
	name: MultilingualText;
	description: MultilingualText;
	status: ServiceStatus;
	gallery: ServiceImage[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ServiceImage {
	key: string;
	url: string;
	isMain: boolean;
	uploadedAt?: Date;
}

export enum ServiceStatus {
	Active = "active",
	Draft = "draft",
	Archived = "archived",
}

export interface CreateServiceData {
	name: MultilingualText;
	description: MultilingualText;
	status: ServiceStatus;
	images: File[];
}
