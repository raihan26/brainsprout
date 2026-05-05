import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'o1', prompt: 'Which one does not belong?', emoji: '🍎🍌🍇🚗', choices: ['🍎', '🍌', '🍇', '🚗'], answer: '🚗' },
  { id: 'o2', prompt: 'Which one does not belong?', emoji: '🐶🐱🐰🌳', choices: ['🐶', '🐱', '🐰', '🌳'], answer: '🌳' },
  { id: 'o3', prompt: 'Which one does not belong?', emoji: '🚗🚌✈️🍕', choices: ['🚗', '🚌', '✈️', '🍕'], answer: '🍕' },
  { id: 'o4', prompt: 'Which one does not belong?', emoji: '⚽🏀🏈🎂', choices: ['⚽', '🏀', '🏈', '🎂'], answer: '🎂' },
  { id: 'o5', prompt: 'Which one does not belong?', emoji: '☀️⭐🌙🐟', choices: ['☀️', '⭐', '🌙', '🐟'], answer: '🐟' },
  { id: 'o6', prompt: 'Which one does not belong?', emoji: '🎩🧢👒🦴', choices: ['🎩', '🧢', '👒', '🦴'], answer: '🦴' },
  { id: 'o7', prompt: 'Which one does not belong?', emoji: '🥕🥦🥬🍩', choices: ['🥕', '🥦', '🥬', '🍩'], answer: '🍩' },
  { id: 'o8', prompt: 'Which one does not belong?', emoji: '🐝🐞🦋🐬', choices: ['🐝', '🐞', '🦋', '🐬'], answer: '🐬' },
];
export default function OddOneOut() {
  const grade = useGrade();
  return (
    <SectionLayout title="Odd One Out" emoji="🤔" backTo={`/${grade}/logic`} speakText="Which one does not belong?">
      <QuestionRunner activityId="logic.odd" homePath="/logic" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
