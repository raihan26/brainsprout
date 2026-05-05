export type GradeId = 'k' | '1' | '2' | '3';

export type GradeMeta = {
  id: GradeId;
  label: string;
  title: string;
  emoji: string;
  color: string;
  bgGradient: string;
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
  choices: string[];
  answer: string;
  emoji?: string;
  explanation?: string;
};

export type ActivityMeta = {
  id: string;
  grade: GradeId;
  section: SectionId;
  title: string;
  emoji: string;
  description: string;
  path: string;
};

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
