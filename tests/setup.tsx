import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

/**
 * Mock Next.js Image component
 * Renders as a regular img tag for testing
 */
vi.mock("next/image", () => ({
	default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
		// biome-ignore lint/performance/noImgElement: we need to test the image component
		return <img src={src} alt={alt} {...props} />;
	},
}));

/**
 * Mock Next.js Link component
 * Renders as a regular anchor tag for testing
 */
vi.mock("next/link", () => ({
	default: ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		[key: string]: unknown;
	}) => {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	},
}));

/**
 * Mock next/cache for server component caching
 * These functions are no-ops in tests
 */
vi.mock("next/cache", () => ({
	unstable_cacheTag: () => {},
	revalidateTag: vi.fn(),
	revalidatePath: vi.fn(),
}));
