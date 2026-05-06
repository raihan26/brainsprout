import { Link } from 'react-router-dom';
import { ACTIVITIES, sectionsByGrade } from '../data/activities';
import { gradeById } from '../data/grades';
import { useGrade } from '../hooks/useGrade';
import { useProgressV2 } from '../hooks/useProgressV2';
import { getRecommendedActivities } from '../utils/progress';
import VoiceToggle from '../components/VoiceToggle';
import ProgressStars from '../components/ProgressStars';
import TruckBanner from '../components/TruckBanner';

export default function Home() {
  const grade = useGrade();
  const gradeMeta = gradeById(grade);
  const sections = sectionsByGrade(grade);
  const { progress } = useProgressV2(grade);

  const recommendations = getRecommendedActivities(progress, grade, ACTIVITIES, 1);
  const lastActivity = progress.lastActivityId
    ? ACTIVITIES.find((a) => a.id === progress.lastActivityId)
    : null;

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
            <span className="font-extrabold text-xl">{progress.totalStars}</span>
          </div>
          <VoiceToggle />
          <Link to="/parent" className="kid-btn-light text-lg px-4 py-3">
            👪 Parents
          </Link>
        </div>
      </header>

      <main className="mt-6">
        {grade === 'k' && <TruckBanner />}

        {/* Continue Learning / Recommended Next */}
        {(lastActivity || recommendations.length > 0) && (
          <div className="mb-5">
            {lastActivity && (
              <Link
                to={`/${grade}${lastActivity.path}`}
                className="kid-card bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center gap-4 no-underline text-gray-900 hover:-translate-y-0.5 transition mb-3"
              >
                <span className="text-5xl">{lastActivity.emoji}</span>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Continue Learning</div>
                  <div className="text-xl font-bold">{lastActivity.title}</div>
                  <div className="text-sm text-gray-600">{lastActivity.description}</div>
                </div>
              </Link>
            )}
            {recommendations.length > 0 && !lastActivity && (
              <div className="kid-card bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Suggested Next</div>
                {recommendations.map((rec) => {
                  const a = ACTIVITIES.find((act) => act.id === rec.activityId);
                  if (!a) return null;
                  return (
                    <Link
                      key={rec.activityId}
                      to={`/${grade}${a.path}`}
                      className="flex items-center gap-3 no-underline text-gray-900"
                    >
                      <span className="text-4xl">{a.emoji}</span>
                      <div>
                        <div className="text-lg font-bold">{a.title}</div>
                        <div className="text-sm text-gray-600">{rec.reason}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

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
                <ProgressStars value={countSectionStars(progress.activityBestStars, s.id)} max={3} size="sm" />
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
  bestStars: Record<string, number>,
  sectionId: string,
): number {
  const prefix = sectionId === 'life-skills' ? 'life.' : `${sectionId}.`;
  const entries = Object.entries(bestStars).filter(([k]) => k.startsWith(prefix));
  if (entries.length === 0) return 0;
  const total = entries.reduce((sum, [, v]) => sum + (v || 0), 0);
  const max = entries.length * 3;
  return Math.round((total / max) * 3);
}
