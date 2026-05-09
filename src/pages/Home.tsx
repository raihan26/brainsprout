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
    <div className="min-h-screen px-3 sm:px-6 py-5 max-w-5xl mx-auto">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-4xl animate-floaty no-underline" aria-label="Change grade">
            {gradeMeta.emoji}
          </Link>
          <div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-slate">BrainSprout</div>
            <div className="text-sm text-slate/60 font-body">{gradeMeta.title} — {gradeMeta.description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="kid-card !p-3 inline-flex items-center gap-2">
            <span aria-hidden="true">⭐</span>
            <span className="font-display font-bold text-xl text-slate">{progress.totalStars}</span>
          </div>
          <VoiceToggle />
          <Link to="/parent" className="kid-btn-light !text-base !px-4 !py-2.5">
            👪 Parents
          </Link>
        </div>
      </header>

      <main className="mt-8">
        {grade === 'k' && <TruckBanner />}

        {/* Continue Learning / Recommended */}
        {(lastActivity || recommendations.length > 0) && (
          <div className="mb-6">
            {lastActivity && (
              <Link
                to={`/${grade}${lastActivity.path}`}
                className="kid-card flex items-center gap-4 no-underline text-slate hover:-translate-y-0.5 hover:shadow-kidHover transition-all mb-3"
                style={{ borderLeft: `4px solid ${gradeMeta.accentColor}` }}
              >
                <span className="text-5xl">{lastActivity.emoji}</span>
                <div>
                  <div className="text-xs text-slate/50 font-display font-semibold uppercase tracking-wide">Continue Learning</div>
                  <div className="text-xl font-display font-bold">{lastActivity.title}</div>
                  <div className="text-sm text-slate/60 font-body">{lastActivity.description}</div>
                </div>
              </Link>
            )}
            {recommendations.length > 0 && !lastActivity && (
              <div className="kid-card" style={{ borderLeft: '4px solid #2a9d8f' }}>
                <div className="text-xs text-slate/50 font-display font-semibold uppercase tracking-wide mb-2">Suggested Next</div>
                {recommendations.map((rec) => {
                  const a = ACTIVITIES.find((act) => act.id === rec.activityId);
                  if (!a) return null;
                  return (
                    <Link
                      key={rec.activityId}
                      to={`/${grade}${a.path}`}
                      className="flex items-center gap-3 no-underline text-slate"
                    >
                      <span className="text-4xl">{a.emoji}</span>
                      <div>
                        <div className="text-lg font-display font-bold">{a.title}</div>
                        <div className="text-sm text-slate/60 font-body">{rec.reason}</div>
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
          {sections.map((s, i) => (
            <Link
              key={s.id}
              to={`/${grade}/${s.id}`}
              className="kid-card group no-underline text-slate hover:-translate-y-1 hover:shadow-kidHover transition-all animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-4xl"
                style={{ background: sectionAccent(s.color) }}
              />
              <div className="text-6xl sm:text-7xl text-center group-hover:animate-wiggle" aria-hidden="true">
                {s.emoji}
              </div>
              <div className="mt-3 text-center">
                <div className="text-xl sm:text-2xl font-display font-bold">{s.title}</div>
                <div className="text-sm text-slate/60 font-body mt-0.5">{s.tagline}</div>
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

function sectionAccent(color: 'sun' | 'sky' | 'grass' | 'berry' | 'plum'): string {
  return {
    sun: '#f4a261',
    sky: '#219ebc',
    grass: '#2a9d8f',
    berry: '#e76f51',
    plum: '#7b2cbf',
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
