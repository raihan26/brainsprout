import { useCallback, useEffect, useState } from 'react';
import type { ActivityAttemptEvent, GradeId, ProgressState } from '../types';
import {
  clearProgress,
  emptyState,
  loadProgress,
  recordCompletion,
  saveProgress,
} from '../utils/storage';
import {
  calcStars,
  generateId,
  loadProgress as loadV2,
  recordActivityAttempt,
  saveProgress as saveV2,
  clearProgress as clearV2,
} from '../utils/progress';

export function useProgress(grade: GradeId) {
  const [state, setState] = useState<ProgressState>(() => loadProgress(grade));

  useEffect(() => {
    setState(loadProgress(grade));
  }, [grade]);

  useEffect(() => {
    saveProgress(grade, state);
  }, [grade, state]);

  const record = useCallback((activityId: string, correct: number, total: number) => {
    setState((prev) => recordCompletion(prev, activityId, correct, total));

    // Also write to v2 progress for parent dashboard
    const worldId = activityId.split('.')[0] ?? 'unknown';
    const stars = calcStars(correct, total);
    const now = new Date().toISOString();
    const event: ActivityAttemptEvent = {
      id: generateId(),
      grade,
      worldId,
      activityId,
      skillIds: [],
      startedAt: now,
      completedAt: now,
      durationMs: 0,
      totalQuestions: total,
      correctAnswers: correct,
      incorrectAnswers: total - correct,
      speechUsed: false,
      starsEarned: stars,
    };
    const v2Progress = loadV2(grade);
    saveV2(grade, recordActivityAttempt(v2Progress, event));
  }, [grade]);

  const reset = useCallback(() => {
    clearProgress(grade);
    clearV2(grade);
    setState(emptyState());
  }, [grade]);

  return { state, record, reset };
}
