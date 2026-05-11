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
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 18 }}
    >
      <Link
        to={`/${grade}/${worldId}`}
        className="hotspot-button no-underline text-white"
        aria-label={`${world.label} — ${world.tagline}`}
      >
        <span className="text-2xl sm:text-3xl" aria-hidden="true">
          {world.hotspotIcon}
        </span>
        <span className="hidden sm:block text-[10px] leading-tight uppercase tracking-wider text-white/90">
          {world.label}
        </span>
      </Link>
    </motion.div>
  );
}
