import { motion, useReducedMotion } from 'motion/react';

type Props = {
  onStart: () => void;
};

export default function LandingHero({ onStart }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative text-center px-6">
      <motion.h1
        className="font-display font-bold text-white text-shadow-kid leading-[0.95]"
        style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)' }}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -24, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
      >
        Brain<span className="text-[#fdcb6e]">Sprout</span>
      </motion.h1>
      <motion.p
        className="mt-3 text-lg sm:text-xl lg:text-2xl text-white/90 font-body font-semibold max-w-2xl mx-auto"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Launch your learning mission. Build a Mars base by learning math,
        science, reading, robotics, and more.
      </motion.p>
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 220, damping: 14 }}
        className="mt-6 sm:mt-7"
      >
        <motion.button
          type="button"
          onClick={onStart}
          className="mission-cta !text-2xl sm:!text-3xl !px-10 !py-5"
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        >
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            🚀
          </motion.span>
          <span>Start Mission</span>
        </motion.button>
      </motion.div>
      <motion.p
        className="mt-4 text-sm sm:text-base text-white/70 font-body"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Choose your mission level below
      </motion.p>
    </div>
  );
}
