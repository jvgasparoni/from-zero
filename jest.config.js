const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "." });

/** @type {import('jest').Config} */
module.exports = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
  // carrega .env.test num setup separado
  setupFiles: ["<rootDir>/tests/jest.setup-env.js"],
});
