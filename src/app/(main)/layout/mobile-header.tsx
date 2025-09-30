"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "src/components/ui/button";

interface MobileHeaderProps {
	navigation: Array<{ name: string; href: string }>;
}

/**
 * Mobile header component that handles mobile navigation menu
 * @param navigation - Array of navigation items with name and href
 */
export function MobileHeader({ navigation }: MobileHeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			{/* Mobile menu button */}
			<Button
				variant="ghost"
				size="sm"
				className="md:hidden"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</Button>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden py-4 border-t border-border">
					<nav className="flex flex-col space-y-2">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-foreground hover:text-primary transition-colors duration-200 py-2 px-4 rounded-md hover:bg-accent"
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</>
	);
}
