import type { ActivityMeta, GradeId, SectionId } from '../types';

export const SECTIONS: { id: SectionId; title: string; emoji: string; color: 'sun' | 'sky' | 'grass' | 'berry' | 'plum'; tagline: string; grades: GradeId[] }[] = [
  { id: 'trucks', title: 'Wheels & Engines', emoji: '🚒', color: 'berry', tagline: 'Fire trucks, buses, cars & more!', grades: ['k'] },
  { id: 'math', title: 'Math Garden', emoji: '🔢', color: 'sky', tagline: 'Counting, adding, and number fun', grades: ['k', '1', '2', '3'] },
  { id: 'reading', title: 'Letter Treehouse', emoji: '📖', color: 'plum', tagline: 'Letters, sounds, and first words', grades: ['k', '1', '2', '3'] },
  { id: 'science', title: 'Science Explorers', emoji: '🌍', color: 'grass', tagline: 'Explore the world around us', grades: ['k', '1', '2', '3'] },
  { id: 'shapes', title: 'Shapes & Colors', emoji: '🔷', color: 'sun', tagline: 'Spot shapes and colors everywhere', grades: ['k', '1'] },
  { id: 'logic', title: 'Logic Playground', emoji: '🧠', color: 'grass', tagline: 'Think, match, and solve', grades: ['k', '1', '2', '3'] },
  { id: 'life-skills', title: 'Daily Life Skills', emoji: '⭐', color: 'sky', tagline: 'Healthy, kind, and safe', grades: ['k', '1'] },
];

export const ACTIVITIES: ActivityMeta[] = [
  // === KINDERGARTEN ===

  // Math Garden
  { id: 'math.counting-objects', grade: 'k', section: 'math', title: 'Count Objects', shortTitle: 'Counting', emoji: '🍎', description: 'How many do you see?', path: '/math/counting', skillIds: ['counting', 'one-to-one-correspondence'], estimatedMinutes: 3, difficulty: 'easy' },
  { id: 'math.number-recognition', grade: 'k', section: 'math', title: 'Number Recognition', shortTitle: 'Numbers', emoji: '🔢', description: 'Which number is this?', path: '/math/numbers', skillIds: ['number-recognition'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'math.more-less', grade: 'k', section: 'math', title: 'More or Less', shortTitle: 'More/Less', emoji: '⚖️', description: 'Which has more?', path: '/math/more-less', skillIds: ['more-less', 'counting'], estimatedMinutes: 3, difficulty: 'easy' },
  { id: 'math.addition', grade: 'k', section: 'math', title: 'Addition Game', shortTitle: 'Adding', emoji: '➕', description: 'Add the objects', path: '/math/addition', skillIds: ['addition-within-5'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'math.subtraction', grade: 'k', section: 'math', title: 'Subtraction Game', shortTitle: 'Take Away', emoji: '➖', description: 'Take some away', path: '/math/subtraction', skillIds: ['subtraction-within-5'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'math.number-order', grade: 'k', section: 'math', title: 'Number Order', shortTitle: 'Order', emoji: '📊', description: 'What comes next?', path: '/math/order', skillIds: ['number-order'], estimatedMinutes: 2, difficulty: 'medium' },

  // Letter Treehouse
  { id: 'reading.uppercase', grade: 'k', section: 'reading', title: 'Uppercase Letters', shortTitle: 'Big Letters', emoji: '🔤', description: 'Find the letter', path: '/reading/uppercase', skillIds: ['uppercase-letters'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'reading.lowercase', grade: 'k', section: 'reading', title: 'Lowercase Letters', shortTitle: 'Small Letters', emoji: '🔡', description: 'Match A with a', path: '/reading/lowercase', skillIds: ['lowercase-letters'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'reading.sounds', grade: 'k', section: 'reading', title: 'Beginning Sounds', shortTitle: 'First Sound', emoji: '🔠', description: 'What letter starts the word?', path: '/reading/sounds', skillIds: ['beginning-sounds', 'letter-sounds'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'reading.rhyming', grade: 'k', section: 'reading', title: 'Rhyming Game', shortTitle: 'Rhymes', emoji: '🎵', description: 'Find the rhyme', path: '/reading/rhyming', skillIds: ['rhyming'], estimatedMinutes: 2, difficulty: 'medium' },
  { id: 'reading.words', grade: 'k', section: 'reading', title: 'Simple Words', shortTitle: 'Words', emoji: '🐱', description: 'Read short words', path: '/reading/words', skillIds: ['cvc-words'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'reading.sight-words', grade: 'k', section: 'reading', title: 'Sight Words', shortTitle: 'Sight Words', emoji: '👁️', description: 'Know these words by sight', path: '/reading/sight-words', skillIds: ['sight-words'], estimatedMinutes: 2, difficulty: 'medium' },

  // Science Explorers
  { id: 'science.sink-float', grade: 'k', section: 'science', title: 'Sink or Float', shortTitle: 'Sink/Float', emoji: '🛟', description: 'Will it sink or float?', path: '/science/sink-or-float', skillIds: ['sink-float'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'science.animal-homes', grade: 'k', section: 'science', title: 'Animal Homes', shortTitle: 'Homes', emoji: '🏠', description: 'Match animals to homes', path: '/science/animal-homes', skillIds: ['animal-homes'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'science.weather', grade: 'k', section: 'science', title: 'Weather Game', shortTitle: 'Weather', emoji: '☀️', description: 'Pick the right item', path: '/science/weather', skillIds: ['weather'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'science.five-senses', grade: 'k', section: 'science', title: 'Five Senses', shortTitle: 'Senses', emoji: '👀', description: 'Which sense do we use?', path: '/science/senses', skillIds: ['five-senses'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'science.plant-growth', grade: 'k', section: 'science', title: 'Plant Growth', shortTitle: 'Plants', emoji: '🌱', description: 'Help the plant grow', path: '/science/plant', skillIds: ['plant-growth'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'science.day-night', grade: 'k', section: 'science', title: 'Day and Night', shortTitle: 'Day/Night', emoji: '🌙', description: 'Day or night?', path: '/science/day-night', skillIds: ['day-night'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'science.living-nonliving', grade: 'k', section: 'science', title: 'Living Things', shortTitle: 'Living', emoji: '🌿', description: 'Living or not?', path: '/science/living', skillIds: ['living-nonliving'], estimatedMinutes: 2, difficulty: 'medium' },

  // Shapes & Colors Studio
  { id: 'shapes.shapes', grade: 'k', section: 'shapes', title: 'Shape Matching', shortTitle: 'Shapes', emoji: '🟦', description: 'Name the shape', path: '/shapes/shapes', skillIds: ['shape-recognition'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'shapes.colors', grade: 'k', section: 'shapes', title: 'Color Matching', shortTitle: 'Colors', emoji: '🟥', description: 'Match colors', path: '/shapes/colors', skillIds: ['color-recognition'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'shapes.pattern', grade: 'k', section: 'shapes', title: 'Pattern Game', shortTitle: 'Patterns', emoji: '🔁', description: 'Finish the pattern', path: '/shapes/pattern', skillIds: ['patterns'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'shapes.sorting', grade: 'k', section: 'shapes', title: 'Sort Shapes', shortTitle: 'Sorting', emoji: '📦', description: 'Sort by shape', path: '/shapes/sorting', skillIds: ['sorting', 'shape-recognition'], estimatedMinutes: 2, difficulty: 'medium' },
  { id: 'shapes.real-world', grade: 'k', section: 'shapes', title: 'Shapes Around Us', shortTitle: 'Real Shapes', emoji: '🔵', description: 'Find shapes in real life', path: '/shapes/real-world', skillIds: ['real-world-shapes'], estimatedMinutes: 2, difficulty: 'medium' },

  // Logic Playground
  { id: 'logic.odd-one-out', grade: 'k', section: 'logic', title: 'Odd One Out', shortTitle: 'Odd One', emoji: '🤔', description: 'Which one is different?', path: '/logic/odd-one-out', skillIds: ['odd-one-out', 'categorizing'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'logic.memory', grade: 'k', section: 'logic', title: 'Memory Match', shortTitle: 'Memory', emoji: '🃏', description: 'Match the pairs', path: '/logic/memory', skillIds: ['memory'], estimatedMinutes: 4, difficulty: 'medium' },
  { id: 'logic.sequence', grade: 'k', section: 'logic', title: 'What Comes Next?', shortTitle: 'Sequence', emoji: '🧠', description: 'Put in order', path: '/logic/sequence', skillIds: ['sequences'], estimatedMinutes: 3, difficulty: 'medium' },
  { id: 'logic.same-different', grade: 'k', section: 'logic', title: 'Same or Different', shortTitle: 'Same/Diff', emoji: '🔍', description: 'Find what matches', path: '/logic/same-different', skillIds: ['same-different'], estimatedMinutes: 2, difficulty: 'easy' },

  // Daily Life Skills
  { id: 'life.food', grade: 'k', section: 'life-skills', title: 'Healthy Food', shortTitle: 'Food', emoji: '🥕', description: 'Pick healthy foods', path: '/life/food', skillIds: ['healthy-food'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'life.emotions', grade: 'k', section: 'life-skills', title: 'Emotions', shortTitle: 'Feelings', emoji: '😊', description: 'How do they feel?', path: '/life/emotions', skillIds: ['emotions'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'life.safety', grade: 'k', section: 'life-skills', title: 'Safety Basics', shortTitle: 'Safety', emoji: '🦺', description: 'Stay safe!', path: '/life/safety', skillIds: ['safety'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'life.routines', grade: 'k', section: 'life-skills', title: 'Daily Routines', shortTitle: 'Routines', emoji: '⏰', description: 'Morning & evening habits', path: '/life/routines', skillIds: ['routines', 'good-habits'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'life.friendship', grade: 'k', section: 'life-skills', title: 'Being a Good Friend', shortTitle: 'Friends', emoji: '🤝', description: 'Kind and caring', path: '/life/friendship', skillIds: ['friendship'], estimatedMinutes: 2, difficulty: 'easy' },

  // Trucks & Cars Garage
  { id: 'trucks.name', grade: 'k', section: 'trucks', title: 'Name the Vehicle', shortTitle: 'Name', emoji: '🚗', description: 'What vehicle is this?', path: '/trucks/name', skillIds: ['vehicle-recognition'], estimatedMinutes: 3, difficulty: 'easy' },
  { id: 'trucks.count', grade: 'k', section: 'trucks', title: 'Count the Vehicles', shortTitle: 'Count', emoji: '🚚', description: 'How many vehicles?', path: '/trucks/count', skillIds: ['vehicle-counting', 'counting'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'trucks.sounds', grade: 'k', section: 'trucks', title: 'Vehicle Sounds', shortTitle: 'Sounds', emoji: '📢', description: 'What makes this sound?', path: '/trucks/sounds', skillIds: ['vehicle-sounds'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'trucks.jobs', grade: 'k', section: 'trucks', title: 'Vehicle Jobs', shortTitle: 'Jobs', emoji: '👷', description: 'Match vehicle to job', path: '/trucks/jobs', skillIds: ['vehicle-jobs'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'trucks.size', grade: 'k', section: 'trucks', title: 'Big or Small?', shortTitle: 'Size', emoji: '📏', description: 'Compare vehicle sizes', path: '/trucks/size', skillIds: ['size-comparison'], estimatedMinutes: 2, difficulty: 'easy' },
  { id: 'trucks.math', grade: 'k', section: 'trucks', title: 'Truck Math', shortTitle: 'Math', emoji: '🧮', description: 'Add up the trucks', path: '/trucks/math', skillIds: ['addition-within-5', 'vehicle-counting'], estimatedMinutes: 3, difficulty: 'medium' },

  // === GRADE 1 ===
  { id: 'g1.math.addition', grade: '1', section: 'math', title: 'Addition to 20', emoji: '➕', description: 'Add numbers up to 20', path: '/math/addition', skillIds: ['addition-within-5'] },
  { id: 'g1.math.subtraction', grade: '1', section: 'math', title: 'Subtraction to 20', emoji: '➖', description: 'Subtract within 20', path: '/math/subtraction' },
  { id: 'g1.math.counting', grade: '1', section: 'math', title: 'Skip Counting', emoji: '🔢', description: 'Count by 2s, 5s, 10s', path: '/math/counting' },
  { id: 'g1.math.order', grade: '1', section: 'math', title: 'Number Order to 100', emoji: '📊', description: 'Order bigger numbers', path: '/math/order' },
  { id: 'g1.reading.words', grade: '1', section: 'reading', title: 'Sight Words', emoji: '👁️', description: 'Read common words', path: '/reading/words' },
  { id: 'g1.reading.sounds', grade: '1', section: 'reading', title: 'Phonics Blends', emoji: '🔠', description: 'Blend sounds together', path: '/reading/sounds' },
  { id: 'g1.reading.rhyming', grade: '1', section: 'reading', title: 'Word Families', emoji: '🏠', description: 'Find the word family', path: '/reading/rhyming' },
  { id: 'g1.science.weather', grade: '1', section: 'science', title: 'Seasons', emoji: '🍂', description: 'Match the season', path: '/science/weather' },
  { id: 'g1.science.homes', grade: '1', section: 'science', title: 'Animal Groups', emoji: '🐾', description: 'Mammals, birds, fish?', path: '/science/animal-homes' },
  { id: 'g1.logic.sequence', grade: '1', section: 'logic', title: 'Story Order', emoji: '📖', description: 'Put the story in order', path: '/logic/sequence' },
  { id: 'g1.logic.odd', grade: '1', section: 'logic', title: 'What Comes Next?', emoji: '❓', description: 'Find the pattern', path: '/logic/odd-one-out' },
  { id: 'g1.shapes.shapes', grade: '1', section: 'shapes', title: '3D Shapes', emoji: '🧊', description: 'Cubes, spheres & cones', path: '/shapes/shapes' },
  { id: 'g1.shapes.pattern', grade: '1', section: 'shapes', title: 'Complex Patterns', emoji: '🔄', description: 'Harder patterns', path: '/shapes/pattern' },
  { id: 'g1.life.habits', grade: '1', section: 'life-skills', title: 'Time & Routine', emoji: '⏰', description: 'Daily schedule', path: '/life/habits' },
  { id: 'g1.life.emotions', grade: '1', section: 'life-skills', title: 'Feelings & Friends', emoji: '🤝', description: 'Being a good friend', path: '/life/emotions' },

  // === GRADE 2 ===
  { id: 'g2.math.addition', grade: '2', section: 'math', title: 'Addition to 100', emoji: '🔢', description: 'Two-digit addition', path: '/math/addition' },
  { id: 'g2.math.subtraction', grade: '2', section: 'math', title: 'Subtraction to 100', emoji: '➖', description: 'Two-digit subtraction', path: '/math/subtraction' },
  { id: 'g2.math.counting', grade: '2', section: 'math', title: 'Multiplication Intro', emoji: '✖️', description: 'Groups and arrays', path: '/math/counting' },
  { id: 'g2.math.order', grade: '2', section: 'math', title: 'Place Value', emoji: '🏗️', description: 'Hundreds, tens, ones', path: '/math/order' },
  { id: 'g2.reading.words', grade: '2', section: 'reading', title: 'Reading Sentences', emoji: '📝', description: 'Read full sentences', path: '/reading/words' },
  { id: 'g2.reading.sounds', grade: '2', section: 'reading', title: 'Vowel Teams', emoji: '🎯', description: 'Long vowel sounds', path: '/reading/sounds' },
  { id: 'g2.reading.rhyming', grade: '2', section: 'reading', title: 'Compound Words', emoji: '🧩', description: 'Put words together', path: '/reading/rhyming' },
  { id: 'g2.science.weather', grade: '2', section: 'science', title: 'Water Cycle', emoji: '💧', description: 'Where does rain go?', path: '/science/weather' },
  { id: 'g2.science.homes', grade: '2', section: 'science', title: 'Habitats', emoji: '🌍', description: 'Desert, ocean, forest', path: '/science/animal-homes' },
  { id: 'g2.logic.memory', grade: '2', section: 'logic', title: 'Logic Puzzles', emoji: '🧩', description: 'Solve the puzzle', path: '/logic/memory' },
  { id: 'g2.logic.sequence', grade: '2', section: 'logic', title: 'Cause & Effect', emoji: '💡', description: 'What happens next?', path: '/logic/sequence' },

  // === GRADE 3 ===
  { id: 'g3.math.addition', grade: '3', section: 'math', title: 'Multiplication Facts', emoji: '✖️', description: 'Times tables to 12', path: '/math/addition' },
  { id: 'g3.math.subtraction', grade: '3', section: 'math', title: 'Division Intro', emoji: '➗', description: 'Share equally', path: '/math/subtraction' },
  { id: 'g3.math.counting', grade: '3', section: 'math', title: 'Fractions', emoji: '🍕', description: 'Parts of a whole', path: '/math/counting' },
  { id: 'g3.math.order', grade: '3', section: 'math', title: 'Word Problems', emoji: '📖', description: 'Solve story problems', path: '/math/order' },
  { id: 'g3.reading.words', grade: '3', section: 'reading', title: 'Paragraphs', emoji: '📄', description: 'Read and understand', path: '/reading/words' },
  { id: 'g3.reading.sounds', grade: '3', section: 'reading', title: 'Prefixes & Suffixes', emoji: '🔗', description: 'Word parts', path: '/reading/sounds' },
  { id: 'g3.reading.rhyming', grade: '3', section: 'reading', title: 'Context Clues', emoji: '🔍', description: 'Figure out meaning', path: '/reading/rhyming' },
  { id: 'g3.science.weather', grade: '3', section: 'science', title: 'Solar System', emoji: '🪐', description: 'Planets and stars', path: '/science/weather' },
  { id: 'g3.science.homes', grade: '3', section: 'science', title: 'Food Chains', emoji: '🔗', description: 'Who eats whom?', path: '/science/animal-homes' },
  { id: 'g3.logic.memory', grade: '3', section: 'logic', title: 'Strategy Games', emoji: '♟️', description: 'Think ahead', path: '/logic/memory' },
  { id: 'g3.logic.sequence', grade: '3', section: 'logic', title: 'Coding Basics', emoji: '💻', description: 'Step-by-step thinking', path: '/logic/sequence' },
];

export const sectionsByGrade = (grade: GradeId) =>
  SECTIONS.filter((s) => s.grades.includes(grade));

export const activitiesBySection = (id: SectionId, grade: GradeId): ActivityMeta[] =>
  ACTIVITIES.filter((a) => a.section === id && a.grade === grade);

export const activitiesByGrade = (grade: GradeId): ActivityMeta[] =>
  ACTIVITIES.filter((a) => a.grade === grade);

export const activityById = (id: string): ActivityMeta | undefined =>
  ACTIVITIES.find((a) => a.id === id);
