export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Configuración de archivos de setup
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Mapeo de módulos (CSS, imágenes, etc.)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  // Transformación de archivos TypeScript
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        jsx: "react-jsx"
      }
    }],
  },

  // Extensiones a tratar como ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Archivos a incluir en cobertura
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],

  // Umbrales de cobertura (mínimos requeridos)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Patrones de archivos de prueba
  testMatch: [
    "**/__tests__/**/*.{ts,tsx}",
    "**/*.{spec,test}.{ts,tsx}",
  ],

  // Ignorar estas carpetas al buscar tests
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
  ],
};