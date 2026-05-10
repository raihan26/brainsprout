import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GRADES } from '../data/grades';
import { playTap, playWin } from '../utils/sound';

export default function GradePicker() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [tapped, setTapped] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const confettiId = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const spawnConfetti = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '⭐', '✨', '🌟', '🚀', '💫', '🔥'];
    const burst = Array.from({ length: 14 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 220,
      y: cy + (Math.random() - 0.5) * 220,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti((prev) => [...prev, ...burst]);
    setTimeout(() => setConfetti((prev) => prev.filter((p) => !burst.includes(p))), 1000);
  };

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 10;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden select-none bg-[#0a0a1a]"
      onMouseMove={handleMouseMove}
      ref={sceneRef}
    >
      {/* ===== CINEMATIC SPACE SCENE ===== */}
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#2d1b69]" />

        {/* Nebula glow effects - parallax reactive */}
        <div
          className="absolute inset-0 opacity-40 transition-transform duration-[2000ms] ease-out"
          style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)` }}
        >
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#7c3aed] blur-[100px] top-[-50px] left-[10%] opacity-30" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-[#0ea5e9] blur-[80px] top-[20%] right-[15%] opacity-25" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#f97316] blur-[90px] bottom-[10%] left-[40%] opacity-20" />
        </div>

        {/* Star field - layer 1 (far, slow) */}
        <div
          className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
          style={{ transform: `translate(${parallaxX * 0.1}px, ${parallaxY * 0.1}px)` }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={`s1-${i}`}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                width: `${0.5 + Math.random() * 1.5}px`,
                height: `${0.5 + Math.random() * 1.5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Star field - layer 2 (closer, brighter) */}
        <div
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
          style={{ transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)` }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={`s2-${i}`}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                width: `${1.5 + Math.random() * 2}px`,
                height: `${1.5 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                boxShadow: '0 0 4px rgba(255,255,255,0.8)',
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Earth - with glow and atmosphere */}
        <div
          className="absolute top-8 right-[8%] sm:right-[12%] transition-transform duration-[2500ms] ease-out"
          style={{ transform: `translate(${parallaxX * -0.4}px, ${parallaxY * -0.2}px)` }}
          aria-hidden="true"
        >
          <div className="relative w-14 h-14 sm:w-20 sm:h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#74b9ff] to-[#0984e3] shadow-[0_0_30px_rgba(9,132,227,0.5)]" />
            <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-[#00b894] via-[#0984e3] to-[#00b894] opacity-60" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10" />
          </div>
        </div>

        {/* Mars */}
        <div
          className="absolute top-12 left-[6%] sm:left-[10%] transition-transform duration-[2500ms] ease-out"
          style={{ transform: `translate(${parallaxX * -0.3}px, ${parallaxY * -0.15}px)` }}
          aria-hidden="true"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#e17055] to-[#d63031] shadow-[0_0_20px_rgba(214,48,49,0.4)]" />
        </div>

        {/* Rocket - cinematic flight path */}
        <div className="absolute rocket-cinema" aria-hidden="true">
          <div className="text-3xl sm:text-5xl drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            🚀
          </div>
          {/* Flame trail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-8 bg-gradient-to-b from-orange-400 via-yellow-300 to-transparent rounded-full blur-sm opacity-80 animate-pulse-soft" />
        </div>

        {/* Shooting stars */}
        <div className="shooting-star-1" aria-hidden="true">
          <div className="w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_6px_#fff,-10px_0_15px_rgba(255,255,255,0.3),-20px_0_25px_rgba(255,255,255,0.1)]" />
        </div>
        <div className="shooting-star-2" aria-hidden="true">
          <div className="w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_6px_#fff,-10px_0_15px_rgba(255,255,255,0.3)]" />
        </div>

        {/* Mars surface with depth */}
        <div className="absolute bottom-0 left-0 right-0 h-[110px] sm:h-[130px]">
          <svg viewBox="0 0 1200 130" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="marsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c0392b" />
                <stop offset="100%" stopColor="#922b21" />
              </linearGradient>
            </defs>
            <path d="M0,50 Q150,20 300,45 Q450,70 600,35 Q750,10 900,50 Q1050,70 1200,40 L1200,130 L0,130 Z" fill="url(#marsGrad)" />
            <path d="M0,70 Q200,55 400,70 Q600,85 800,60 Q1000,45 1200,65 L1200,130 L0,130 Z" fill="#a93226" />
            <path d="M0,90 Q300,80 600,95 Q900,105 1200,85 L1200,130 L0,130 Z" fill="#922b21" />
          </svg>

          {/* Mars base - parallax layer */}
          <div
            className="absolute bottom-6 left-[6%] sm:left-[10%] transition-transform duration-[1500ms] ease-out"
            style={{ transform: `translate(${parallaxX * 0.5}px, 0)` }}
            aria-hidden="true"
          >
            <svg width="160" height="80" viewBox="0 0 160 80" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {/* Dome */}
              <ellipse cx="50" cy="60" rx="40" ry="22" fill="#4a5568" opacity="0.95" />
              <path d="M10,60 Q50,20 90,60" fill="#74b9ff" opacity="0.15" />
              <ellipse cx="50" cy="60" rx="40" ry="22" fill="none" stroke="#a0aec0" strokeWidth="0.8" />
              {/* Dome window glow */}
              <ellipse cx="50" cy="52" rx="12" ry="8" fill="#74b9ff" opacity="0.3" />
              {/* Antenna */}
              <line x1="50" y1="38" x2="50" y2="18" stroke="#a0aec0" strokeWidth="1.5" />
              <circle cx="50" cy="16" r="3" fill="#ef4444" className="animate-pulse-soft" />
              {/* Solar array */}
              <rect x="100" y="42" width="40" height="22" rx="2" fill="#1a202c" />
              <rect x="103" y="44" width="16" height="9" fill="#0ea5e9" opacity="0.6" />
              <rect x="121" y="44" width="16" height="9" fill="#0ea5e9" opacity="0.6" />
              <rect x="103" y="55" width="16" height="7" fill="#0ea5e9" opacity="0.4" />
              <rect x="121" y="55" width="16" height="7" fill="#0ea5e9" opacity="0.4" />
              <rect x="118" y="64" width="4" height="12" fill="#4a5568" />
              {/* Crane */}
              <line x1="145" y1="22" x2="145" y2="64" stroke="#ecc94b" strokeWidth="1.5" />
              <line x1="125" y1="22" x2="155" y2="22" stroke="#ecc94b" strokeWidth="1.5" />
              <rect x="128" y="28" width="6" height="6" fill="#a0aec0" className="crane-block" />
            </svg>
          </div>

          {/* Cybertruck driving */}
          <div className="absolute bottom-3 cybertruck-drive" aria-hidden="true">
            <svg width="70" height="35" viewBox="0 0 220 110" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#b2bec3" />
              <polygon points="25,65 25,80 110,80 110,65" fill="#95a5a6" />
              <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.7" />
              <line x1="200" y1="50" x2="215" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
              <circle cx="53" cy="84" r="12" fill="#1a202c" />
              <circle cx="53" cy="84" r="7" fill="#4a5568" />
              <circle cx="170" cy="84" r="12" fill="#1a202c" />
              <circle cx="170" cy="84" r="7" fill="#4a5568" />
            </svg>
            {/* Dust trail */}
            <div className="absolute -left-4 bottom-0 w-8 h-4 bg-gradient-to-l from-[#92322180] to-transparent rounded-full blur-sm" />
          </div>

          {/* Robot */}
          <div className="absolute bottom-8 right-[12%] sm:right-[18%] text-2xl sm:text-3xl animate-floaty drop-shadow-[0_0_8px_rgba(116,185,255,0.4)]" style={{ animationDuration: '2.5s' }} aria-hidden="true">
            🤖
          </div>

          {/* Flag */}
          <div className="absolute bottom-6 right-[32%] sm:right-[38%]" aria-hidden="true">
            <svg width="20" height="36" viewBox="0 0 20 36">
              <line x1="2" y1="4" x2="2" y2="36" stroke="#a0aec0" strokeWidth="1.5" />
              <rect x="4" y="4" width="15" height="10" rx="1" fill="#7c3aed" />
              <text x="7" y="12" fontSize="5" fill="#fff" fontWeight="bold">BS</text>
            </svg>
          </div>
        </div>
      </div>

      {/* ===== GLASS CONTENT AREA ===== */}
      <div className="flex-1 relative bg-gradient-to-b from-[#1a1040] via-cream to-cream">
        {/* Gradient transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#922b21] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center px-4 pt-10 pb-8">
          {/* Confetti */}
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

          {/* Header with glow */}
          <div className={`text-center mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
            <div
              className="text-5xl sm:text-6xl mb-3 cursor-pointer hover:scale-125 transition-transform duration-300 inline-block drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              onClick={() => playWin()}
            >
              🌱
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate text-shadow-kid">
              BrainSprout
            </h1>
            <p className="text-base sm:text-lg text-slate/60 mt-2 font-body font-semibold">
              Launch your learning adventure!
            </p>
          </div>

          {/* Grade cards - glass morphism style */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full max-w-xl">
            {GRADES.map((g, i) => {
              const isTapped = tapped === g.id;
              return (
                <Link
                  key={g.id}
                  to={`/${g.id}`}
                  className={`
                    group relative overflow-hidden rounded-3xl p-5 sm:p-6
                    no-underline text-slate
                    bg-white/80 backdrop-blur-md
                    border border-white/60
                    shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]
                    transition-all duration-500 ease-out
                    hover:scale-[1.05] hover:-translate-y-2
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)]
                    active:scale-95
                    ${isTapped ? 'scale-95 ring-3 ring-sun' : ''}
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                  `}
                  style={{
                    transitionDelay: loaded ? `${300 + i * 120}ms` : '0ms',
                  }}
                  onMouseEnter={() => playTap()}
                  onClick={(e) => {
                    setTapped(g.id);
                    playWin();
                    spawnConfetti(e);
                  }}
                >
                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${g.accentColor}20 0%, transparent 70%)` }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-[10%] right-[10%] h-[3px] rounded-b-full opacity-60 group-hover:opacity-100 group-hover:left-[5%] group-hover:right-[5%] transition-all duration-500"
                    style={{ background: g.accentColor }}
                  />

                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl text-center group-hover:animate-wiggle group-hover:scale-110 transition-transform duration-300">
                      {g.emoji}
                    </div>
                    <div className="mt-3 text-center">
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-2 font-display font-bold text-white text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: g.accentColor, boxShadow: `0 4px 14px ${g.accentColor}40` }}
                      >
                        {g.label}
                      </div>
                      <div className="text-base sm:text-lg font-display font-bold">{g.title}</div>
                      <div className="text-xs text-slate/50 mt-0.5 font-body">{g.description}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className={`mt-8 text-center transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-slate/40 text-sm font-body font-semibold">
              Tap a card to begin your adventure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
