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
	const cookieStore = await cookies();
	const flagValue = cookieStore.get(flagName);

	if (!flagValue) {
		return defaultValue;
	}

	// Convert string values to boolean
	return flagValue.value === "true" || flagValue.value === "1";
}
