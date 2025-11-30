import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		environment: "jsdom",
		setupFiles: ["./tests/setup.tsx"],
		include: ["tests/**/*.test.{ts,tsx}"],
		globals: true,
		env: {
			MONGODB_URI: "mongodb://localhost:27017",
			MONGODB_DBNAME: "nghiep-hung-website-test",
			AWS_S3_BUCKET_NAME: "test-bucket",
			AWS_REGION: "us-east-1",
		},
	},
});
