import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { GradeId, SectionId } from '../../types';
import { getWorldDisplay } from '../../data/worldDisplay';

type Props = {
  worldId: SectionId;
  grade: GradeId;
  top: string;
  left?: string;
  right?: string;
  delay?: number;
};

export default function LearningHotspot({ worldId, grade, top, left, right, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const world = getWorldDisplay(worldId);

  return (
    <motion.div
      className="absolute z-10"
      style={{ top, left, right }}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 220, damping: 14 }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{
          duration: 2.5 + Math.random() * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + Math.random(),
        }}
      >
        <Link
          to={`/${grade}/${worldId}`}
          className="group flex flex-col items-center gap-1.5 no-underline"
          aria-label={`${world.label} — ${world.tagline}`}
        >
          <div
            className="flex items-center justify-center rounded-full bg-white/95 border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110 group-focus-visible:scale-110"
            style={{
              width: 56,
              height: 56,
              boxShadow: `0 8px 24px rgba(0,0,0,0.35), 0 0 0 3px ${world.accent}40`,
            }}
          >
            <span className="text-2xl sm:text-3xl" aria-hidden="true">
              {world.hotspotIcon}
            </span>
          </div>
          <div
            className="rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap"
            style={{ background: world.accent }}
          >
            {world.label}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
