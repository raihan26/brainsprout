import QuestionRunner from '../../components/QuestionRunner';
import { useGrade } from '../../hooks/useGrade';
import SectionLayout from '../../components/SectionLayout';
import type { Question } from '../../types';

const QS: Question[] = [
  { id: 'h1', prompt: 'Where does a bird live?', emoji: '🐦', choices: ['Nest', 'Cave', 'Water'], answer: 'Nest' },
  { id: 'h2', prompt: 'Where does a fish live?', emoji: '🐟', choices: ['Water', 'Tree', 'Hive'], answer: 'Water' },
  { id: 'h3', prompt: 'Where does a dog live?', emoji: '🐶', choices: ['Kennel', 'Hive', 'Pond'], answer: 'Kennel' },
  { id: 'h4', prompt: 'Where does a bee live?', emoji: '🐝', choices: ['Hive', 'Nest', 'Den'], answer: 'Hive' },
  { id: 'h5', prompt: 'Where does a bear live?', emoji: '🐻', choices: ['Cave', 'Web', 'Pond'], answer: 'Cave' },
  { id: 'h6', prompt: 'Where does a spider live?', emoji: '🕷️', choices: ['Web', 'Nest', 'Pond'], answer: 'Web' },
  { id: 'h7', prompt: 'Where does a cow live?', emoji: '🐮', choices: ['Barn', 'Cave', 'Hive'], answer: 'Barn' },
  { id: 'h8', prompt: 'Where does a rabbit live?', emoji: '🐰', choices: ['Burrow', 'Hive', 'Nest'], answer: 'Burrow' },
];
export default function AnimalHomes() {
  const grade = useGrade();
  return (
    <SectionLayout title="Animal Homes" emoji="🏠" backTo={`/${grade}/science`} speakText="Match each animal to its home.">
      <QuestionRunner activityId="science.homes" homePath="/science" questions={QS} numQuestions={6} />
    </SectionLayout>
  );
}
