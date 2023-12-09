import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  esbuild: {
    tsconfigRaw: "{}",
  },
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ["./setupFiles.ts"],
    include: ["tests/**/*.test.ts"],
  },
});
