import { motion, useReducedMotion, type MotionValue } from 'motion/react';

type Props = {
  x?: MotionValue<number>;
  unlockedCount?: number;
};

export default function MarsBase({ x, unlockedCount = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const bright = Math.min(1, 0.4 + unlockedCount * 0.12);

  return (
    <motion.div className="absolute bottom-6 left-[4%] sm:left-[8%]" style={{ x }} aria-hidden="true">
      <svg width="200" height="90" viewBox="0 0 200 90" className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        {/* Main dome */}
        <ellipse cx="60" cy="68" rx="48" ry="26" fill="#4a5568" />
        <path d="M12,68 Q60,22 108,68" fill="#74b9ff" opacity={0.1 + bright * 0.15} />
        <ellipse cx="60" cy="68" rx="48" ry="26" fill="none" stroke="#718096" strokeWidth="0.8" />
        {/* Windows */}
        <ellipse cx="45" cy="60" rx="7" ry="5" fill="#fdcb6e" opacity={0.3 + bright * 0.4}>
          {!reduceMotion && (
            <animate attributeName="opacity" values={`${0.3 + bright * 0.4};${0.5 + bright * 0.5};${0.3 + bright * 0.4}`} dur="3s" repeatCount="indefinite" />
          )}
        </ellipse>
        <ellipse cx="65" cy="58" rx="7" ry="5" fill="#74b9ff" opacity={0.3 + bright * 0.3}>
          {!reduceMotion && (
            <animate attributeName="opacity" values={`${0.3 + bright * 0.3};${0.5 + bright * 0.4};${0.3 + bright * 0.3}`} dur="4s" repeatCount="indefinite" />
          )}
        </ellipse>
        {/* Secondary dome */}
        <ellipse cx="130" cy="72" rx="25" ry="14" fill="#2d3748" />
        <ellipse cx="130" cy="72" rx="25" ry="14" fill="none" stroke="#4a5568" strokeWidth="0.6" />
        <ellipse cx="130" cy="68" rx="6" ry="4" fill="#0ea5e9" opacity={0.3 + bright * 0.3} />
        {/* Tunnel */}
        <rect x="105" y="65" width="10" height="10" rx="3" fill="#4a5568" />
        {/* Antenna */}
        <line x1="60" y1="42" x2="60" y2="15" stroke="#a0aec0" strokeWidth="1.5" />
        <circle cx="60" cy="13" r="3.5" fill="#ef4444">
          {!reduceMotion && (
            <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
          )}
        </circle>
        <line x1="55" y1="25" x2="65" y2="25" stroke="#a0aec0" strokeWidth="1" />
        <line x1="56" y1="32" x2="64" y2="32" stroke="#a0aec0" strokeWidth="0.8" />
        {/* Solar */}
        <rect x="155" y="48" width="35" height="20" rx="2" fill="#1a202c" stroke="#2d3748" strokeWidth="0.5" />
        <rect x="157" y="50" width="15" height="8" fill="#0ea5e9" opacity={0.4 + bright * 0.2} />
        <rect x="173" y="50" width="15" height="8" fill="#0ea5e9" opacity={0.4 + bright * 0.2} />
        <rect x="157" y="60" width="15" height="6" fill="#0ea5e9" opacity={0.25 + bright * 0.2} />
        <rect x="173" y="60" width="15" height="6" fill="#0ea5e9" opacity={0.25 + bright * 0.2} />
        <rect x="170" y="68" width="4" height="14" fill="#4a5568" />
        {/* Crane */}
        <line x1="185" y1="18" x2="185" y2="68" stroke="#ecc94b" strokeWidth="2" />
        <line x1="165" y1="18" x2="198" y2="18" stroke="#ecc94b" strokeWidth="1.5" />
        <rect x="168" y="24" width="7" height="7" fill="#a0aec0">
          {!reduceMotion && (
            <animate attributeName="y" values="24;36;24" dur="4s" repeatCount="indefinite" />
          )}
        </rect>
        {/* Ground details */}
        <rect x="20" y="82" width="60" height="3" rx="1" fill="#636e72" opacity="0.4" />
        <rect x="110" y="84" width="40" height="2" rx="1" fill="#636e72" opacity="0.3" />
      </svg>
    </motion.div>
  );
}
