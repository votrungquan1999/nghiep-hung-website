/**
 * Next.js middleware for internationalization
 * Handles language detection and routing
 */

import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, type Locale, languageDetection, locales } from "./lib/i18n/config";

/**
 * Type guard to check if a string is a valid locale
 */
function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

/**
 * Get locale from request
 * Priority: URL pathname > Cookie > Accept-Language header > Default
 */
function getLocale(request: NextRequest): Locale {
	// 1. Check URL pathname
	const pathname = request.nextUrl.pathname;
	const pathnameLocale = pathname.split("/")[1];

	if (pathnameLocale && isLocale(pathnameLocale)) {
		return pathnameLocale;
	}

	// 2. Check cookie
	const cookieLocale = request.cookies.get(languageDetection.cookieName)?.value;
	if (cookieLocale && isLocale(cookieLocale)) {
		return cookieLocale;
	}

	// 3. Check Accept-Language header
	const acceptLanguage = request.headers.get("accept-language");
	if (acceptLanguage) {
		// Parse Accept-Language header and find best match
		const preferredLocales = acceptLanguage
			.split(",")
			.map((lang) => lang.split(";")[0].trim().toLowerCase())
			.map((lang) => {
				// Extract language code (e.g., 'en-US' -> 'en')
				const langCode = lang.split("-")[0];
				return langCode;
			});

		// Find first matching locale
		for (const preferred of preferredLocales) {
			if (preferred === "vi" || preferred === "en") {
				return preferred;
			}
		}
	}

	// 4. Default to Vietnamese
	return defaultLocale;
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Skip processing for static assets and specific files
	const staticExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".avif"];
	const isStaticAsset = staticExtensions.some((ext) => pathname.endsWith(ext));

	// Skip favicon.ico specifically
	if (pathname === "/favicon.ico" || isStaticAsset) {
		return NextResponse.next();
	}

	// Check if there is any supported locale in the pathname
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) {
		return NextResponse.next();
	}

	// Redirect if there is no locale
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;
	// e.g. incoming request is /products
	// The new URL is now /en/products
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - admin (admin routes)
		 * - login (login routes)
		 * - unauthorized (unauthorized routes)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|admin|login|unauthorized).*)",
	],
};
