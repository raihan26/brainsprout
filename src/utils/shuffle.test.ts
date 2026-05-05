import { describe, it, expect } from 'vitest';
import { sample, shuffle } from './shuffle';

describe('shuffle', () => {
  it('returns the same elements (regardless of order)', () => {
    const a = [1, 2, 3, 4, 5];
    const b = shuffle(a);
    expect(b.slice().sort()).toEqual(a.slice().sort());
    expect(b).toHaveLength(a.length);
  });

  it('does not mutate the input array', () => {
    const a = [1, 2, 3];
    const before = a.slice();
    shuffle(a);
    expect(a).toEqual(before);
  });
});

describe('sample', () => {
  it('returns at most n items', () => {
    expect(sample([1, 2, 3, 4], 2)).toHaveLength(2);
  });
  it('returns all items if n is bigger than the array', () => {
    expect(sample([1, 2], 5)).toHaveLength(2);
  });
  it('returns unique items from the source array', () => {
    const result = sample([1, 2, 3, 4, 5], 3);
    expect(new Set(result).size).toBe(3);
  });
});
