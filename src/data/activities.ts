import type { ActivityMeta, SectionId } from '../types';

export const SECTIONS: { id: SectionId; title: string; emoji: string; color: 'sun' | 'sky' | 'grass' | 'berry' | 'plum'; tagline: string }[] = [
  { id: 'trucks', title: 'Trucks & Cars', emoji: '🛻', color: 'berry', tagline: 'Cybertruck, monster trucks & more!' },
  { id: 'math', title: 'Math World', emoji: '🧮', color: 'sky', tagline: 'Counting, adding, and number fun' },
  { id: 'science', title: 'Science Lab', emoji: '🔬', color: 'grass', tagline: 'Explore the world around us' },
  { id: 'reading', title: 'Reading Corner', emoji: '📚', color: 'plum', tagline: 'Letters, sounds, and first words' },
  { id: 'shapes', title: 'Shapes & Colors', emoji: '🎨', color: 'sun', tagline: 'Spot shapes and colors' },
  { id: 'logic', title: 'Logic Games', emoji: '🧩', color: 'grass', tagline: 'Memory, sorting, and patterns' },
  { id: 'life-skills', title: 'Daily Life Skills', emoji: '🌟', color: 'sky', tagline: 'Healthy, kind, and safe' },
];

export const ACTIVITIES: ActivityMeta[] = [
  // Math
  { id: 'math.counting', section: 'math', title: 'Counting Game', emoji: '🍎', description: 'How many do you see?', path: '/math/counting' },
  { id: 'math.addition', section: 'math', title: 'Addition Game', emoji: '➕', description: 'Add the objects', path: '/math/addition' },
  { id: 'math.subtraction', section: 'math', title: 'Subtraction Game', emoji: '➖', description: 'Take some away', path: '/math/subtraction' },
  { id: 'math.tracing', section: 'math', title: 'Number Tracing', emoji: '✏️', description: 'Trace the numbers', path: '/math/tracing' },
  { id: 'math.order', section: 'math', title: 'Number Order', emoji: '🔢', description: 'Put numbers in order', path: '/math/order' },
  // Science
  { id: 'science.sinkfloat', section: 'science', title: 'Sink or Float', emoji: '🛟', description: 'Will it sink or float?', path: '/science/sink-or-float' },
  { id: 'science.homes', section: 'science', title: 'Animal Homes', emoji: '🏠', description: 'Match animals to homes', path: '/science/animal-homes' },
  { id: 'science.weather', section: 'science', title: 'Weather Game', emoji: '☀️', description: 'Pick the right item', path: '/science/weather' },
  { id: 'science.plant', section: 'science', title: 'Plant Growth', emoji: '🌱', description: 'Help the plant grow', path: '/science/plant' },
  { id: 'science.senses', section: 'science', title: 'Five Senses', emoji: '👀', description: 'Which sense do we use?', path: '/science/senses' },
  // Reading
  { id: 'reading.letters', section: 'reading', title: 'Letter Recognition', emoji: '🔤', description: 'Match A with a', path: '/reading/letters' },
  { id: 'reading.sounds', section: 'reading', title: 'Beginning Sounds', emoji: '🔠', description: 'What letter starts the word?', path: '/reading/sounds' },
  { id: 'reading.words', section: 'reading', title: 'Simple Words', emoji: '🐱', description: 'Read short words', path: '/reading/words' },
  { id: 'reading.rhyming', section: 'reading', title: 'Rhyming Game', emoji: '🎵', description: 'Find the rhyme', path: '/reading/rhyming' },
  // Shapes & Colors
  { id: 'shapes.shapes', section: 'shapes', title: 'Shape Matching', emoji: '🟦', description: 'Match shape to name', path: '/shapes/shapes' },
  { id: 'shapes.colors', section: 'shapes', title: 'Color Matching', emoji: '🟥', description: 'Match colors', path: '/shapes/colors' },
  { id: 'shapes.find', section: 'shapes', title: 'Find the Shape', emoji: '🔵', description: 'Tap all the circles', path: '/shapes/find' },
  { id: 'shapes.pattern', section: 'shapes', title: 'Pattern Game', emoji: '🔁', description: 'Finish the pattern', path: '/shapes/pattern' },
  // Logic
  { id: 'logic.memory', section: 'logic', title: 'Memory Match', emoji: '🃏', description: 'Match the pairs', path: '/logic/memory' },
  { id: 'logic.odd', section: 'logic', title: 'Odd One Out', emoji: '🤔', description: 'Which one is different?', path: '/logic/odd-one-out' },
  { id: 'logic.sorting', section: 'logic', title: 'Sorting Game', emoji: '📦', description: 'Sort into groups', path: '/logic/sorting' },
  { id: 'logic.sequence', section: 'logic', title: 'Puzzle Sequence', emoji: '🧠', description: 'Put steps in order', path: '/logic/sequence' },
  // Life skills
  { id: 'life.food', section: 'life-skills', title: 'Healthy Food', emoji: '🥕', description: 'Pick healthy foods', path: '/life/food' },
  { id: 'life.habits', section: 'life-skills', title: 'Good Habits', emoji: '🪥', description: 'When do we do this?', path: '/life/habits' },
  { id: 'life.emotions', section: 'life-skills', title: 'Emotions', emoji: '😊', description: 'How do they feel?', path: '/life/emotions' },
  { id: 'life.safety', section: 'life-skills', title: 'Safety Basics', emoji: '🦺', description: 'Stay safe!', path: '/life/safety' },
  // Trucks & Cars
  { id: 'trucks.name', section: 'trucks', title: 'Name the Truck', emoji: '🛻', description: 'What truck is this?', path: '/trucks/name' },
  { id: 'trucks.count', section: 'trucks', title: 'Count the Trucks', emoji: '🚚', description: 'How many trucks?', path: '/trucks/count' },
  { id: 'trucks.math', section: 'trucks', title: 'Truck Math', emoji: '🧮', description: 'Add up the trucks', path: '/trucks/math' },
  { id: 'trucks.sounds', section: 'trucks', title: 'Truck Sounds', emoji: '📢', description: 'Which truck makes this sound?', path: '/trucks/sounds' },
  { id: 'trucks.build', section: 'trucks', title: 'Build a Cybertruck', emoji: '🔧', description: 'Pick the right parts', path: '/trucks/build' },
  { id: 'trucks.race', section: 'trucks', title: 'Truck Race!', emoji: '🏁', description: 'Tap fast to win', path: '/trucks/race' },
];

export const activitiesBySection = (id: SectionId): ActivityMeta[] =>
  ACTIVITIES.filter((a) => a.section === id);

export const activityById = (id: string): ActivityMeta | undefined =>
  ACTIVITIES.find((a) => a.id === id);
