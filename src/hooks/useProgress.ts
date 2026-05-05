import { useCallback, useEffect, useState } from 'react';
import type { ProgressState } from '../types';
import {
  clearProgress,
  emptyState,
  loadProgress,
  recordCompletion,
  saveProgress,
} from '../utils/storage';

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const record = useCallback((activityId: string, correct: number, total: number) => {
    setState((prev) => recordCompletion(prev, activityId, correct, total));
  }, []);

  const reset = useCallback(() => {
    clearProgress();
    setState(emptyState());
  }, []);

  return { state, record, reset };
}
