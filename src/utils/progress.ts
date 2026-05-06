import type {
  ActivityAttemptEvent,
  ActivityMeta,
  BrainSproutProgress,
  GradeId,
  QuestionAttemptEvent,
  RecommendedActivity,
  SkillInsight,
  WeeklySummary,
  WorldProgress,
} from '../types';

const STORAGE_KEY = (grade: GradeId) => `brainsprout:progress:v2:${grade}`;

export function emptyProgress(): BrainSproutProgress {
  return {
    version: 2,
    activityAttempts: [],
    questionAttempts: [],
    activityBestStars: {},
    activityBestAccuracy: {},
    totalStars: 0,
    lastPlayedAt: undefined,
    lastActivityId: undefined,
  };
}

export function loadProgress(grade: GradeId): BrainSproutProgress {
  if (typeof window === 'undefined') return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY(grade));
    if (!raw) return migrateFromV1(grade);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 2) return emptyProgress();
    if (!Array.isArray(parsed.activityAttempts)) parsed.activityAttempts = [];
    if (!Array.isArray(parsed.questionAttempts)) parsed.questionAttempts = [];
    if (!parsed.activityBestStars || typeof parsed.activityBestStars !== 'object') parsed.activityBestStars = {};
    if (!parsed.activityBestAccuracy || typeof parsed.activityBestAccuracy !== 'object') parsed.activityBestAccuracy = {};
    if (typeof parsed.totalStars !== 'number') parsed.totalStars = 0;
    return parsed as BrainSproutProgress;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(grade: GradeId, progress: BrainSproutProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY(grade), JSON.stringify(progress));
  } catch {
    // quota exceeded, silently fail
  }
}

export function clearProgress(grade: GradeId): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY(grade));
    // Also clear legacy key
    window.localStorage.removeItem(`brainsprout:progress:${grade}:v1`);
  } catch {
    // ignore
  }
}

function migrateFromV1(grade: GradeId): BrainSproutProgress {
  try {
    const raw = window.localStorage.getItem(`brainsprout:progress:${grade}:v1`);
    if (!raw) return emptyProgress();
    const v1 = JSON.parse(raw);
    if (!v1 || !v1.activities) return emptyProgress();

    const progress = emptyProgress();
    const now = new Date().toISOString();

    for (const [activityId, entry] of Object.entries(v1.activities)) {
      const e = entry as { stars?: number; plays?: number; bestScore?: number; totalQuestions?: number; totalCorrect?: number; lastPlayedAt?: number };
      const stars = (e.stars ?? 0) as 0 | 1 | 2 | 3;
      progress.activityBestStars[activityId] = stars;

      const total = e.totalQuestions ?? 0;
      const correct = e.totalCorrect ?? 0;
      if (total > 0) {
        progress.activityBestAccuracy[activityId] = correct / total;
      }

      const worldId = activityId.split('.')[0] ?? 'unknown';
      const attempt: ActivityAttemptEvent = {
        id: `migrated-${activityId}-${Date.now()}`,
        grade,
        worldId,
        activityId,
        skillIds: [],
        startedAt: e.lastPlayedAt ? new Date(e.lastPlayedAt).toISOString() : now,
        completedAt: e.lastPlayedAt ? new Date(e.lastPlayedAt).toISOString() : now,
        durationMs: 0,
        totalQuestions: total,
        correctAnswers: correct,
        incorrectAnswers: total - correct,
        speechUsed: false,
        starsEarned: stars,
      };
      progress.activityAttempts.push(attempt);
    }

    progress.totalStars = v1.totalStars ?? 0;
    progress.lastActivityId = v1.lastActivityId ?? undefined;

    saveProgress(grade, progress);
    return progress;
  } catch {
    return emptyProgress();
  }
}

export function calcStars(correct: number, total: number): 0 | 1 | 2 | 3 {
  if (total <= 0) return 0;
  const ratio = correct / total;
  if (ratio >= 0.85) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio > 0) return 1;
  return 0;
}

export function recordActivityAttempt(
  progress: BrainSproutProgress,
  event: ActivityAttemptEvent,
): BrainSproutProgress {
  const newAttempts = [...progress.activityAttempts, event];
  const prevBestStars = progress.activityBestStars[event.activityId] ?? 0;
  const newBestStars = Math.max(prevBestStars, event.starsEarned);
  const starDelta = newBestStars - prevBestStars;

  const accuracy = event.totalQuestions > 0 ? event.correctAnswers / event.totalQuestions : 0;
  const prevBestAccuracy = progress.activityBestAccuracy[event.activityId] ?? 0;

  return {
    ...progress,
    activityAttempts: newAttempts,
    activityBestStars: { ...progress.activityBestStars, [event.activityId]: newBestStars },
    activityBestAccuracy: { ...progress.activityBestAccuracy, [event.activityId]: Math.max(prevBestAccuracy, accuracy) },
    totalStars: progress.totalStars + starDelta,
    lastPlayedAt: event.completedAt,
    lastActivityId: event.activityId,
  };
}

export function recordQuestionAttempt(
  progress: BrainSproutProgress,
  event: QuestionAttemptEvent,
): BrainSproutProgress {
  return {
    ...progress,
    questionAttempts: [...progress.questionAttempts, event],
  };
}

// Date utilities
export function getCurrentWeekRange(date: Date = new Date()): { start: Date; end: Date } {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday start
  const start = new Date(d);
  start.setDate(d.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function formatWeekRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
}

export function getWeeklySummary(
  progress: BrainSproutProgress,
  grade: GradeId,
  weekStart: Date,
): WeeklySummary {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const weekAttempts = progress.activityAttempts.filter((a) => {
    if (a.grade !== grade) return false;
    const d = new Date(a.completedAt);
    return d >= weekStart && d <= weekEnd;
  });

  const weekQuestions = progress.questionAttempts.filter((q) => {
    if (q.grade !== grade) return false;
    const d = new Date(q.answeredAt);
    return d >= weekStart && d <= weekEnd;
  });

  const activeDaysSet = new Set<string>();
  weekAttempts.forEach((a) => {
    activeDaysSet.add(new Date(a.completedAt).toDateString());
  });

  const worldBreakdown: Record<string, { completed: number; accuracy: number; timeMs: number; stars: number }> = {};
  for (const a of weekAttempts) {
    if (!worldBreakdown[a.worldId]) {
      worldBreakdown[a.worldId] = { completed: 0, accuracy: 0, timeMs: 0, stars: 0 };
    }
    worldBreakdown[a.worldId].completed += 1;
    worldBreakdown[a.worldId].timeMs += a.durationMs;
    worldBreakdown[a.worldId].stars += a.starsEarned;
  }

  // Calculate per-world accuracy
  for (const worldId of Object.keys(worldBreakdown)) {
    const worldQuestions = weekQuestions.filter((q) => q.worldId === worldId);
    const correct = worldQuestions.filter((q) => q.isCorrect).length;
    worldBreakdown[worldId].accuracy = worldQuestions.length > 0 ? correct / worldQuestions.length : 0;
  }

  const totalCorrect = weekQuestions.filter((q) => q.isCorrect).length;
  const totalTimeMs = weekAttempts.reduce((sum, a) => sum + a.durationMs, 0);
  const starsEarned = weekAttempts.reduce((sum, a) => sum + a.starsEarned, 0);

  let bestWorld: string | null = null;
  let bestWorldStars = 0;
  for (const [worldId, data] of Object.entries(worldBreakdown)) {
    if (data.stars > bestWorldStars) {
      bestWorldStars = data.stars;
      bestWorld = worldId;
    }
  }

  return {
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    activitiesCompleted: weekAttempts.length,
    questionsAnswered: weekQuestions.length,
    correctAnswers: totalCorrect,
    accuracy: weekQuestions.length > 0 ? totalCorrect / weekQuestions.length : 0,
    totalTimeMs,
    starsEarned,
    activeDays: activeDaysSet.size,
    bestWorld,
    worldBreakdown,
  };
}

export function getWorldProgress(
  progress: BrainSproutProgress,
  grade: GradeId,
  allActivities: ActivityMeta[],
): WorldProgress[] {
  const gradeActivities = allActivities.filter((a) => a.grade === grade);
  const worldIds = [...new Set(gradeActivities.map((a) => a.section))];

  return worldIds.map((worldId) => {
    const worldActivities = gradeActivities.filter((a) => a.section === worldId);
    const completedIds = new Set(
      progress.activityAttempts
        .filter((a) => a.grade === grade && a.worldId === worldId)
        .map((a) => a.activityId),
    );

    const worldAttempts = progress.activityAttempts.filter(
      (a) => a.grade === grade && a.worldId === worldId,
    );
    const totalTimeMs = worldAttempts.reduce((sum, a) => sum + a.durationMs, 0);

    const worldQuestions = progress.questionAttempts.filter(
      (q) => q.grade === grade && q.worldId === worldId,
    );
    const correctQ = worldQuestions.filter((q) => q.isCorrect).length;
    const avgAccuracy = worldQuestions.length > 0 ? correctQ / worldQuestions.length : 0;

    const starsEarned = worldActivities.reduce(
      (sum, a) => sum + (progress.activityBestStars[a.id] ?? 0),
      0,
    );

    const lastAttempt = worldAttempts.length > 0
      ? worldAttempts.reduce((latest, a) =>
          new Date(a.completedAt) > new Date(latest.completedAt) ? a : latest,
        )
      : null;

    return {
      worldId,
      completedActivities: completedIds.size,
      totalActivities: worldActivities.length,
      averageAccuracy: avgAccuracy,
      starsEarned,
      maxStars: worldActivities.length * 3,
      totalTimeMs,
      lastPracticedAt: lastAttempt?.completedAt ?? null,
    };
  });
}

export function getSkillInsights(
  progress: BrainSproutProgress,
  grade: GradeId,
  skillLabels: Record<string, string>,
): SkillInsight[] {
  const skillStats: Record<string, { correct: number; total: number }> = {};

  for (const q of progress.questionAttempts) {
    if (q.grade !== grade) continue;
    for (const skillId of q.skillIds) {
      if (!skillStats[skillId]) skillStats[skillId] = { correct: 0, total: 0 };
      skillStats[skillId].total += 1;
      if (q.isCorrect) skillStats[skillId].correct += 1;
    }
  }

  return Object.entries(skillStats).map(([skillId, stats]) => {
    const accuracy = stats.total > 0 ? stats.correct / stats.total : 0;
    let status: 'strong' | 'needs-practice' | 'not-enough-data';

    if (stats.total < 5) {
      status = 'not-enough-data';
    } else if (accuracy >= 0.85) {
      status = 'strong';
    } else if (accuracy < 0.7) {
      status = 'needs-practice';
    } else {
      status = 'strong';
    }

    return {
      skillId,
      label: skillLabels[skillId] ?? skillId,
      status,
      accuracy,
      totalAttempts: stats.total,
    };
  });
}

export function getRecommendedActivities(
  progress: BrainSproutProgress,
  grade: GradeId,
  allActivities: ActivityMeta[],
  limit = 3,
): RecommendedActivity[] {
  const gradeActivities = allActivities.filter((a) => a.grade === grade);
  const scored: { activityId: string; reason: string; priority: number }[] = [];

  for (const activity of gradeActivities) {
    const bestStars = progress.activityBestStars[activity.id] ?? 0;
    const bestAccuracy = progress.activityBestAccuracy[activity.id] ?? -1;
    const attempts = progress.activityAttempts.filter((a) => a.activityId === activity.id);

    if (attempts.length === 0) {
      scored.push({ activityId: activity.id, reason: 'Not tried yet', priority: 50 });
    } else if (bestAccuracy >= 0 && bestAccuracy < 0.7) {
      scored.push({ activityId: activity.id, reason: 'Needs more practice', priority: 80 });
    } else if (bestStars < 3 && bestAccuracy < 0.85) {
      scored.push({ activityId: activity.id, reason: 'Can earn more stars', priority: 40 });
    }
  }

  scored.sort((a, b) => b.priority - a.priority);
  return scored.slice(0, limit);
}

export function formatDuration(ms: number): string {
  if (ms < 60000) return '< 1 min';
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
