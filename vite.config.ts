/// <reference types="vitest" />
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": resolve(dirname(fileURLToPath(import.meta.url)), "./src"),
        },
    },
    test: {
        include: ["**/*.{test,spec}.{ts,tsx}"],
    },
});
