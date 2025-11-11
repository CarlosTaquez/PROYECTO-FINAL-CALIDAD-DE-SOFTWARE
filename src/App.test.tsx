// src/App.test.tsx
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

// Mock global de THREE para evitar errores de WebGL en tests
jest.mock("three", () => {
  const actual = jest.requireActual("three");
  return {
    ...actual,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      render: jest.fn(),
      domElement: document.createElement("canvas"),
      dispose: jest.fn(),
      shadowMap: {},
    })),
  };
});

// Mock global de OrbitControls (evita error ESM en Jest)
jest.mock("three/examples/jsm/controls/OrbitControls", () => ({
  OrbitControls: jest.fn().mockImplementation(() => ({
    enableDamping: true,
    dampingFactor: 0.08,
    minDistance: 3,
    maxDistance: 8,
    target: { set: jest.fn() },
    update: jest.fn(),
  })),
}));

import App from "./App";

test("App se renderiza sin crashear", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
