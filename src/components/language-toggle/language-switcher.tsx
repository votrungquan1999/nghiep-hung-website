/**
 * Language switcher component for header navigation
 * Allows users to switch between Vietnamese and English
 */

"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "src/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import type { Locale } from "../../lib/i18n/config";
import { localeFlags, localeNames, locales } from "../../lib/i18n/config";
import { cn } from "../../lib/utils";

/**
 * Language switcher component props
 */
interface LanguageSwitcherProps {
	currentLang: Locale;
	currentPath?: string;
	className?: string;
}

/**
 * Language switcher component
 * Displays current language and provides dropdown to switch languages
 */
export function LanguageSwitcher({ currentLang, className }: LanguageSwitcherProps) {
	const pathname = usePathname();

	// Remove current language prefix from pathname
	const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "") || "/";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						"flex items-center gap-2 px-2 py-1 h-auto",
						"border border-border rounded-md",
						"hover:bg-muted/50 focus:bg-muted/50",
						className,
					)}
				>
					<span className="text-lg">{localeFlags[currentLang]}</span>
					<span className="font-medium">{currentLang.toUpperCase()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{locales.map((locale) => {
					const isActive = currentLang === locale;
					const href = `/${locale}${pathWithoutLang}`;

					return (
						<DropdownMenuItem key={locale} asChild>
							<Link
								href={href}
								className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-accent"
							>
								<span className="text-lg">{localeFlags[locale]}</span>
								<span className="flex-1 font-medium">{localeNames[locale]}</span>
								{isActive && <Check className="h-4 w-4 text-foreground" />}
							</Link>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
