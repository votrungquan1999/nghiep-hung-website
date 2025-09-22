import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "src/lib/auth";

/**
 * Check if user is authorized admin
 * Only certain email addresses are allowed to access admin panel
 */
function isAuthorizedAdmin(email: string): boolean {
	const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
	return adminEmails.includes(email);
}

/**
 * Server-side function to check admin authentication and authorization
 * Redirects to login if not authenticated or not authorized
 */
export async function requireAdminAuth() {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	if (!session || !session.user) {
		redirect("/login");
	}

	if (!isAuthorizedAdmin(session.user.email)) {
		redirect("/unauthorized");
	}

	return session;
}

/**
 * Utility to check if user is admin (for client-side usage)
 */
export function checkAdminPermission(userEmail: string | undefined): boolean {
	if (!userEmail) return false;
	return isAuthorizedAdmin(userEmail);
}
