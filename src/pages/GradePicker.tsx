import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GRADES } from '../data/grades';
import { playTap, playWin } from '../utils/sound';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  emoji: ['⭐', '✨', '🌟', '💫', '🎈', '🎉', '🦋', '🌈', '🍭', '🎵'][i % 10],
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 4 + Math.random() * 6,
  size: 1.2 + Math.random() * 1.5,
}));

const CARD_CHARACTERS: Record<string, string[]> = {
  k: ['🐛', '🌻', '🦋'],
  '1': ['🚀', '🌟', '🛸'],
  '2': ['⚡', '🔥', '💎'],
  '3': ['🏆', '👑', '🎓'],
};

export default function GradePicker() {
  const [loaded, setLoaded] = useState(false);
  const [tapped, setTapped] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const confettiId = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const spawnConfetti = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '⭐', '✨', '🌟', '🎊', '💥', '🔥', '🌈'];
    const burst = Array.from({ length: 12 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 200,
      y: cy + (Math.random() - 0.5) * 200,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti((prev) => [...prev, ...burst]);
    setTimeout(() => setConfetti((prev) => prev.filter((p) => !burst.includes(p))), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none">
      {/* Animated floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute opacity-60"
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
          className="fixed pointer-events-none text-3xl animate-confetti-pop z-50"
          style={{ left: c.x, top: c.y }}
          aria-hidden="true"
        >
          {c.emoji}
        </span>
      ))}

      {/* Header with bounce-in */}
      <div className={`relative z-10 text-center mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="text-7xl sm:text-8xl mb-3 animate-bounce-slow cursor-pointer hover:scale-125 transition-transform" onClick={() => playWin()}>
          🧠
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
          BrainSprout
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mt-3 font-bold">
          Pick your grade to start learning!
        </p>
      </div>

      {/* Grade cards with staggered entry */}
      <div className="relative z-10 grid grid-cols-2 gap-5 sm:gap-7 w-full max-w-2xl px-2">
        {GRADES.map((g, i) => {
          const isTapped = tapped === g.id;
          return (
            <Link
              key={g.id}
              to={`/${g.id}`}
              className={`
                group relative kid-card bg-gradient-to-br ${g.bgGradient}
                no-underline text-gray-900 overflow-hidden
                transition-all duration-500
                hover:scale-[1.06] hover:-translate-y-2 hover:shadow-2xl
                active:scale-95
                ${isTapped ? 'scale-95 ring-4 ring-yellow-400' : ''}
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{ transitionDelay: loaded ? `${200 + i * 120}ms` : '0ms' }}
              onMouseEnter={() => playTap()}
              onClick={(e) => {
                setTapped(g.id);
                playWin();
                spawnConfetti(e);
              }}
            >
              {/* Animated shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Floating mini characters */}
              <div className="absolute top-1 right-1 flex gap-0.5">
                {CARD_CHARACTERS[g.id]?.map((ch, ci) => (
                  <span
                    key={ci}
                    className="text-lg sm:text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 animate-floaty"
                    style={{ animationDelay: `${ci * 200}ms`, transitionDelay: `${ci * 80}ms` }}
                    aria-hidden="true"
                  >
                    {ch}
                  </span>
                ))}
              </div>

              {/* Main emoji with wiggle on hover */}
              <div className="text-6xl sm:text-7xl text-center group-hover:animate-wiggle transition-transform duration-300 group-hover:scale-110">
                {g.emoji}
              </div>

              {/* Grade badge */}
              <div className="mt-3 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 shadow-lg mb-2 group-hover:rotate-12 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {g.label}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold">{g.title}</div>
                <div className="text-sm text-gray-700 mt-1">{g.description}</div>
              </div>

              {/* Bottom rainbow bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #FFD166, #EF476F, #9D4EDD, #4CC9F0, #06D6A0)' }}
              />

              {/* Pulse ring effect on hover */}
              <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-white/50 group-hover:animate-pulse transition-all duration-300" />
            </Link>
          );
        })}
      </div>

      {/* Animated footer */}
      <div className={`relative z-10 mt-8 text-center transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <p className="text-gray-600 text-base font-bold animate-bounce-slow">
          Tap your grade and let's go! 🎉
        </p>
      </div>
    </div>
  );
}
