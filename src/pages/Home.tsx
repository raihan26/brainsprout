import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ACTIVITIES, sectionsByGrade } from '../data/activities';
import { gradeById } from '../data/grades';
import { useGrade } from '../hooks/useGrade';
import { useProgressV2 } from '../hooks/useProgressV2';
import { getRecommendedActivities } from '../utils/progress';
import { getWorldDisplay, GRADE_MISSION_NAMES } from '../data/worldDisplay';
import { starsByWorld } from '../data/baseUpgrades';
import VoiceToggle from '../components/VoiceToggle';
import ProgressStars from '../components/ProgressStars';
import MarsBaseProgress from '../scenes/MarsBaseProgress';

export default function Home() {
  const grade = useGrade();
  const gradeMeta = gradeById(grade);
  const sections = sectionsByGrade(grade);
  const { progress } = useProgressV2(grade);
  const reduceMotion = useReducedMotion();
  const mission = GRADE_MISSION_NAMES[grade];

  const recommendations = getRecommendedActivities(progress, grade, ACTIVITIES, 1);
  const topRec = recommendations[0];
  const recActivity = topRec ? ACTIVITIES.find((a) => a.id === topRec.activityId) : null;

  const lastActivity = progress.lastActivityId
    ? ACTIVITIES.find((a) => a.id === progress.lastActivityId)
    : null;

  const worldStars = starsByWorld(progress, grade);
  const activitiesDone = Object.keys(progress.activityBestStars).filter(
    (id) => (progress.activityBestStars[id] ?? 0) > 0,
  ).length;
  const gradeActivityCount = ACTIVITIES.filter((a) => a.grade === grade).length;

  return (
    <div className="min-h-screen px-3 sm:px-6 py-5 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-4xl no-underline" aria-label="Change mission level">
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              {gradeMeta.emoji}
            </motion.span>
          </Link>
          <div>
            <div className="text-xs font-display font-bold uppercase tracking-wider" style={{ color: gradeMeta.accentColor }}>
              {mission?.name ?? 'Mission Control'}
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-slate leading-tight">Mission Control</div>
            <div className="text-xs sm:text-sm text-slate/60 font-body">
              {gradeMeta.title} · Welcome back, explorer!
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="kid-card !p-2.5 inline-flex items-center gap-1.5">
            <span aria-hidden="true">⭐</span>
            <span className="font-display font-bold text-lg text-slate">{progress.totalStars}</span>
          </div>
          <div className="kid-card !p-2.5 inline-flex items-center gap-1.5">
            <span aria-hidden="true">🚀</span>
            <span className="font-display font-bold text-lg text-slate">
              {activitiesDone}/{gradeActivityCount}
            </span>
          </div>
          <VoiceToggle />
          <Link to="/parent" className="kid-btn-light !text-base !px-4 !py-2.5">
            👪 Parents
          </Link>
        </div>
      </header>

      <main className="mt-6 space-y-6">
        {/* Recommended / Continue */}
        {(recActivity || lastActivity) && (
          <motion.section
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {lastActivity ? (
              <Link
                to={`/${grade}${lastActivity.path}`}
                className="mission-card block no-underline text-slate"
                style={{ borderLeft: `6px solid ${gradeMeta.accentColor}` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl sm:text-6xl">{lastActivity.emoji}</div>
                  <div className="flex-1">
                    <div className="text-xs font-display font-bold uppercase tracking-wider text-slate/50">
                      Continue your mission
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-bold">{lastActivity.title}</div>
                    <div className="text-sm text-slate/60 font-body">{lastActivity.description}</div>
                  </div>
                  <div className="mission-cta shrink-0 !text-base !px-5 !py-2.5">
                    <span aria-hidden="true">▶</span>
                    <span>Go</span>
                  </div>
                </div>
              </Link>
            ) : recActivity ? (
              <Link
                to={`/${grade}${recActivity.path}`}
                className="mission-card block no-underline text-slate"
                style={{ borderLeft: `6px solid #2a9d8f` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl sm:text-6xl">{recActivity.emoji}</div>
                  <div className="flex-1">
                    <div className="text-xs font-display font-bold uppercase tracking-wider text-slate/50">
                      Next mission for you
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-bold">{recActivity.title}</div>
                    <div className="text-sm text-slate/60 font-body">
                      {topRec?.reason ?? 'Ready when you are!'}
                    </div>
                  </div>
                  <div className="mission-cta shrink-0 !text-base !px-5 !py-2.5">
                    <span aria-hidden="true">🚀</span>
                    <span>Start</span>
                  </div>
                </div>
              </Link>
            ) : null}
          </motion.section>
        )}

        {/* Mars base progress */}
        <motion.section
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <MarsBaseProgress progress={progress} grade={grade} />
        </motion.section>

        {/* Worlds */}
        <section>
          <h2 className="text-xs font-display font-bold uppercase tracking-wider text-slate/60 mb-3">
            Choose a world
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sections.map((s, i) => {
              const display = getWorldDisplay(s.id);
              const sectionStars = worldStars[s.id] ?? 0;
              return (
                <motion.div
                  key={s.id}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={`/${grade}/${s.id}`}
                    className="mission-card group block no-underline text-slate h-full"
                  >
                    <div
                      className="absolute top-0 left-[8%] right-[8%] h-[3px] rounded-b-full"
                      style={{ background: display.accent }}
                    />
                    <div className="flex flex-col items-center text-center gap-2">
                      <div
                        className="text-5xl sm:text-6xl"
                        style={{ filter: sectionStars > 0 ? 'none' : 'grayscale(0.15)' }}
                      >
                        {display.hotspotIcon}
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold uppercase tracking-wider" style={{ color: display.accent }}>
                          {display.label}
                        </div>
                        <div className="text-sm sm:text-base font-body text-slate/70 mt-0.5 leading-tight">
                          {display.tagline}
                        </div>
                      </div>
                      {sectionStars > 0 ? (
                        <div className="text-xs text-slate/60 font-body flex items-center gap-1">
                          <span aria-hidden="true">⭐</span>
                          <span>{sectionStars} earned</span>
                        </div>
                      ) : (
                        <ProgressStars value={0} max={3} size="sm" />
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
