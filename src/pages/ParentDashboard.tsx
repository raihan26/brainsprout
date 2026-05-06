import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgressV2 } from '../hooks/useProgressV2';
import { ACTIVITIES, SECTIONS, sectionsByGrade } from '../data/activities';
import { GRADES } from '../data/grades';
import { SKILL_LABELS } from '../data/skills';
import {
  formatDuration,
  formatWeekRange,
  getCurrentWeekRange,
  getRecommendedActivities,
  getSkillInsights,
  getWeeklySummary,
  getWorldProgress,
} from '../utils/progress';
import type { GradeId, SkillInsight } from '../types';
import ProgressStars from '../components/ProgressStars';

export default function ParentDashboard() {
  const [selectedGrade, setSelectedGrade] = useState<GradeId>('k');
  const { progress, reset } = useProgressV2(selectedGrade);
  const [confirm, setConfirm] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const now = new Date();
  const offsetDate = new Date(now);
  offsetDate.setDate(now.getDate() + weekOffset * 7);
  const { start: weekStart, end: weekEnd } = getCurrentWeekRange(offsetDate);

  const summary = getWeeklySummary(progress, selectedGrade, weekStart);
  const worldProgress = getWorldProgress(progress, selectedGrade, ACTIVITIES);
  const skillInsights = getSkillInsights(progress, selectedGrade, SKILL_LABELS);
  const recommendations = getRecommendedActivities(progress, selectedGrade, ACTIVITIES);
  const sections = sectionsByGrade(selectedGrade);

  const weekAttempts = progress.activityAttempts
    .filter((a) => {
      if (a.grade !== selectedGrade) return false;
      const d = new Date(a.completedAt);
      return d >= weekStart && d <= weekEnd;
    })
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  const strongSkills = skillInsights.filter((s) => s.status === 'strong');
  const needsPractice = skillInsights.filter((s) => s.status === 'needs-practice');

  const hasData = progress.activityAttempts.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-4 max-w-5xl mx-auto">
      <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link to={`/${selectedGrade}`} className="text-lg font-semibold text-gray-600 hover:text-gray-900 no-underline">
            ← Back to {GRADES.find((g) => g.id === selectedGrade)?.title}
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parent Dashboard</h1>
      </header>

      {/* Grade selector */}
      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        {GRADES.map((g) => (
          <button
            key={g.id}
            onClick={() => { setSelectedGrade(g.id); setConfirm(false); }}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
              selectedGrade === g.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {g.emoji} {g.title}
          </button>
        ))}
      </div>

      {!hasData ? (
        <EmptyState grade={selectedGrade} />
      ) : (
        <>
          {/* Week navigation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-medium"
            >
              ← Prev
            </button>
            <span className="text-sm font-semibold text-gray-700">
              {formatWeekRange(weekStart, weekEnd)}
            </span>
            <button
              onClick={() => setWeekOffset((w) => Math.min(w + 1, 0))}
              disabled={weekOffset >= 0}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-medium disabled:opacity-40"
            >
              Next →
            </button>
          </div>

          {/* Weekly Summary Cards */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Weekly Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MetricCard label="Activities" value={summary.activitiesCompleted} icon="📚" />
              <MetricCard label="Questions" value={summary.questionsAnswered} icon="❓" />
              <MetricCard label="Accuracy" value={summary.accuracy > 0 ? `${Math.round(summary.accuracy * 100)}%` : '—'} icon="🎯" />
              <MetricCard label="Stars" value={summary.starsEarned} icon="⭐" />
              <MetricCard label="Time" value={summary.totalTimeMs > 0 ? formatDuration(summary.totalTimeMs) : '—'} icon="⏱️" />
              <MetricCard label="Active Days" value={`${summary.activeDays} / 7`} icon="📅" />
              <MetricCard
                label="Best Subject"
                value={summary.bestWorld ? (sections.find((s) => s.id === summary.bestWorld)?.title ?? summary.bestWorld) : '—'}
                icon={sections.find((s) => s.id === summary.bestWorld)?.emoji ?? '🏆'}
              />
              <MetricCard label="Total Stars" value={progress.totalStars} icon="🌟" />
            </div>
          </section>

          {/* Subject Progress */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Subject Progress</h2>
            <div className="space-y-3">
              {worldProgress.map((wp) => {
                const section = sections.find((s) => s.id === wp.worldId);
                if (!section) return null;
                const ratio = wp.totalActivities > 0 ? wp.completedActivities / wp.totalActivities : 0;
                return (
                  <div key={wp.worldId} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">{section.emoji}</span>
                        <span className="font-bold text-gray-900">{section.title}</span>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{wp.completedActivities} / {wp.totalActivities} activities</div>
                        <div>{wp.averageAccuracy > 0 ? `${Math.round(wp.averageAccuracy * 100)}% accuracy` : 'No data'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                          style={{ width: `${Math.round(ratio * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{Math.round(ratio * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>⭐ {wp.starsEarned} / {wp.maxStars}</span>
                      {wp.totalTimeMs > 0 && <span>⏱️ {formatDuration(wp.totalTimeMs)}</span>}
                      {wp.lastPracticedAt && (
                        <span>Last: {new Date(wp.lastPracticedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skill Insights */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Skill Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <span>💪</span> Strong Skills
                </h3>
                {strongSkills.length === 0 ? (
                  <p className="text-sm text-gray-500">Keep practicing to build strong skills!</p>
                ) : (
                  <ul className="space-y-1.5">
                    {strongSkills.map((s) => (
                      <SkillRow key={s.skillId} skill={s} />
                    ))}
                  </ul>
                )}
              </div>
              <div className="bg-white rounded-xl p-4 border border-orange-100">
                <h3 className="font-semibold text-orange-700 mb-2 flex items-center gap-1">
                  <span>🌱</span> Needs Practice
                </h3>
                {needsPractice.length === 0 ? (
                  <p className="text-sm text-gray-500">No weak areas yet — great job!</p>
                ) : (
                  <ul className="space-y-1.5">
                    {needsPractice.map((s) => (
                      <SkillRow key={s.skillId} skill={s} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Recommended Practice */}
          {recommendations.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Recommended Next</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendations.map((rec) => {
                  const activity = ACTIVITIES.find((a) => a.id === rec.activityId);
                  if (!activity) return null;
                  return (
                    <Link
                      key={rec.activityId}
                      to={`/${selectedGrade}${activity.path}`}
                      className="bg-white rounded-xl p-4 border border-indigo-100 hover:border-indigo-300 transition no-underline text-gray-900"
                    >
                      <div className="text-3xl mb-2">{activity.emoji}</div>
                      <div className="font-bold text-sm">{activity.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{rec.reason}</div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Weekly Timeline */}
          {weekAttempts.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3">This Week's Activity</h2>
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                {weekAttempts.map((a) => {
                  const section = SECTIONS.find((s) => s.id === a.worldId);
                  const activity = ACTIVITIES.find((act) => act.id === a.activityId);
                  return (
                    <div key={a.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{activity?.emoji ?? section?.emoji ?? '📖'}</span>
                        <div>
                          <div className="font-semibold text-sm">{activity?.title ?? a.activityId}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(a.completedAt).toLocaleDateString()} • {section?.title ?? a.worldId}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">
                          {a.totalQuestions > 0 ? `${Math.round((a.correctAnswers / a.totalQuestions) * 100)}%` : '—'}
                        </span>
                        <ProgressStars value={a.starsEarned} size="sm" />
                        {a.durationMs > 0 && (
                          <span className="text-xs text-gray-400">{formatDuration(a.durationMs)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Parent Controls */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Settings</h2>
            <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-4">
              <p className="text-sm text-gray-600">
                Progress is stored locally on this device. It is not synced to a server or shared.
              </p>
              {!confirm ? (
                <button
                  className="px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium text-sm hover:bg-red-100 transition"
                  onClick={() => setConfirm(true)}
                >
                  Reset All Progress for {GRADES.find((g) => g.id === selectedGrade)?.title}
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-red-600 font-medium">Are you sure? This cannot be undone.</span>
                  <button
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium"
                    onClick={() => setConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium"
                    onClick={() => { reset(); setConfirm(false); }}
                  >
                    Yes, reset
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
      <div className="text-2xl mb-1" aria-hidden="true">{icon}</div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function SkillRow({ skill }: { skill: SkillInsight }) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="text-gray-800">{skill.label}</span>
      <span className={`font-medium ${skill.status === 'strong' ? 'text-green-600' : 'text-orange-600'}`}>
        {Math.round(skill.accuracy * 100)}%
      </span>
    </li>
  );
}

function EmptyState({ grade }: { grade: GradeId }) {
  const gradeMeta = GRADES.find((g) => g.id === grade);
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📊</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">No progress yet</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Once your child completes some activities in {gradeMeta?.title}, you'll see their weekly progress,
        skill insights, and recommended practice here.
      </p>
      <Link
        to={`/${grade}`}
        className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold no-underline hover:bg-indigo-700 transition"
      >
        Go to {gradeMeta?.title} →
      </Link>
    </div>
  );
}
