import ActivityShell from '../components/ActivityShell';
import type { Question } from '../types';

type Props = {
  activityId: string;
  title: string;
  emoji: string;
  worldId: string;
  backPath: string;
  questions: Question[];
  skillIds?: string[];
  numQuestions?: number;
  speakChoices?: boolean;
};

export default function GenericActivity(props: Props) {
  return <ActivityShell {...props} />;
}
