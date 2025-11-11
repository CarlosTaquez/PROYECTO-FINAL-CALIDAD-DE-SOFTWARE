// src/components/Sociales/__tests__/GloboTerraqueo.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GloboTerraqueo from "../GloboTerraqueo";

jest.mock("three", () => {
  const actual = jest.requireActual("three");
  return {
    ...actual,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      domElement: document.createElement("canvas"),
      render: jest.fn(),
      dispose: jest.fn(),
      shadowMap: {},
    })),
    TextureLoader: jest.fn().mockImplementation(() => ({
      load: jest.fn(() => ({})),
    })),
  };
});

jest.mock("three/examples/jsm/controls/OrbitControls", () => ({
  OrbitControls: jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    enableDamping: true,
    dispose: jest.fn(),
  })),
}));

test("muestra el título del globo", () => {
  render(<GloboTerraqueo />);
  expect(
    screen.getByText(/Globo Terráqueo Interactivo/i)
  ).toBeInTheDocument();
});

