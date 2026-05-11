import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { playWin } from '../utils/sound';
import { useSpeech } from '../hooks/useSpeech';
import ProgressStars from './ProgressStars';

type Props = {
  show: boolean;
  stars: number;
  message?: string;
  onPlayAgain: () => void;
  onHome: () => void;
};

const cheers = [
  'Mission complete!',
  'You did it, explorer!',
  'The Mars base got stronger!',
  'Way to go, astronaut!',
  'Brilliant work, commander!',
  'You helped Sprout Bot learn!',
];

export default function Celebration({ show, stars, message, onPlayAgain, onHome }: Props) {
  const { speak } = useSpeech();
  const reduceMotion = useReducedMotion();
  const cheer = useMemo(
    () => message ?? cheers[Math.floor(Math.random() * cheers.length)],
    [message, show],
  );

  useEffect(() => {
    if (show) {
      playWin();
      speak(cheer);
    }
  }, [show, cheer, speak]);

  const confetti = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate/40 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Mission complete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mission-card max-w-sm w-full text-center relative overflow-hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            {!reduceMotion && (
              <div className="pointer-events-none absolute inset-0">
                {confetti.map((i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xl"
                    style={{
                      left: `${(i * 53) % 100}%`,
                      top: `${(i * 37) % 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{ scale: [0, 1.3, 0.8], opacity: [0, 1, 0], rotate: [0, 180, 360] }}
                    transition={{
                      duration: 1.2,
                      delay: (i % 8) * 0.08,
                      repeat: 2,
                    }}
                    aria-hidden="true"
                  >
                    {['✨', '⭐', '🎉', '🌈', '💫', '🚀'][i % 6]}
                  </motion.span>
                ))}
              </div>
            )}
            <div className="relative">
              <motion.div
                className="text-7xl"
                animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                🚀
              </motion.div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-slate">{cheer}</h2>
              <p className="mt-1 text-sm text-slate/60 font-body">You earned stars for the Mars base.</p>
              <div className="mt-4">
                <ProgressStars value={stars} size="lg" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" className="kid-btn-green !text-lg" onClick={onPlayAgain}>
                  Play Again
                </button>
                <button type="button" className="kid-btn-light !text-lg" onClick={onHome}>
                  Mission Control
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
