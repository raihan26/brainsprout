import { useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { sectionsByGrade, activitiesBySection } from '../data/activities';
import SectionLayout from '../components/SectionLayout';
import ActivityCard from '../components/ActivityCard';
import { useProgressV2 } from '../hooks/useProgressV2';
import { useGrade } from '../hooks/useGrade';
import { getWorldDisplay } from '../data/worldDisplay';
import { getUpgradesForWorld, starsByWorld } from '../data/baseUpgrades';
import type { SectionId } from '../types';

export default function SectionPage() {
  const grade = useGrade();
  const { sectionId } = useParams<{ sectionId: string }>();
  const sections = sectionsByGrade(grade);
  const section = sections.find((s) => s.id === sectionId);
  const { progress } = useProgressV2(grade);
  const reduceMotion = useReducedMotion();

  if (!section) {
    return (
      <SectionLayout title="Not found" backTo={`/${grade}`}>
        <p className="text-center text-xl">Oops! That mission doesn't exist.</p>
      </SectionLayout>
    );
  }

  const display = getWorldDisplay(section.id as SectionId);
  const items = activitiesBySection(section.id as SectionId, grade);
  const sectionStars = starsByWorld(progress, grade)[section.id] ?? 0;
  const { unlocked, next } = getUpgradesForWorld(progress, grade, section.id as SectionId);

  return (
    <SectionLayout
      title={display.label}
      emoji={display.hotspotIcon}
      intro={display.tagline}
      backTo={`/${grade}`}
      speakText={`${display.label}. ${display.missionCopy}. Pick a mission.`}
    >
      {/* Mission banner */}
      <motion.div
        className="mission-card mb-5"
        style={{ borderLeft: `6px solid ${display.accent}` }}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="text-xs font-display font-bold uppercase tracking-wider" style={{ color: display.accent }}>
              Mission briefing
            </div>
            <div className="text-lg sm:text-xl font-display font-bold text-slate leading-tight">
              {display.missionCopy}
            </div>
          </div>
          <div className="inline-flex items-center gap-1 text-slate font-display font-bold text-lg">
            <span aria-hidden="true">⭐</span>
            <span>{sectionStars}</span>
          </div>
        </div>

        {(unlocked.length > 0 || next) && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-body">
            {unlocked.slice(-2).map((u) => (
              <span
                key={u.id}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-white"
                style={{ background: display.accent }}
                title={u.description}
              >
                <span aria-hidden="true">{u.icon}</span>
                <span>{u.title}</span>
              </span>
            ))}
            {next && (
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 border border-slate/15 text-slate/70">
                <span aria-hidden="true" className="opacity-60">{next.icon}</span>
                <span>
                  {next.title} · {next.requiredStars - sectionStars} ⭐ to go
                </span>
              </span>
            )}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((a, i) => (
          <motion.div
            key={a.id}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
          >
            <ActivityCard
              to={`/${grade}${a.path}`}
              emoji={a.emoji}
              title={a.title}
              description={a.description}
              stars={progress.activityBestStars[a.id] ?? 0}
              color={section.color}
            />
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-slate/60 font-body mt-6">
          More {display.label} missions coming soon!
        </div>
      )}
    </SectionLayout>
  );
}
