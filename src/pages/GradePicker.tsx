import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GRADES } from '../data/grades';
import { playTap, playWin } from '../utils/sound';

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  emoji: ['🌿', '🍃', '🌸', '✨', '🦋', '🌻', '🍂', '💫', '🌈', '🐝'][i % 10],
  x: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 6 + Math.random() * 8,
  size: 1 + Math.random() * 1.2,
}));

export default function GradePicker() {
  const [loaded, setLoaded] = useState(false);
  const [tapped, setTapped] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const confettiId = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const spawnConfetti = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '⭐', '✨', '🌟', '🎊', '💫', '🌈'];
    const burst = Array.from({ length: 10 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 180,
      y: cy + (Math.random() - 0.5) * 180,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti((prev) => [...prev, ...burst]);
    setTimeout(() => setConfetti((prev) => prev.filter((p) => !burst.includes(p))), 900);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none">
      {/* Floating nature particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute opacity-40"
            style={{
              left: `${p.x}%`,
              bottom: '-10%',
              fontSize: `${p.size}rem`,
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
            aria-hidden="true"
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Confetti bursts */}
      {confetti.map((c) => (
        <span
          key={c.id}
          className="fixed pointer-events-none text-2xl animate-confetti-pop z-50"
          style={{ left: c.x, top: c.y }}
          aria-hidden="true"
        >
          {c.emoji}
        </span>
      ))}

      {/* Header */}
      <div className={`relative z-10 text-center mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div
          className="text-7xl sm:text-8xl mb-4 animate-bounce-slow cursor-pointer hover:scale-110 transition-transform inline-block"
          onClick={() => playWin()}
        >
          🌱
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-slate text-shadow-kid">
          BrainSprout
        </h1>
        <p className="text-xl sm:text-2xl text-slate/70 mt-3 font-body font-semibold">
          Pick your grade to start growing!
        </p>
      </div>

      {/* Grade cards */}
      <div className="relative z-10 grid grid-cols-2 gap-5 sm:gap-6 w-full max-w-xl px-2">
        {GRADES.map((g, i) => {
          const isTapped = tapped === g.id;
          return (
            <Link
              key={g.id}
              to={`/${g.id}`}
              className={`
                group relative kid-card overflow-hidden
                no-underline text-slate
                transition-all duration-500
                hover:scale-[1.04] hover:-translate-y-1 hover:shadow-kidHover
                active:scale-95 active:shadow-kidPress
                ${isTapped ? 'scale-95 ring-3 ring-sun' : ''}
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: loaded ? `${150 + i * 100}ms` : '0ms' }}
              onMouseEnter={() => playTap()}
              onClick={(e) => {
                setTapped(g.id);
                playWin();
                spawnConfetti(e);
              }}
            >
              {/* Color accent bar at top */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-4xl"
                style={{ background: g.accentColor }}
              />

              {/* Main emoji */}
              <div className="text-5xl sm:text-6xl text-center mt-2 group-hover:animate-wiggle transition-transform">
                {g.emoji}
              </div>

              {/* Grade info */}
              <div className="mt-4 text-center">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 font-display font-bold text-white text-xl sm:text-2xl shadow-sm"
                  style={{ background: g.accentColor }}
                >
                  {g.label}
                </div>
                <div className="text-lg sm:text-xl font-display font-bold">{g.title}</div>
                <div className="text-sm text-slate/60 mt-0.5 font-body">{g.description}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`relative z-10 mt-10 text-center transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <p className="text-slate/50 text-sm font-body font-semibold">
          Tap a card to begin your adventure
        </p>
      </div>
    </div>
  );
}
