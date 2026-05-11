import { Link } from 'react-router-dom';
import ProgressStars from './ProgressStars';

type Props = {
  to: string;
  emoji: string;
  title: string;
  description?: string;
  stars?: number;
  color?: 'sun' | 'sky' | 'grass' | 'berry' | 'plum';
};

const accentMap = {
  sun: '#f4a261',
  sky: '#219ebc',
  grass: '#2a9d8f',
  berry: '#e76f51',
  plum: '#7b2cbf',
} as const;

export default function ActivityCard({ to, emoji, title, description, stars, color = 'sky' }: Props) {
  const done = typeof stars === 'number' && stars > 0;
  return (
    <Link
      to={to}
      className="group mission-card flex flex-col no-underline text-slate h-full"
      aria-label={`${title}${description ? ` — ${description}` : ''}`}
    >
      <div
        className="absolute top-0 left-[8%] right-[8%] h-[3px] rounded-b-full"
        style={{ background: accentMap[color] }}
      />
      <div className="flex items-center gap-3">
        <div
          className="text-4xl sm:text-5xl shrink-0 transition-transform group-hover:scale-110"
          aria-hidden="true"
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-display font-bold leading-tight">{title}</div>
          {description && (
            <div className="text-xs text-slate/60 font-body mt-0.5 leading-tight line-clamp-2">
              {description}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        {typeof stars === 'number' ? (
          <ProgressStars value={stars} size="sm" />
        ) : (
          <span />
        )}
        <span
          className="text-xs font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            background: done ? `${accentMap[color]}1a` : 'rgba(38,70,83,0.06)',
            color: done ? accentMap[color] : 'rgba(38,70,83,0.5)',
          }}
        >
          {done ? 'Play again' : 'Start'}
        </span>
      </div>
    </Link>
  );
}
