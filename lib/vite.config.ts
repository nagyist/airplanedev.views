import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { replaceCodePlugin } from "vite-plugin-replace";
import tsconfigPaths from "vite-tsconfig-paths";

import { externalizeDeps } from "./scripts/external-plugin";

export default defineConfig({
  plugins: [
    externalizeDeps({
      exclude: [
        // React plotly doesn't have a proper ESM build, so we bundle it in.
        "react-plotly.js",
      ],
    }),
    react({
      babel: {
        plugins: ["@babel/plugin-transform-react-pure-annotations"],
      },
    }),
    tsconfigPaths(),
    visualizer(),
    replaceCodePlugin({
      replacements: [
        // Import icons from the separately built package so
        // they aren't bundled a second time with the main application.
        {
          from: "components/icon",
          to: `@airplane/views/icons/index.js`,
        },
      ],
    }),
  ],
  define: {
    __VIEWS_LIB_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@airplane/views",
      formats: ["es"],
      fileName: (_, entryName) => {
        let name = entryName;
        if (entryName.startsWith("node_modules/")) {
          name = entryName.replace(/^node_modules\//, "externals/");
        }
        return `${name}.js`;
      },
    },
    rollupOptions: {
      external: [
        "@airplane/views/icons/index.js",
        "@lezer/highlight",
        "@codemirror/view",
        "@codemirror/state",
        "prop-types",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        preserveModules: true,
        // This removes `/lib/src/` from the path in `entryName`.
        preserveModulesRoot: "src",
      },
      makeAbsoluteExternalsRelative: true,
    },
    sourcemap: true,
    minify: false,
  },
});
