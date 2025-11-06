import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const Navigation = () => {
  return (
    <nav data-testid="main-nav">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/matematicas">Matemáticas</a></li>
        <li><a href="/ciencias">Ciencias</a></li>
        <li><a href="/logica">Lógica</a></li>
      </ul>
    </nav>
  );
};

describe('Navigation Component', () => {
  it('debe renderizar el menú de navegación', () => {
    render(<Navigation />);
    expect(screen.getByTestId('main-nav')).toBeInTheDocument();
  });

  it('debe tener enlace a Inicio', () => {
    render(<Navigation />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });

  it('debe tener enlace a Matemáticas', () => {
    render(<Navigation />);
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();
  });

  it('debe tener enlace a Ciencias', () => {
    render(<Navigation />);
    expect(screen.getByText('Ciencias')).toBeInTheDocument();
  });

  it('debe tener enlace a Lógica', () => {
    render(<Navigation />);
    expect(screen.getByText('Lógica')).toBeInTheDocument();
  });

  it('debe tener 4 enlaces en total', () => {
    render(<Navigation />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });
});