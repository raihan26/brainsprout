import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useProgress } from './useProgress';

describe('useProgress', () => {
  it('records a completion and updates total stars', () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.record('math.counting', 5, 5));
    expect(result.current.state.totalStars).toBe(3);
    expect(result.current.state.activities['math.counting'].stars).toBe(3);
    expect(result.current.state.lastActivityId).toBe('math.counting');
  });

  it('persists across hook instances via localStorage', () => {
    const first = renderHook(() => useProgress());
    act(() => first.result.current.record('reading.letters', 4, 5));
    const second = renderHook(() => useProgress());
    expect(second.result.current.state.activities['reading.letters'].stars).toBe(2);
  });

  it('reset clears progress', () => {
    const { result } = renderHook(() => useProgress());
    act(() => result.current.record('math.counting', 5, 5));
    act(() => result.current.reset());
    expect(result.current.state.totalStars).toBe(0);
    expect(result.current.state.activities).toEqual({});
  });
});
