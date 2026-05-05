import type { ProgressEntry, ProgressState } from '../types';

const KEY = 'kinder-learn:progress:v1';

export const emptyState = (): ProgressState => ({
  activities: {},
  totalStars: 0,
  lastActivityId: null,
});

export function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || typeof parsed !== 'object' || !parsed.activities) return emptyState();
    return parsed;
  } catch {
    return emptyState();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function clearProgress(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/** Stars are based on accuracy: 5/5 → 3, 4/5 → 2, 3/5 → 1, less → 0. Generalized to ratio. */
export function calcStars(correct: number, total: number): number {
  if (total <= 0) return 0;
  const ratio = correct / total;
  if (ratio >= 0.95) return 3;
  if (ratio >= 0.75) return 2;
  if (ratio >= 0.5) return 1;
  return 0;
}

export function recordCompletion(
  state: ProgressState,
  activityId: string,
  correct: number,
  total: number,
): ProgressState {
  const existing: ProgressEntry = state.activities[activityId] ?? {
    stars: 0,
    plays: 0,
    bestScore: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    lastPlayedAt: 0,
  };
  const stars = calcStars(correct, total);
  const next: ProgressEntry = {
    stars: Math.max(existing.stars, stars),
    plays: existing.plays + 1,
    bestScore: Math.max(existing.bestScore, correct),
    totalQuestions: existing.totalQuestions + total,
    totalCorrect: existing.totalCorrect + correct,
    lastPlayedAt: Date.now(),
  };
  const prevStars = existing.stars;
  const starDelta = Math.max(0, next.stars - prevStars);
  return {
    activities: { ...state.activities, [activityId]: next },
    totalStars: state.totalStars + starDelta,
    lastActivityId: activityId,
  };
}
