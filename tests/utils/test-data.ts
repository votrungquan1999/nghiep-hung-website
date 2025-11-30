import {
	ProjectCompletionStatus,
	type ProjectDocument,
	ProjectVisibilityStatus,
} from "src/server/projects/project.type";

/**
 * Creates a mock project document for database seeding
 * @param overrides - Partial project data to override defaults
 * @returns Complete ProjectDocument object (database format)
 */
export function createMockProjectDocument(
	overrides: Partial<ProjectDocument> = {},
): ProjectDocument {
	const now = new Date();
	return {
		id: "test-project-1",
		name: { en: "Test Project", vi: "Dự án thử nghiệm" },
		category: { en: "Commercial", vi: "Thương mại" },
		location: "Ho Chi Minh City",
		year: "2024",
		description: { en: "Test description", vi: "Mô tả thử nghiệm" },
		specs: [
			{ en: "Spec 1", vi: "Thông số 1" },
			{ en: "Spec 2", vi: "Thông số 2" },
		],
		visibilityStatus: ProjectVisibilityStatus.Active,
		completionStatus: ProjectCompletionStatus.Completed,
		gallery: [
			{
				key: "projects/test/image-1.jpg",
				isMain: true,
			},
		],
		createdAt: now,
		updatedAt: now,
		...overrides,
	};
}

/**
 * Seeded mock project documents for database seeding
 * Contains 3 projects with different categories for filter testing
 */
export const mockProjectDocuments: ProjectDocument[] = [
	createMockProjectDocument({
		id: "project-1",
		name: { en: "Commercial Building A", vi: "Tòa nhà thương mại A" },
		category: { en: "Commercial", vi: "Thương mại" },
		location: "District 1, HCMC",
		year: "2024",
	}),
	createMockProjectDocument({
		id: "project-2",
		name: { en: "Industrial Factory B", vi: "Nhà máy công nghiệp B" },
		category: { en: "Industrial", vi: "Công nghiệp" },
		location: "Binh Duong",
		year: "2023",
	}),
	createMockProjectDocument({
		id: "project-3",
		name: { en: "Commercial Center C", vi: "Trung tâm thương mại C" },
		category: { en: "Commercial", vi: "Thương mại" },
		location: "District 7, HCMC",
		year: "2024",
	}),
];

/**
 * Extended mock project documents for testing maxRows feature
 * Contains 7 projects to test row limiting (more than 2 rows of 3)
 */
export const mock7ProjectDocuments: ProjectDocument[] = [
	...mockProjectDocuments,
	createMockProjectDocument({
		id: "project-4",
		name: { en: "Industrial Plant D", vi: "Nhà máy công nghiệp D" },
		category: { en: "Industrial", vi: "Công nghiệp" },
		location: "Dong Nai",
		year: "2023",
	}),
	createMockProjectDocument({
		id: "project-5",
		name: { en: "Commercial Tower E", vi: "Tòa tháp thương mại E" },
		category: { en: "Commercial", vi: "Thương mại" },
		location: "District 2, HCMC",
		year: "2024",
	}),
	createMockProjectDocument({
		id: "project-6",
		name: { en: "Healthcare Center F", vi: "Trung tâm y tế F" },
		category: { en: "Healthcare", vi: "Y tế" },
		location: "District 3, HCMC",
		year: "2024",
	}),
	createMockProjectDocument({
		id: "project-7",
		name: { en: "Commercial Mall G", vi: "Trung tâm mua sắm G" },
		category: { en: "Commercial", vi: "Thương mại" },
		location: "Thu Duc, HCMC",
		year: "2024",
	}),
];
