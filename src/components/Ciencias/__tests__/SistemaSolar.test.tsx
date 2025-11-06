import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

const planetas = ['Mercurio', 'Venus', 'Tierra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno'];

const SistemaSolar = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('');

  return (
    <div>
      <h1>Sistema Solar</h1>
      <div data-testid="planets-container">
        {planetas.map(planeta => (
          <button
            key={planeta}
            onClick={() => setSelectedPlanet(planeta)}
            data-testid={`planet-${planeta.toLowerCase()}`}
          >
            {planeta}
          </button>
        ))}
      </div>
      {selectedPlanet && (
        <div data-testid="planet-info">
          <h2>{selectedPlanet}</h2>
          <p>Información sobre {selectedPlanet}</p>
        </div>
      )}
    </div>
  );
};

describe('SistemaSolar Component', () => {
  it('debe renderizar el título', () => {
    render(<SistemaSolar />);
    expect(screen.getByText('Sistema Solar')).toBeInTheDocument();
  });

  it('debe renderizar todos los 8 planetas', () => {
    render(<SistemaSolar />);
    planetas.forEach(planeta => {
      expect(screen.getByText(planeta)).toBeInTheDocument();
    });
  });

  it('debe mostrar información al seleccionar un planeta', () => {
    render(<SistemaSolar />);
    const tierraBtn = screen.getByTestId('planet-tierra');

    fireEvent.click(tierraBtn);

    expect(screen.getByTestId('planet-info')).toBeInTheDocument();
  });

  it('debe renderizar contenedor de planetas', () => {
    render(<SistemaSolar />);
    expect(screen.getByTestId('planets-container')).toBeInTheDocument();
  });

  it('debe tener 8 botones de planetas', () => {
    render(<SistemaSolar />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(8);
  });
});