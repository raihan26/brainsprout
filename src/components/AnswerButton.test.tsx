import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AnswerButton from './AnswerButton';

describe('AnswerButton', () => {
  it('renders children', () => {
    render(
      <AnswerButton onClick={() => {}} ariaLabel="test">
        Hello
      </AnswerButton>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(
      <AnswerButton onClick={onClick} ariaLabel="test">
        Click me
      </AnswerButton>,
    );
    fireEvent.click(screen.getByLabelText('test'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <AnswerButton onClick={onClick} ariaLabel="test" disabled>
        Click me
      </AnswerButton>,
    );
    fireEvent.click(screen.getByLabelText('test'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies correct ring class when state is correct', () => {
    const { container } = render(
      <AnswerButton onClick={() => {}} ariaLabel="test" state="correct">
        OK
      </AnswerButton>,
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('ring-emerald-400');
  });

  it('applies wrong ring class when state is wrong', () => {
    const { container } = render(
      <AnswerButton onClick={() => {}} ariaLabel="test" state="wrong">
        X
      </AnswerButton>,
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('ring-red-400');
  });
});
