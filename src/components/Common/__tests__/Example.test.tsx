import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const ExampleComponent = () => {
  return (
    <div>
      <h1>Bienvenido a Mentes Creativas</h1>
      <p>Sistema educativo interactivo</p>
      <button>Comenzar</button>
    </div>
  );
};

describe('ExampleComponent', () => {
  it('debe renderizar el título correctamente', () => {
    render(<ExampleComponent />);
    expect(screen.getByText('Bienvenido a Mentes Creativas')).toBeInTheDocument();
  });

  it('debe mostrar el texto descriptivo', () => {
    render(<ExampleComponent />);
    expect(screen.getByText('Sistema educativo interactivo')).toBeInTheDocument();
  });

  it('debe tener un botón de comenzar', () => {
    render(<ExampleComponent />);
    expect(screen.getByRole('button', { name: /comenzar/i })).toBeInTheDocument();
  });
});