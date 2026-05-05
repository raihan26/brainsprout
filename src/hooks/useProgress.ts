import { useCallback, useEffect, useState } from 'react';
import type { GradeId, ProgressState } from '../types';
import {
  clearProgress,
  emptyState,
  loadProgress,
  recordCompletion,
  saveProgress,
} from '../utils/storage';

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
  }, []);

  const reset = useCallback(() => {
    clearProgress(grade);
    setState(emptyState());
  }, [grade]);

  return { state, record, reset };
}
