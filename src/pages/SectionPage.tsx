import { useParams } from 'react-router-dom';
import { sectionsByGrade, activitiesBySection } from '../data/activities';
import SectionLayout from '../components/SectionLayout';
import ActivityCard from '../components/ActivityCard';
import { useProgress } from '../hooks/useProgress';
import { useGrade } from '../hooks/useGrade';
import type { SectionId } from '../types';

export default function SectionPage() {
  const grade = useGrade();
  const { sectionId } = useParams<{ sectionId: string }>();
  const sections = sectionsByGrade(grade);
  const section = sections.find((s) => s.id === sectionId);
  const { state } = useProgress(grade);

  if (!section) {
    return (
      <SectionLayout title="Not found" backTo={`/${grade}`}>
        <p className="text-center text-xl">Oops! That world doesn't exist.</p>
      </SectionLayout>
    );
  }

  const items = activitiesBySection(section.id as SectionId, grade);

  return (
    <SectionLayout
      title={section.title}
      emoji={section.emoji}
      intro={section.tagline}
      backTo={`/${grade}`}
      speakText={`${section.title}. ${section.tagline}. Pick a game.`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((a) => (
          <ActivityCard
            key={a.id}
            to={`/${grade}${a.path}`}
            emoji={a.emoji}
            title={a.title}
            description={a.description}
            stars={state.activities[a.id]?.stars ?? 0}
            color={section.color}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
