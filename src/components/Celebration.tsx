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

  const confetti = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Activity complete"
    >
      <div className="kid-card max-w-md w-full text-center relative overflow-hidden animate-pop">
        <div className="pointer-events-none absolute inset-0">
          {confetti.map((i) => (
            <span
              key={i}
              className="absolute text-2xl animate-sparkle"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 8) * 80}ms`,
              }}
              aria-hidden="true"
            >
              {['✨', '⭐', '🎉', '🌈', '💖'][i % 5]}
            </span>
          ))}
        </div>
        <div className="relative">
          <div className="text-7xl animate-floaty" aria-hidden="true">🎉</div>
          <h2 className="mt-2 text-3xl font-extrabold text-plum">{cheer}</h2>
          <div className="mt-3">
            <ProgressStars value={stars} size="lg" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className="kid-btn-green text-xl" onClick={onPlayAgain}>
              Play again
            </button>
            <button type="button" className="kid-btn-light text-xl" onClick={onHome}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
