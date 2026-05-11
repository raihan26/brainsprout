import { motion, useReducedMotion } from 'motion/react';

type Props = {
  onStart: () => void;
};

export default function LandingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 text-center px-6 pt-6 pb-4 sm:pt-8">
      <motion.h1
        className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white text-shadow-kid leading-none"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
      >
        Brain<span className="text-[#fdcb6e]">Sprout</span>
      </motion.h1>
      <motion.p
        className="mt-2 sm:mt-3 text-base sm:text-lg text-white/85 font-body font-semibold max-w-xl mx-auto"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Launch your learning mission. Build a Mars base by learning math, science, reading, robotics, and more.
      </motion.p>
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 16 }}
        className="mt-5 sm:mt-6"
      >
        <button type="button" onClick={onStart} className="mission-cta">
          <span aria-hidden="true">🚀</span>
          <span>Start Mission</span>
        </button>
      </motion.div>
      <motion.p
        className="mt-3 text-xs sm:text-sm text-white/65 font-body"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Choose your mission level below
      </motion.p>
    </div>
  );
}
