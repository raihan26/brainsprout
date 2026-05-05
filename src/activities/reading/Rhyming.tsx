import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'r1', prompt: 'Which word rhymes with CAT?', emoji: '🐱', choices: ['Hat', 'Dog', 'Sun'], answer: 'Hat' },
  { id: 'r2', prompt: 'Which word rhymes with DOG?', emoji: '🐶', choices: ['Log', 'Cat', 'Cup'], answer: 'Log' },
  { id: 'r3', prompt: 'Which word rhymes with BEE?', emoji: '🐝', choices: ['Tree', 'Cat', 'Hat'], answer: 'Tree' },
  { id: 'r4', prompt: 'Which word rhymes with SUN?', emoji: '☀️', choices: ['Run', 'Cat', 'Pig'], answer: 'Run' },
  { id: 'r5', prompt: 'Which word rhymes with CAR?', emoji: '🚗', choices: ['Star', 'Cup', 'Bee'], answer: 'Star' },
  { id: 'r6', prompt: 'Which word rhymes with FROG?', emoji: '🐸', choices: ['Log', 'Bee', 'Cup'], answer: 'Log' },
  { id: 'r7', prompt: 'Which word rhymes with BAT?', emoji: '🦇', choices: ['Mat', 'Pig', 'Bus'], answer: 'Mat' },
  { id: 'r8', prompt: 'Which word rhymes with PIG?', emoji: '🐷', choices: ['Wig', 'Cat', 'Sun'], answer: 'Wig' },
];
export default function Rhyming() {
  const grade = useGrade();
  return (
    <SectionLayout title="Rhyming Game" emoji="🎵" backTo={`/${grade}/reading`} speakText="Which word rhymes?">
      <QuestionRunner activityId="reading.rhyming" homePath="/reading" questions={QS} speakChoices numQuestions={6} />
    </SectionLayout>
  );
}
