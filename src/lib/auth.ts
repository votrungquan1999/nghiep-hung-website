import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDatabase } from "src/lib/database";

/**
 * Validate required environment variables
 */
function validateEnvVars(): {
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
	BETTER_AUTH_URL: string;
} {
	const required = {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
	};

	for (const [key, value] of Object.entries(required)) {
		if (!value) {
			throw new Error(`Missing required environment variable: ${key}`);
		}
	}

	return required as {
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		BETTER_AUTH_URL: string;
	};
}

// Validate environment variables once
const envVars = validateEnvVars();

/**
 * Better Auth configuration for the application
 * Configures Google OAuth-only authentication for admin access
 */
export const auth = betterAuth({
	database: mongodbAdapter(await getDatabase()),
	socialProviders: {
		google: {
			clientId: envVars.GOOGLE_CLIENT_ID,
			clientSecret: envVars.GOOGLE_CLIENT_SECRET,
			redirectURI: new URL("/api/auth/callback.google", envVars.BETTER_AUTH_URL).toString(),
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 1 week
		updateAge: 60 * 60 * 24, // 1 day
	},
	trustedOrigins: [envVars.BETTER_AUTH_URL],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
