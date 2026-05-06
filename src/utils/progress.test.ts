import { describe, it, expect, beforeEach } from 'vitest';
import {
  emptyProgress,
  calcStars,
  recordActivityAttempt,
  recordQuestionAttempt,
  getCurrentWeekRange,
  getWeeklySummary,
  getWorldProgress,
  getSkillInsights,
  getRecommendedActivities,
  loadProgress,
  saveProgress,
  clearProgress,
  formatDuration,
} from './progress';
import type { ActivityAttemptEvent, ActivityMeta, BrainSproutProgress, QuestionAttemptEvent } from '../types';

function makeActivityAttempt(overrides: Partial<ActivityAttemptEvent> = {}): ActivityAttemptEvent {
  return {
    id: `test-${Date.now()}-${Math.random()}`,
    grade: 'k',
    worldId: 'math',
    activityId: 'math.counting',
    skillIds: ['counting'],
    startedAt: '2026-05-05T10:00:00.000Z',
    completedAt: '2026-05-05T10:03:00.000Z',
    durationMs: 180000,
    totalQuestions: 6,
    correctAnswers: 5,
    incorrectAnswers: 1,
    speechUsed: false,
    starsEarned: 2,
    ...overrides,
  };
}

function makeQuestionAttempt(overrides: Partial<QuestionAttemptEvent> = {}): QuestionAttemptEvent {
  return {
    id: `q-${Date.now()}-${Math.random()}`,
    grade: 'k',
    worldId: 'math',
    activityId: 'math.counting',
    questionId: 'q1',
    skillIds: ['counting'],
    answeredAt: '2026-05-05T10:01:00.000Z',
    selectedAnswer: '3',
    correctAnswer: '3',
    isCorrect: true,
    attemptNumber: 1,
    ...overrides,
  };
}

const SAMPLE_ACTIVITIES: ActivityMeta[] = [
  { id: 'math.counting', grade: 'k', section: 'math', title: 'Counting', emoji: '🍎', description: 'Count objects', path: '/math/counting', skillIds: ['counting'] },
  { id: 'math.addition', grade: 'k', section: 'math', title: 'Addition', emoji: '➕', description: 'Add numbers', path: '/math/addition', skillIds: ['addition-within-5'] },
  { id: 'reading.letters', grade: 'k', section: 'reading', title: 'Letters', emoji: '🔤', description: 'Match letters', path: '/reading/letters', skillIds: ['uppercase-letters'] },
  { id: 'reading.sounds', grade: 'k', section: 'reading', title: 'Sounds', emoji: '🔠', description: 'Beginning sounds', path: '/reading/sounds', skillIds: ['beginning-sounds'] },
  { id: 'science.weather', grade: 'k', section: 'science', title: 'Weather', emoji: '☀️', description: 'Weather game', path: '/science/weather', skillIds: ['weather'] },
];

describe('calcStars', () => {
  it('returns 0 when total is 0', () => {
    expect(calcStars(0, 0)).toBe(0);
  });
  it('returns 3 stars for 100% accuracy', () => {
    expect(calcStars(6, 6)).toBe(3);
  });
  it('returns 3 stars for 85% accuracy', () => {
    expect(calcStars(6, 7)).toBe(3);
  });
  it('returns 2 stars for 60-84% accuracy', () => {
    expect(calcStars(4, 6)).toBe(2);
  });
  it('returns 1 star for low accuracy', () => {
    expect(calcStars(2, 6)).toBe(1);
  });
  it('returns 0 for no correct answers', () => {
    expect(calcStars(0, 6)).toBe(0);
  });
});

describe('recordActivityAttempt', () => {
  it('creates first attempt correctly', () => {
    const progress = emptyProgress();
    const event = makeActivityAttempt({ starsEarned: 2 });
    const result = recordActivityAttempt(progress, event);

    expect(result.activityAttempts).toHaveLength(1);
    expect(result.activityBestStars['math.counting']).toBe(2);
    expect(result.totalStars).toBe(2);
    expect(result.lastActivityId).toBe('math.counting');
  });

  it('keeps best stars across multiple attempts', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 3 }));
    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 1 }));

    expect(progress.activityBestStars['math.counting']).toBe(3);
    expect(progress.totalStars).toBe(3);
  });

  it('increments totalStars only on improvement', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 2 }));
    expect(progress.totalStars).toBe(2);

    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 1 }));
    expect(progress.totalStars).toBe(2);

    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 3 }));
    expect(progress.totalStars).toBe(3);
  });

  it('accumulates stars across different activities', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({ activityId: 'math.counting', starsEarned: 3 }));
    progress = recordActivityAttempt(progress, makeActivityAttempt({ activityId: 'math.addition', starsEarned: 2 }));

    expect(progress.totalStars).toBe(5);
  });

  it('tracks best accuracy', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({ correctAnswers: 4, totalQuestions: 6 }));
    progress = recordActivityAttempt(progress, makeActivityAttempt({ correctAnswers: 6, totalQuestions: 6 }));

    expect(progress.activityBestAccuracy['math.counting']).toBeCloseTo(1.0);
  });
});

describe('recordQuestionAttempt', () => {
  it('adds question attempt to array', () => {
    const progress = emptyProgress();
    const event = makeQuestionAttempt();
    const result = recordQuestionAttempt(progress, event);
    expect(result.questionAttempts).toHaveLength(1);
    expect(result.questionAttempts[0].isCorrect).toBe(true);
  });
});

describe('getCurrentWeekRange', () => {
  it('returns Monday-Sunday range', () => {
    const wed = new Date('2026-05-06T12:00:00'); // Wednesday
    const { start, end } = getCurrentWeekRange(wed);
    expect(start.getDay()).toBe(1); // Monday
    expect(end.getDay()).toBe(0); // Sunday
    expect(start.getDate()).toBe(4); // May 4
    expect(end.getDate()).toBe(10); // May 10
  });

  it('handles Monday correctly', () => {
    const mon = new Date('2026-05-04T12:00:00');
    const { start } = getCurrentWeekRange(mon);
    expect(start.getDate()).toBe(4);
  });

  it('handles Sunday correctly', () => {
    const sun = new Date('2026-05-10T12:00:00');
    const { start, end } = getCurrentWeekRange(sun);
    expect(start.getDate()).toBe(4);
    expect(end.getDate()).toBe(10);
  });
});

describe('getWeeklySummary', () => {
  const weekStart = new Date('2026-05-04T00:00:00.000Z');

  it('returns empty summary with no data', () => {
    const progress = emptyProgress();
    const summary = getWeeklySummary(progress, 'k', weekStart);

    expect(summary.activitiesCompleted).toBe(0);
    expect(summary.questionsAnswered).toBe(0);
    expect(summary.accuracy).toBe(0);
    expect(summary.starsEarned).toBe(0);
    expect(summary.activeDays).toBe(0);
    expect(summary.bestWorld).toBeNull();
  });

  it('calculates weekly metrics correctly', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      completedAt: '2026-05-05T10:00:00.000Z',
      durationMs: 180000,
      starsEarned: 3,
      totalQuestions: 6,
      correctAnswers: 6,
    }));
    progress = recordQuestionAttempt(progress, makeQuestionAttempt({
      answeredAt: '2026-05-05T10:01:00.000Z',
      isCorrect: true,
    }));
    progress = recordQuestionAttempt(progress, makeQuestionAttempt({
      answeredAt: '2026-05-05T10:02:00.000Z',
      isCorrect: false,
    }));

    const summary = getWeeklySummary(progress, 'k', weekStart);
    expect(summary.activitiesCompleted).toBe(1);
    expect(summary.questionsAnswered).toBe(2);
    expect(summary.accuracy).toBe(0.5);
    expect(summary.starsEarned).toBe(3);
    expect(summary.totalTimeMs).toBe(180000);
    expect(summary.activeDays).toBe(1);
    expect(summary.bestWorld).toBe('math');
  });

  it('excludes attempts outside the week', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      completedAt: '2026-04-28T10:00:00.000Z', // Previous week
      starsEarned: 3,
    }));
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      completedAt: '2026-05-12T10:00:00.000Z', // Next week
      starsEarned: 2,
    }));

    const summary = getWeeklySummary(progress, 'k', weekStart);
    expect(summary.activitiesCompleted).toBe(0);
  });

  it('counts active days correctly', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      completedAt: '2026-05-05T10:00:00.000Z',
    }));
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      completedAt: '2026-05-05T15:00:00.000Z',
    }));
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      completedAt: '2026-05-07T10:00:00.000Z',
    }));

    const summary = getWeeklySummary(progress, 'k', weekStart);
    expect(summary.activeDays).toBe(2);
  });

  it('filters by grade', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      grade: '1',
      completedAt: '2026-05-05T10:00:00.000Z',
      starsEarned: 3,
    }));

    const summary = getWeeklySummary(progress, 'k', weekStart);
    expect(summary.activitiesCompleted).toBe(0);
  });
});

describe('getWorldProgress', () => {
  it('returns progress for all worlds', () => {
    const progress = emptyProgress();
    const result = getWorldProgress(progress, 'k', SAMPLE_ACTIVITIES);

    expect(result.length).toBe(3); // math, reading, science
    expect(result[0].completedActivities).toBe(0);
  });

  it('tracks completed activities per world', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      activityId: 'math.counting',
      worldId: 'math',
      starsEarned: 3,
    }));

    const result = getWorldProgress(progress, 'k', SAMPLE_ACTIVITIES);
    const math = result.find((w) => w.worldId === 'math');
    expect(math?.completedActivities).toBe(1);
    expect(math?.totalActivities).toBe(2);
    expect(math?.starsEarned).toBe(3);
    expect(math?.maxStars).toBe(6);
  });
});

describe('getSkillInsights', () => {
  const labels: Record<string, string> = {
    counting: 'Counting',
    'beginning-sounds': 'Beginning Sounds',
  };

  it('returns empty for no data', () => {
    const progress = emptyProgress();
    const insights = getSkillInsights(progress, 'k', labels);
    expect(insights).toHaveLength(0);
  });

  it('marks skill as strong when accuracy >= 85%', () => {
    let progress = emptyProgress();
    for (let i = 0; i < 10; i++) {
      progress = recordQuestionAttempt(progress, makeQuestionAttempt({
        skillIds: ['counting'],
        isCorrect: i < 9,
      }));
    }

    const insights = getSkillInsights(progress, 'k', labels);
    const counting = insights.find((s) => s.skillId === 'counting');
    expect(counting?.status).toBe('strong');
    expect(counting?.label).toBe('Counting');
  });

  it('marks skill as needs-practice when accuracy < 70%', () => {
    let progress = emptyProgress();
    for (let i = 0; i < 10; i++) {
      progress = recordQuestionAttempt(progress, makeQuestionAttempt({
        skillIds: ['counting'],
        isCorrect: i < 5,
      }));
    }

    const insights = getSkillInsights(progress, 'k', labels);
    const counting = insights.find((s) => s.skillId === 'counting');
    expect(counting?.status).toBe('needs-practice');
  });

  it('marks skill as not-enough-data when fewer than 5 attempts', () => {
    let progress = emptyProgress();
    for (let i = 0; i < 3; i++) {
      progress = recordQuestionAttempt(progress, makeQuestionAttempt({
        skillIds: ['counting'],
        isCorrect: true,
      }));
    }

    const insights = getSkillInsights(progress, 'k', labels);
    const counting = insights.find((s) => s.skillId === 'counting');
    expect(counting?.status).toBe('not-enough-data');
  });
});

describe('getRecommendedActivities', () => {
  it('recommends untried activities', () => {
    const progress = emptyProgress();
    const recs = getRecommendedActivities(progress, 'k', SAMPLE_ACTIVITIES);
    expect(recs.length).toBe(3);
    expect(recs[0].reason).toBe('Not tried yet');
  });

  it('prioritizes low accuracy activities', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({
      activityId: 'math.counting',
      correctAnswers: 2,
      totalQuestions: 6,
      starsEarned: 1,
    }));

    const recs = getRecommendedActivities(progress, 'k', SAMPLE_ACTIVITIES);
    const countingRec = recs.find((r) => r.activityId === 'math.counting');
    expect(countingRec?.reason).toBe('Needs more practice');
    expect(countingRec?.priority).toBe(80);
  });

  it('limits results', () => {
    const progress = emptyProgress();
    const recs = getRecommendedActivities(progress, 'k', SAMPLE_ACTIVITIES, 2);
    expect(recs.length).toBe(2);
  });
});

describe('storage round-trip', () => {
  beforeEach(() => {
    clearProgress('k');
  });

  it('saves and loads progress', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 3 }));
    saveProgress('k', progress);

    const loaded = loadProgress('k');
    expect(loaded.totalStars).toBe(3);
    expect(loaded.activityAttempts).toHaveLength(1);
  });

  it('returns empty progress for missing data', () => {
    const loaded = loadProgress('k');
    expect(loaded.version).toBe(2);
    expect(loaded.activityAttempts).toHaveLength(0);
  });

  it('handles corrupted localStorage gracefully', () => {
    window.localStorage.setItem('brainsprout:progress:v2:k', '{corrupted json!!!');
    const loaded = loadProgress('k');
    expect(loaded.version).toBe(2);
    expect(loaded.activityAttempts).toHaveLength(0);
  });

  it('handles missing fields gracefully', () => {
    window.localStorage.setItem('brainsprout:progress:v2:k', JSON.stringify({ version: 2 }));
    const loaded = loadProgress('k');
    expect(loaded.activityAttempts).toHaveLength(0);
    expect(loaded.questionAttempts).toHaveLength(0);
    expect(loaded.totalStars).toBe(0);
  });

  it('isolates progress by grade', () => {
    let progress = emptyProgress();
    progress = recordActivityAttempt(progress, makeActivityAttempt({ starsEarned: 3 }));
    saveProgress('k', progress);

    const grade1 = loadProgress('1');
    expect(grade1.totalStars).toBe(0);
  });
});

describe('formatDuration', () => {
  it('shows < 1 min for short durations', () => {
    expect(formatDuration(30000)).toBe('< 1 min');
  });
  it('shows minutes', () => {
    expect(formatDuration(300000)).toBe('5 min');
  });
  it('shows hours and minutes', () => {
    expect(formatDuration(5400000)).toBe('1h 30m');
  });
  it('shows hours only when no remaining minutes', () => {
    expect(formatDuration(3600000)).toBe('1h');
  });
});
