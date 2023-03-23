import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { replaceCodePlugin } from "vite-plugin-replace";

import { externalizeDeps } from "./scripts/external-plugin";

export default defineConfig({
  plugins: [
    externalizeDeps(),
    react({
      babel: {
        plugins: ["@babel/plugin-transform-react-pure-annotations"],
      },
    }),
    replaceCodePlugin({
      replacements: [
        {
          // Import from dist so that the theme is not bundled with the icons.
          from: "components/theme/theme",
          to: "@airplane/views",
        },
      ],
    }),
  ],
  build: {
    emptyOutDir: false,
    outDir: "icons",
    lib: {
      entry: resolve(__dirname, "src/components/icon/index.ts"),
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["@airplane/views"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        preserveModules: true,
      },
    },
    sourcemap: true,
    minify: false,
  },
});
