"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AdminNavigationItemProps {
	href: string
	children: React.ReactNode
}

/**
 * Client navigation item component that handles active state
 * Uses usePathname to determine if the current path matches the href
 * @param href - The navigation URL
 * @param children - The complete button content (icon + text)
 */
export function AdminNavigationItem({ href, children }: AdminNavigationItemProps) {
	const pathname = usePathname()
	const isActive = pathname === href

	return (
		<Link href={href}>
			<Button
				variant={isActive ? "default" : "ghost"}
				size="sm"
				className="flex items-center space-x-2"
			>
				{children}
			</Button>
		</Link>
	)
}
