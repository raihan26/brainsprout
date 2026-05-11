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
  const next = getNextUpgrades(progress, grade, 1);
  const pct = Math.round((unlocked.length / BASE_UPGRADES.length) * 100);

  // unlocked world-ids determine which visual elements show up
  const unlockedWorlds = new Set(unlocked.map((u) => u.worldId));
  const hasRocket = unlocked.some((u) => u.id.startsWith('math-'));
  const hasGarden = unlocked.some((u) => u.id.startsWith('science-'));
  const hasRobot = unlocked.some((u) => u.id.startsWith('stem-bot') || u.id.startsWith('stem-rover'));
  const hasAntenna = unlocked.some((u) => u.id.startsWith('logic-'));
  const hasRadio = unlocked.some((u) => u.id.startsWith('reading-'));
  const hasShield = unlocked.some((u) => u.id.startsWith('life-'));
  const hasDome = unlocked.some((u) => u.id.startsWith('shapes-'));

  return (
    <div className="rounded-4xl overflow-hidden border-2 border-white/70 shadow-card bg-gradient-to-b from-[#1a0f30] via-[#3b1630] to-[#7f1d1d]">
      {/* Header row */}
      <div className="px-5 pt-4 pb-2 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xs font-display font-bold uppercase tracking-wider text-white/70">
            Your Mars Base
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
            {unlocked.length === 0
              ? 'Ready for your first mission?'
              : 'Your base is growing!'}
          </div>
        </div>
        <div className="text-right text-white">
          <div className="text-3xl sm:text-4xl font-display font-bold leading-none">{pct}%</div>
          <div className="text-[10px] font-display font-bold uppercase tracking-wider text-white/60 mt-0.5">
            Built
          </div>
        </div>
      </div>

      {/* Scene */}
      <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
        {/* Stars */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${0.8 + Math.random() * 1.4}px`,
              height: `${0.8 + Math.random() * 1.4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
            aria-hidden="true"
          />
        ))}

        {/* Ground */}
        <svg
          viewBox="0 0 800 60"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 right-0 w-full h-[60px]"
          aria-hidden="true"
        >
          <path d="M0,20 Q200,8 400,16 Q600,26 800,12 L800,60 L0,60 Z" fill="#c0392b" />
          <path d="M0,38 Q300,30 600,40 Q750,48 800,38 L800,60 L0,60 Z" fill="#922b21" />
        </svg>

        {/* Rocket (math) */}
        <motion.div
          className="absolute left-[6%] bottom-[18%]"
          initial={false}
          animate={hasRocket ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 4 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <svg width="44" height="68" viewBox="0 0 44 68">
            <ellipse cx="22" cy="56" rx="16" ry="4" fill="#000" opacity="0.25" />
            <path d="M22 4 L32 26 L32 50 L12 50 L12 26 Z" fill="#f1f5f9" />
            <path d="M12 26 L12 50 L6 58 Z" fill="#e74c3c" />
            <path d="M32 26 L32 50 L38 58 Z" fill="#e74c3c" />
            <circle cx="22" cy="30" r="5" fill="#74b9ff" stroke="#fff" strokeWidth="1.5" />
            <rect x="18" y="50" width="8" height="5" fill="#fdcb6e" opacity={hasRocket ? 0.9 : 0.3} />
          </svg>
          {hasRocket && !reduceMotion && (
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-b from-orange-400 via-yellow-300 to-transparent rounded-full blur-sm"
              animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.7, 1.2, 0.7] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Main dome (always visible) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[14%]" aria-hidden="true">
          <svg width="140" height="80" viewBox="0 0 140 80">
            <ellipse cx="70" cy="62" rx="55" ry="18" fill="#000" opacity="0.25" />
            <ellipse cx="70" cy="58" rx="55" ry="30" fill="#4a5568" />
            <path d="M15,58 Q70,10 125,58" fill="#74b9ff" opacity={hasDome ? 0.28 : 0.14} />
            <ellipse cx="70" cy="58" rx="55" ry="30" fill="none" stroke="#a0aec0" strokeWidth="1" />
            {/* Windows */}
            <ellipse cx="50" cy="50" rx="8" ry="6" fill="#fdcb6e" opacity={unlocked.length > 0 ? 0.85 : 0.25}>
              {unlocked.length > 0 && !reduceMotion && (
                <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
              )}
            </ellipse>
            <ellipse cx="90" cy="52" rx="7" ry="5" fill="#74b9ff" opacity={unlocked.length > 1 ? 0.75 : 0.2}>
              {unlocked.length > 1 && !reduceMotion && (
                <animate attributeName="opacity" values="0.75;1;0.75" dur="4s" repeatCount="indefinite" />
              )}
            </ellipse>
            <ellipse cx="70" cy="46" rx="6" ry="4" fill="#fdcb6e" opacity={unlocked.length > 2 ? 0.7 : 0.2} />
          </svg>
        </div>

        {/* Antenna with signal (logic) */}
        <div className="absolute left-[48%] bottom-[58%]" aria-hidden="true">
          <svg width="30" height="46" viewBox="0 0 30 46">
            <line x1="15" y1="46" x2="15" y2="8" stroke="#a0aec0" strokeWidth="1.5" />
            <circle cx="15" cy="6" r="3" fill={hasAntenna ? '#ef4444' : '#555'}>
              {hasAntenna && !reduceMotion && (
                <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite" />
              )}
            </circle>
            {hasAntenna && (
              <>
                <path d="M 15 10 Q 4 18 4 30" fill="none" stroke="#fdcb6e" strokeWidth="1" opacity="0.6" />
                <path d="M 15 10 Q 26 18 26 30" fill="none" stroke="#fdcb6e" strokeWidth="1" opacity="0.6" />
              </>
            )}
          </svg>
        </div>

        {/* Garden (science) */}
        <motion.div
          className="absolute left-[18%] bottom-[12%] flex items-end gap-0.5"
          initial={false}
          animate={hasGarden ? { opacity: 1 } : { opacity: 0.25 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          {['🌱', '🌻', '🌿'].map((p, i) => (
            <motion.span
              key={i}
              className="text-lg sm:text-xl"
              style={{ filter: hasGarden ? 'none' : 'grayscale(1)' }}
              animate={hasGarden && !reduceMotion ? { y: [0, -2, 0] } : undefined}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {p}
            </motion.span>
          ))}
        </motion.div>

        {/* Robot (stem) */}
        <motion.div
          className="absolute right-[18%] bottom-[16%] text-2xl sm:text-3xl"
          initial={false}
          animate={
            hasRobot
              ? reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: [0, -6, 0], rotate: [0, 4, -4, 0] }
              : { opacity: 0.3 }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: hasRobot ? 'drop-shadow(0 0 8px rgba(116,185,255,0.6))' : 'grayscale(1)' }}
          aria-hidden="true"
        >
          🤖
        </motion.div>

        {/* Satellite dish (reading) */}
        <motion.div
          className="absolute right-[6%] bottom-[22%] text-xl"
          initial={false}
          animate={hasRadio ? (reduceMotion ? { opacity: 1 } : { opacity: 1, rotate: [0, 15, 0, -15, 0] }) : { opacity: 0.3 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: hasRadio ? 'none' : 'grayscale(1)' }}
          aria-hidden="true"
        >
          📡
        </motion.div>

        {/* Shield (life skills) */}
        {hasShield && (
          <motion.div
            className="absolute left-[38%] bottom-[24%] text-lg"
            initial={false}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            🛡️
          </motion.div>
        )}

        {/* Flag — always planted */}
        <div className="absolute right-[38%] bottom-[12%]" aria-hidden="true">
          <svg width="16" height="26" viewBox="0 0 16 26">
            <line x1="2" y1="2" x2="2" y2="26" stroke="#a0aec0" strokeWidth="1.5" />
            <rect x="4" y="2" width="11" height="8" rx="1" fill="#7c3aed" />
            <text x="6" y="8" fontSize="4" fill="#fff" fontWeight="bold">BS</text>
          </svg>
        </div>

        {/* "Coming next" badge in corner */}
        {next[0] && (
          <div className="absolute top-2 right-2 max-w-[50%] bg-black/40 backdrop-blur-sm rounded-xl px-2.5 py-1.5 border border-white/15">
            <div className="text-[9px] font-display font-bold uppercase tracking-wider text-white/60">
              Next
            </div>
            <div className="text-xs font-body font-semibold text-white leading-tight">
              <span className="mr-1" aria-hidden="true">{next[0].icon}</span>
              {next[0].title}
              <span className="ml-1 text-white/70">· {next[0].starsNeeded} ⭐</span>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar + message */}
      <div className="px-5 py-3 bg-black/25">
        <div className="h-3 rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#fdcb6e] via-[#f4a261] to-[#e76f51]"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs font-body text-white/85">
          <div>
            {unlocked.length === 0
              ? 'Earn stars to upgrade your base!'
              : `${unlocked.length} upgrades earned`}
          </div>
          {unlockedWorlds.size > 0 && (
            <div className="flex items-center gap-1">
              {['math', 'science', 'reading', 'stem', 'logic', 'shapes', 'life-skills']
                .filter((w) => unlockedWorlds.has(w as never))
                .slice(0, 5)
                .map((w) => (
                  <span key={w} className="text-sm" aria-hidden="true">
                    {({
                      math: '🚀',
                      science: '🌱',
                      reading: '📡',
                      stem: '🤖',
                      logic: '📶',
                      shapes: '🔷',
                      'life-skills': '🛡️',
                    } as Record<string, string>)[w]}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
