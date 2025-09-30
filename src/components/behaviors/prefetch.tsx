"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Prefetch({ url }: { url: string }) {
	const router = useRouter();

	useEffect(() => {
		router.prefetch(url);
	}, [router, url]);

	return null;
}
