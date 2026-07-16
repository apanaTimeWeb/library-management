import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tailwindcss: tailwind
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "tailwindcss/no-arbitrary-value": "error",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/display-name": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },
  {
    files: ["src/components/ui/**/*.tsx", "src/components/ui/**/*.ts"],
    rules: {
      "tailwindcss/no-arbitrary-value": "off"
    }
  },
  {
    files: ["src/app/admin/**/*.ts", "src/app/admin/**/*.tsx"],
    rules: {
      "no-restricted-imports": ["error", { patterns: ["@/app/manager/*", "../**", "./**"] }]
    }
  },
  {
    files: ["src/app/manager/**/*.ts", "src/app/manager/**/*.tsx"],
    rules: {
      "no-restricted-imports": ["error", { patterns: ["@/app/admin/*", "../**", "./**"] }]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
