"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "src/components/language-toggle";
import { Button } from "src/components/ui/button";
import type { Locale } from "src/lib/i18n/config";

interface MobileHeaderProps {
	navigation: Array<{ name: string; href: string }>;
	locale: Locale;
}

/**
 * Mobile header component that handles mobile navigation menu
 * @param navigation - Array of navigation items with name and href
 * @param locale - The current locale for internationalization
 */
export function MobileHeader({ navigation, locale }: MobileHeaderProps) {
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

			{/* Mobile Navigation Overlay */}
			{isMenuOpen && (
				<>
					{/* Backdrop */}
					<button
						type="button"
						className="fixed inset-0 bg-black/50 z-40 md:hidden"
						onClick={() => setIsMenuOpen(false)}
					/>

					{/* Mobile Menu */}
					<div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-lg z-50 md:hidden">
						<div className="px-4 py-6">
							{/* Language Switcher for Mobile */}
							<div className="mb-6">
								<LanguageSwitcher currentLang={locale} />
							</div>

							<nav className="flex flex-col space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className="text-foreground hover:text-primary transition-colors duration-200 py-3 px-4 rounded-md hover:bg-accent font-medium"
										onClick={() => setIsMenuOpen(false)}
									>
										{item.name}
									</Link>
								))}
							</nav>
						</div>
					</div>
				</>
			)}
		</>
	);
}
