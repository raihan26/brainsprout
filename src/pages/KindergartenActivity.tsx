import { useParams } from 'react-router-dom';
import ActivityShell from '../components/ActivityShell';
import { KINDERGARTEN_ACTIVITY_MAP } from '../data/kindergarten-activity-map';
import SectionLayout from '../components/SectionLayout';
import { useGrade } from '../hooks/useGrade';

export default function KindergartenActivity() {
  const { worldId, activitySlug } = useParams<{ worldId: string; activitySlug: string }>();
  const grade = useGrade();
  const key = `${worldId}/${activitySlug}`;
  const config = KINDERGARTEN_ACTIVITY_MAP[key];

  if (!config) {
    return (
      <SectionLayout title="Not Found" backTo={`/${grade}`}>
        <p className="text-center text-xl">Oops! That activity doesn't exist yet.</p>
      </SectionLayout>
    );
  }

  return (
    <ActivityShell
      activityId={config.activityId}
      title={config.title}
      emoji={config.emoji}
      worldId={config.worldId}
      backPath={config.backPath}
      questions={config.questions}
      skillIds={config.skillIds}
      numQuestions={config.numQuestions}
      speakChoices={config.speakChoices}
    />
  );
}
