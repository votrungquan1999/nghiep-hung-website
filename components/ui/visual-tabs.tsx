"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface VisualTabsProps {
	defaultValue: string;
	className?: string;
	children: React.ReactNode;
}

interface VisualTabsListProps {
	className?: string;
	children: React.ReactNode;
}

interface VisualTabsTriggerProps {
	value: string;
	className?: string;
	children: React.ReactNode;
}

interface VisualTabsContentProps {
	value: string;
	className?: string;
	children: React.ReactNode;
}

const VisualTabsContext = React.createContext<{
	activeTab: string;
	setActiveTab: (tab: string) => void;
} | null>(null);

/**
 * Visual tabs component that keeps all content mounted but only shows active tab
 * This prevents form data loss when switching between tabs
 */
export function VisualTabs({ defaultValue, className, children }: VisualTabsProps) {
	const [activeTab, setActiveTab] = React.useState(defaultValue);

	return (
		<VisualTabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div className={cn("w-full", className)}>{children}</div>
		</VisualTabsContext.Provider>
	);
}

export function VisualTabsList({ className, children }: VisualTabsListProps) {
	return (
		<div
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function VisualTabsTrigger({ value, className, children }: VisualTabsTriggerProps) {
	const context = React.useContext(VisualTabsContext);
	if (!context) {
		throw new Error("VisualTabsTrigger must be used within VisualTabs");
	}

	const { activeTab, setActiveTab } = context;
	const isActive = activeTab === value;

	return (
		<button
			type="button"
			onClick={() => setActiveTab(value)}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
				isActive && "bg-background text-foreground shadow-sm",
				className,
			)}
		>
			{children}
		</button>
	);
}

export function VisualTabsContent({ value, className, children }: VisualTabsContentProps) {
	const context = React.useContext(VisualTabsContext);
	if (!context) {
		throw new Error("VisualTabsContent must be used within VisualTabs");
	}

	const { activeTab } = context;
	const isActive = activeTab === value;

	return (
		<div
			className={cn(
				"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				!isActive && "hidden",
				className,
			)}
		>
			{children}
		</div>
	);
}
