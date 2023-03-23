import { readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { join } from "node:path";

import type { Plugin } from "vite";

interface UserOptions {
  /** Do not mark these dependencies as external. */
  exclude?: string[];
}

const getDependencyRegexp = (dep: string) => `^${dep}(?:/.+)?$`;

const parseFile = (file: string) => {
  return JSON.parse(readFileSync(file).toString());
};

/**
 * Marks all dependencies, dev dependencies, peer dependencies,
 * and built-in node modules as external.
 */
export const externalizeDeps = (options: Partial<UserOptions> = {}): Plugin => {
  return {
    name: "vite-plugin-external",
    config: (_config, _env) => {
      const externalDeps = new Set<RegExp>();
      const {
        dependencies = {},
        devDependencies = {},
        optionalDependencies = {},
        peerDependencies = {},
      } = parseFile(join(process.cwd(), "package.json"));

      Object.keys(dependencies).forEach((dep) => {
        if (options.exclude?.includes(dep)) return;
        const depMatcher = new RegExp(getDependencyRegexp(dep));
        externalDeps.add(depMatcher);
      });

      Object.keys(devDependencies).forEach((dep) => {
        if (options.exclude?.includes(dep)) return;
        const depMatcher = new RegExp(getDependencyRegexp(dep));
        externalDeps.add(depMatcher);
      });

      Object.keys(optionalDependencies).forEach((dep) => {
        if (options.exclude?.includes(dep)) return;
        const depMatcher = new RegExp(getDependencyRegexp(dep));
        externalDeps.add(depMatcher);
      });

      Object.keys(peerDependencies).forEach((dep) => {
        if (options.exclude?.includes(dep)) return;
        const depMatcher = new RegExp(getDependencyRegexp(dep));
        externalDeps.add(depMatcher);
      });

      builtinModules.forEach((builtinModule) => {
        if (options.exclude?.includes(builtinModule)) return;
        const builtinMatcher = new RegExp(`^(?:node:)?${builtinModule}$`);
        externalDeps.add(builtinMatcher);
      });

      return {
        build: {
          rollupOptions: {
            external: Array.from(externalDeps),
          },
        },
      };
    },
  };
};
