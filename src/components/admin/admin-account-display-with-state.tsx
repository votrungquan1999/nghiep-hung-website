"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { signOut } from "src/lib/auth-client";

interface AdminUser {
	name: string;
	email: string;
	image?: string | null;
}

interface AdminAccountDisplayWithStateProps {
	user: AdminUser;
}

/**
 * Client component for displaying current admin account with signout functionality
 * Shows user avatar (using Next.js Image for optimization) or initials fallback
 * Provides dropdown with account info and signout option
 */
export function AdminAccountDisplayWithState({ user }: AdminAccountDisplayWithStateProps) {
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [imageError, setImageError] = useState(false);
	const router = useRouter();

	/**
	 * Handle user signout
	 * Signs out user and redirects to login page
	 */
	const handleSignOut = async () => {
		try {
			setIsSigningOut(true);
			await signOut();
			router.push("/login");
		} catch (error) {
			console.error("Error signing out:", error);
		} finally {
			setIsSigningOut(false);
		}
	};

	/**
	 * Get user display name
	 * Falls back to email if name is not available
	 */
	const displayName = user.name || user.email.split("@")[0];

	/**
	 * Handle image loading error
	 * Falls back to initials when image fails to load
	 */
	const handleImageError = () => {
		setImageError(true);
	};

	/**
	 * Get user initials for avatar fallback
	 */
	const initials = user.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: user.email[0].toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					{user.image && !imageError ? (
						<Image
							src={user.image}
							alt={displayName}
							width={24}
							height={24}
							className="size-6 rounded-full object-cover"
							onError={handleImageError}
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
							{initials}
						</div>
					)}
					<span className="hidden sm:inline">{displayName}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user.name}</p>
						<p className="text-xs leading-none text-muted-foreground">{user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
					<LogOut className="mr-2 size-4" />
					{isSigningOut ? "Signing out..." : "Sign out"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
