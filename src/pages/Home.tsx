import { Link } from 'react-router-dom';
import { sectionsByGrade } from '../data/activities';
import { gradeById } from '../data/grades';
import { useGrade } from '../hooks/useGrade';
import VoiceToggle from '../components/VoiceToggle';
import { useProgress } from '../hooks/useProgress';
import ProgressStars from '../components/ProgressStars';
import TruckBanner from '../components/TruckBanner';

export default function Home() {
  const grade = useGrade();
  const gradeMeta = gradeById(grade);
  const sections = sectionsByGrade(grade);
  const { state } = useProgress(grade);

  return (
    <div className="min-h-screen px-3 sm:px-6 py-4 max-w-5xl mx-auto">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-4xl animate-floaty no-underline" aria-label="Change grade">
            {gradeMeta.emoji}
          </Link>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold">BrainSprout</div>
            <div className="text-sm text-gray-700">{gradeMeta.title} — {gradeMeta.description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="kid-card !p-3 inline-flex items-center gap-2">
            <span aria-hidden="true">⭐</span>
            <span className="font-extrabold text-xl">{state.totalStars}</span>
          </div>
          <VoiceToggle />
          <Link to="/parent" className="kid-btn-light text-lg px-4 py-3">
            👪 Parents
          </Link>
        </div>
      </header>

      <main className="mt-6">
        {grade === 'k' && <TruckBanner />}
        <h2 className="sr-only">Choose a learning world</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.id}
              to={`/${grade}/${s.id}`}
              className={`kid-card group bg-gradient-to-br ${gradient(s.color)} no-underline text-gray-900 hover:-translate-y-1 transition`}
            >
              <div className="text-7xl text-center group-hover:animate-wiggle" aria-hidden="true">
                {s.emoji}
              </div>
              <div className="mt-3 text-center">
                <div className="text-2xl font-extrabold">{s.title}</div>
                <div className="text-base text-gray-700">{s.tagline}</div>
              </div>
              <div className="mt-3 text-center">
                <ProgressStars value={countSectionStars(state.activities, s.id)} max={3} size="sm" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function gradient(color: 'sun' | 'sky' | 'grass' | 'berry' | 'plum'): string {
  return {
    sun: 'from-yellow-100 to-orange-100',
    sky: 'from-sky-100 to-blue-100',
    grass: 'from-emerald-100 to-green-100',
    berry: 'from-pink-100 to-rose-100',
    plum: 'from-purple-100 to-fuchsia-100',
  }[color];
}

function countSectionStars(
  activities: Record<string, { stars: number }>,
  sectionId: string,
): number {
  const entries = Object.entries(activities).filter(([k]) =>
    k.startsWith(sectionPrefix(sectionId)),
  );
  if (entries.length === 0) return 0;
  const total = entries.reduce((sum, [, v]) => sum + (v.stars || 0), 0);
  const max = entries.length * 3;
  return Math.round((total / max) * 3);
}

function sectionPrefix(id: string): string {
  return id === 'life-skills' ? 'life.' : `${id}.`;
}
