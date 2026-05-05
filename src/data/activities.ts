import type { ActivityMeta, GradeId, SectionId } from '../types';

export const SECTIONS: { id: SectionId; title: string; emoji: string; color: 'sun' | 'sky' | 'grass' | 'berry' | 'plum'; tagline: string; grades: GradeId[] }[] = [
  { id: 'trucks', title: 'Trucks & Cars', emoji: '🛻', color: 'berry', tagline: 'Cybertruck, monster trucks & more!', grades: ['k'] },
  { id: 'math', title: 'Math World', emoji: '🧮', color: 'sky', tagline: 'Counting, adding, and number fun', grades: ['k', '1', '2', '3'] },
  { id: 'science', title: 'Science Lab', emoji: '🔬', color: 'grass', tagline: 'Explore the world around us', grades: ['k', '1', '2', '3'] },
  { id: 'reading', title: 'Reading Corner', emoji: '📚', color: 'plum', tagline: 'Letters, sounds, and first words', grades: ['k', '1', '2', '3'] },
  { id: 'shapes', title: 'Shapes & Colors', emoji: '🎨', color: 'sun', tagline: 'Spot shapes and colors', grades: ['k', '1'] },
  { id: 'logic', title: 'Logic Games', emoji: '🧩', color: 'grass', tagline: 'Memory, sorting, and patterns', grades: ['k', '1', '2', '3'] },
  { id: 'life-skills', title: 'Daily Life Skills', emoji: '🌟', color: 'sky', tagline: 'Healthy, kind, and safe', grades: ['k', '1'] },
];

export const ACTIVITIES: ActivityMeta[] = [
  // === KINDERGARTEN ===
  // Math
  { id: 'math.counting', grade: 'k', section: 'math', title: 'Counting Game', emoji: '🍎', description: 'How many do you see?', path: '/math/counting' },
  { id: 'math.addition', grade: 'k', section: 'math', title: 'Addition Game', emoji: '➕', description: 'Add the objects', path: '/math/addition' },
  { id: 'math.subtraction', grade: 'k', section: 'math', title: 'Subtraction Game', emoji: '➖', description: 'Take some away', path: '/math/subtraction' },
  { id: 'math.tracing', grade: 'k', section: 'math', title: 'Number Tracing', emoji: '✏️', description: 'Trace the numbers', path: '/math/tracing' },
  { id: 'math.order', grade: 'k', section: 'math', title: 'Number Order', emoji: '🔢', description: 'Put numbers in order', path: '/math/order' },
  // Science
  { id: 'science.sinkfloat', grade: 'k', section: 'science', title: 'Sink or Float', emoji: '🛟', description: 'Will it sink or float?', path: '/science/sink-or-float' },
  { id: 'science.homes', grade: 'k', section: 'science', title: 'Animal Homes', emoji: '🏠', description: 'Match animals to homes', path: '/science/animal-homes' },
  { id: 'science.weather', grade: 'k', section: 'science', title: 'Weather Game', emoji: '☀️', description: 'Pick the right item', path: '/science/weather' },
  { id: 'science.plant', grade: 'k', section: 'science', title: 'Plant Growth', emoji: '🌱', description: 'Help the plant grow', path: '/science/plant' },
  { id: 'science.senses', grade: 'k', section: 'science', title: 'Five Senses', emoji: '👀', description: 'Which sense do we use?', path: '/science/senses' },
  // Reading
  { id: 'reading.letters', grade: 'k', section: 'reading', title: 'Letter Recognition', emoji: '🔤', description: 'Match A with a', path: '/reading/letters' },
  { id: 'reading.sounds', grade: 'k', section: 'reading', title: 'Beginning Sounds', emoji: '🔠', description: 'What letter starts the word?', path: '/reading/sounds' },
  { id: 'reading.words', grade: 'k', section: 'reading', title: 'Simple Words', emoji: '🐱', description: 'Read short words', path: '/reading/words' },
  { id: 'reading.rhyming', grade: 'k', section: 'reading', title: 'Rhyming Game', emoji: '🎵', description: 'Find the rhyme', path: '/reading/rhyming' },
  // Shapes & Colors
  { id: 'shapes.shapes', grade: 'k', section: 'shapes', title: 'Shape Matching', emoji: '🟦', description: 'Match shape to name', path: '/shapes/shapes' },
  { id: 'shapes.colors', grade: 'k', section: 'shapes', title: 'Color Matching', emoji: '🟥', description: 'Match colors', path: '/shapes/colors' },
  { id: 'shapes.find', grade: 'k', section: 'shapes', title: 'Find the Shape', emoji: '🔵', description: 'Tap all the circles', path: '/shapes/find' },
  { id: 'shapes.pattern', grade: 'k', section: 'shapes', title: 'Pattern Game', emoji: '🔁', description: 'Finish the pattern', path: '/shapes/pattern' },
  // Logic
  { id: 'logic.memory', grade: 'k', section: 'logic', title: 'Memory Match', emoji: '🃏', description: 'Match the pairs', path: '/logic/memory' },
  { id: 'logic.odd', grade: 'k', section: 'logic', title: 'Odd One Out', emoji: '🤔', description: 'Which one is different?', path: '/logic/odd-one-out' },
  { id: 'logic.sorting', grade: 'k', section: 'logic', title: 'Sorting Game', emoji: '📦', description: 'Sort into groups', path: '/logic/sorting' },
  { id: 'logic.sequence', grade: 'k', section: 'logic', title: 'Puzzle Sequence', emoji: '🧠', description: 'Put steps in order', path: '/logic/sequence' },
  // Life skills
  { id: 'life.food', grade: 'k', section: 'life-skills', title: 'Healthy Food', emoji: '🥕', description: 'Pick healthy foods', path: '/life/food' },
  { id: 'life.habits', grade: 'k', section: 'life-skills', title: 'Good Habits', emoji: '🪥', description: 'When do we do this?', path: '/life/habits' },
  { id: 'life.emotions', grade: 'k', section: 'life-skills', title: 'Emotions', emoji: '😊', description: 'How do they feel?', path: '/life/emotions' },
  { id: 'life.safety', grade: 'k', section: 'life-skills', title: 'Safety Basics', emoji: '🦺', description: 'Stay safe!', path: '/life/safety' },
  // Trucks & Cars
  { id: 'trucks.name', grade: 'k', section: 'trucks', title: 'Name the Truck', emoji: '🛻', description: 'What truck is this?', path: '/trucks/name' },
  { id: 'trucks.count', grade: 'k', section: 'trucks', title: 'Count the Trucks', emoji: '🚚', description: 'How many trucks?', path: '/trucks/count' },
  { id: 'trucks.math', grade: 'k', section: 'trucks', title: 'Truck Math', emoji: '🧮', description: 'Add up the trucks', path: '/trucks/math' },
  { id: 'trucks.sounds', grade: 'k', section: 'trucks', title: 'Truck Sounds', emoji: '📢', description: 'Which truck makes this sound?', path: '/trucks/sounds' },
  { id: 'trucks.build', grade: 'k', section: 'trucks', title: 'Build a Cybertruck', emoji: '🔧', description: 'Pick the right parts', path: '/trucks/build' },
  { id: 'trucks.race', grade: 'k', section: 'trucks', title: 'Truck Race!', emoji: '🏁', description: 'Tap fast to win', path: '/trucks/race' },

  // === GRADE 1 ===
  { id: 'g1.math.addition', grade: '1', section: 'math', title: 'Addition to 20', emoji: '➕', description: 'Add numbers up to 20', path: '/math/addition' },
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
