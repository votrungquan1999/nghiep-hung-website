import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
		domains: [
			"lh3.googleusercontent.com",
			"lh4.googleusercontent.com",
			"lh5.googleusercontent.com",
			"lh6.googleusercontent.com",
		],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "100mb",
		},
		useCache: true,
		cacheComponents: true,
		cacheLife: {
			default: {
				stale: 300, // 5 minutes
				revalidate: process.env.CACHE_LIFE_REVALIDATE
					? Number.parseInt(process.env.CACHE_LIFE_REVALIDATE, 10)
					: 60 * 60 * 24, // 1 day default
				expire: process.env.CACHE_LIFE_EXPIRE
					? Number.parseInt(process.env.CACHE_LIFE_EXPIRE, 10)
					: 60 * 60 * 24 * 7, // 7 days default
			},
		},
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Referrer-Policy",
						value: "no-referrer-when-downgrade",
					},
				],
			},
		];
	},
};

export default nextConfig;
