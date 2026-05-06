import type { Question } from '../types';

// ====== MATH GARDEN ======

export const countingObjectsQuestions: Question[] = [
  { id: 'co-1', prompt: 'How many apples?', speakText: 'How many apples do you see?', visual: '🍎🍎🍎', choices: ['2', '3', '4'], answer: '3', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-2', prompt: 'How many stars?', speakText: 'How many stars do you see?', visual: '⭐⭐⭐⭐⭐', choices: ['4', '5', '6'], answer: '5', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-3', prompt: 'How many dogs?', speakText: 'How many dogs do you see?', visual: '🐶🐶', choices: ['1', '2', '3'], answer: '2', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-4', prompt: 'How many fish?', speakText: 'How many fish do you see?', visual: '🐟🐟🐟🐟', choices: ['3', '4', '5'], answer: '4', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-5', prompt: 'How many flowers?', speakText: 'How many flowers do you see?', visual: '🌸🌸🌸🌸🌸🌸', choices: ['5', '6', '7'], answer: '6', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-6', prompt: 'How many hearts?', speakText: 'How many hearts do you see?', visual: '❤️', choices: ['1', '2', '3'], answer: '1', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-7', prompt: 'How many balloons?', speakText: 'How many balloons do you see?', visual: '🎈🎈🎈🎈🎈🎈🎈', choices: ['6', '7', '8'], answer: '7', skillIds: ['counting', 'one-to-one-correspondence'] },
  { id: 'co-8', prompt: 'How many cats?', speakText: 'How many cats do you see?', visual: '🐱🐱🐱🐱🐱🐱🐱🐱', choices: ['7', '8', '9'], answer: '8', skillIds: ['counting', 'one-to-one-correspondence'] },
];

export const numberRecognitionQuestions: Question[] = [
  { id: 'nr-1', prompt: 'Which number is this?', visual: '3️⃣', choices: ['2', '3', '4'], answer: '3', skillIds: ['number-recognition'] },
  { id: 'nr-2', prompt: 'Which number is this?', visual: '7️⃣', choices: ['6', '7', '8'], answer: '7', skillIds: ['number-recognition'] },
  { id: 'nr-3', prompt: 'Which number is this?', visual: '5️⃣', choices: ['4', '5', '6'], answer: '5', skillIds: ['number-recognition'] },
  { id: 'nr-4', prompt: 'Which number is this?', visual: '9️⃣', choices: ['8', '9', '10'], answer: '9', skillIds: ['number-recognition'] },
  { id: 'nr-5', prompt: 'Which number is this?', visual: '1️⃣', choices: ['1', '2', '3'], answer: '1', skillIds: ['number-recognition'] },
  { id: 'nr-6', prompt: 'Which number is this?', visual: '4️⃣', choices: ['3', '4', '5'], answer: '4', skillIds: ['number-recognition'] },
];

export const moreLessQuestions: Question[] = [
  { id: 'ml-1', prompt: 'Which group has MORE?', visual: '🍎🍎🍎 or 🍎🍎🍎🍎🍎', choices: ['Left (3)', 'Right (5)'], answer: 'Right (5)', skillIds: ['more-less', 'counting'] },
  { id: 'ml-2', prompt: 'Which group has LESS?', visual: '⭐⭐⭐⭐ or ⭐⭐', choices: ['Left (4)', 'Right (2)'], answer: 'Right (2)', skillIds: ['more-less', 'counting'] },
  { id: 'ml-3', prompt: 'Which group has MORE?', visual: '🐟🐟 or 🐟🐟🐟🐟🐟🐟', choices: ['Left (2)', 'Right (6)'], answer: 'Right (6)', skillIds: ['more-less', 'counting'] },
  { id: 'ml-4', prompt: 'Which is MORE?', choices: ['3', '7'], answer: '7', skillIds: ['more-less', 'number-recognition'] },
  { id: 'ml-5', prompt: 'Which is LESS?', choices: ['9', '4'], answer: '4', skillIds: ['more-less', 'number-recognition'] },
  { id: 'ml-6', prompt: 'Which group has MORE?', visual: '🌸🌸🌸🌸🌸 or 🌸🌸🌸', choices: ['Left (5)', 'Right (3)'], answer: 'Left (5)', skillIds: ['more-less', 'counting'] },
];

export const additionQuestions: Question[] = [
  { id: 'add-1', prompt: '1 + 1 = ?', speakText: 'What is one plus one?', visual: '🍎 + 🍎', choices: ['1', '2', '3'], answer: '2', skillIds: ['addition-within-5'] },
  { id: 'add-2', prompt: '2 + 1 = ?', speakText: 'What is two plus one?', visual: '🍎🍎 + 🍎', choices: ['2', '3', '4'], answer: '3', skillIds: ['addition-within-5'] },
  { id: 'add-3', prompt: '2 + 2 = ?', speakText: 'What is two plus two?', visual: '⭐⭐ + ⭐⭐', choices: ['3', '4', '5'], answer: '4', skillIds: ['addition-within-5'] },
  { id: 'add-4', prompt: '3 + 1 = ?', speakText: 'What is three plus one?', visual: '🐶🐶🐶 + 🐶', choices: ['3', '4', '5'], answer: '4', skillIds: ['addition-within-5'] },
  { id: 'add-5', prompt: '2 + 3 = ?', speakText: 'What is two plus three?', visual: '🐱🐱 + 🐱🐱🐱', choices: ['4', '5', '6'], answer: '5', skillIds: ['addition-within-5'] },
  { id: 'add-6', prompt: '1 + 2 = ?', speakText: 'What is one plus two?', visual: '🎈 + 🎈🎈', choices: ['2', '3', '4'], answer: '3', skillIds: ['addition-within-5'] },
  { id: 'add-7', prompt: '3 + 2 = ?', speakText: 'What is three plus two?', visual: '🌸🌸🌸 + 🌸🌸', choices: ['4', '5', '6'], answer: '5', skillIds: ['addition-within-5'] },
  { id: 'add-8', prompt: '4 + 1 = ?', speakText: 'What is four plus one?', visual: '❤️❤️❤️❤️ + ❤️', choices: ['4', '5', '6'], answer: '5', skillIds: ['addition-within-5'] },
];

export const subtractionQuestions: Question[] = [
  { id: 'sub-1', prompt: '3 - 1 = ?', speakText: 'What is three minus one?', visual: '🍎🍎🍎 take away 🍎', choices: ['1', '2', '3'], answer: '2', skillIds: ['subtraction-within-5'] },
  { id: 'sub-2', prompt: '4 - 2 = ?', speakText: 'What is four minus two?', visual: '⭐⭐⭐⭐ take away ⭐⭐', choices: ['1', '2', '3'], answer: '2', skillIds: ['subtraction-within-5'] },
  { id: 'sub-3', prompt: '5 - 1 = ?', speakText: 'What is five minus one?', visual: '🐟🐟🐟🐟🐟 take away 🐟', choices: ['3', '4', '5'], answer: '4', skillIds: ['subtraction-within-5'] },
  { id: 'sub-4', prompt: '2 - 1 = ?', speakText: 'What is two minus one?', visual: '🐶🐶 take away 🐶', choices: ['0', '1', '2'], answer: '1', skillIds: ['subtraction-within-5'] },
  { id: 'sub-5', prompt: '5 - 3 = ?', speakText: 'What is five minus three?', visual: '🎈🎈🎈🎈🎈 take away 🎈🎈🎈', choices: ['1', '2', '3'], answer: '2', skillIds: ['subtraction-within-5'] },
  { id: 'sub-6', prompt: '4 - 1 = ?', speakText: 'What is four minus one?', visual: '🌸🌸🌸🌸 take away 🌸', choices: ['2', '3', '4'], answer: '3', skillIds: ['subtraction-within-5'] },
  { id: 'sub-7', prompt: '5 - 2 = ?', speakText: 'What is five minus two?', visual: '❤️❤️❤️❤️❤️ take away ❤️❤️', choices: ['2', '3', '4'], answer: '3', skillIds: ['subtraction-within-5'] },
];

export const numberOrderQuestions: Question[] = [
  { id: 'no-1', prompt: 'What comes after 3?', speakText: 'What number comes after three?', choices: ['2', '4', '5'], answer: '4', skillIds: ['number-order'] },
  { id: 'no-2', prompt: 'What comes before 5?', speakText: 'What number comes before five?', choices: ['3', '4', '6'], answer: '4', skillIds: ['number-order'] },
  { id: 'no-3', prompt: 'What comes after 7?', speakText: 'What number comes after seven?', choices: ['6', '8', '9'], answer: '8', skillIds: ['number-order'] },
  { id: 'no-4', prompt: 'What comes between 2 and 4?', speakText: 'What number is between two and four?', choices: ['1', '3', '5'], answer: '3', skillIds: ['number-order'] },
  { id: 'no-5', prompt: 'What comes after 9?', speakText: 'What number comes after nine?', choices: ['8', '10', '11'], answer: '10', skillIds: ['number-order'] },
  { id: 'no-6', prompt: 'What comes before 1?', speakText: 'What number comes before one?', choices: ['0', '2', '3'], answer: '0', skillIds: ['number-order'] },
];

// ====== LETTER TREEHOUSE ======

export const uppercaseLetterQuestions: Question[] = [
  { id: 'ul-1', prompt: 'Find the letter A', visual: 'A', choices: ['A', 'B', 'D'], answer: 'A', skillIds: ['uppercase-letters'] },
  { id: 'ul-2', prompt: 'Find the letter M', visual: 'M', choices: ['N', 'M', 'W'], answer: 'M', skillIds: ['uppercase-letters'] },
  { id: 'ul-3', prompt: 'Find the letter S', visual: 'S', choices: ['S', 'Z', 'C'], answer: 'S', skillIds: ['uppercase-letters'] },
  { id: 'ul-4', prompt: 'Find the letter B', visual: 'B', choices: ['D', 'B', 'P'], answer: 'B', skillIds: ['uppercase-letters'] },
  { id: 'ul-5', prompt: 'Find the letter T', visual: 'T', choices: ['I', 'L', 'T'], answer: 'T', skillIds: ['uppercase-letters'] },
  { id: 'ul-6', prompt: 'Find the letter O', visual: 'O', choices: ['O', 'Q', 'C'], answer: 'O', skillIds: ['uppercase-letters'] },
];

export const lowercaseLetterQuestions: Question[] = [
  { id: 'll-1', prompt: 'Match: A goes with...', choices: ['a', 'b', 'c'], answer: 'a', skillIds: ['lowercase-letters'] },
  { id: 'll-2', prompt: 'Match: B goes with...', choices: ['d', 'b', 'p'], answer: 'b', skillIds: ['lowercase-letters'] },
  { id: 'll-3', prompt: 'Match: D goes with...', choices: ['b', 'p', 'd'], answer: 'd', skillIds: ['lowercase-letters'] },
  { id: 'll-4', prompt: 'Match: G goes with...', choices: ['g', 'q', 'p'], answer: 'g', skillIds: ['lowercase-letters'] },
  { id: 'll-5', prompt: 'Match: R goes with...', choices: ['n', 'r', 'm'], answer: 'r', skillIds: ['lowercase-letters'] },
  { id: 'll-6', prompt: 'Match: S goes with...', choices: ['z', 'c', 's'], answer: 's', skillIds: ['lowercase-letters'] },
];

export const beginningSoundsQuestions: Question[] = [
  { id: 'bs-1', prompt: '🐱 Cat starts with...', speakText: 'Cat starts with what letter?', emoji: '🐱', choices: ['C', 'K', 'S'], answer: 'C', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-2', prompt: '🐶 Dog starts with...', speakText: 'Dog starts with what letter?', emoji: '🐶', choices: ['B', 'D', 'G'], answer: 'D', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-3', prompt: '🐟 Fish starts with...', speakText: 'Fish starts with what letter?', emoji: '🐟', choices: ['F', 'P', 'S'], answer: 'F', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-4', prompt: '🌙 Moon starts with...', speakText: 'Moon starts with what letter?', emoji: '🌙', choices: ['N', 'M', 'W'], answer: 'M', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-5', prompt: '☀️ Sun starts with...', speakText: 'Sun starts with what letter?', emoji: '☀️', choices: ['S', 'Z', 'C'], answer: 'S', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-6', prompt: '🐝 Bee starts with...', speakText: 'Bee starts with what letter?', emoji: '🐝', choices: ['P', 'D', 'B'], answer: 'B', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-7', prompt: '🌳 Tree starts with...', speakText: 'Tree starts with what letter?', emoji: '🌳', choices: ['T', 'D', 'P'], answer: 'T', skillIds: ['beginning-sounds', 'letter-sounds'] },
  { id: 'bs-8', prompt: '🍕 Pizza starts with...', speakText: 'Pizza starts with what letter?', emoji: '🍕', choices: ['B', 'P', 'D'], answer: 'P', skillIds: ['beginning-sounds', 'letter-sounds'] },
];

export const rhymingQuestions: Question[] = [
  { id: 'rh-1', prompt: 'What rhymes with CAT?', speakText: 'What rhymes with cat?', emoji: '🐱', choices: ['Hat', 'Dog', 'Cup'], answer: 'Hat', skillIds: ['rhyming'] },
  { id: 'rh-2', prompt: 'What rhymes with DOG?', speakText: 'What rhymes with dog?', emoji: '🐶', choices: ['Cat', 'Log', 'Pen'], answer: 'Log', skillIds: ['rhyming'] },
  { id: 'rh-3', prompt: 'What rhymes with SUN?', speakText: 'What rhymes with sun?', emoji: '☀️', choices: ['Fun', 'Sad', 'Big'], answer: 'Fun', skillIds: ['rhyming'] },
  { id: 'rh-4', prompt: 'What rhymes with FISH?', speakText: 'What rhymes with fish?', emoji: '🐟', choices: ['Bird', 'Dish', 'Tree'], answer: 'Dish', skillIds: ['rhyming'] },
  { id: 'rh-5', prompt: 'What rhymes with BEE?', speakText: 'What rhymes with bee?', emoji: '🐝', choices: ['Tree', 'Bug', 'Fly'], answer: 'Tree', skillIds: ['rhyming'] },
  { id: 'rh-6', prompt: 'What rhymes with STAR?', speakText: 'What rhymes with star?', emoji: '⭐', choices: ['Moon', 'Car', 'Sky'], answer: 'Car', skillIds: ['rhyming'] },
];

export const simpleWordsQuestions: Question[] = [
  { id: 'sw-1', prompt: 'What word is this?', visual: 'C-A-T', emoji: '🐱', choices: ['Cat', 'Bat', 'Hat'], answer: 'Cat', skillIds: ['cvc-words'] },
  { id: 'sw-2', prompt: 'What word is this?', visual: 'D-O-G', emoji: '🐶', choices: ['Dig', 'Dog', 'Dot'], answer: 'Dog', skillIds: ['cvc-words'] },
  { id: 'sw-3', prompt: 'What word is this?', visual: 'S-U-N', emoji: '☀️', choices: ['Sun', 'Run', 'Fun'], answer: 'Sun', skillIds: ['cvc-words'] },
  { id: 'sw-4', prompt: 'What word is this?', visual: 'B-U-G', emoji: '🐛', choices: ['Bag', 'Big', 'Bug'], answer: 'Bug', skillIds: ['cvc-words'] },
  { id: 'sw-5', prompt: 'What word is this?', visual: 'H-A-T', emoji: '🎩', choices: ['Hot', 'Hat', 'Hit'], answer: 'Hat', skillIds: ['cvc-words'] },
  { id: 'sw-6', prompt: 'What word is this?', visual: 'P-I-G', emoji: '🐷', choices: ['Pig', 'Pug', 'Peg'], answer: 'Pig', skillIds: ['cvc-words'] },
];

export const sightWordsQuestions: Question[] = [
  { id: 'stw-1', prompt: 'Find the word: THE', choices: ['the', 'ten', 'hen'], answer: 'the', skillIds: ['sight-words'] },
  { id: 'stw-2', prompt: 'Find the word: AND', choices: ['and', 'ant', 'add'], answer: 'and', skillIds: ['sight-words'] },
  { id: 'stw-3', prompt: 'Find the word: IS', choices: ['it', 'is', 'in'], answer: 'is', skillIds: ['sight-words'] },
  { id: 'stw-4', prompt: 'Find the word: CAN', choices: ['can', 'cat', 'car'], answer: 'can', skillIds: ['sight-words'] },
  { id: 'stw-5', prompt: 'Find the word: SEE', choices: ['she', 'see', 'say'], answer: 'see', skillIds: ['sight-words'] },
  { id: 'stw-6', prompt: 'Find the word: GO', choices: ['go', 'do', 'no'], answer: 'go', skillIds: ['sight-words'] },
];

// ====== SCIENCE EXPLORERS ======

export const sinkOrFloatQuestions: Question[] = [
  { id: 'sf-1', prompt: 'Will a rock sink or float?', emoji: '🪨', choices: ['Sink', 'Float'], answer: 'Sink', skillIds: ['sink-float'] },
  { id: 'sf-2', prompt: 'Will a ball float or sink?', emoji: '⚽', choices: ['Sink', 'Float'], answer: 'Float', skillIds: ['sink-float'] },
  { id: 'sf-3', prompt: 'Will a leaf float or sink?', emoji: '🍂', choices: ['Sink', 'Float'], answer: 'Float', skillIds: ['sink-float'] },
  { id: 'sf-4', prompt: 'Will a key sink or float?', emoji: '🔑', choices: ['Sink', 'Float'], answer: 'Sink', skillIds: ['sink-float'] },
  { id: 'sf-5', prompt: 'Will a duck float or sink?', emoji: '🦆', choices: ['Sink', 'Float'], answer: 'Float', skillIds: ['sink-float'] },
  { id: 'sf-6', prompt: 'Will a coin sink or float?', emoji: '🪙', choices: ['Sink', 'Float'], answer: 'Sink', skillIds: ['sink-float'] },
];

export const animalHomesQuestions: Question[] = [
  { id: 'ah-1', prompt: 'Where does a fish live?', emoji: '🐟', choices: ['Water', 'Tree', 'Cave'], answer: 'Water', skillIds: ['animal-homes'] },
  { id: 'ah-2', prompt: 'Where does a bird live?', emoji: '🐦', choices: ['Water', 'Nest', 'Underground'], answer: 'Nest', skillIds: ['animal-homes'] },
  { id: 'ah-3', prompt: 'Where does a bear live?', emoji: '🐻', choices: ['Nest', 'Cave', 'Water'], answer: 'Cave', skillIds: ['animal-homes'] },
  { id: 'ah-4', prompt: 'Where does a rabbit live?', emoji: '🐰', choices: ['Burrow', 'Tree', 'Water'], answer: 'Burrow', skillIds: ['animal-homes'] },
  { id: 'ah-5', prompt: 'Where does a bee live?', emoji: '🐝', choices: ['Water', 'Cave', 'Hive'], answer: 'Hive', skillIds: ['animal-homes'] },
  { id: 'ah-6', prompt: 'Where does a squirrel live?', emoji: '🐿️', choices: ['Tree', 'Water', 'Hive'], answer: 'Tree', skillIds: ['animal-homes'] },
];

export const weatherQuestions: Question[] = [
  { id: 'wt-1', prompt: 'It\'s raining! What do you need?', emoji: '🌧️', choices: ['Umbrella ☂️', 'Sunglasses 🕶️', 'Shorts 🩳'], answer: 'Umbrella ☂️', skillIds: ['weather'] },
  { id: 'wt-2', prompt: 'It\'s sunny! What do you wear?', emoji: '☀️', choices: ['Winter coat 🧥', 'Sunglasses 🕶️', 'Rain boots 🥾'], answer: 'Sunglasses 🕶️', skillIds: ['weather'] },
  { id: 'wt-3', prompt: 'It\'s snowing! What do you need?', emoji: '❄️', choices: ['T-shirt 👕', 'Warm coat 🧥', 'Swim suit 🩱'], answer: 'Warm coat 🧥', skillIds: ['weather'] },
  { id: 'wt-4', prompt: 'It\'s windy! What might fly away?', emoji: '💨', choices: ['Rock 🪨', 'Hat 🎩', 'House 🏠'], answer: 'Hat 🎩', skillIds: ['weather'] },
  { id: 'wt-5', prompt: 'What season has snow?', emoji: '⛄', choices: ['Summer', 'Winter', 'Spring'], answer: 'Winter', skillIds: ['weather'] },
  { id: 'wt-6', prompt: 'What season has flowers?', emoji: '🌷', choices: ['Winter', 'Spring', 'Fall'], answer: 'Spring', skillIds: ['weather'] },
];

export const fiveSensesQuestions: Question[] = [
  { id: 'fs-1', prompt: 'We see with our...', emoji: '👀', choices: ['Eyes', 'Ears', 'Nose'], answer: 'Eyes', skillIds: ['five-senses'] },
  { id: 'fs-2', prompt: 'We hear with our...', emoji: '👂', choices: ['Eyes', 'Ears', 'Hands'], answer: 'Ears', skillIds: ['five-senses'] },
  { id: 'fs-3', prompt: 'We smell with our...', emoji: '👃', choices: ['Nose', 'Mouth', 'Ears'], answer: 'Nose', skillIds: ['five-senses'] },
  { id: 'fs-4', prompt: 'We taste with our...', emoji: '👅', choices: ['Nose', 'Eyes', 'Tongue'], answer: 'Tongue', skillIds: ['five-senses'] },
  { id: 'fs-5', prompt: 'We touch with our...', emoji: '🤚', choices: ['Ears', 'Hands', 'Eyes'], answer: 'Hands', skillIds: ['five-senses'] },
  { id: 'fs-6', prompt: 'Which sense helps you hear music?', emoji: '🎵', choices: ['Sight', 'Hearing', 'Smell'], answer: 'Hearing', skillIds: ['five-senses'] },
];

export const plantGrowthQuestions: Question[] = [
  { id: 'pg-1', prompt: 'What does a plant need to grow?', emoji: '🌱', choices: ['Water 💧', 'Candy 🍬', 'Toys 🧸'], answer: 'Water 💧', skillIds: ['plant-growth'] },
  { id: 'pg-2', prompt: 'What grows from a seed?', emoji: '🌰', choices: ['A plant 🌱', 'A rock 🪨', 'A star ⭐'], answer: 'A plant 🌱', skillIds: ['plant-growth'] },
  { id: 'pg-3', prompt: 'Plants need sunlight and...', emoji: '☀️', choices: ['Water', 'Snow', 'Darkness'], answer: 'Water', skillIds: ['plant-growth'] },
  { id: 'pg-4', prompt: 'Where do plants grow?', emoji: '🌿', choices: ['In soil', 'In the sky', 'On stars'], answer: 'In soil', skillIds: ['plant-growth'] },
  { id: 'pg-5', prompt: 'What comes first?', emoji: '🌱', choices: ['Seed', 'Flower', 'Tree'], answer: 'Seed', skillIds: ['plant-growth'] },
  { id: 'pg-6', prompt: 'What is the green part of a plant?', emoji: '🌿', choices: ['Leaf', 'Root', 'Seed'], answer: 'Leaf', skillIds: ['plant-growth'] },
];

export const dayNightQuestions: Question[] = [
  { id: 'dn-1', prompt: 'When do we see the sun?', emoji: '☀️', choices: ['Day', 'Night'], answer: 'Day', skillIds: ['day-night'] },
  { id: 'dn-2', prompt: 'When do we see stars?', emoji: '⭐', choices: ['Day', 'Night'], answer: 'Night', skillIds: ['day-night'] },
  { id: 'dn-3', prompt: 'When do we sleep?', emoji: '😴', choices: ['Day', 'Night'], answer: 'Night', skillIds: ['day-night'] },
  { id: 'dn-4', prompt: 'When do we go to school?', emoji: '🏫', choices: ['Day', 'Night'], answer: 'Day', skillIds: ['day-night'] },
  { id: 'dn-5', prompt: 'When is the moon bright?', emoji: '🌙', choices: ['Day', 'Night'], answer: 'Night', skillIds: ['day-night'] },
  { id: 'dn-6', prompt: 'When do birds sing?', emoji: '🐦', choices: ['Day', 'Night'], answer: 'Day', skillIds: ['day-night'] },
];

export const livingNonlivingQuestions: Question[] = [
  { id: 'ln-1', prompt: 'Is a dog living or non-living?', emoji: '🐶', choices: ['Living', 'Non-living'], answer: 'Living', skillIds: ['living-nonliving'] },
  { id: 'ln-2', prompt: 'Is a rock living or non-living?', emoji: '🪨', choices: ['Living', 'Non-living'], answer: 'Non-living', skillIds: ['living-nonliving'] },
  { id: 'ln-3', prompt: 'Is a tree living or non-living?', emoji: '🌳', choices: ['Living', 'Non-living'], answer: 'Living', skillIds: ['living-nonliving'] },
  { id: 'ln-4', prompt: 'Is a car living or non-living?', emoji: '🚗', choices: ['Living', 'Non-living'], answer: 'Non-living', skillIds: ['living-nonliving'] },
  { id: 'ln-5', prompt: 'Is a flower living or non-living?', emoji: '🌸', choices: ['Living', 'Non-living'], answer: 'Living', skillIds: ['living-nonliving'] },
  { id: 'ln-6', prompt: 'Is a chair living or non-living?', emoji: '🪑', choices: ['Living', 'Non-living'], answer: 'Non-living', skillIds: ['living-nonliving'] },
];

// ====== SHAPES & COLORS STUDIO ======

export const shapeMatchingQuestions: Question[] = [
  { id: 'sm-1', prompt: 'What shape is this?', visual: '⬜', choices: ['Circle', 'Square', 'Triangle'], answer: 'Square', skillIds: ['shape-recognition'] },
  { id: 'sm-2', prompt: 'What shape is this?', visual: '🔴', choices: ['Circle', 'Square', 'Star'], answer: 'Circle', skillIds: ['shape-recognition'] },
  { id: 'sm-3', prompt: 'What shape is this?', visual: '🔺', choices: ['Circle', 'Square', 'Triangle'], answer: 'Triangle', skillIds: ['shape-recognition'] },
  { id: 'sm-4', prompt: 'What shape is this?', visual: '⭐', choices: ['Heart', 'Star', 'Diamond'], answer: 'Star', skillIds: ['shape-recognition'] },
  { id: 'sm-5', prompt: 'What shape is this?', visual: '💎', choices: ['Triangle', 'Diamond', 'Square'], answer: 'Diamond', skillIds: ['shape-recognition'] },
  { id: 'sm-6', prompt: 'What shape is this?', visual: '❤️', choices: ['Circle', 'Star', 'Heart'], answer: 'Heart', skillIds: ['shape-recognition'] },
];

export const colorMatchingQuestions: Question[] = [
  { id: 'cm-1', prompt: 'What color is this?', visual: '🟥', choices: ['Red', 'Blue', 'Green'], answer: 'Red', skillIds: ['color-recognition'] },
  { id: 'cm-2', prompt: 'What color is this?', visual: '🟦', choices: ['Red', 'Blue', 'Yellow'], answer: 'Blue', skillIds: ['color-recognition'] },
  { id: 'cm-3', prompt: 'What color is this?', visual: '🟩', choices: ['Green', 'Blue', 'Red'], answer: 'Green', skillIds: ['color-recognition'] },
  { id: 'cm-4', prompt: 'What color is this?', visual: '🟨', choices: ['Red', 'Green', 'Yellow'], answer: 'Yellow', skillIds: ['color-recognition'] },
  { id: 'cm-5', prompt: 'What color is this?', visual: '🟧', choices: ['Orange', 'Red', 'Yellow'], answer: 'Orange', skillIds: ['color-recognition'] },
  { id: 'cm-6', prompt: 'What color is this?', visual: '🟪', choices: ['Blue', 'Purple', 'Pink'], answer: 'Purple', skillIds: ['color-recognition'] },
];

export const patternQuestions: Question[] = [
  { id: 'pt-1', prompt: '🔴🔵🔴🔵🔴 ... what comes next?', speakText: 'Red blue red blue red. What comes next?', choices: ['🔴', '🔵', '🟢'], answer: '🔵', skillIds: ['patterns'] },
  { id: 'pt-2', prompt: '⭐⭐🌙⭐⭐🌙⭐⭐ ... what comes next?', speakText: 'Star star moon star star moon star star. What comes next?', choices: ['⭐', '🌙', '☀️'], answer: '🌙', skillIds: ['patterns'] },
  { id: 'pt-3', prompt: '🍎🍌🍎🍌🍎 ... what comes next?', speakText: 'Apple banana apple banana apple. What comes next?', choices: ['🍎', '🍌', '🍇'], answer: '🍌', skillIds: ['patterns'] },
  { id: 'pt-4', prompt: '🐶🐱🐶🐱🐶 ... what comes next?', speakText: 'Dog cat dog cat dog. What comes next?', choices: ['🐶', '🐱', '🐦'], answer: '🐱', skillIds: ['patterns'] },
  { id: 'pt-5', prompt: '🟢🟢🔴🟢🟢🔴🟢🟢 ... what comes next?', speakText: 'Green green red green green red green green. What comes next?', choices: ['🟢', '🔴', '🔵'], answer: '🔴', skillIds: ['patterns'] },
  { id: 'pt-6', prompt: '🔵🔵🔵🟡🔵🔵🔵 ... what comes next?', speakText: 'Blue blue blue yellow blue blue blue. What comes next?', choices: ['🔵', '🟡', '🔴'], answer: '🟡', skillIds: ['patterns'] },
];

export const sortingShapesQuestions: Question[] = [
  { id: 'ss-1', prompt: 'Which one is a circle?', choices: ['⬜', '🔴', '🔺'], answer: '🔴', skillIds: ['shape-recognition', 'sorting'] },
  { id: 'ss-2', prompt: 'Which one is NOT a shape?', choices: ['⬜', '🐶', '🔺'], answer: '🐶', skillIds: ['shape-recognition', 'sorting'] },
  { id: 'ss-3', prompt: 'Which is the same shape as ⬜?', choices: ['🔴', '⬛', '🔺'], answer: '⬛', skillIds: ['shape-recognition', 'same-different'] },
  { id: 'ss-4', prompt: 'How many sides does a triangle have?', choices: ['2', '3', '4'], answer: '3', skillIds: ['shape-recognition'] },
  { id: 'ss-5', prompt: 'How many sides does a square have?', choices: ['3', '4', '5'], answer: '4', skillIds: ['shape-recognition'] },
  { id: 'ss-6', prompt: 'A circle has how many corners?', choices: ['0', '2', '4'], answer: '0', skillIds: ['shape-recognition'] },
];

export const realWorldShapesQuestions: Question[] = [
  { id: 'rws-1', prompt: 'What shape is a wheel?', emoji: '🛞', choices: ['Circle', 'Square', 'Triangle'], answer: 'Circle', skillIds: ['real-world-shapes'] },
  { id: 'rws-2', prompt: 'What shape is a window?', emoji: '🪟', choices: ['Circle', 'Square', 'Triangle'], answer: 'Square', skillIds: ['real-world-shapes'] },
  { id: 'rws-3', prompt: 'What shape is a pizza slice?', emoji: '🍕', choices: ['Circle', 'Square', 'Triangle'], answer: 'Triangle', skillIds: ['real-world-shapes'] },
  { id: 'rws-4', prompt: 'What shape is a clock?', emoji: '🕐', choices: ['Circle', 'Square', 'Star'], answer: 'Circle', skillIds: ['real-world-shapes'] },
  { id: 'rws-5', prompt: 'What shape is a door?', emoji: '🚪', choices: ['Circle', 'Rectangle', 'Triangle'], answer: 'Rectangle', skillIds: ['real-world-shapes'] },
  { id: 'rws-6', prompt: 'What shape is a stop sign?', emoji: '🛑', choices: ['Circle', 'Square', 'Octagon'], answer: 'Octagon', skillIds: ['real-world-shapes'] },
];

// ====== LOGIC PLAYGROUND ======

export const oddOneOutQuestions: Question[] = [
  { id: 'ooo-1', prompt: 'Which one does NOT belong?', visual: '🐱 🐶 🐟 🚗', choices: ['🐱', '🐶', '🐟', '🚗'], answer: '🚗', explanation: 'The car is not an animal!', skillIds: ['odd-one-out', 'categorizing'] },
  { id: 'ooo-2', prompt: 'Which one does NOT belong?', visual: '🍎 🍌 🍇 🚀', choices: ['🍎', '🍌', '🍇', '🚀'], answer: '🚀', explanation: 'The rocket is not a fruit!', skillIds: ['odd-one-out', 'categorizing'] },
  { id: 'ooo-3', prompt: 'Which one does NOT belong?', visual: '🔴 🔵 🟢 ⭐', choices: ['🔴', '🔵', '🟢', '⭐'], answer: '⭐', explanation: 'The star is not a circle!', skillIds: ['odd-one-out', 'categorizing'] },
  { id: 'ooo-4', prompt: 'Which one does NOT belong?', visual: '✈️ 🚗 🚌 🍎', choices: ['✈️', '🚗', '🚌', '🍎'], answer: '🍎', explanation: 'The apple is not a vehicle!', skillIds: ['odd-one-out', 'categorizing'] },
  { id: 'ooo-5', prompt: 'Which one does NOT belong?', visual: '🌸 🌹 🌻 🐕', choices: ['🌸', '🌹', '🌻', '🐕'], answer: '🐕', explanation: 'The dog is not a flower!', skillIds: ['odd-one-out', 'categorizing'] },
  { id: 'ooo-6', prompt: 'Which one does NOT belong?', visual: '2️⃣ 4️⃣ 🐱 6️⃣', choices: ['2️⃣', '4️⃣', '🐱', '6️⃣'], answer: '🐱', explanation: 'The cat is not a number!', skillIds: ['odd-one-out', 'categorizing'] },
];

export const sequenceQuestions: Question[] = [
  { id: 'sq-1', prompt: 'What comes first in the morning?', choices: ['Wake up', 'Go to school', 'Eat dinner'], answer: 'Wake up', skillIds: ['sequences'] },
  { id: 'sq-2', prompt: 'What do you do before eating?', choices: ['Wash hands', 'Go to bed', 'Play outside'], answer: 'Wash hands', skillIds: ['sequences'] },
  { id: 'sq-3', prompt: 'First plant a seed, then...', choices: ['Water it', 'Pick the fruit', 'Cut the tree'], answer: 'Water it', skillIds: ['sequences'] },
  { id: 'sq-4', prompt: 'What comes after 1, 2, 3?', choices: ['5', '4', '6'], answer: '4', skillIds: ['sequences', 'number-order'] },
  { id: 'sq-5', prompt: 'What comes after Monday?', choices: ['Sunday', 'Tuesday', 'Wednesday'], answer: 'Tuesday', skillIds: ['sequences'] },
  { id: 'sq-6', prompt: 'To make a sandwich: first get bread, then...', choices: ['Eat it', 'Add filling', 'Throw it away'], answer: 'Add filling', skillIds: ['sequences'] },
];

export const sameDifferentQuestions: Question[] = [
  { id: 'sd-1', prompt: 'Which two are the SAME?', visual: '🐱 🐶 🐱', choices: ['🐱 and 🐱', '🐱 and 🐶', '🐶 and 🐶'], answer: '🐱 and 🐱', skillIds: ['same-different'] },
  { id: 'sd-2', prompt: 'Which is DIFFERENT?', visual: '🔴 🔴 🔵', choices: ['First 🔴', 'Second 🔴', '🔵'], answer: '🔵', skillIds: ['same-different'] },
  { id: 'sd-3', prompt: 'Which two are the SAME?', visual: '⭐ 🌙 ⭐', choices: ['⭐ and ⭐', '⭐ and 🌙', '🌙 and 🌙'], answer: '⭐ and ⭐', skillIds: ['same-different'] },
  { id: 'sd-4', prompt: 'Which is DIFFERENT?', visual: '🍎 🍎 🍌', choices: ['First 🍎', 'Second 🍎', '🍌'], answer: '🍌', skillIds: ['same-different'] },
  { id: 'sd-5', prompt: 'Which two are the SAME size?', visual: 'Big 🐶 Small 🐶 Big 🐶', choices: ['Big and Big', 'Big and Small', 'Small and Small'], answer: 'Big and Big', skillIds: ['same-different', 'size-comparison'] },
  { id: 'sd-6', prompt: 'Which is DIFFERENT?', visual: '🟢 🟢 🟢 🔴', choices: ['First 🟢', 'Last one 🔴', 'Third 🟢'], answer: 'Last one 🔴', skillIds: ['same-different'] },
];

// ====== DAILY LIFE SKILLS ======

export const healthyFoodQuestions: Question[] = [
  { id: 'hf-1', prompt: 'Which is healthier?', choices: ['🍎 Apple', '🍬 Candy'], answer: '🍎 Apple', skillIds: ['healthy-food'] },
  { id: 'hf-2', prompt: 'Which is healthier?', choices: ['🥕 Carrot', '🍰 Cake'], answer: '🥕 Carrot', skillIds: ['healthy-food'] },
  { id: 'hf-3', prompt: 'Which is a fruit?', choices: ['🍌 Banana', '🍕 Pizza', '🍟 Fries'], answer: '🍌 Banana', skillIds: ['healthy-food'] },
  { id: 'hf-4', prompt: 'Which helps you grow strong?', choices: ['🥛 Milk', '🍭 Lollipop', '🧁 Cupcake'], answer: '🥛 Milk', skillIds: ['healthy-food'] },
  { id: 'hf-5', prompt: 'Which is a vegetable?', choices: ['🥦 Broccoli', '🍩 Donut', '🎂 Cake'], answer: '🥦 Broccoli', skillIds: ['healthy-food'] },
  { id: 'hf-6', prompt: 'What should you drink the most?', choices: ['🥤 Soda', '💧 Water', '🧃 Juice'], answer: '💧 Water', skillIds: ['healthy-food'] },
];

export const emotionsQuestions: Question[] = [
  { id: 'em-1', prompt: 'How does this face feel?', emoji: '😊', choices: ['Happy', 'Sad', 'Angry'], answer: 'Happy', skillIds: ['emotions'] },
  { id: 'em-2', prompt: 'How does this face feel?', emoji: '😢', choices: ['Happy', 'Sad', 'Surprised'], answer: 'Sad', skillIds: ['emotions'] },
  { id: 'em-3', prompt: 'How does this face feel?', emoji: '😠', choices: ['Happy', 'Scared', 'Angry'], answer: 'Angry', skillIds: ['emotions'] },
  { id: 'em-4', prompt: 'How does this face feel?', emoji: '😮', choices: ['Sad', 'Angry', 'Surprised'], answer: 'Surprised', skillIds: ['emotions'] },
  { id: 'em-5', prompt: 'How does this face feel?', emoji: '😨', choices: ['Happy', 'Scared', 'Angry'], answer: 'Scared', skillIds: ['emotions'] },
  { id: 'em-6', prompt: 'You get a present! How do you feel?', emoji: '🎁', choices: ['Happy', 'Sad', 'Angry'], answer: 'Happy', skillIds: ['emotions'] },
];

export const safetyQuestions: Question[] = [
  { id: 'sf2-1', prompt: 'Before crossing the street, you should...', emoji: '🚸', choices: ['Run fast', 'Look both ways', 'Close eyes'], answer: 'Look both ways', skillIds: ['safety'] },
  { id: 'sf2-2', prompt: 'If you see fire, what should you do?', emoji: '🔥', choices: ['Touch it', 'Tell an adult', 'Hide'], answer: 'Tell an adult', skillIds: ['safety'] },
  { id: 'sf2-3', prompt: 'When riding a bike, you should wear a...', emoji: '🚲', choices: ['Hat 🎩', 'Helmet ⛑️', 'Crown 👑'], answer: 'Helmet ⛑️', skillIds: ['safety'] },
  { id: 'sf2-4', prompt: 'A stranger offers you candy. What do you do?', emoji: '🍬', choices: ['Take it', 'Say no, tell an adult', 'Follow them'], answer: 'Say no, tell an adult', skillIds: ['safety'] },
  { id: 'sf2-5', prompt: 'What color means STOP?', emoji: '🚦', choices: ['Green', 'Red', 'Blue'], answer: 'Red', skillIds: ['safety'] },
  { id: 'sf2-6', prompt: 'If you feel lost, who should you find?', emoji: '👮', choices: ['A police officer', 'Another kid', 'Nobody'], answer: 'A police officer', skillIds: ['safety'] },
];

export const routinesQuestions: Question[] = [
  { id: 'rt-1', prompt: 'When do you brush your teeth?', emoji: '🪥', choices: ['Morning & night', 'Only Monday', 'Never'], answer: 'Morning & night', skillIds: ['routines', 'good-habits'] },
  { id: 'rt-2', prompt: 'What do you do before bed?', emoji: '🛏️', choices: ['Brush teeth', 'Play outside', 'Eat candy'], answer: 'Brush teeth', skillIds: ['routines'] },
  { id: 'rt-3', prompt: 'When do you eat breakfast?', emoji: '🥣', choices: ['Morning', 'Night', 'Afternoon'], answer: 'Morning', skillIds: ['routines'] },
  { id: 'rt-4', prompt: 'After playing outside, you should...', emoji: '🧼', choices: ['Watch TV', 'Wash hands', 'Go to bed'], answer: 'Wash hands', skillIds: ['routines', 'good-habits'] },
  { id: 'rt-5', prompt: 'What helps you sleep well?', emoji: '😴', choices: ['Sugar', 'Dark quiet room', 'Loud music'], answer: 'Dark quiet room', skillIds: ['routines'] },
  { id: 'rt-6', prompt: 'When do we take a bath?', emoji: '🛁', choices: ['Every day', 'Once a year', 'Never'], answer: 'Every day', skillIds: ['routines', 'good-habits'] },
];

export const friendshipQuestions: Question[] = [
  { id: 'fr-1', prompt: 'Your friend is sad. What should you do?', emoji: '🤝', choices: ['Laugh at them', 'Ask if they\'re okay', 'Walk away'], answer: 'Ask if they\'re okay', skillIds: ['friendship', 'emotions'] },
  { id: 'fr-2', prompt: 'Someone shares a toy with you. What do you say?', emoji: '🧸', choices: ['Thank you!', 'Give me more!', 'Nothing'], answer: 'Thank you!', skillIds: ['friendship', 'good-habits'] },
  { id: 'fr-3', prompt: 'How do you make a new friend?', emoji: '👋', choices: ['Say hi and play together', 'Take their toy', 'Ignore them'], answer: 'Say hi and play together', skillIds: ['friendship'] },
  { id: 'fr-4', prompt: 'Is it kind to share?', emoji: '🤲', choices: ['Yes!', 'No', 'Only sometimes'], answer: 'Yes!', skillIds: ['friendship', 'good-habits'] },
  { id: 'fr-5', prompt: 'Your friend wants to play something different. What do you do?', emoji: '🎮', choices: ['Take turns choosing', 'Only play your game', 'Get angry'], answer: 'Take turns choosing', skillIds: ['friendship'] },
  { id: 'fr-6', prompt: 'What makes a good friend?', emoji: '💛', choices: ['Being kind', 'Being mean', 'Being bossy'], answer: 'Being kind', skillIds: ['friendship'] },
];

// ====== TRUCKS & CARS ======

export const truckNamesQuestions: Question[] = [
  { id: 'tn-1', prompt: 'This truck fights fires!', emoji: '🚒', choices: ['Fire Truck', 'Dump Truck', 'Tow Truck'], answer: 'Fire Truck', skillIds: ['vehicle-recognition'] },
  { id: 'tn-2', prompt: 'This truck carries dirt!', emoji: '🚜', choices: ['Fire Truck', 'Dump Truck', 'Ice Cream Truck'], answer: 'Dump Truck', skillIds: ['vehicle-recognition'] },
  { id: 'tn-3', prompt: 'This truck picks up trash!', emoji: '🚛', choices: ['Garbage Truck', 'Mail Truck', 'Dump Truck'], answer: 'Garbage Truck', skillIds: ['vehicle-recognition'] },
  { id: 'tn-4', prompt: 'This vehicle takes kids to school!', emoji: '🚌', choices: ['Fire Truck', 'School Bus', 'Police Car'], answer: 'School Bus', skillIds: ['vehicle-recognition'] },
  { id: 'tn-5', prompt: 'This car helps catch bad guys!', emoji: '🚓', choices: ['Taxi', 'Ambulance', 'Police Car'], answer: 'Police Car', skillIds: ['vehicle-recognition'] },
  { id: 'tn-6', prompt: 'This vehicle helps sick people!', emoji: '🚑', choices: ['School Bus', 'Ambulance', 'Taxi'], answer: 'Ambulance', skillIds: ['vehicle-recognition'] },
];

export const vehicleCountingQuestions: Question[] = [
  { id: 'vc-1', prompt: 'How many trucks?', visual: '🚗🚗🚗', choices: ['2', '3', '4'], answer: '3', skillIds: ['vehicle-counting', 'counting'] },
  { id: 'vc-2', prompt: 'How many buses?', visual: '🚌🚌🚌🚌🚌', choices: ['4', '5', '6'], answer: '5', skillIds: ['vehicle-counting', 'counting'] },
  { id: 'vc-3', prompt: 'How many fire trucks?', visual: '🚒🚒', choices: ['1', '2', '3'], answer: '2', skillIds: ['vehicle-counting', 'counting'] },
  { id: 'vc-4', prompt: 'How many cars?', visual: '🚗🚗🚗🚗🚗🚗', choices: ['5', '6', '7'], answer: '6', skillIds: ['vehicle-counting', 'counting'] },
  { id: 'vc-5', prompt: 'How many bikes?', visual: '🚲🚲🚲🚲', choices: ['3', '4', '5'], answer: '4', skillIds: ['vehicle-counting', 'counting'] },
  { id: 'vc-6', prompt: 'How many helicopters?', visual: '🚁🚁🚁🚁🚁🚁🚁', choices: ['6', '7', '8'], answer: '7', skillIds: ['vehicle-counting', 'counting'] },
];

export const vehicleSoundsQuestions: Question[] = [
  { id: 'vs-1', prompt: 'BEEP BEEP! What makes this sound?', choices: ['Car horn 🚗', 'Dog 🐶', 'Clock ⏰'], answer: 'Car horn 🚗', skillIds: ['vehicle-sounds'] },
  { id: 'vs-2', prompt: 'WEE-OOH WEE-OOH! What makes this sound?', choices: ['Cat 🐱', 'Fire truck 🚒', 'Bird 🐦'], answer: 'Fire truck 🚒', skillIds: ['vehicle-sounds'] },
  { id: 'vs-3', prompt: 'CHOO CHOO! What makes this sound?', choices: ['Plane ✈️', 'Train 🚂', 'Car 🚗'], answer: 'Train 🚂', skillIds: ['vehicle-sounds'] },
  { id: 'vs-4', prompt: 'VROOM VROOM! What makes this sound?', choices: ['Race car 🏎️', 'Boat ⛵', 'Bike 🚲'], answer: 'Race car 🏎️', skillIds: ['vehicle-sounds'] },
  { id: 'vs-5', prompt: 'HONK HONK! What makes this sound?', choices: ['Truck 🚛', 'Fish 🐟', 'Cloud ☁️'], answer: 'Truck 🚛', skillIds: ['vehicle-sounds'] },
  { id: 'vs-6', prompt: 'WHOOSH! What makes this sound?', choices: ['Rock 🪨', 'Airplane ✈️', 'House 🏠'], answer: 'Airplane ✈️', skillIds: ['vehicle-sounds'] },
];

export const vehicleJobsQuestions: Question[] = [
  { id: 'vj-1', prompt: 'Which vehicle delivers mail?', emoji: '📬', choices: ['Mail truck', 'Fire truck', 'School bus'], answer: 'Mail truck', skillIds: ['vehicle-jobs'] },
  { id: 'vj-2', prompt: 'Which vehicle puts out fires?', emoji: '🔥', choices: ['Police car', 'Fire truck', 'Taxi'], answer: 'Fire truck', skillIds: ['vehicle-jobs'] },
  { id: 'vj-3', prompt: 'Which vehicle takes you to the hospital?', emoji: '🏥', choices: ['School bus', 'Garbage truck', 'Ambulance'], answer: 'Ambulance', skillIds: ['vehicle-jobs'] },
  { id: 'vj-4', prompt: 'Which vehicle builds roads?', emoji: '🛣️', choices: ['Bulldozer', 'Bicycle', 'Airplane'], answer: 'Bulldozer', skillIds: ['vehicle-jobs'] },
  { id: 'vj-5', prompt: 'Which vehicle flies in the sky?', emoji: '🌤️', choices: ['Boat', 'Airplane', 'Train'], answer: 'Airplane', skillIds: ['vehicle-jobs'] },
  { id: 'vj-6', prompt: 'Which vehicle carries things across water?', emoji: '🌊', choices: ['Truck', 'Boat', 'Helicopter'], answer: 'Boat', skillIds: ['vehicle-jobs'] },
];

export const vehicleSizeQuestions: Question[] = [
  { id: 'vsize-1', prompt: 'Which is BIGGER?', choices: ['🚗 Car', '🚌 Bus'], answer: '🚌 Bus', skillIds: ['size-comparison', 'vehicle-recognition'] },
  { id: 'vsize-2', prompt: 'Which is SMALLER?', choices: ['🚲 Bicycle', '🚛 Truck'], answer: '🚲 Bicycle', skillIds: ['size-comparison', 'vehicle-recognition'] },
  { id: 'vsize-3', prompt: 'Which is the BIGGEST?', choices: ['🚗 Car', '✈️ Airplane', '🚲 Bike'], answer: '✈️ Airplane', skillIds: ['size-comparison', 'vehicle-recognition'] },
  { id: 'vsize-4', prompt: 'Which is the SMALLEST?', choices: ['🛴 Scooter', '🚌 Bus', '🚂 Train'], answer: '🛴 Scooter', skillIds: ['size-comparison', 'vehicle-recognition'] },
  { id: 'vsize-5', prompt: 'Which is BIGGER?', choices: ['🏍️ Motorcycle', '🚁 Helicopter'], answer: '🚁 Helicopter', skillIds: ['size-comparison', 'vehicle-recognition'] },
  { id: 'vsize-6', prompt: 'Which is the BIGGEST?', choices: ['🚗 Car', '🚢 Ship', '🚌 Bus'], answer: '🚢 Ship', skillIds: ['size-comparison', 'vehicle-recognition'] },
];
