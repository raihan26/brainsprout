import QuestionRunner from '../../components/QuestionRunner';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'e1', prompt: 'How does this face feel?', emoji: '😊', choices: ['Happy', 'Sad', 'Angry'], answer: 'Happy' },
  { id: 'e2', prompt: 'How does this face feel?', emoji: '😢', choices: ['Sad', 'Excited', 'Scared'], answer: 'Sad' },
  { id: 'e3', prompt: 'How does this face feel?', emoji: '😠', choices: ['Angry', 'Sleepy', 'Happy'], answer: 'Angry' },
  { id: 'e4', prompt: 'How does this face feel?', emoji: '😨', choices: ['Scared', 'Happy', 'Calm'], answer: 'Scared' },
  { id: 'e5', prompt: 'How does this face feel?', emoji: '🤩', choices: ['Excited', 'Tired', 'Sad'], answer: 'Excited' },
  { id: 'e6', prompt: 'How does this face feel?', emoji: '😴', choices: ['Sleepy', 'Excited', 'Angry'], answer: 'Sleepy' },
  { id: 'e7', prompt: 'How does this face feel?', emoji: '🥰', choices: ['Loving', 'Mad', 'Sad'], answer: 'Loving' },
  { id: 'e8', prompt: 'How does this face feel?', emoji: '😮', choices: ['Surprised', 'Sleepy', 'Happy'], answer: 'Surprised' },
];

export default function Emotions() {
  return (
    <SectionLayout title="Emotions" emoji="😊" backTo="/life-skills" speakText="How does this face feel?">
      <QuestionRunner activityId="life.emotions" homePath="/life-skills" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
