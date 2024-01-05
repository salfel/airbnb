import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
	server: {
		hmr: {
			host: "0.0.0.0"
		}
	},
	plugins: [
		laravel({
			input: "resources/js/app.tsx",
			ssr: "resources/js/ssr.tsx",
			refresh: true
		}),
		react()
	]
});
