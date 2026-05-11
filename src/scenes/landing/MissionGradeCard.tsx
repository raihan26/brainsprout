import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { GradeMeta } from '../../types';
import { GRADE_MISSION_NAMES } from '../../data/worldDisplay';

type Props = {
  grade: GradeMeta;
  index: number;
  totalStars: number;
  onClick?: () => void;
};

export default function MissionGradeCard({ grade, index, totalStars, onClick }: Props) {
  const reduceMotion = useReducedMotion();
  const mission = GRADE_MISSION_NAMES[grade.id] ?? { name: grade.title, copy: grade.description };

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 180, damping: 20 }}
    >
      <Link
        to={`/${grade.id}`}
        className="mission-card block no-underline text-slate"
        onClick={onClick}
        aria-label={`${grade.title} — ${mission.name}`}
      >
        <div
          className="absolute top-0 left-[8%] right-[8%] h-[3px] rounded-b-full"
          style={{ background: grade.accentColor }}
        />
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-md"
            style={{ background: `${grade.accentColor}18`, border: `2px solid ${grade.accentColor}40` }}
          >
            {grade.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="text-xs font-display font-bold uppercase tracking-wider"
              style={{ color: grade.accentColor }}
            >
              {mission.name}
            </div>
            <div className="text-lg sm:text-xl font-display font-bold text-slate leading-tight">
              {grade.title}
            </div>
            <div className="text-xs sm:text-sm text-slate/60 font-body mt-0.5 leading-tight">
              {mission.copy}
            </div>
          </div>
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-display font-bold text-white text-lg shrink-0"
            style={{ background: grade.accentColor, boxShadow: `0 4px 14px ${grade.accentColor}50` }}
            aria-hidden="true"
          >
            {grade.label}
          </div>
        </div>
        {totalStars > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-body font-semibold text-slate/60">
            <span aria-hidden="true">⭐</span>
            <span>{totalStars} stars earned on this mission</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
