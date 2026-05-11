import { motion, useReducedMotion } from 'motion/react';
import MarsTerrain from './MarsTerrain';
import MarsBase from './MarsBase';
import type { MotionValue } from 'motion/react';

type Props = {
  baseX?: MotionValue<number>;
  unlockedCount?: number;
};

/**
 * An animated Mars construction site: multiple cybertrucks carrying astronauts,
 * astronauts working on beams, a helper robot, and little building activity.
 * Every element is pure SVG + Motion. Respects prefers-reduced-motion.
 */
export default function MarsSurface({ baseX, unlockedCount = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <MarsTerrain />

      {/* The main Mars base (large dome + solar + antenna + crane) */}
      <MarsBase x={baseX} unlockedCount={unlockedCount} />

      {/* --- BUILDING SITE: Steel beams being assembled into a new habitat --- */}
      <div className="absolute bottom-[38%] left-[36%]" aria-hidden="true">
        <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
          {/* Foundation */}
          <rect x="8" y="66" width="104" height="6" rx="1" fill="#4a5568" />
          {/* Vertical beams */}
          <rect x="14" y="20" width="4" height="50" fill="#94a3b8" />
          <rect x="58" y="14" width="4" height="56" fill="#94a3b8" />
          <rect x="102" y="20" width="4" height="50" fill="#94a3b8" />
          {/* Horizontal beams */}
          <rect x="14" y="28" width="92" height="3" fill="#cbd5e0" />
          <rect x="14" y="44" width="92" height="3" fill="#cbd5e0" />
          {/* Diagonal brace */}
          <line x1="18" y1="66" x2="58" y2="28" stroke="#a0aec0" strokeWidth="2.5" />
          <line x1="62" y1="28" x2="102" y2="66" stroke="#a0aec0" strokeWidth="2.5" />
          {/* Sparking welder at top */}
          <motion.circle
            cx="60"
            cy="14"
            r="3"
            fill="#fdcb6e"
            animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], r: [2, 4, 2] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
          />
          {!reduceMotion && (
            <motion.g
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="56" cy="10" r="1" fill="#fdcb6e" />
              <circle cx="65" cy="11" r="1" fill="#ffffff" />
              <circle cx="63" cy="6" r="1" fill="#fdcb6e" />
            </motion.g>
          )}
        </svg>
      </div>

      {/* --- ASTRONAUT A: welder on top of the beam structure --- */}
      <motion.div
        className="absolute bottom-[50%] left-[42%]"
        animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Astronaut suit="#f4f4f5" visor="#74b9ff" tool="welder" />
      </motion.div>

      {/* --- ASTRONAUT B: carrying a beam, walking --- */}
      <motion.div
        className="absolute bottom-[18%]"
        animate={reduceMotion ? { left: '58%' } : { left: ['55%', '62%', '55%'], y: [0, -1, 0, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Astronaut suit="#fef3c7" visor="#fdcb6e" tool="beam" />
      </motion.div>

      {/* --- ASTRONAUT C: standing near main dome, waving --- */}
      <motion.div className="absolute bottom-[16%] left-[22%]" aria-hidden="true">
        <Astronaut suit="#fecaca" visor="#e76f51" tool="wave" reduceMotion={reduceMotion} />
      </motion.div>

      {/* --- SPROUT BOT: Tesla Optimus–style humanoid helper, walking pacing near the site --- */}
      <motion.div
        className="absolute bottom-[18%]"
        animate={reduceMotion ? { left: '48%' } : { left: ['46%', '52%', '46%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <OptimusBot reduceMotion={reduceMotion} />
      </motion.div>

      {/* --- CYBERTRUCK #1: primary, driving left-to-right with cargo --- */}
      <motion.div
        className="absolute bottom-[8%]"
        animate={reduceMotion ? { left: '30%' } : { left: ['-14%', '115%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <motion.div animate={reduceMotion ? undefined : { y: [0, -2, 0, -1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
          <CybertruckWithCargo cargo="beams" />
        </motion.div>
        <div className="absolute -left-6 bottom-1 w-12 h-4 bg-gradient-to-l from-[#7f1d1d60] to-transparent rounded-full blur-[2px]" />
      </motion.div>

      {/* --- CYBERTRUCK #2: smaller, second, carrying astronauts --- */}
      <motion.div
        className="absolute bottom-[10%]"
        animate={reduceMotion ? { left: '70%' } : { left: ['-10%', '118%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear', delay: 6 }}
        aria-hidden="true"
      >
        <motion.div animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
          <CybertruckWithCargo cargo="astronauts" small />
        </motion.div>
      </motion.div>

      {/* --- CYBERTRUCK #3: distant, opposite direction, returning to base --- */}
      <motion.div
        className="absolute bottom-[32%]"
        animate={reduceMotion ? { left: '75%' } : { left: ['115%', '-12%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear', delay: 3 }}
        aria-hidden="true"
      >
        <div className="opacity-55 scale-x-[-1]">
          <CybertruckWithCargo cargo="empty" tiny />
        </div>
      </motion.div>

      {/* --- Ground crates / supplies pile --- */}
      <div className="absolute bottom-[10%] left-[70%]" aria-hidden="true">
        <svg width="50" height="30" viewBox="0 0 50 30" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <rect x="2" y="16" width="14" height="12" rx="1.5" fill="#a16207" stroke="#713f12" strokeWidth="1" />
          <rect x="4" y="18" width="10" height="2" fill="#713f12" />
          <rect x="4" y="22" width="10" height="2" fill="#713f12" />
          <rect x="20" y="12" width="16" height="16" rx="1.5" fill="#a16207" stroke="#713f12" strokeWidth="1" />
          <rect x="22" y="14" width="12" height="2" fill="#713f12" />
          <rect x="22" y="22" width="12" height="2" fill="#713f12" />
          <rect x="40" y="18" width="8" height="10" rx="1" fill="#0ea5e9" stroke="#0369a1" strokeWidth="1" />
          <rect x="42" y="20" width="4" height="2" fill="#0369a1" />
        </svg>
      </div>

      {/* --- Satellite dish rotating --- */}
      <motion.div
        className="absolute bottom-[50%] right-[10%]"
        animate={reduceMotion ? undefined : { rotate: [0, 18, 0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <line x1="20" y1="48" x2="20" y2="30" stroke="#a0aec0" strokeWidth="2" />
          <ellipse cx="20" cy="18" rx="16" ry="6" fill="#cbd5e0" stroke="#94a3b8" strokeWidth="1" />
          <ellipse cx="20" cy="18" rx="16" ry="6" fill="none" stroke="#64748b" strokeWidth="0.5" />
          <circle cx="20" cy="14" r="2.5" fill="#fbbf24" />
        </svg>
      </motion.div>

      {/* --- Flag planted --- */}
      <div className="absolute bottom-[14%] right-[26%]" aria-hidden="true">
        <svg width="22" height="36" viewBox="0 0 22 36">
          <line x1="2" y1="2" x2="2" y2="36" stroke="#a0aec0" strokeWidth="1.5" />
          <motion.rect
            x="4"
            y="2"
            width="16"
            height="11"
            rx="1"
            fill="#7c3aed"
            animate={reduceMotion ? undefined : { skewX: [0, 3, -2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <text x="7" y="11" fontSize="6" fill="#fff" fontWeight="bold">BS</text>
        </svg>
      </div>
    </>
  );
}

/* ---------------- SVG astronaut ---------------- */

type AstronautProps = {
  suit: string;
  visor: string;
  tool: 'welder' | 'beam' | 'wave';
  reduceMotion?: boolean | null;
};

function Astronaut({ suit, visor, tool, reduceMotion }: AstronautProps) {
  return (
    <svg width="36" height="46" viewBox="0 0 36 46" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
      {/* Backpack */}
      <rect x="9" y="18" width="18" height="14" rx="2" fill="#cbd5e0" />
      <rect x="10" y="20" width="4" height="3" fill="#0ea5e9" />
      <rect x="10" y="25" width="4" height="3" fill="#22c55e" />
      {/* Body */}
      <rect x="11" y="16" width="14" height="18" rx="3" fill={suit} />
      {/* Chest badge */}
      <rect x="14" y="22" width="8" height="4" rx="1" fill="#64748b" />
      <circle cx="18" cy="24" r="1" fill="#22c55e" />
      {/* Left arm */}
      {tool === 'beam' ? (
        <g>
          <rect x="5" y="20" width="6" height="3" rx="1" fill={suit} />
          {/* Carried beam */}
          <rect x="-2" y="19" width="12" height="2" fill="#94a3b8" />
        </g>
      ) : tool === 'wave' ? (
        <motion.rect
          x="5"
          y="10"
          width="3"
          height="10"
          rx="1.5"
          fill={suit}
          animate={reduceMotion ? undefined : { rotate: [0, 18, 0, 18, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '6.5px', originY: '20px' }}
        />
      ) : (
        <rect x="5" y="17" width="6" height="3" rx="1" fill={suit} />
      )}
      {/* Right arm */}
      {tool === 'welder' ? (
        <g>
          <rect x="25" y="14" width="6" height="3" rx="1" fill={suit} />
          {/* Welder tool */}
          <rect x="29" y="13" width="4" height="2" rx="0.5" fill="#64748b" />
          <circle cx="33" cy="14" r="1" fill="#fdcb6e" />
        </g>
      ) : (
        <rect x="25" y="17" width="6" height="3" rx="1" fill={suit} />
      )}
      {/* Legs */}
      <rect x="12" y="33" width="4" height="9" rx="1.5" fill={suit} />
      <rect x="20" y="33" width="4" height="9" rx="1.5" fill={suit} />
      {/* Boots */}
      <rect x="11" y="41" width="6" height="3" rx="1" fill="#1f2937" />
      <rect x="19" y="41" width="6" height="3" rx="1" fill="#1f2937" />
      {/* Helmet */}
      <circle cx="18" cy="11" r="7" fill={suit} stroke="#94a3b8" strokeWidth="0.8" />
      {/* Visor */}
      <path d="M12 11 Q18 6 24 11 Q24 14 18 15 Q12 14 12 11 Z" fill={visor} opacity="0.85" />
      <ellipse cx="20" cy="9" rx="1.5" ry="1" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

/* ---------------- Cybertruck variants ---------------- */

type CargoKind = 'beams' | 'astronauts' | 'empty';

function CybertruckWithCargo({
  cargo,
  small,
  tiny,
}: {
  cargo: CargoKind;
  small?: boolean;
  tiny?: boolean;
}) {
  const width = tiny ? 60 : small ? 75 : 100;
  const height = tiny ? 30 : small ? 38 : 50;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 110"
      className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)]"
    >
      {/* Cybertruck body */}
      <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#c0c8d0" />
      <polygon points="25,65 25,80 110,80 110,65" fill="#a8b2bc" />
      <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.75" />
      {/* Cargo on flatbed */}
      {cargo === 'beams' && (
        <g>
          <rect x="30" y="58" width="75" height="3.5" fill="#94a3b8" />
          <rect x="30" y="62" width="75" height="3.5" fill="#cbd5e0" />
          <rect x="30" y="66" width="75" height="3.5" fill="#94a3b8" />
          {/* Ties */}
          <line x1="42" y1="54" x2="42" y2="70" stroke="#ef4444" strokeWidth="1.2" />
          <line x1="92" y1="54" x2="92" y2="70" stroke="#ef4444" strokeWidth="1.2" />
        </g>
      )}
      {cargo === 'astronauts' && (
        <g>
          {/* Two small astronaut helmets bobbing in the bed */}
          <circle cx="50" cy="58" r="10" fill="#f4f4f5" stroke="#94a3b8" strokeWidth="1" />
          <path d="M43 58 Q50 54 57 58 Q57 60 50 61 Q43 60 43 58 Z" fill="#74b9ff" opacity="0.85" />
          <circle cx="80" cy="58" r="10" fill="#fecaca" stroke="#94a3b8" strokeWidth="1" />
          <path d="M73 58 Q80 54 87 58 Q87 60 80 61 Q73 60 73 58 Z" fill="#e76f51" opacity="0.85" />
        </g>
      )}
      {/* Light bar */}
      <line x1="200" y1="50" x2="215" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {/* Tail light */}
      <line x1="15" y1="62" x2="15" y2="72" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      {/* Wheels */}
      <circle cx="53" cy="84" r="12" fill="#1a202c" />
      <circle cx="53" cy="84" r="7" fill="#4a5568" />
      <circle cx="170" cy="84" r="12" fill="#1a202c" />
      <circle cx="170" cy="84" r="7" fill="#4a5568" />
    </svg>
  );
}

/* ---------------- Tesla Optimus–style humanoid ---------------- */

function OptimusBot({ reduceMotion }: { reduceMotion?: boolean | null }) {
  return (
    <svg
      width="42"
      height="64"
      viewBox="0 0 42 64"
      className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      {/* Head — slim helmet with dark faceplate */}
      <rect x="13" y="3" width="16" height="14" rx="4" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.6" />
      <rect x="15" y="6" width="12" height="8" rx="2" fill="#0f172a" />
      {/* Eye LEDs */}
      <motion.circle
        cx="19"
        cy="10"
        r="1.1"
        fill="#38bdf8"
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="23"
        cy="10"
        r="1.1"
        fill="#38bdf8"
        animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      {/* Mouth vent */}
      <rect x="18" y="13" width="6" height="0.8" rx="0.4" fill="#38bdf8" opacity="0.6" />
      {/* Neck */}
      <rect x="18" y="17" width="6" height="2" fill="#cbd5e0" />
      {/* Torso — shoulders wider than hips, industrial look */}
      <path d="M10 19 L32 19 L30 34 L12 34 Z" fill="#f8fafc" stroke="#cbd5e0" strokeWidth="0.6" />
      {/* Chest plate panel */}
      <rect x="17" y="22" width="8" height="9" rx="1" fill="#1e293b" />
      <circle cx="21" cy="26" r="1.3" fill="#22c55e" />
      <rect x="18.5" y="28" width="5" height="0.8" fill="#38bdf8" opacity="0.7" />
      {/* Pelvic segment */}
      <rect x="13" y="34" width="16" height="5" rx="1.5" fill="#cbd5e0" />
      {/* Left arm — shoulder joint, upper arm, elbow, forearm, hand */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, -10, 0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '11px', originY: '20px' }}
      >
        <circle cx="11" cy="20" r="2" fill="#64748b" />
        <rect x="9" y="20" width="4" height="8" rx="1.5" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <circle cx="11" cy="28" r="1.8" fill="#64748b" />
        <rect x="9.5" y="28" width="3" height="7" rx="1.2" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <rect x="9" y="34" width="4" height="3" rx="1" fill="#1e293b" />
      </motion.g>
      {/* Right arm — synced opposite for walking motion */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '31px', originY: '20px' }}
      >
        <circle cx="31" cy="20" r="2" fill="#64748b" />
        <rect x="29" y="20" width="4" height="8" rx="1.5" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <circle cx="31" cy="28" r="1.8" fill="#64748b" />
        <rect x="29.5" y="28" width="3" height="7" rx="1.2" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <rect x="29" y="34" width="4" height="3" rx="1" fill="#1e293b" />
      </motion.g>
      {/* Left leg — thigh, knee, shin, foot */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 12, 0, -12, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '17px', originY: '39px' }}
      >
        <rect x="14.5" y="39" width="5" height="9" rx="1.5" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <circle cx="17" cy="48" r="1.8" fill="#64748b" />
        <rect x="15" y="48" width="4" height="9" rx="1.2" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <path d="M13 57 L20 57 L19 60 L14 60 Z" fill="#1e293b" />
      </motion.g>
      {/* Right leg */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, -12, 0, 12, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '25px', originY: '39px' }}
      >
        <rect x="22.5" y="39" width="5" height="9" rx="1.5" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <circle cx="25" cy="48" r="1.8" fill="#64748b" />
        <rect x="23" y="48" width="4" height="9" rx="1.2" fill="#f4f4f5" stroke="#cbd5e0" strokeWidth="0.5" />
        <path d="M21 57 L28 57 L27 60 L22 60 Z" fill="#1e293b" />
      </motion.g>
    </svg>
  );
}
