import { useEffect, useMemo } from 'react';
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
  'Great job!',
  'You did it!',
  'Amazing thinking!',
  'Way to go!',
  'Wonderful work!',
  'Super smart!',
  'Brilliant!',
];

export default function Celebration({ show, stars, message, onPlayAgain, onHome }: Props) {
  const { speak } = useSpeech();
  const cheer = useMemo(() => message ?? cheers[Math.floor(Math.random() * cheers.length)], [message, show]);

  useEffect(() => {
    if (show) {
      playWin();
      speak(cheer);
    }
  }, [show, cheer, speak]);

  if (!show) return null;

  const confetti = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate/30 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Activity complete"
    >
      <div className="kid-card max-w-sm w-full text-center relative overflow-hidden animate-pop">
        <div className="pointer-events-none absolute inset-0">
          {confetti.map((i) => (
            <span
              key={i}
              className="absolute text-xl animate-sparkle"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 8) * 90}ms`,
              }}
              aria-hidden="true"
            >
              {['✨', '⭐', '🎉', '🌈', '💫'][i % 5]}
            </span>
          ))}
        </div>
        <div className="relative">
          <div className="text-6xl animate-floaty" aria-hidden="true">🎉</div>
          <h2 className="mt-3 text-3xl font-display font-bold text-slate">{cheer}</h2>
          <div className="mt-4">
            <ProgressStars value={stars} size="lg" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className="kid-btn-green !text-lg" onClick={onPlayAgain}>
              Play Again
            </button>
            <button type="button" className="kid-btn-light !text-lg" onClick={onHome}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
