module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "no-only-tests"],
  rules: {
    "prettier/prettier": "error",
    // Use TypeScript types instead
    "react/prop-types": "off",
    // OK with unescaped entities
    "react/no-unescaped-entities": "off",
    "object-shorthand": ["error", "always"],
    // Upgrade this from warning to error
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "none",
        ignoreRestSiblings: false,
      },
    ],
    // Allow usage of @ts-ignore
    "@typescript-eslint/ban-ts-comment": "off",
    // OK with implicit function return types
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-console": [
      "error",
      {
        allow: ["error"],
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-only-tests/no-only-tests": ["error"],
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-boolean-value": "error",
    "no-restricted-imports": ["error", "assert"],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
