import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths({ projects: [".", "../../lib"] })],
  envPrefix: "AIRPLANE_",
  resolve: {
    alias: {
      // Support importing @airplane/views from the local yarn workspace.
      "@airplane/views/icons": "@airplane/views/src/components/icon/index.ts",
      "@airplane/views": "@airplane/views/src/index.ts",
    },
  },
  base: "",
  build: {
    assetsDir: "",
  },
});
