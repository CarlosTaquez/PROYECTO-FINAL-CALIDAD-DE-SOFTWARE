import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

const Patrones = () => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const pattern = [2, 4, 6, 8, '?'];

  return (
    <div>
      <h1>Patrones Numéricos</h1>
      <div data-testid="pattern">
        {pattern.join(', ')}
      </div>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        data-testid="pattern-input"
        placeholder="¿Qué número sigue?"
      />
      <button onClick={() => setShowHint(true)} data-testid="hint-btn">
        Mostrar Pista
      </button>
      {showHint && (
        <p data-testid="hint">Pista: El patrón aumenta de 2 en 2</p>
      )}
      <button data-testid="verify-btn">Verificar</button>
    </div>
  );
};

describe('Patrones Component', () => {
  it('debe renderizar el título', () => {
    render(<Patrones />);
    expect(screen.getByText('Patrones Numéricos')).toBeInTheDocument();
  });

  it('debe mostrar el patrón numérico', () => {
    render(<Patrones />);
    const pattern = screen.getByTestId('pattern');
    expect(pattern.textContent).toMatch(/[0-9, ?]+/);
  });

  it('debe tener botón de pista', () => {
    render(<Patrones />);
    expect(screen.getByTestId('hint-btn')).toBeInTheDocument();
  });

  it('debe mostrar pista cuando se solicita', () => {
    render(<Patrones />);
    const hintBtn = screen.getByTestId('hint-btn');

    fireEvent.click(hintBtn);

    expect(screen.getByTestId('hint')).toBeInTheDocument();
  });

  it('debe tener botón de verificar', () => {
    render(<Patrones />);
    expect(screen.getByTestId('verify-btn')).toBeInTheDocument();
  });

  it('debe tener placeholder en input', () => {
    render(<Patrones />);
    const input = screen.getByTestId('pattern-input');
    expect(input).toHaveAttribute('placeholder');
  });
});