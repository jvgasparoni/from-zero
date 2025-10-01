// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jest from "eslint-plugin-jest";
import globals from "globals";

// Converte "extends: ['next/core-web-vitals']" para Flat Config
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  // Ignorar gerados
  { ignores: [".next/**", "node_modules/**", "dist/**", "coverage/**"] },

  // Next.js (equivalente a "extends: ['next/core-web-vitals']")
  ...compat.config({
    extends: ["next/core-web-vitals"],
  }),

  // API routes (Node ESM) — logs permitidos
  {
    files: ["pages/api/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: { "no-console": "off" },
  },

  // Arquivos Node **CommonJS** (scripts, infra, configs)
  {
    files: [
      "**/*.config.js",
      "infra/**/*.js",
      "scripts/**/*.js",
      "jest.config.js",
      "next.config.js",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // CommonJS
      globals: { ...globals.node }, // require/module/exports/process/console
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // ✅ ESM específico do infra (ex.: infra/database.js usa "import")
  {
    files: ["infra/database.js", "infra/controller.js", "infra/**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },

  // ✅ Migrations (CJS) — tolerar parâmetro 'pgm' não usado
  {
    files: ["infra/migrations/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // CommonJS
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^(?:_|pgm)$" }],
    },
  },

  // Testes (Jest) dentro de tests/
  {
    ...jest.configs["flat/recommended"],
    files: [
      "tests/**/*.{test,spec}.{js,jsx}",
      "tests/**/__tests__/**/*.{js,jsx}",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      // 👇 AGORA os globals estão NO LUGAR CERTO
      globals: {
        ...globals.jest, // describe/it/expect
        ...globals.node, // process, __dirname etc.
        fetch: "readonly",
      },
    },
    settings: { jest: { version: 29 } },
  },

  // Avisar sobre // eslint-disable não usados
  { linterOptions: { reportUnusedDisableDirectives: "warn" } },

  // Prettier por último para desativar conflitos de formatação
  eslintConfigPrettier,
];

export default config;
