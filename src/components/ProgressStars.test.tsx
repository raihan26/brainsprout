import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressStars from './ProgressStars';

describe('ProgressStars', () => {
  it('renders an aria-label that reflects the value', () => {
    render(<ProgressStars value={2} max={3} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '2 out of 3 stars');
  });

  it('respects max', () => {
    render(<ProgressStars value={1} max={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '1 out of 5 stars');
  });
});
