import { Link } from 'react-router-dom';
import VoiceToggle from '../../components/VoiceToggle';

type Props = {
  totalStars?: number;
};

export default function LandingTopBar({ totalStars }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/25 shadow-lg">
        <span className="text-2xl sm:text-3xl drop-shadow" aria-hidden="true">🌱</span>
        <span className="text-white font-display font-bold text-lg sm:text-xl">BrainSprout</span>
        {typeof totalStars === 'number' && totalStars > 0 && (
          <span className="ml-2 inline-flex items-center gap-1 text-white/95 font-display font-bold text-base sm:text-lg border-l border-white/30 pl-3">
            <span aria-hidden="true">⭐</span>
            <span>{totalStars}</span>
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <VoiceToggle />
        <Link
          to="/parent"
          className="inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white text-slate px-4 py-2.5 text-base font-body font-bold no-underline border-2 border-white shadow-md transition hover:scale-105"
          aria-label="Parent Dashboard"
        >
          <span className="text-xl" aria-hidden="true">👪</span>
          <span className="hidden sm:inline">Parents</span>
        </Link>
      </div>
    </div>
  );
}
