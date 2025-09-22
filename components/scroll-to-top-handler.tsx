"use client";

import { useEffect } from "react";

/**
 * Client component that handles scroll to top functionality
 * Returns null and only applies the useEffect hook for scroll to top
 */
export default function ScrollToTopHandler() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}
