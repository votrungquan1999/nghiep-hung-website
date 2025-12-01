import { type ProductDocument, ProductStatus } from "src/server/products/product.type";
import {
	ProjectCompletionStatus,
	type ProjectDocument,
	ProjectVisibilityStatus,
} from "src/server/projects/project.type";
import { type ServiceDocument, ServiceStatus } from "src/server/services/service.type";

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

/**
 * Creates a mock product document for database seeding
 * @param overrides - Partial product data to override defaults
 * @returns Complete ProductDocument object (database format)
 */
export function createMockProductDocument(
	overrides: Partial<ProductDocument> = {},
): ProductDocument {
	const now = new Date();
	return {
		id: "test-product-1",
		name: { en: "Test Product", vi: "Sản phẩm thử nghiệm" },
		description: { en: "Test description", vi: "Mô tả thử nghiệm" },
		status: ProductStatus.Active,
		gallery: [
			{
				key: "products/test/image-1.jpg",
				url: "https://test-bucket.s3.amazonaws.com/products/test/image-1.jpg",
				isMain: true,
			},
		],
		createdAt: now,
		updatedAt: now,
		...overrides,
	};
}

/**
 * Extended mock product documents for testing maxRows feature
 * Contains 7 products to test row limiting (more than 2 rows of 3)
 */
export const mock7ProductDocuments: ProductDocument[] = [
	createMockProductDocument({
		id: "product-1",
		name: { en: "Ventilation Duct A", vi: "Ống thông gió A" },
	}),
	createMockProductDocument({
		id: "product-2",
		name: { en: "Air Filter B", vi: "Bộ lọc không khí B" },
	}),
	createMockProductDocument({
		id: "product-3",
		name: { en: "Industrial Fan C", vi: "Quạt công nghiệp C" },
	}),
	createMockProductDocument({
		id: "product-4",
		name: { en: "Exhaust System D", vi: "Hệ thống hút D" },
	}),
	createMockProductDocument({
		id: "product-5",
		name: { en: "Cooling Unit E", vi: "Thiết bị làm mát E" },
	}),
	createMockProductDocument({
		id: "product-6",
		name: { en: "Air Handler F", vi: "Bộ xử lý không khí F" },
	}),
	createMockProductDocument({
		id: "product-7",
		name: { en: "Duct Connector G", vi: "Đầu nối ống G" },
	}),
];

/**
 * Creates a mock service document for database seeding
 * @param overrides - Partial service data to override defaults
 * @returns Complete ServiceDocument object (database format)
 */
export function createMockServiceDocument(
	overrides: Partial<ServiceDocument> = {},
): ServiceDocument {
	const now = new Date();
	return {
		id: "test-service-1",
		name: { en: "Test Service", vi: "Dịch vụ thử nghiệm" },
		description: { en: "Test description", vi: "Mô tả thử nghiệm" },
		status: ServiceStatus.Active,
		gallery: [
			{
				key: "services/test/image-1.jpg",
				url: "https://test-bucket.s3.amazonaws.com/services/test/image-1.jpg",
				isMain: true,
			},
		],
		createdAt: now,
		updatedAt: now,
		...overrides,
	};
}

/**
 * Extended mock service documents for testing maxRows feature
 * Contains 7 services to test row limiting (more than 2 rows of 3)
 */
export const mock7ServiceDocuments: ServiceDocument[] = [
	createMockServiceDocument({
		id: "service-1",
		name: { en: "Installation Service A", vi: "Dịch vụ lắp đặt A" },
	}),
	createMockServiceDocument({
		id: "service-2",
		name: { en: "Maintenance Service B", vi: "Dịch vụ bảo trì B" },
	}),
	createMockServiceDocument({
		id: "service-3",
		name: { en: "Consultation Service C", vi: "Dịch vụ tư vấn C" },
	}),
	createMockServiceDocument({
		id: "service-4",
		name: { en: "Design Service D", vi: "Dịch vụ thiết kế D" },
	}),
	createMockServiceDocument({
		id: "service-5",
		name: { en: "Repair Service E", vi: "Dịch vụ sửa chữa E" },
	}),
	createMockServiceDocument({
		id: "service-6",
		name: { en: "Inspection Service F", vi: "Dịch vụ kiểm tra F" },
	}),
	createMockServiceDocument({
		id: "service-7",
		name: { en: "Cleaning Service G", vi: "Dịch vụ vệ sinh G" },
	}),
];
