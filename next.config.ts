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
