import { Link } from 'react-router-dom';
import VoiceToggle from '../../components/VoiceToggle';

type Props = {
  totalStars?: number;
};

export default function LandingTopBar({ totalStars }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-2 bg-white/12 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
        <span className="text-lg" aria-hidden="true">🌱</span>
        <span className="text-white font-display font-semibold text-sm">BrainSprout</span>
        {typeof totalStars === 'number' && totalStars > 0 && (
          <span className="ml-1 text-white/90 font-display text-xs border-l border-white/20 pl-2">
            <span aria-hidden="true">⭐</span> {totalStars}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <VoiceToggle />
        <Link
          to="/parent"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-slate px-3 py-2 text-sm font-body font-semibold no-underline border border-white/60 shadow-sm transition"
          aria-label="Parent Dashboard"
        >
          <span aria-hidden="true">👪</span>
          <span className="hidden sm:inline">Parents</span>
        </Link>
      </div>
    </div>
  );
}
