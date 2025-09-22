"use client";

import { type ReactNode, useEffect, useState } from "react";
import SplashScreen from "src/components/splash-screen";

interface SplashScreenProviderProps {
	children: ReactNode;
}

/**
 * Client component that provides splash screen functionality
 * Handles splash screen display timing and scroll behavior after splash
 * @param children - The main content to display after splash screen
 */
export default function SplashScreenProvider({ children }: SplashScreenProviderProps) {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSplash(false);
		}, 3500); // Slightly longer to account for animations

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!showSplash && window.location.hash) {
			const hash = window.location.hash;
			setTimeout(() => {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}, 100); // Small delay to ensure page is rendered
		}
	}, [showSplash]);

	return (
		<>
			{showSplash && <SplashScreen />}
			{!showSplash && children}
		</>
	);
}
