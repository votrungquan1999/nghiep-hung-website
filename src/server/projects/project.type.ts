/**
 * Project-related types and interfaces
 * Contains database document types and client-facing interfaces
 */

import type { MultilingualText } from "src/lib/types/common.type";

/**
 * Project category enum
 */
export enum ProjectCategory {
	Commercial = "commercial",
	Industrial = "industrial",
	Healthcare = "healthcare",
	Residential = "residential",
	Hospitality = "hospitality",
	Education = "education",
	Specialized = "specialized",
}

/**
 * Project visibility status enum
 */
export enum ProjectVisibilityStatus {
	Active = "active",
	Draft = "draft",
}

/**
 * Project completion status enum
 */
export enum ProjectCompletionStatus {
	Completed = "completed",
	InProgress = "in-progress",
	Planning = "planning",
}

/**
 * Database document type for projects stored in MongoDB
 * This represents the raw document structure in the database
 */
export interface ProjectDocument {
	id: string;
	name: MultilingualText;
	category: MultilingualText;
	location: string;
	year: string;
	description: MultilingualText;
	specs: MultilingualText[];
	visibilityStatus: ProjectVisibilityStatus;
	completionStatus: ProjectCompletionStatus;
	gallery: ProjectImageDocument[];
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Database document type for project images stored in MongoDB
 * This represents the raw document structure in the database
 */
export interface ProjectImageDocument {
	key: string;
	isMain: boolean;
	uploadedAt?: Date;
}

/**
 * Client-facing project interface
 * This is the clean interface used by components
 */
export interface Project {
	id: string;
	name: MultilingualText;
	category: MultilingualText;
	location: string;
	year: string;
	description: MultilingualText;
	specs: MultilingualText[];
	visibilityStatus: ProjectVisibilityStatus;
	completionStatus: ProjectCompletionStatus;
	gallery: ProjectImage[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ProjectImage {
	key: string;
	url: string;
	isMain: boolean;
	uploadedAt?: Date;
}

export interface CreateProjectData {
	name: MultilingualText;
	category: MultilingualText;
	location: string;
	year: string;
	description: MultilingualText;
	specs: MultilingualText[];
	visibilityStatus: ProjectVisibilityStatus;
	completionStatus: ProjectCompletionStatus;
	images: File[];
}
