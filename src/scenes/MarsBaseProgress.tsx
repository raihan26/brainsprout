import { motion, useReducedMotion } from 'motion/react';
import type { BrainSproutProgress, GradeId } from '../types';
import {
  BASE_UPGRADES,
  getUnlockedUpgrades,
  getNextUpgrades,
} from '../data/baseUpgrades';

type Props = {
  progress: BrainSproutProgress;
  grade: GradeId;
};

export default function MarsBaseProgress({ progress, grade }: Props) {
  const reduceMotion = useReducedMotion();
  const unlocked = getUnlockedUpgrades(progress, grade);
  const next = getNextUpgrades(progress, grade, 2);
  const pct = Math.round((unlocked.length / BASE_UPGRADES.length) * 100);

  return (
    <div className="mars-panel">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xs font-display font-bold uppercase tracking-wider text-white/70">
            Mars Base Progress
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold leading-tight">
            Your base is growing!
          </div>
          <div className="text-sm text-white/80 font-body mt-0.5">
            {unlocked.length} of {BASE_UPGRADES.length} upgrades unlocked
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl sm:text-4xl font-display font-bold">{pct}%</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-3 rounded-full bg-white/15 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#fdcb6e] via-[#f4a261] to-[#e76f51]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Unlocked icons */}
      {unlocked.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-display font-semibold uppercase tracking-wider text-white/60 mb-2">
            Unlocked
          </div>
          <div className="flex flex-wrap gap-2">
            {unlocked.map((u) => (
              <div
                key={u.id}
                className="inline-flex items-center gap-1.5 bg-white/12 border border-white/20 rounded-full px-3 py-1.5"
                title={u.description}
              >
                <span className="text-base" aria-hidden="true">
                  {u.icon}
                </span>
                <span className="text-xs font-body font-semibold text-white/95">{u.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next upgrades */}
      {next.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-display font-semibold uppercase tracking-wider text-white/60 mb-2">
            Coming next
          </div>
          <div className="flex flex-wrap gap-2">
            {next.map((u) => (
              <div
                key={u.id}
                className="inline-flex items-center gap-2 bg-black/25 border border-white/15 rounded-full px-3 py-1.5"
                title={u.description}
              >
                <span className="text-base opacity-60" aria-hidden="true">
                  {u.icon}
                </span>
                <span className="text-xs font-body text-white/85">
                  {u.title}
                  <span className="ml-1 text-white/60">· {u.starsNeeded} ⭐ to go</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {unlocked.length === 0 && (
        <div className="mt-4 text-sm font-body text-white/85">
          Complete a mission to start upgrading your Mars base!
        </div>
      )}
    </div>
  );
}
