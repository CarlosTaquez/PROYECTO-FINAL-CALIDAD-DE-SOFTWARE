export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        jsx: "react-jsx"
      }
    }],
  },

  extensionsToTreatAsEsm: [".ts", ".tsx"],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  testMatch: [
    "**/__tests__/**/*.{ts,tsx}",
    "**/*.{spec,test}.{ts,tsx}",
  ],

  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};