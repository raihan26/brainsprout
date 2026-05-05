import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'g1', prompt: 'Before eating, we…', emoji: '🍽️', choices: ['🧼 Wash hands', '😴 Take a nap', '📺 Watch TV'], answer: '🧼 Wash hands' },
  { id: 'g2', prompt: 'Before bed, we…', emoji: '🛏️', choices: ['🪥 Brush teeth', '🍫 Eat candy', '🏃 Run fast'], answer: '🪥 Brush teeth' },
  { id: 'g3', prompt: 'Before crossing the road, we…', emoji: '🚸', choices: ['👀 Look both ways', '🏃 Run', '🧃 Drink juice'], answer: '👀 Look both ways' },
  { id: 'g4', prompt: 'After playing outside, we…', emoji: '🌳', choices: ['🧼 Wash hands', '🛌 Go to sleep', '🥤 Drink soda'], answer: '🧼 Wash hands' },
  { id: 'g5', prompt: 'When we sneeze, we…', emoji: '🤧', choices: ['💪 Cover with elbow', '🙊 Hold breath', '🎤 Yell loud'], answer: '💪 Cover with elbow' },
  { id: 'g6', prompt: 'Before riding a bike, we…', emoji: '🚲', choices: ['⛑️ Wear a helmet', '🍦 Eat ice cream', '👟 Take off shoes'], answer: '⛑️ Wear a helmet' },
  { id: 'g7', prompt: 'In the morning, we…', emoji: '☀️', choices: ['🪥 Brush teeth', '🌙 Go to sleep', '🎮 Play games'], answer: '🪥 Brush teeth' },
  { id: 'g8', prompt: 'When someone helps us, we say…', emoji: '🤝', choices: ['💖 Thank you', '👋 Goodbye', '😡 Go away'], answer: '💖 Thank you' },
];
export default function GoodHabits() {
  const grade = useGrade();
  return (
    <SectionLayout title="Good Habits" emoji="🪥" backTo={`/${grade}/life-skills`} speakText="Pick the right habit.">
      <QuestionRunner activityId="life.habits" homePath="/life-skills" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
