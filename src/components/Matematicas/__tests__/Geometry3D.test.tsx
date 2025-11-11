// src/components/Matematicas/__tests__/Geometry3D.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock THREE para evitar WebGL real
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

// Mock OrbitControls
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

import Geometry3D from "../Geometry3D";

describe("Geometry3D", () => {
  test("muestra el título y la figura inicial", () => {
    render(<Geometry3D />);

    expect(
      screen.getByText(/Explorador 3D de Figuras Geométricas/i)
    ).toBeInTheDocument();

    // Verificamos la figura inicial usando el heading de la tarjeta (no el botón)
    const figuraHeading = screen.getByRole("heading", { name: /Cubo/i });
    expect(figuraHeading).toBeInTheDocument();
  });

  test("cambia de figura al hacer clic en los botones", () => {
    render(<Geometry3D />);

    // Click en Esfera
    fireEvent.click(screen.getByRole("button", { name: /Esfera/i }));
    expect(
      screen.getByRole("heading", { name: /Esfera/i })
    ).toBeInTheDocument();

    // Click en Pirámide (base cuadrada)
    fireEvent.click(
      screen.getByRole("button", { name: /Pirámide \(base cuadrada\)/i })
    );
    expect(
      screen.getByRole("heading", { name: /Pirámide \(base cuadrada\)/i })
    ).toBeInTheDocument();
  });

  test("usa las flechas para navegar", () => {
    render(<Geometry3D />);

    const next = screen.getByRole("button", { name: /➡️/i });
    fireEvent.click(next);

    // Después de una flecha, la figura debería ser la siguiente: Esfera
    expect(
      screen.getByRole("heading", { name: /Esfera/i })
    ).toBeInTheDocument();
  });
});

