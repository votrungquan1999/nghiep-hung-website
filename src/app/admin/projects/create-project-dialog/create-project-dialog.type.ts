/**
 * Project-related types and interfaces for create project dialog
 * Contains only dialog-specific types
 */

import type { MultilingualText } from "src/lib/types/common.type";

export interface ProjectSpec extends MultilingualText {
	id: string;
}

export interface ProjectFormState {
	selectedMainImageId: string | null;
	specs: ProjectSpec[];
}

export enum ProjectFormActionType {
	SetMainImage = "SET_MAIN_IMAGE",
	AddSpec = "ADD_SPEC",
	RemoveSpec = "REMOVE_SPEC",
	UpdateSpec = "UPDATE_SPEC",
}

export type ProjectFormAction =
	| { type: ProjectFormActionType.SetMainImage; payload: string | null }
	| { type: ProjectFormActionType.AddSpec }
	| { type: ProjectFormActionType.RemoveSpec; payload: string }
	| {
			type: ProjectFormActionType.UpdateSpec;
			payload: { id: string; language: "en" | "vi"; value: string };
	  };
