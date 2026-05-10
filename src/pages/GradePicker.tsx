import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GRADES } from '../data/grades';
import { playTap, playWin } from '../utils/sound';

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
    const emojis = ['🎉', '⭐', '✨', '🌟', '🎊', '💫', '🚀'];
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
    <div className="min-h-screen flex flex-col relative overflow-hidden select-none">
      {/* ===== ANIMATED MARS SCENE ===== */}
      <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-pulse-soft"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Earth in distance */}
        <div className="absolute top-6 right-8 sm:right-16 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#74b9ff] to-[#0984e3] opacity-80 shadow-[0_0_20px_rgba(116,185,255,0.4)]" aria-hidden="true">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#00b894] to-[#0984e3] opacity-60" />
        </div>

        {/* Mars (planet destination) */}
        <div className="absolute top-4 left-8 sm:left-16 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#e17055] to-[#d63031] opacity-90" aria-hidden="true" />

        {/* Rocket flying to Mars */}
        <div className="absolute rocket-path" aria-hidden="true">
          <div className="text-3xl sm:text-4xl animate-floaty" style={{ animationDuration: '1.5s' }}>
            🚀
          </div>
        </div>

        {/* Mars surface */}
        <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[120px]">
          {/* Rocky terrain */}
          <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0,40 Q100,20 200,35 Q300,50 400,30 Q500,10 600,40 Q700,55 800,30 L800,120 L0,120 Z" fill="#c0392b" />
            <path d="M0,60 Q150,45 300,55 Q450,65 600,50 Q750,40 800,55 L800,120 L0,120 Z" fill="#e74c3c" />
            <path d="M0,80 Q200,70 400,80 Q600,90 800,75 L800,120 L0,120 Z" fill="#d63031" />
          </svg>

          {/* Mars base structure */}
          <div className="absolute bottom-4 left-[8%] sm:left-[12%]" aria-hidden="true">
            <svg width="120" height="70" viewBox="0 0 120 70">
              {/* Dome habitat */}
              <ellipse cx="40" cy="55" rx="35" ry="20" fill="#636e72" opacity="0.9" />
              <ellipse cx="40" cy="55" rx="35" ry="20" fill="none" stroke="#b2bec3" strokeWidth="1" />
              <path d="M5,55 Q40,15 75,55" fill="#74b9ff" opacity="0.3" />
              {/* Antenna */}
              <line x1="40" y1="35" x2="40" y2="15" stroke="#b2bec3" strokeWidth="2" />
              <circle cx="40" cy="13" r="3" fill="#e74c3c" className="animate-pulse-soft" />
              {/* Solar panel */}
              <rect x="80" y="40" width="30" height="18" rx="2" fill="#2d3436" />
              <rect x="82" y="42" width="12" height="7" fill="#0984e3" opacity="0.7" />
              <rect x="96" y="42" width="12" height="7" fill="#0984e3" opacity="0.7" />
              <rect x="82" y="51" width="12" height="5" fill="#0984e3" opacity="0.5" />
              <rect x="96" y="51" width="12" height="5" fill="#0984e3" opacity="0.5" />
              <rect x="93" y="58" width="4" height="10" fill="#636e72" />
              {/* Construction crane */}
              <line x1="105" y1="20" x2="105" y2="58" stroke="#fdcb6e" strokeWidth="2" />
              <line x1="85" y1="20" x2="115" y2="20" stroke="#fdcb6e" strokeWidth="2" />
              <line x1="90" y1="20" x2="90" y2="30" stroke="#636e72" strokeWidth="1" />
              <rect x="87" y="30" width="6" height="6" fill="#b2bec3" className="animate-bounce-slow" style={{ transformOrigin: '90px 20px' }} />
            </svg>
          </div>

          {/* Cybertruck driving on Mars */}
          <div className="absolute bottom-2 mars-drive" aria-hidden="true">
            <svg width="80" height="45" viewBox="0 0 220 130">
              <polygon
                points="15,100 25,100 25,80 40,55 110,42 200,55 215,80 215,100 205,100"
                fill="#b2bec3"
              />
              <polygon points="25,80 25,100 110,100 110,80" fill="#95a5a6" />
              <polygon points="115,80 140,55 200,55 200,80" fill="#2d3436" opacity="0.7" />
              <line x1="200" y1="62" x2="215" y2="76" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <circle cx="53" cy="104" r="14" fill="#2d3436" />
              <circle cx="53" cy="104" r="8" fill="#636e72" />
              <circle cx="170" cy="104" r="14" fill="#2d3436" />
              <circle cx="170" cy="104" r="8" fill="#636e72" />
            </svg>
          </div>

          {/* Robot helper */}
          <div className="absolute bottom-6 right-[15%] sm:right-[20%] text-2xl sm:text-3xl animate-floaty" style={{ animationDuration: '2s' }} aria-hidden="true">
            🤖
          </div>

          {/* Flag */}
          <div className="absolute bottom-4 right-[35%] sm:right-[40%]" aria-hidden="true">
            <svg width="24" height="40" viewBox="0 0 24 40">
              <line x1="3" y1="5" x2="3" y2="40" stroke="#b2bec3" strokeWidth="2" />
              <rect x="5" y="5" width="18" height="12" rx="1" fill="#e74c3c" />
              <text x="10" y="14" fontSize="6" fill="#fff" fontWeight="bold">BS</text>
            </svg>
          </div>
        </div>

        {/* Shooting star */}
        <div className="absolute shooting-star" aria-hidden="true">
          <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff]" />
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 -mt-6 relative z-10">
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
        <div className={`text-center mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div
            className="text-6xl sm:text-7xl mb-3 animate-bounce-slow cursor-pointer hover:scale-110 transition-transform inline-block"
            onClick={() => playWin()}
          >
            🌱
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate text-shadow-kid">
            BrainSprout
          </h1>
          <p className="text-lg sm:text-xl text-slate/60 mt-2 font-body font-semibold">
            Launch your learning adventure!
          </p>
        </div>

        {/* Grade cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full max-w-xl px-2">
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
                <div className="text-4xl sm:text-5xl text-center mt-2 group-hover:animate-wiggle transition-transform">
                  {g.emoji}
                </div>

                {/* Grade info */}
                <div className="mt-3 text-center">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full mb-2 font-display font-bold text-white text-lg sm:text-xl shadow-sm"
                    style={{ background: g.accentColor }}
                  >
                    {g.label}
                  </div>
                  <div className="text-base sm:text-lg font-display font-bold">{g.title}</div>
                  <div className="text-xs text-slate/50 mt-0.5 font-body">{g.description}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-slate/40 text-sm font-body font-semibold">
            Tap a card to begin your adventure
          </p>
        </div>
      </div>
    </div>
  );
}
