import type { SectionId } from '../types';

export type WorldDisplay = {
  id: SectionId;
  label: string;
  tagline: string;
  missionCopy: string;
  hotspotIcon: string;
  accent: string;
};

export const WORLD_DISPLAY: Record<SectionId, WorldDisplay> = {
  math: {
    id: 'math',
    label: 'Math Lab',
    tagline: 'Power the rocket with numbers',
    missionCopy: 'Count stars to fuel the rocket!',
    hotspotIcon: '🚀',
    accent: '#219ebc',
  },
  science: {
    id: 'science',
    label: 'Science Dome',
    tagline: 'Grow plants and explore',
    missionCopy: 'Help the Mars garden grow!',
    hotspotIcon: '🌱',
    accent: '#2a9d8f',
  },
  reading: {
    id: 'reading',
    label: 'Reading Station',
    tagline: 'Unlock mission messages',
    missionCopy: 'Read messages from Earth!',
    hotspotIcon: '📡',
    accent: '#7b2cbf',
  },
  shapes: {
    id: 'shapes',
    label: 'Shape Galaxy',
    tagline: 'Shapes and colors in space',
    missionCopy: 'Find shapes across the galaxy!',
    hotspotIcon: '🔷',
    accent: '#f4a261',
  },
  logic: {
    id: 'logic',
    label: 'Puzzle Zone',
    tagline: 'Solve astronaut puzzles',
    missionCopy: 'Solve puzzles like an astronaut!',
    hotspotIcon: '🧩',
    accent: '#2a9d8f',
  },
  'life-skills': {
    id: 'life-skills',
    label: 'Life Skills Base',
    tagline: 'Safe, kind, and healthy habits',
    missionCopy: 'Keep the explorer safe and kind!',
    hotspotIcon: '🛡️',
    accent: '#219ebc',
  },
  trucks: {
    id: 'trucks',
    label: 'Rover Garage',
    tagline: 'Count, compare, and learn vehicles',
    missionCopy: 'Start up the rover fleet!',
    hotspotIcon: '🛻',
    accent: '#e76f51',
  },
  stem: {
    id: 'stem',
    label: 'Robotics & AI Lab',
    tagline: 'Help Sprout Bot learn',
    missionCopy: 'Train the Sprout Bot!',
    hotspotIcon: '🤖',
    accent: '#7b2cbf',
  },
};

export function getWorldDisplay(id: SectionId): WorldDisplay {
  return WORLD_DISPLAY[id];
}

export const GRADE_MISSION_NAMES: Record<string, { name: string; copy: string }> = {
  k: { name: 'Explorer Mission', copy: 'Colors, counting, letters & first STEM discoveries' },
  '1': { name: 'Rocket Mission', copy: 'Addition, subtraction, reading words & science' },
  '2': { name: 'Builder Mission', copy: 'Bigger math, better reading & problem solving' },
  '3': { name: 'Commander Mission', copy: 'Advanced missions, logic, science & STEM' },
};
