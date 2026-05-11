import type { BrainSproutProgress, GradeId, SectionId } from '../types';
import { ACTIVITIES } from './activities';

export type BaseUpgrade = {
  id: string;
  worldId: SectionId;
  title: string;
  description: string;
  requiredStars: number;
  icon: string;
};

export const BASE_UPGRADES: BaseUpgrade[] = [
  // Math → rocket
  { id: 'math-fuel-1', worldId: 'math', title: 'Rocket fuel tank', description: 'Your rocket has fuel!', requiredStars: 3, icon: '🚀' },
  { id: 'math-fuel-2', worldId: 'math', title: 'Upgraded engines', description: 'The rocket flies faster.', requiredStars: 6, icon: '🔥' },
  { id: 'math-fuel-3', worldId: 'math', title: 'Warp drive', description: 'The rocket can zoom!', requiredStars: 12, icon: '✨' },

  // Science → garden
  { id: 'science-seed', worldId: 'science', title: 'First sprout', description: 'A seed grows in the Mars garden.', requiredStars: 3, icon: '🌱' },
  { id: 'science-bloom', worldId: 'science', title: 'Garden dome', description: 'The space garden is blooming!', requiredStars: 6, icon: '🌻' },
  { id: 'science-forest', worldId: 'science', title: 'Mars forest', description: 'Trees grow on Mars!', requiredStars: 12, icon: '🌳' },

  // Reading → mission messages
  { id: 'reading-radio-1', worldId: 'reading', title: 'Mission board', description: 'Messages from Earth appear!', requiredStars: 3, icon: '📡' },
  { id: 'reading-radio-2', worldId: 'reading', title: 'Space library', description: 'Space books unlock!', requiredStars: 6, icon: '📚' },

  // STEM → robots, rover, energy
  { id: 'stem-bot', worldId: 'stem', title: 'Sprout Bot online', description: 'Your helper bot powers on!', requiredStars: 3, icon: '🤖' },
  { id: 'stem-rover', worldId: 'stem', title: 'Rover garage opens', description: 'The rover is ready to explore.', requiredStars: 6, icon: '🛻' },
  { id: 'stem-solar', worldId: 'stem', title: 'Solar array', description: 'The base gets full power!', requiredStars: 12, icon: '☀️' },

  // Logic → antenna
  { id: 'logic-antenna', worldId: 'logic', title: 'Puzzle antenna', description: 'The antenna lights up!', requiredStars: 3, icon: '📶' },
  { id: 'logic-decoder', worldId: 'logic', title: 'Signal decoder', description: 'You decode space signals!', requiredStars: 6, icon: '🧩' },

  // Shapes → dome patterns
  { id: 'shapes-dome', worldId: 'shapes', title: 'Color dome', description: 'The dome glows with color!', requiredStars: 3, icon: '🔷' },
  { id: 'shapes-mosaic', worldId: 'shapes', title: 'Shape mosaic', description: 'A mosaic appears!', requiredStars: 6, icon: '🎨' },

  // Life skills → safety
  { id: 'life-shield', worldId: 'life-skills', title: 'Safety shield', description: 'The base is safe and cozy.', requiredStars: 3, icon: '🛡️' },
  { id: 'life-greenhouse', worldId: 'life-skills', title: 'Friendship hall', description: 'Kindness makes the base grow.', requiredStars: 6, icon: '💛' },

  // Trucks → rovers
  { id: 'trucks-parade', worldId: 'trucks', title: 'Rover parade', description: 'Rovers explore everywhere!', requiredStars: 3, icon: '🚚' },
];

export function starsByWorld(
  progress: BrainSproutProgress,
  grade: GradeId,
): Record<string, number> {
  const byWorld: Record<string, number> = {};
  for (const activity of ACTIVITIES) {
    if (activity.grade !== grade) continue;
    const stars = progress.activityBestStars[activity.id] ?? 0;
    byWorld[activity.section] = (byWorld[activity.section] ?? 0) + stars;
  }
  return byWorld;
}

export function getUnlockedUpgrades(
  progress: BrainSproutProgress,
  grade: GradeId,
): BaseUpgrade[] {
  const byWorld = starsByWorld(progress, grade);
  return BASE_UPGRADES.filter((u) => (byWorld[u.worldId] ?? 0) >= u.requiredStars);
}

export function getNextUpgrades(
  progress: BrainSproutProgress,
  grade: GradeId,
  limit = 3,
): (BaseUpgrade & { starsNeeded: number })[] {
  const byWorld = starsByWorld(progress, grade);
  return BASE_UPGRADES
    .filter((u) => (byWorld[u.worldId] ?? 0) < u.requiredStars)
    .map((u) => ({ ...u, starsNeeded: u.requiredStars - (byWorld[u.worldId] ?? 0) }))
    .sort((a, b) => a.starsNeeded - b.starsNeeded)
    .slice(0, limit);
}

export function getUpgradesForWorld(
  progress: BrainSproutProgress,
  grade: GradeId,
  worldId: SectionId,
): { unlocked: BaseUpgrade[]; next: BaseUpgrade | null } {
  const stars = starsByWorld(progress, grade)[worldId] ?? 0;
  const worldUpgrades = BASE_UPGRADES.filter((u) => u.worldId === worldId).sort(
    (a, b) => a.requiredStars - b.requiredStars,
  );
  const unlocked = worldUpgrades.filter((u) => stars >= u.requiredStars);
  const next = worldUpgrades.find((u) => stars < u.requiredStars) ?? null;
  return { unlocked, next };
}
