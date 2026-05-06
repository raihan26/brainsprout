import { useCallback, useEffect, useState } from 'react';
import type { ActivityAttemptEvent, BrainSproutProgress, GradeId, QuestionAttemptEvent } from '../types';
import {
  clearProgress,
  emptyProgress,
  loadProgress,
  recordActivityAttempt,
  recordQuestionAttempt,
  saveProgress,
} from '../utils/progress';

export function useProgressV2(grade: GradeId) {
  const [progress, setProgress] = useState<BrainSproutProgress>(() => loadProgress(grade));

  useEffect(() => {
    setProgress(loadProgress(grade));
  }, [grade]);

  useEffect(() => {
    saveProgress(grade, progress);
  }, [grade, progress]);

  const recordActivity = useCallback((event: ActivityAttemptEvent) => {
    setProgress((prev) => recordActivityAttempt(prev, event));
  }, []);

  const recordQuestion = useCallback((event: QuestionAttemptEvent) => {
    setProgress((prev) => recordQuestionAttempt(prev, event));
  }, []);

  const reset = useCallback(() => {
    clearProgress(grade);
    setProgress(emptyProgress());
  }, [grade]);

  return { progress, recordActivity, recordQuestion, reset };
}
