import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [question] = useState('5 + 3');
  const correctAnswer = 8;

  const handleSubmit = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
    }
  };

  return (
    <div>
      <h1>Juego de Matemáticas</h1>
      <p data-testid="question">{question}</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        data-testid="answer-input"
      />
      <button onClick={handleSubmit} data-testid="submit-btn">
        Verificar
      </button>
      <p data-testid="score">Puntuación: {score}</p>
    </div>
  );
};

describe('MathGame Component', () => {
  it('debe renderizar el juego correctamente', () => {
    render(<MathGame />);
    expect(screen.getByText('Juego de Matemáticas')).toBeInTheDocument();
    expect(screen.getByTestId('question')).toBeInTheDocument();
  });

  it('debe mostrar pregunta matemática', () => {
    render(<MathGame />);
    const question = screen.getByTestId('question');
    expect(question.textContent).toMatch(/[0-9]+\s[+\-×÷]\s[0-9]+/);
  });

  it('debe permitir ingresar respuesta', () => {
    render(<MathGame />);
    const input = screen.getByTestId('answer-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '8' } });
    expect(input.value).toBe('8');
  });

  it('debe tener botón de verificar', () => {
    render(<MathGame />);
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('debe mostrar puntuación inicial en 0', () => {
    render(<MathGame />);
    expect(screen.getByTestId('score')).toHaveTextContent('Puntuación: 0');
  });
});