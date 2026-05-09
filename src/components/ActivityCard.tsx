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
  return (
    <Link
      to={to}
      className="group kid-card hover:-translate-y-1 hover:shadow-kidHover transition-all no-underline text-slate flex flex-col relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-4xl"
        style={{ background: accentMap[color] }}
      />
      <div className="text-5xl sm:text-6xl text-center group-hover:animate-wiggle mt-1" aria-hidden="true">
        {emoji}
      </div>
      <div className="mt-3 text-center flex-1">
        <div className="text-lg sm:text-xl font-display font-bold">{title}</div>
        {description && <div className="text-xs sm:text-sm text-slate/60 font-body mt-0.5">{description}</div>}
      </div>
      {typeof stars === 'number' && (
        <div className="mt-3 text-center">
          <ProgressStars value={stars} size="sm" />
        </div>
      )}
    </Link>
  );
}
