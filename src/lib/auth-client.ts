"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client configuration
 * Provides client-side authentication functions
 */
const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
console.log("🔍 [AUTH CLIENT DEBUG] Base URL:", baseURL);
console.log(
	"🔍 [AUTH CLIENT DEBUG] Environment variable NEXT_PUBLIC_BETTER_AUTH_URL:",
	process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
);

export const authClient = createAuthClient({
	baseURL,
});

/**
 * Client-side authentication hooks
 * Only Google OAuth is available
 */
export const { signIn, signOut, useSession, getSession } = authClient;
