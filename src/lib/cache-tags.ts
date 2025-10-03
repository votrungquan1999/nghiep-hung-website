/**
 * Cache tags for Next.js caching system
 * Used to tag cached data and revalidate specific modules
 * Should only use 4 tags: PRODUCTS, SERVICES, PROJECTS, CONTACT
 */
export const CACHE_TAGS = {
	PRODUCTS: "products",
	SERVICES: "services",
	PROJECTS: "projects",
	CONTACT: "contact",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
