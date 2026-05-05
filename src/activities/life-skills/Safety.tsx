import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 's1', prompt: 'A hot stove — what do we do?', emoji: '🍳', choices: ['🚫 Do not touch', '👋 Touch it', '🤚 Tap it'], answer: '🚫 Do not touch' },
  { id: 's2', prompt: 'Crossing the road — what do we do?', emoji: '🚸', choices: ['🤝 Hold an adult\'s hand', '🏃 Run alone', '🚗 Drive a car'], answer: '🤝 Hold an adult\'s hand' },
  { id: 's3', prompt: 'Riding a bike — what do we wear?', emoji: '🚲', choices: ['⛑️ Helmet', '🩴 Sandals', '🕶️ Sunglasses only'], answer: '⛑️ Helmet' },
  { id: 's4', prompt: 'Someone at the door — what do we do?', emoji: '🚪', choices: ['👨‍👩‍👧 Ask an adult', '🏃 Open it fast', '🙈 Hide forever'], answer: '👨‍👩‍👧 Ask an adult' },
  { id: 's5', prompt: 'In a car, we…', emoji: '🚗', choices: ['🪑 Buckle up', '🪟 Lean out the window', '🍿 Eat popcorn standing'], answer: '🪑 Buckle up' },
  { id: 's6', prompt: 'If you feel lost, you should…', emoji: '🗺️', choices: ['👮 Find a helper', '🏃 Run away', '😶 Stay quiet forever'], answer: '👮 Find a helper' },
  { id: 's7', prompt: 'At the pool, we…', emoji: '🏊', choices: ['👨‍👩‍👧 Stay with an adult', '🤿 Swim alone', '🎈 Float on a balloon'], answer: '👨‍👩‍👧 Stay with an adult' },
  { id: 's8', prompt: 'A hot drink — what do we do?', emoji: '☕', choices: ['🚫 Do not touch', '🤲 Carry it', '🥤 Drink fast'], answer: '🚫 Do not touch' },
];
export default function Safety() {
  const grade = useGrade();
  return (
    <SectionLayout title="Safety Basics" emoji="🦺" backTo={`/${grade}/life-skills`} speakText="Stay safe! Pick the safe choice.">
      <QuestionRunner activityId="life.safety" homePath="/life-skills" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
