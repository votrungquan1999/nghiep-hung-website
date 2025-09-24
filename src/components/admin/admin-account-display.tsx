import { requireAdminAuth } from "src/lib/admin-auth";
import { AdminAccountDisplayWithState } from "./admin-account-display-with-state";

/**
 * Server component that fetches current admin user data
 * and passes it to the client component for display and interaction
 */
export async function AdminAccountDisplay() {
	const session = await requireAdminAuth();

	return (
		<AdminAccountDisplayWithState
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		/>
	);
}
