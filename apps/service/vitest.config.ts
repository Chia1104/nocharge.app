import { defineConfig } from "vitest/config";

const resolve = (path: string) => new URL(path, import.meta.url).pathname;

export default defineConfig({
  test: {
    globals: true,
    include: [
      "src/**/*.{spec,test}.{ts,tsx}",
      "__tests__/**/*.{spec,test}.{ts,tsx}",
    ],
    exclude: ["**/node_modules/**"],
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
