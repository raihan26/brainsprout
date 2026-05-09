export type GradeId = 'k' | '1' | '2' | '3';

export type GradeMeta = {
  id: GradeId;
  label: string;
  title: string;
  emoji: string;
  color: string;
  bgGradient: string;
  accentColor: string;
  description: string;
};

export type SectionId =
  | 'math'
  | 'science'
  | 'reading'
  | 'shapes'
  | 'logic'
  | 'life-skills'
  | 'trucks';

export type Question = {
  id: string;
  prompt: string;
  speakText?: string;
  visual?: string;
  choices: string[];
  answer: string;
  emoji?: string;
  explanation?: string;
  skillIds?: string[];
};

export type ActivityMeta = {
  id: string;
  grade: GradeId;
  section: SectionId;
  title: string;
  shortTitle?: string;
  emoji: string;
  description: string;
  path: string;
  skillIds?: string[];
  estimatedMinutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  colorTheme?: string;
};

// Legacy progress format (v1) - kept for migration
export type ProgressEntry = {
  stars: number;
  plays: number;
  bestScore: number;
  totalQuestions: number;
  totalCorrect: number;
  lastPlayedAt: number;
};

export type ProgressState = {
  activities: Record<string, ProgressEntry>;
  totalStars: number;
  lastActivityId: string | null;
};

// New event-based progress model (v2)
export type ActivityAttemptEvent = {
  id: string;
  grade: GradeId;
  worldId: string;
  activityId: string;
  skillIds: string[];
  startedAt: string;
  completedAt: string;
  durationMs: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  speechUsed: boolean;
  starsEarned: 0 | 1 | 2 | 3;
};

export type QuestionAttemptEvent = {
  id: string;
  grade: GradeId;
  worldId: string;
  activityId: string;
  questionId: string;
  skillIds: string[];
  answeredAt: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  attemptNumber: number;
};

export type BrainSproutProgress = {
  version: 2;
  activityAttempts: ActivityAttemptEvent[];
  questionAttempts: QuestionAttemptEvent[];
  activityBestStars: Record<string, number>;
  activityBestAccuracy: Record<string, number>;
  totalStars: number;
  lastPlayedAt?: string;
  lastActivityId?: string;
};

export type WeeklySummary = {
  weekStart: string;
  weekEnd: string;
  activitiesCompleted: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeMs: number;
  starsEarned: number;
  activeDays: number;
  bestWorld: string | null;
  worldBreakdown: Record<string, { completed: number; accuracy: number; timeMs: number; stars: number }>;
};

export type WorldProgress = {
  worldId: string;
  completedActivities: number;
  totalActivities: number;
  averageAccuracy: number;
  starsEarned: number;
  maxStars: number;
  totalTimeMs: number;
  lastPracticedAt: string | null;
};

export type SkillInsight = {
  skillId: string;
  label: string;
  status: 'strong' | 'needs-practice' | 'not-enough-data';
  accuracy: number;
  totalAttempts: number;
};

export type RecommendedActivity = {
  activityId: string;
  reason: string;
  priority: number;
};
