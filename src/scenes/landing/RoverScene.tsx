import { motion, useReducedMotion } from 'motion/react';

export default function RoverScene() {
  const reduceMotion = useReducedMotion();

  const truckSvg = (
    <svg width="80" height="40" viewBox="0 0 220 110" className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
      <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#c0c8d0" />
      <polygon points="25,65 25,80 110,80 110,65" fill="#a8b2bc" />
      <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.75" />
      <line x1="200" y1="50" x2="215" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="62" x2="15" y2="72" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <circle cx="53" cy="84" r="12" fill="#1a202c" />
      <circle cx="53" cy="84" r="7" fill="#4a5568" />
      <circle cx="170" cy="84" r="12" fill="#1a202c" />
      <circle cx="170" cy="84" r="7" fill="#4a5568" />
    </svg>
  );

  if (reduceMotion) {
    return (
      <div className="absolute bottom-4 left-[25%]" aria-hidden="true">
        {truckSvg}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute bottom-4"
      animate={{ left: ['-14%', '110%'] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <motion.div animate={{ y: [0, -2, 0, -1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
        {truckSvg}
      </motion.div>
      <div className="absolute -left-6 bottom-1 w-12 h-5 bg-gradient-to-l from-[#7f1d1d60] to-transparent rounded-full blur-[2px]" />
    </motion.div>
  );
}
