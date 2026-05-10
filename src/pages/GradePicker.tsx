import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { GRADES } from '../data/grades';
import { playTap, playWin } from '../utils/sound';

const SPRING_GENTLE = { type: 'spring' as const, stiffness: 120, damping: 20 };
const SPRING_BOUNCY = { type: 'spring' as const, stiffness: 300, damping: 15 };
const SPRING_SLOW = { type: 'spring' as const, stiffness: 80, damping: 25 };

export default function GradePicker() {
  const [tapped, setTapped] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const confettiId = useRef(0);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const nebulaX = useTransform(smoothX, [0, 1], [-15, 15]);
  const nebulaY = useTransform(smoothY, [0, 1], [-8, 8]);
  const starsX = useTransform(smoothX, [0, 1], [-5, 5]);
  const starsY = useTransform(smoothY, [0, 1], [-3, 3]);
  const earthX = useTransform(smoothX, [0, 1], [8, -8]);
  const earthY = useTransform(smoothY, [0, 1], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const spawnConfetti = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '⭐', '✨', '🌟', '🚀', '💫', '🔥'];
    const burst = Array.from({ length: 14 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 240,
      y: cy + (Math.random() - 0.5) * 240,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti((prev) => [...prev, ...burst]);
    setTimeout(() => setConfetti((prev) => prev.filter((p) => !burst.includes(p))), 1200);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden select-none bg-[#0a0a1a]"
      onMouseMove={handleMouseMove}
    >
      {/* ===== CINEMATIC SPACE SCENE ===== */}
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden">
        {/* Deep space */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#2d1b69]" />

        {/* Nebula glow - parallax reactive */}
        <motion.div className="absolute inset-0 opacity-40" style={{ x: nebulaX, y: nebulaY }}>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#7c3aed] blur-[100px] top-[-50px] left-[10%] opacity-30" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-[#0ea5e9] blur-[80px] top-[20%] right-[15%] opacity-25" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#f97316] blur-[90px] bottom-[10%] left-[40%] opacity-20" />
        </motion.div>

        {/* Star field - far layer */}
        <motion.div className="absolute inset-0" style={{ x: starsX, y: starsY }}>
          {Array.from({ length: 70 }).map((_, i) => (
            <motion.span
              key={`s-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${0.5 + Math.random() * 1.5}px`,
                height: `${0.5 + Math.random() * 1.5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          ))}
        </motion.div>

        {/* Earth with glow */}
        <motion.div
          className="absolute top-8 right-[8%] sm:right-[12%]"
          style={{ x: earthX, y: earthY }}
          aria-hidden="true"
        >
          <motion.div
            className="relative w-14 h-14 sm:w-20 sm:h-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#74b9ff] to-[#0984e3] shadow-[0_0_40px_rgba(9,132,227,0.5)]" />
            <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-[#00b894] via-[#0984e3] to-[#00b894] opacity-50" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10" />
          </motion.div>
        </motion.div>

        {/* Mars */}
        <motion.div
          className="absolute top-12 left-[6%] sm:left-[10%]"
          style={{ x: useTransform(smoothX, [0, 1], [5, -5]), y: useTransform(smoothY, [0, 1], [3, -3]) }}
          aria-hidden="true"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#e17055] to-[#d63031] shadow-[0_0_24px_rgba(214,48,49,0.4)]" />
        </motion.div>

        {/* Rocket with trail */}
        <motion.div
          className="absolute"
          animate={{
            left: ['72%', '15%', '5%'],
            top: ['58%', '10%', '2%'],
            rotate: [-35, -42, -42],
            scale: [0.7, 1.1, 0.5],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.55, 0.65] }}
          aria-hidden="true"
        >
          <span className="text-3xl sm:text-5xl block drop-shadow-[0_0_16px_rgba(249,115,22,0.8)]">🚀</span>
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-10 bg-gradient-to-b from-orange-400 via-yellow-300 to-transparent rounded-full blur-sm"
            animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </motion.div>

        {/* Shooting stars */}
        {[{ delay: 2, dur: 6 }, { delay: 5, dur: 8 }].map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              left: ['82%', '30%'],
              top: ['6%', '28%'],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'linear', times: [0, 0.1, 0.2] }}
            aria-hidden="true"
          >
            <div className="w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_6px_#fff,-8px_4px_12px_rgba(255,255,255,0.3),-16px_8px_20px_rgba(255,255,255,0.1)]" />
          </motion.div>
        ))}

        {/* Mars surface */}
        <div className="absolute bottom-0 left-0 right-0 h-[110px] sm:h-[130px]">
          <svg viewBox="0 0 1200 130" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="marsG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c0392b" />
                <stop offset="100%" stopColor="#922b21" />
              </linearGradient>
            </defs>
            <path d="M0,50 Q150,20 300,45 Q450,70 600,35 Q750,10 900,50 Q1050,70 1200,40 L1200,130 L0,130 Z" fill="url(#marsG)" />
            <path d="M0,70 Q200,55 400,70 Q600,85 800,60 Q1000,45 1200,65 L1200,130 L0,130 Z" fill="#a93226" />
            <path d="M0,90 Q300,80 600,95 Q900,105 1200,85 L1200,130 L0,130 Z" fill="#922b21" />
          </svg>

          {/* Mars base */}
          <motion.div
            className="absolute bottom-6 left-[6%] sm:left-[10%]"
            style={{ x: useTransform(smoothX, [0, 1], [-8, 8]) }}
            aria-hidden="true"
          >
            <svg width="160" height="80" viewBox="0 0 160 80" className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              <ellipse cx="50" cy="60" rx="40" ry="22" fill="#4a5568" opacity="0.95" />
              <path d="M10,60 Q50,20 90,60" fill="#74b9ff" opacity="0.12" />
              <ellipse cx="50" cy="60" rx="40" ry="22" fill="none" stroke="#a0aec0" strokeWidth="0.8" />
              <ellipse cx="50" cy="52" rx="12" ry="8" fill="#74b9ff" opacity="0.25" />
              <line x1="50" y1="38" x2="50" y2="18" stroke="#a0aec0" strokeWidth="1.5" />
              <circle cx="50" cy="16" r="3" fill="#ef4444">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <rect x="100" y="42" width="40" height="22" rx="2" fill="#1a202c" />
              <rect x="103" y="44" width="16" height="9" fill="#0ea5e9" opacity="0.6" />
              <rect x="121" y="44" width="16" height="9" fill="#0ea5e9" opacity="0.6" />
              <rect x="103" y="55" width="16" height="7" fill="#0ea5e9" opacity="0.4" />
              <rect x="121" y="55" width="16" height="7" fill="#0ea5e9" opacity="0.4" />
              <rect x="118" y="64" width="4" height="12" fill="#4a5568" />
              <line x1="145" y1="22" x2="145" y2="64" stroke="#ecc94b" strokeWidth="1.5" />
              <line x1="125" y1="22" x2="155" y2="22" stroke="#ecc94b" strokeWidth="1.5" />
              <rect x="128" y="28" width="6" height="6" fill="#a0aec0">
                <animate attributeName="y" values="28;34;28" dur="3s" repeatCount="indefinite" />
              </rect>
            </svg>
          </motion.div>

          {/* Cybertruck */}
          <motion.div
            className="absolute bottom-3"
            animate={{ left: ['-12%', '108%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <svg width="70" height="35" viewBox="0 0 220 110" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#b2bec3" />
              <polygon points="25,65 25,80 110,80 110,65" fill="#95a5a6" />
              <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.7" />
              <line x1="200" y1="50" x2="215" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
              <circle cx="53" cy="84" r="12" fill="#1a202c" />
              <circle cx="53" cy="84" r="7" fill="#4a5568" />
              <circle cx="170" cy="84" r="12" fill="#1a202c" />
              <circle cx="170" cy="84" r="7" fill="#4a5568" />
            </svg>
            <div className="absolute -left-4 bottom-0 w-8 h-4 bg-gradient-to-l from-[#92322180] to-transparent rounded-full blur-sm" />
          </motion.div>

          {/* Robot */}
          <motion.div
            className="absolute bottom-8 right-[12%] sm:right-[18%] text-2xl sm:text-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <span className="drop-shadow-[0_0_10px_rgba(116,185,255,0.5)]">🤖</span>
          </motion.div>

          {/* Flag */}
          <div className="absolute bottom-6 right-[32%] sm:right-[38%]" aria-hidden="true">
            <svg width="20" height="36" viewBox="0 0 20 36">
              <line x1="2" y1="4" x2="2" y2="36" stroke="#a0aec0" strokeWidth="1.5" />
              <motion.rect
                x="4" y="4" width="15" height="10" rx="1" fill="#7c3aed"
                animate={{ skewX: [0, 2, -1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x="7" y="12" fontSize="5" fill="#fff" fontWeight="bold">BS</text>
            </svg>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 relative bg-gradient-to-b from-[#1a1040] via-cream to-cream">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#922b21] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center px-4 pt-10 pb-8">
          {/* Confetti */}
          <AnimatePresence>
            {confetti.map((c) => (
              <motion.span
                key={c.id}
                className="fixed pointer-events-none text-2xl z-50"
                style={{ left: c.x, top: c.y }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.5, 0], rotate: [0, 180, 360], opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                aria-hidden="true"
              >
                {c.emoji}
              </motion.span>
            ))}
          </AnimatePresence>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_SLOW}
          >
            <motion.div
              className="text-5xl sm:text-6xl mb-3 cursor-pointer inline-block"
              whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.8 }}
              transition={SPRING_BOUNCY}
              onClick={() => playWin()}
            >
              <span className="drop-shadow-[0_0_24px_rgba(34,197,94,0.5)]">🌱</span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl font-display font-bold text-slate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_GENTLE, delay: 0.2 }}
            >
              BrainSprout
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-slate/60 mt-2 font-body font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Launch your learning adventure!
            </motion.p>
          </motion.div>

          {/* Grade cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full max-w-xl">
            {GRADES.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...SPRING_GENTLE, delay: 0.4 + i * 0.12 }}
              >
                <Link
                  to={`/${g.id}`}
                  className="block no-underline text-slate"
                  onMouseEnter={() => playTap()}
                  onClick={(e) => {
                    setTapped(g.id);
                    playWin();
                    spawnConfetti(e);
                  }}
                >
                  <motion.div
                    className={`
                      relative overflow-hidden rounded-3xl p-5 sm:p-6
                      bg-white/80 backdrop-blur-md
                      border border-white/60
                      shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]
                      ${tapped === g.id ? 'ring-3 ring-sun' : ''}
                    `}
                    whileHover={{
                      y: -8,
                      scale: 1.04,
                      boxShadow: '0 24px 60px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,1)',
                    }}
                    whileTap={{ scale: 0.93 }}
                    transition={SPRING_BOUNCY}
                  >
                    {/* Accent glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${g.accentColor}25 0%, transparent 70%)` }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Top bar */}
                    <motion.div
                      className="absolute top-0 left-[12%] right-[12%] h-[3px] rounded-b-full"
                      style={{ background: g.accentColor, opacity: 0.6 }}
                      whileHover={{ left: '5%', right: '5%', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="text-4xl sm:text-5xl text-center"
                        whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0] }}
                        transition={SPRING_BOUNCY}
                      >
                        {g.emoji}
                      </motion.div>
                      <div className="mt-3 text-center">
                        <motion.div
                          className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-2 font-display font-bold text-white text-base sm:text-lg"
                          style={{ background: g.accentColor, boxShadow: `0 4px 14px ${g.accentColor}40` }}
                          whileHover={{ scale: 1.15 }}
                          transition={SPRING_BOUNCY}
                        >
                          {g.label}
                        </motion.div>
                        <div className="text-base sm:text-lg font-display font-bold">{g.title}</div>
                        <div className="text-xs text-slate/50 mt-0.5 font-body">{g.description}</div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.p
            className="mt-8 text-slate/40 text-sm font-body font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Tap a card to begin your adventure
          </motion.p>
        </div>
      </div>
    </div>
  );
}
