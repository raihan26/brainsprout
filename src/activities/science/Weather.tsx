import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'w1', prompt: 'It is rainy. What do you take?', emoji: '🌧️', choices: ['☂️ Umbrella', '🩴 Sandals', '🕶️ Sunglasses'], answer: '☂️ Umbrella' },
  { id: 'w2', prompt: 'It is sunny and hot. What do you wear?', emoji: '☀️', choices: ['🕶️ Sunglasses', '🧥 Coat', '🧣 Scarf'], answer: '🕶️ Sunglasses' },
  { id: 'w3', prompt: 'It is snowy. What do you wear?', emoji: '❄️', choices: ['🧤 Mittens', '🩳 Shorts', '🩴 Sandals'], answer: '🧤 Mittens' },
  { id: 'w4', prompt: 'It is windy. What can you fly?', emoji: '💨', choices: ['🪁 Kite', '⛄ Snowman', '☂️ Umbrella'], answer: '🪁 Kite' },
  { id: 'w5', prompt: 'It is cold outside. What do you wear?', emoji: '🥶', choices: ['🧥 Coat', '🩳 Shorts', '👙 Swimsuit'], answer: '🧥 Coat' },
  { id: 'w6', prompt: 'A rainbow comes after the…', emoji: '🌈', choices: ['🌧️ Rain', '☀️ Sun all day', '❄️ Snow'], answer: '🌧️ Rain' },
];
export default function Weather() {
  const grade = useGrade();
  return (
    <SectionLayout title="Weather Game" emoji="☀️" backTo={`/${grade}/science`} speakText="Pick the right item for the weather.">
      <QuestionRunner activityId="science.weather" homePath="/science" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
