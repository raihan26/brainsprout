import { motion, useReducedMotion } from 'motion/react';

export default function RocketLaunch() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="absolute top-[18%] right-[22%] text-4xl sm:text-5xl drop-shadow-[0_0_20px_rgba(249,115,22,0.9)]"
        aria-hidden="true"
      >
        🚀
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="absolute"
        animate={{
          left: ['75%', '12%', '3%'],
          top: ['55%', '8%', '0%'],
          rotate: [-32, -45, -45],
          scale: [0.8, 1.2, 0.4],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.4, 0.5, 0.6],
        }}
        aria-hidden="true"
      >
        <span className="text-4xl sm:text-6xl block drop-shadow-[0_0_20px_rgba(249,115,22,0.9)]">🚀</span>
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-full blur-sm"
          animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.7, 1.3, 0.7] }}
          transition={{ duration: 0.25, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        animate={{
          left: ['85%', '50%', '35%'],
          top: ['45%', '5%', '0%'],
          rotate: [-50, -55, -55],
          scale: [0.4, 0.7, 0.2],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
          times: [0, 0.35, 0.45, 0.55],
        }}
        aria-hidden="true"
      >
        <span className="text-2xl sm:text-3xl block drop-shadow-[0_0_12px_rgba(249,115,22,0.7)]">🚀</span>
      </motion.div>
    </>
  );
}
