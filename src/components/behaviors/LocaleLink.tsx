/**
 * LocaleLink component that automatically adds locale prefix to paths
 * A simple wrapper around Next.js Link that handles locale routing
 */

"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import useLocale from "src/hooks/useLocale";

/**
 * Props for LocaleLink component
 * Extends Next.js Link props
 */
type LocaleLinkProps = ComponentProps<typeof Link>;

/**
 * LocaleLink component that automatically adds locale prefix to paths
 *
 * @example
 * ```tsx
 * // In a Vietnamese page (/vi/about), this will link to /vi/products
 * <LocaleLink href="/products">View Products</LocaleLink>
 * ```
 */
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
	const locale = useLocale();

	// Convert href to string if it's a UrlObject
	const hrefString = typeof href === "string" ? href : href.pathname || "/";

	// Ensure path starts with "/"
	const normalizedPath = hrefString.startsWith("/") ? hrefString : `/${hrefString}`;

	// Build the localized href
	const localizedHref = `/${locale}${normalizedPath}`;

	return <Link {...props} href={localizedHref} />;
}
