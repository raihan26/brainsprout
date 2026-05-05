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

const bg = {
  sun: 'from-yellow-100 to-orange-100',
  sky: 'from-sky-100 to-blue-100',
  grass: 'from-emerald-100 to-green-100',
  berry: 'from-pink-100 to-rose-100',
  plum: 'from-purple-100 to-fuchsia-100',
} as const;

export default function ActivityCard({ to, emoji, title, description, stars, color = 'sky' }: Props) {
  return (
    <Link
      to={to}
      className={`group kid-card bg-gradient-to-br ${bg[color]} hover:-translate-y-1 transition no-underline text-gray-900 flex flex-col`}
    >
      <div className="text-6xl sm:text-7xl text-center group-hover:animate-wiggle" aria-hidden="true">
        {emoji}
      </div>
      <div className="mt-3 text-center">
        <div className="text-2xl font-extrabold">{title}</div>
        {description && <div className="text-sm text-gray-700 mt-1">{description}</div>}
      </div>
      {typeof stars === 'number' && (
        <div className="mt-3 text-center">
          <ProgressStars value={stars} size="sm" />
        </div>
      )}
    </Link>
  );
}
