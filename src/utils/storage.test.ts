import { describe, it, expect } from 'vitest';
import {
  calcStars,
  emptyState,
  loadProgress,
  recordCompletion,
  saveProgress,
  clearProgress,
} from './storage';

describe('calcStars', () => {
  it('returns 0 when total is 0', () => {
    expect(calcStars(0, 0)).toBe(0);
  });
  it('returns 3 stars for 100% accuracy', () => {
    expect(calcStars(5, 5)).toBe(3);
  });
  it('returns 2 stars for 75% accuracy', () => {
    expect(calcStars(3, 4)).toBe(2);
  });
  it('returns 1 star for 50% accuracy', () => {
    expect(calcStars(2, 4)).toBe(1);
  });
  it('returns 0 stars below 50%', () => {
    expect(calcStars(1, 4)).toBe(0);
  });
});

describe('recordCompletion', () => {
  it('creates a new entry on first play', () => {
    const next = recordCompletion(emptyState(), 'math.counting', 4, 5);
    expect(next.activities['math.counting'].plays).toBe(1);
    expect(next.activities['math.counting'].stars).toBe(2);
    expect(next.totalStars).toBe(2);
    expect(next.lastActivityId).toBe('math.counting');
  });

  it('keeps the best stars across plays', () => {
    let s = emptyState();
    s = recordCompletion(s, 'math.counting', 5, 5); // 3 stars
    s = recordCompletion(s, 'math.counting', 1, 5); // 0 stars
    expect(s.activities['math.counting'].stars).toBe(3);
    expect(s.activities['math.counting'].plays).toBe(2);
    expect(s.totalStars).toBe(3);
  });

  it('accumulates totalStars across activities', () => {
    let s = emptyState();
    s = recordCompletion(s, 'math.counting', 5, 5);
    s = recordCompletion(s, 'reading.letters', 4, 5);
    expect(s.totalStars).toBe(5);
  });
});

describe('storage round-trip', () => {
  it('saves and loads progress via localStorage', () => {
    const s = recordCompletion(emptyState(), 'math.counting', 5, 5);
    saveProgress('k', s);
    const loaded = loadProgress('k');
    expect(loaded.totalStars).toBe(3);
    expect(loaded.activities['math.counting']?.stars).toBe(3);
  });

  it('returns empty state when nothing saved', () => {
    clearProgress('k');
    expect(loadProgress('k')).toEqual(emptyState());
  });

  it('falls back to empty state on corrupt data', () => {
    window.localStorage.setItem('brainsprout:progress:k:v1', '{not json');
    expect(loadProgress('k')).toEqual(emptyState());
  });

  it('isolates progress by grade', () => {
    const s = recordCompletion(emptyState(), 'math.counting', 5, 5);
    saveProgress('k', s);
    expect(loadProgress('1')).toEqual(emptyState());
  });
});
