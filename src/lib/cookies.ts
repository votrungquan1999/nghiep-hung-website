/**
 * Cookie utility functions for reading feature flags and other cookie values
 */

import { cookies } from "next/headers";

/**
 * Feature flag names used throughout the application
 */
export enum FeatureFlag {
	USE_DATABASE_VALUE = "use_database_value",
}

/**
 * Get a feature flag value from cookies
 * @param flagName - The name of the feature flag
 * @param defaultValue - Default value if the flag is not set or invalid
 * @returns The feature flag value as a boolean
 */
export async function getFeatureFlag(
	flagName: FeatureFlag,
	defaultValue: boolean = false,
): Promise<boolean> {
	try {
		const cookieStore = await cookies();
		const flagValue = cookieStore.get(flagName);

		if (!flagValue) {
			return defaultValue;
		}

		// Convert string values to boolean
		return flagValue.value === "true" || flagValue.value === "1";
	} catch (error) {
		console.error(`Error reading feature flag ${flagName}:`, error);
		return defaultValue;
	}
}

/**
 * Get a cookie value as a string
 * @param cookieName - The name of the cookie
 * @param defaultValue - Default value if the cookie is not set
 * @returns The cookie value as a string
 */
export async function getCookieValue(
	cookieName: string,
	defaultValue: string = "",
): Promise<string> {
	try {
		const cookieStore = await cookies();
		const cookie = cookieStore.get(cookieName);

		return cookie?.value || defaultValue;
	} catch (error) {
		console.error(`Error reading cookie ${cookieName}:`, error);
		return defaultValue;
	}
}
