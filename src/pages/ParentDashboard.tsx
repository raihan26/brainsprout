import { useState } from 'react';
import SectionLayout from '../components/SectionLayout';
import ProgressStars from '../components/ProgressStars';
import { useProgress } from '../hooks/useProgress';
import { ACTIVITIES, SECTIONS, activityById } from '../data/activities';

function fmtDate(ts: number): string {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function ParentDashboard() {
  const { state, reset } = useProgress();
  const [confirm, setConfirm] = useState(false);

  const completed = Object.values(state.activities).filter((e) => e.plays > 0).length;
  const lastActivity = state.lastActivityId ? activityById(state.lastActivityId) : null;

  // Best section by total stars
  const sectionTotals = SECTIONS.map((s) => {
    const ids = ACTIVITIES.filter((a) => a.section === s.id).map((a) => a.id);
    const stars = ids.reduce((sum, id) => sum + (state.activities[id]?.stars ?? 0), 0);
    const max = ids.length * 3;
    return { section: s, stars, max, ratio: max > 0 ? stars / max : 0 };
  });
  const best = sectionTotals.reduce((a, b) => (b.stars > a.stars ? b : a), sectionTotals[0]);

  return (
    <SectionLayout title="Parent Dashboard" emoji="👪" backTo="/" speakText="Parent dashboard.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat label="Activities Completed" value={`${completed} / ${ACTIVITIES.length}`} emoji="🎯" />
        <Stat label="Total Stars" value={state.totalStars} emoji="⭐" />
        <Stat label="Best Section" value={best?.stars ? best.section.title : 'No data yet'} emoji={best?.section.emoji ?? '🏆'} />
      </div>

      <div className="kid-card mt-5">
        <h2 className="text-2xl font-extrabold mb-2">Last activity</h2>
        {lastActivity ? (
          <div className="flex items-center gap-3">
            <span className="text-5xl">{lastActivity.emoji}</span>
            <div>
              <div className="text-xl font-bold">{lastActivity.title}</div>
              <div className="text-gray-700 text-sm">Played {fmtDate(state.activities[lastActivity.id]?.lastPlayedAt ?? 0)}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-700">No activity yet — pick a fun game on the home page!</div>
        )}
      </div>

      <div className="kid-card mt-5">
        <h2 className="text-2xl font-extrabold mb-3">Progress by section</h2>
        <div className="space-y-3">
          {sectionTotals.map(({ section, stars, max, ratio }) => (
            <div key={section.id}>
              <div className="flex items-center justify-between text-base">
                <div className="font-bold">
                  <span className="mr-1" aria-hidden="true">{section.emoji}</span>
                  {section.title}
                </div>
                <div className="text-gray-700">{stars} / {max} ⭐</div>
              </div>
              <div className="mt-1 h-3 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-grass" style={{ width: `${Math.round(ratio * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card mt-5">
        <h2 className="text-2xl font-extrabold mb-3">All activities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ACTIVITIES.map((a) => {
            const e = state.activities[a.id];
            return (
              <div key={a.id} className="flex items-center justify-between p-2 rounded-xl bg-cream">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">{a.emoji}</span>
                  <span className="font-bold">{a.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressStars value={e?.stars ?? 0} size="sm" />
                  <span className="text-gray-600 text-sm">{e?.plays ?? 0} plays</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="kid-card mt-5 text-center">
        {!confirm ? (
          <button className="kid-btn-pink text-lg" onClick={() => setConfirm(true)}>
            🧹 Reset Progress
          </button>
        ) : (
          <div>
            <p className="text-lg mb-3">Are you sure? This will clear all stars and progress.</p>
            <div className="flex gap-3 justify-center">
              <button className="kid-btn-light" onClick={() => setConfirm(false)}>Cancel</button>
              <button
                className="kid-btn-pink"
                onClick={() => { reset(); setConfirm(false); }}
              >
                Yes, reset
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}

function Stat({ label, value, emoji }: { label: string; value: string | number; emoji: string }) {
  return (
    <div className="kid-card text-center">
      <div className="text-5xl" aria-hidden="true">{emoji}</div>
      <div className="text-3xl font-extrabold mt-1">{value}</div>
      <div className="text-gray-700">{label}</div>
    </div>
  );
}
