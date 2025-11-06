import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const Button = ({ onClick, children, disabled = false }: any) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

describe('Button Component', () => {
  it('debe renderizar el botón con texto', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('debe llamar onClick cuando se hace click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe renderizar con diferentes textos', () => {
    const { rerender } = render(<Button>Texto 1</Button>);
    expect(screen.getByText('Texto 1')).toBeInTheDocument();

    rerender(<Button>Texto 2</Button>);
    expect(screen.getByText('Texto 2')).toBeInTheDocument();
  });

  it('debe estar deshabilitado cuando disabled es true', () => {
    render(<Button disabled={true}>Botón</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('debe estar habilitado por defecto', () => {
    render(<Button>Botón</Button>);
    expect(screen.getByRole('button')).toBeEnabled();
  });
});