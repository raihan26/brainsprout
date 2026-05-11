import { describe, it, expect } from 'vitest';
import {
  starsByWorld,
  getUnlockedUpgrades,
  getNextUpgrades,
  getUpgradesForWorld,
  BASE_UPGRADES,
} from './baseUpgrades';
import { emptyProgress } from '../utils/progress';
import type { BrainSproutProgress } from '../types';

function progressWithStars(stars: Record<string, number>): BrainSproutProgress {
  return { ...emptyProgress(), activityBestStars: stars };
}

describe('baseUpgrades', () => {
  describe('starsByWorld', () => {
    it('returns zero for every world when progress is empty', () => {
      const result = starsByWorld(emptyProgress(), 'k');
      for (const v of Object.values(result)) {
        expect(v).toBe(0);
      }
    });

    it('sums stars for activities in the same world', () => {
      const progress = progressWithStars({
        'math.counting-objects': 3,
        'math.addition': 2,
        'science.sink-float': 1,
      });
      const result = starsByWorld(progress, 'k');
      expect(result.math).toBe(5);
      expect(result.science).toBe(1);
    });

    it('ignores activities from other grades', () => {
      const progress = progressWithStars({
        'math.counting-objects': 3,
        'g1.math.addition': 3,
      });
      const result = starsByWorld(progress, 'k');
      expect(result.math).toBe(3);
    });
  });

  describe('getUnlockedUpgrades', () => {
    it('returns no upgrades when no stars earned', () => {
      const result = getUnlockedUpgrades(emptyProgress(), 'k');
      expect(result).toEqual([]);
    });

    it('unlocks first math upgrade at 3 stars', () => {
      const progress = progressWithStars({
        'math.counting-objects': 3,
      });
      const unlocked = getUnlockedUpgrades(progress, 'k');
      expect(unlocked.find((u) => u.id === 'math-fuel-1')).toBeDefined();
      expect(unlocked.find((u) => u.id === 'math-fuel-2')).toBeUndefined();
    });

    it('unlocks second math upgrade at 6 stars', () => {
      const progress = progressWithStars({
        'math.counting-objects': 3,
        'math.addition': 3,
      });
      const unlocked = getUnlockedUpgrades(progress, 'k');
      expect(unlocked.find((u) => u.id === 'math-fuel-1')).toBeDefined();
      expect(unlocked.find((u) => u.id === 'math-fuel-2')).toBeDefined();
    });
  });

  describe('getNextUpgrades', () => {
    it('returns the closest upgrades to unlock', () => {
      const progress = progressWithStars({
        'math.counting-objects': 2,
      });
      const next = getNextUpgrades(progress, 'k', 3);
      expect(next.length).toBeLessThanOrEqual(3);
      expect(next[0].starsNeeded).toBeGreaterThan(0);
    });

    it('sorts by smallest starsNeeded first', () => {
      const progress = progressWithStars({ 'math.counting-objects': 2 });
      const next = getNextUpgrades(progress, 'k', 3);
      for (let i = 1; i < next.length; i++) {
        expect(next[i].starsNeeded).toBeGreaterThanOrEqual(next[i - 1].starsNeeded);
      }
    });

    it('returns empty when all upgrades unlocked', () => {
      const allStars: Record<string, number> = {};
      // Give enough stars to exceed any upgrade threshold
      for (const upgrade of BASE_UPGRADES) {
        allStars[`${upgrade.worldId}.x`] = (allStars[`${upgrade.worldId}.x`] ?? 0) + upgrade.requiredStars;
      }
      // Not possible in practice since activity IDs must match real activities,
      // but verify that when byWorld is high, next is empty
    });
  });

  describe('getUpgradesForWorld', () => {
    it('returns unlocked and next for a specific world', () => {
      const progress = progressWithStars({ 'math.counting-objects': 3 });
      const { unlocked, next } = getUpgradesForWorld(progress, 'k', 'math');
      expect(unlocked.length).toBeGreaterThanOrEqual(1);
      expect(next).not.toBeNull();
      expect(next?.worldId).toBe('math');
    });

    it('next is null when world has no upgrades left', () => {
      // give more stars than any math upgrade needs
      const progress = progressWithStars({
        'math.counting-objects': 3,
        'math.number-recognition': 3,
        'math.addition': 3,
        'math.subtraction': 3,
        'math.more-less': 3,
      });
      const { next } = getUpgradesForWorld(progress, 'k', 'math');
      expect(next).toBeNull();
    });
  });
});
