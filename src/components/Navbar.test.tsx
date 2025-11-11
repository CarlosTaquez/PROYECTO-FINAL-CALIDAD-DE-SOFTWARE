// src/components/Navbar.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'Proyecto Final - Calidad de Software'", () => {
    render(<Navbar />);
    expect(
      screen.getByText(/Proyecto Final - Calidad de Software/i)
    ).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Modo oscuro'", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("button", { name: /Modo oscuro/i })
    ).toBeInTheDocument();
  });
});



