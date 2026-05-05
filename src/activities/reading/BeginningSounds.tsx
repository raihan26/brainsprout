import QuestionRunner from '../../components/QuestionRunner';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'b1', prompt: 'Apple — what sound does it start with?', emoji: '🍎', choices: ['A', 'B', 'C'], answer: 'A' },
  { id: 'b2', prompt: 'Ball — what sound does it start with?', emoji: '⚽', choices: ['B', 'D', 'F'], answer: 'B' },
  { id: 'b3', prompt: 'Cat — what sound does it start with?', emoji: '🐱', choices: ['C', 'A', 'E'], answer: 'C' },
  { id: 'b4', prompt: 'Dog — what sound does it start with?', emoji: '🐶', choices: ['D', 'B', 'G'], answer: 'D' },
  { id: 'b5', prompt: 'Egg — what sound does it start with?', emoji: '🥚', choices: ['E', 'O', 'I'], answer: 'E' },
  { id: 'b6', prompt: 'Fish — what sound does it start with?', emoji: '🐟', choices: ['F', 'P', 'S'], answer: 'F' },
  { id: 'b7', prompt: 'Hat — what sound does it start with?', emoji: '🎩', choices: ['H', 'K', 'B'], answer: 'H' },
  { id: 'b8', prompt: 'Sun — what sound does it start with?', emoji: '☀️', choices: ['S', 'T', 'C'], answer: 'S' },
  { id: 'b9', prompt: 'Moon — what sound does it start with?', emoji: '🌙', choices: ['M', 'N', 'L'], answer: 'M' },
  { id: 'b10', prompt: 'Tree — what sound does it start with?', emoji: '🌳', choices: ['T', 'B', 'D'], answer: 'T' },
];

export default function BeginningSounds() {
  return (
    <SectionLayout title="Beginning Sounds" emoji="🔠" backTo="/reading" speakText="What sound does the word start with?">
      <QuestionRunner activityId="reading.sounds" homePath="/reading" questions={QS} speakChoices numQuestions={6} />
    </SectionLayout>
  );
}
