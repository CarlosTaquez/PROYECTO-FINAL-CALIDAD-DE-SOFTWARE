// src/components/Ciencias/__tests__/CicloAgua.test.tsx
// src/components/Ciencias/__tests__/CicloAgua.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock suave de THREE: solo WebGLRenderer
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

// Mock de OrbitControls
jest.mock("three/examples/jsm/controls/OrbitControls", () => ({
  OrbitControls: jest.fn().mockImplementation(() => ({
    enableDamping: true,
    dampingFactor: 0.08,
    minDistance: 0,
    maxDistance: 0,
    maxPolarAngle: Math.PI / 2,
    update: jest.fn(),
  })),
}));

import CicloAgua from "../CicloAgua";

describe("CicloAgua", () => {
  test("muestra el título y la descripción inicial de evaporación", () => {
    render(<CicloAgua />);

    expect(
      screen.getByText(/Ciclo del Agua 3D Interactivo/i)
    ).toBeInTheDocument();

    // Descripción inicial (fase evaporación)
    expect(
      screen.getByText(
        /El Sol calienta el agua del océano o lago\. Parte del agua se transforma en vapor y sube hacia el cielo\./i
      )
    ).toBeInTheDocument();
  });

  test("cambia la descripción al seleccionar cada fase", () => {
    render(<CicloAgua />);

    fireEvent.click(screen.getByRole("button", { name: /Condensación/i }));
    expect(
      screen.getByText(/El vapor de agua se enfría en la atmósfera/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Precipitación/i }));
    expect(
      screen.getByText(/Las nubes muy cargadas dejan caer el agua en forma de lluvia/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Escorrentía/i }));
    expect(
      screen.getByText(/El agua de lluvia baja por riachuelos y ríos/i)
    ).toBeInTheDocument();
  });
});
