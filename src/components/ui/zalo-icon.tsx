import { cn } from "src/lib/utils";

interface ZaloIconProps {
	className?: string;
}

/**
 * Custom Zalo icon component
 * Zalo is a popular messaging app in Vietnam
 */
export function Zalo({ className }: ZaloIconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-4", className)}>
			<title>Zalo</title>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm3.5-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-7-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm3.5-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" />
		</svg>
	);
}
