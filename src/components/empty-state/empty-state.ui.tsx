"use client";

import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";

/**
 * EmptyState UI component for displaying when sections have no content
 * @param props - Component props
 */
export function EmptyStateCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"bg-card text-card-foreground rounded-lg shadow-sm border p-8",
				"flex flex-col items-center justify-center text-center",
				"min-h-[300px]",
				className,
			)}
		>
			{children}
		</div>
	);
}

/**
 * EmptyState icon component
 * @param props - Component props
 */
export function EmptyStateIcon({ children }: { children: React.ReactNode }) {
	return <div className="text-6xl mb-4">{children}</div>;
}

/**
 * EmptyState title component
 * @param props - Component props
 */
export function EmptyStateTitle({ children }: { children: React.ReactNode }) {
	return <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{children}</h3>;
}

/**
 * EmptyState description component
 * @param props - Component props
 */
export function EmptyStateDescription({ children }: { children: React.ReactNode }) {
	return <p className="text-muted-foreground mb-6 max-w-md">{children}</p>;
}

/**
 * EmptyState action button component
 * @param props - Component props
 */
export function EmptyStateAction({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Button onClick={onClick} variant="outline">
			{children}
		</Button>
	);
}
