import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 's1', prompt: 'Which sense do we use for a rainbow?', emoji: '🌈', choices: ['👀 Sight', '👃 Smell', '👅 Taste'], answer: '👀 Sight' },
  { id: 's2', prompt: 'Which sense do we use for a flower?', emoji: '🌷', choices: ['👃 Smell', '👂 Hearing', '✋ Touch'], answer: '👃 Smell' },
  { id: 's3', prompt: 'Which sense do we use for ice cream?', emoji: '🍦', choices: ['👅 Taste', '👀 Sight', '👂 Hearing'], answer: '👅 Taste' },
  { id: 's4', prompt: 'Which sense do we use for soft fur?', emoji: '🐱', choices: ['✋ Touch', '👃 Smell', '👅 Taste'], answer: '✋ Touch' },
  { id: 's5', prompt: 'Which sense do we use for music?', emoji: '🎶', choices: ['👂 Hearing', '👀 Sight', '👃 Smell'], answer: '👂 Hearing' },
  { id: 's6', prompt: 'Which sense do we use for a barking dog?', emoji: '🐕', choices: ['👂 Hearing', '👃 Smell', '👅 Taste'], answer: '👂 Hearing' },
  { id: 's7', prompt: 'Which sense do we use for a yummy cookie?', emoji: '🍪', choices: ['👅 Taste', '👀 Sight', '✋ Touch'], answer: '👅 Taste' },
  { id: 's8', prompt: 'Which sense do we use for a soft blanket?', emoji: '🧸', choices: ['✋ Touch', '👃 Smell', '👂 Hearing'], answer: '✋ Touch' },
];
export default function FiveSenses() {
  const grade = useGrade();
  return (
    <SectionLayout title="Five Senses" emoji="👀" backTo={`/${grade}/science`} speakText="Which sense do we use?">
      <QuestionRunner activityId="science.senses" homePath="/science" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
