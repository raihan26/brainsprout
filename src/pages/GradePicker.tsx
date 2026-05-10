import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { GRADES } from '../data/grades';
import { playTap, playWin } from '../utils/sound';

const SPRING_BOUNCY = { type: 'spring' as const, stiffness: 300, damping: 15 };
const SPRING_GENTLE = { type: 'spring' as const, stiffness: 120, damping: 20 };
const SPRING_SLOW = { type: 'spring' as const, stiffness: 80, damping: 25 };

export default function GradePicker() {
  const [tapped, setTapped] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const confettiId = useRef(0);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const nebulaX = useTransform(smoothX, [0, 1], [-20, 20]);
  const nebulaY = useTransform(smoothY, [0, 1], [-10, 10]);
  const starsX = useTransform(smoothX, [0, 1], [-6, 6]);
  const starsY = useTransform(smoothY, [0, 1], [-4, 4]);
  const earthX = useTransform(smoothX, [0, 1], [10, -10]);
  const earthY = useTransform(smoothY, [0, 1], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const spawnConfetti = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const emojis = ['🎉', '⭐', '✨', '🌟', '🚀', '💫', '🔥', '🛸'];
    const burst = Array.from({ length: 16 }, () => ({
      id: confettiId.current++,
      x: cx + (Math.random() - 0.5) * 280,
      y: cy + (Math.random() - 0.5) * 280,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti((prev) => [...prev, ...burst]);
    setTimeout(() => setConfetti((prev) => prev.filter((p) => !burst.includes(p))), 1200);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden select-none bg-[#060614]"
      onMouseMove={handleMouseMove}
    >
      {/* ===== IMMERSIVE MARS SCENE ===== */}
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060620] via-[#12103a] to-[#2d1854]" />

        {/* Nebula clouds - reactive to mouse */}
        <motion.div className="absolute inset-0" style={{ x: nebulaX, y: nebulaY }}>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#7c3aed] blur-[120px] top-[-80px] left-[5%] opacity-20" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-[#06b6d4] blur-[100px] top-[10%] right-[10%] opacity-15" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#f97316] blur-[110px] bottom-[20%] left-[35%] opacity-12" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#ec4899] blur-[80px] top-[30%] left-[60%] opacity-10" />
        </motion.div>

        {/* Star field - far layer (100+ stars) */}
        <motion.div className="absolute inset-0" style={{ x: starsX, y: starsY }}>
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.span
              key={`sf-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${0.5 + Math.random() * 1.2}px`,
                height: `${0.5 + Math.random() * 1.2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 65}%`,
              }}
              animate={{ opacity: [0.15, 0.8, 0.15], scale: [1, 1.3, 1] }}
              transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}
        </motion.div>

        {/* Brighter star layer */}
        <motion.div className="absolute inset-0" style={{ x: useTransform(smoothX, [0, 1], [-10, 10]), y: useTransform(smoothY, [0, 1], [-6, 6]) }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.span
              key={`sb-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1.5 + Math.random() * 2}px`,
                height: `${1.5 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 55}%`,
                boxShadow: `0 0 ${3 + Math.random() * 4}px rgba(255,255,255,0.8)`,
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.5, 0.8] }}
              transition={{ duration: 1.5 + Math.random() * 2.5, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          ))}
        </motion.div>

        {/* Earth with atmosphere glow */}
        <motion.div
          className="absolute top-6 right-[6%] sm:right-[10%]"
          style={{ x: earthX, y: earthY }}
          aria-hidden="true"
        >
          <motion.div
            className="relative w-16 h-16 sm:w-24 sm:h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-[-4px] rounded-full bg-[#74b9ff] opacity-20 blur-md" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#74b9ff] via-[#0984e3] to-[#0652DD] shadow-[0_0_50px_rgba(9,132,227,0.6)]" />
            <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-[#00b894] via-transparent to-[#00b894] opacity-40" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/15" />
          </motion.div>
        </motion.div>

        {/* Mars (larger, more detail) */}
        <motion.div
          className="absolute top-8 left-[5%] sm:left-[8%]"
          style={{ x: useTransform(smoothX, [0, 1], [6, -6]) }}
          aria-hidden="true"
        >
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#e17055] via-[#d63031] to-[#c0392b] shadow-[0_0_30px_rgba(214,48,49,0.5)]">
            <div className="absolute inset-[30%] rounded-full bg-[#b71c1c] opacity-30" />
          </div>
        </motion.div>

        {/* Saturn (small, distant) */}
        <motion.div
          className="absolute top-16 left-[45%]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="relative w-6 h-6 sm:w-8 sm:h-8">
            <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-[#fdcb6e] to-[#e17055]" />
            <div className="absolute top-1/2 left-[-30%] right-[-30%] h-[2px] bg-gradient-to-r from-transparent via-[#fdcb6e80] to-transparent -translate-y-1/2 rounded-full" />
          </div>
        </motion.div>

        {/* === MULTIPLE ROCKETS === */}
        {/* Rocket 1 - main hero rocket */}
        <motion.div
          className="absolute"
          animate={{
            left: ['75%', '12%', '3%'],
            top: ['55%', '8%', '0%'],
            rotate: [-32, -45, -45],
            scale: [0.8, 1.2, 0.4],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.5, 0.6] }}
          aria-hidden="true"
        >
          <span className="text-4xl sm:text-6xl block drop-shadow-[0_0_20px_rgba(249,115,22,0.9)]">🚀</span>
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-full blur-sm"
            animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.7, 1.3, 0.7] }}
            transition={{ duration: 0.25, repeat: Infinity }}
          />
        </motion.div>

        {/* Rocket 2 - smaller, different timing */}
        <motion.div
          className="absolute"
          animate={{
            left: ['85%', '50%', '35%'],
            top: ['45%', '5%', '0%'],
            rotate: [-50, -55, -55],
            scale: [0.4, 0.7, 0.2],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6, times: [0, 0.35, 0.45, 0.55] }}
          aria-hidden="true"
        >
          <span className="text-2xl sm:text-3xl block drop-shadow-[0_0_12px_rgba(249,115,22,0.7)]">🚀</span>
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-orange-400 via-yellow-300 to-transparent rounded-full blur-sm"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </motion.div>

        {/* Rocket 3 - tiny, far away */}
        <motion.div
          className="absolute"
          animate={{
            left: ['60%', '25%'],
            top: ['35%', '2%'],
            rotate: [-40, -48],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear', delay: 12, times: [0, 0.2, 0.5, 0.7] }}
          aria-hidden="true"
        >
          <span className="text-lg block opacity-60">🚀</span>
        </motion.div>

        {/* UFO / flying saucer */}
        <motion.div
          className="absolute text-2xl sm:text-3xl"
          animate={{
            left: ['105%', '-10%'],
            top: ['15%', '25%', '12%', '20%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 4 }}
          aria-hidden="true"
        >
          <motion.span
            className="block drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
            animate={{ y: [0, -6, 0, 4, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🛸
          </motion.span>
        </motion.div>

        {/* Shooting stars */}
        {[
          { delay: 1, dur: 5, from: ['88%', '4%'], to: ['30%', '30%'] },
          { delay: 4, dur: 7, from: ['70%', '2%'], to: ['20%', '25%'] },
          { delay: 8, dur: 4, from: ['95%', '12%'], to: ['55%', '35%'] },
        ].map((s, i) => (
          <motion.div
            key={`shoot-${i}`}
            className="absolute"
            animate={{ left: [s.from[0], s.to[0]], top: [s.from[1], s.to[1]], opacity: [0, 1, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'linear', times: [0, 0.08, 0.18] }}
            aria-hidden="true"
          >
            <div className="w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_6px_2px_#fff,-8px_4px_12px_rgba(255,255,255,0.4),-18px_8px_20px_rgba(255,255,255,0.15)]" />
          </motion.div>
        ))}

        {/* === MARS SURFACE === */}
        <div className="absolute bottom-0 left-0 right-0 h-[130px] sm:h-[160px]">
          <svg viewBox="0 0 1400 160" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="mg1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c0392b" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              <linearGradient id="mg2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a93226" />
                <stop offset="50%" stopColor="#c0392b" />
                <stop offset="100%" stopColor="#922b21" />
              </linearGradient>
            </defs>
            <path d="M0,60 Q100,30 250,50 Q400,75 550,40 Q700,10 850,55 Q1000,80 1150,45 Q1300,20 1400,50 L1400,160 L0,160 Z" fill="url(#mg1)" />
            <path d="M0,80 Q200,60 400,82 Q600,100 800,70 Q1000,50 1200,80 Q1350,95 1400,75 L1400,160 L0,160 Z" fill="url(#mg2)" />
            <path d="M0,110 Q350,95 700,115 Q1050,130 1400,105 L1400,160 L0,160 Z" fill="#7f1d1d" />
            {/* Craters */}
            <ellipse cx="200" cy="130" rx="25" ry="8" fill="#6b1515" opacity="0.5" />
            <ellipse cx="600" cy="140" rx="18" ry="6" fill="#6b1515" opacity="0.4" />
            <ellipse cx="1000" cy="125" rx="30" ry="9" fill="#6b1515" opacity="0.45" />
            <ellipse cx="1250" cy="145" rx="15" ry="5" fill="#6b1515" opacity="0.35" />
          </svg>

          {/* Mars base - larger, more detailed */}
          <motion.div
            className="absolute bottom-8 left-[4%] sm:left-[8%]"
            style={{ x: useTransform(smoothX, [0, 1], [-10, 10]) }}
            aria-hidden="true"
          >
            <svg width="200" height="90" viewBox="0 0 200 90" className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {/* Main dome */}
              <ellipse cx="60" cy="68" rx="48" ry="26" fill="#4a5568" />
              <path d="M12,68 Q60,22 108,68" fill="#74b9ff" opacity="0.1" />
              <ellipse cx="60" cy="68" rx="48" ry="26" fill="none" stroke="#718096" strokeWidth="0.8" />
              {/* Dome windows */}
              <ellipse cx="45" cy="60" rx="7" ry="5" fill="#fdcb6e" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="65" cy="58" rx="7" ry="5" fill="#74b9ff" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
              </ellipse>
              {/* Second smaller dome */}
              <ellipse cx="130" cy="72" rx="25" ry="14" fill="#2d3748" />
              <ellipse cx="130" cy="72" rx="25" ry="14" fill="none" stroke="#4a5568" strokeWidth="0.6" />
              <ellipse cx="130" cy="68" rx="6" ry="4" fill="#0ea5e9" opacity="0.3" />
              {/* Connector tunnel */}
              <rect x="105" y="65" width="10" height="10" rx="3" fill="#4a5568" />
              {/* Antenna tower */}
              <line x1="60" y1="42" x2="60" y2="15" stroke="#a0aec0" strokeWidth="1.5" />
              <circle cx="60" cy="13" r="3.5" fill="#ef4444">
                <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <line x1="55" y1="25" x2="65" y2="25" stroke="#a0aec0" strokeWidth="1" />
              <line x1="56" y1="32" x2="64" y2="32" stroke="#a0aec0" strokeWidth="0.8" />
              {/* Solar array 1 */}
              <rect x="155" y="48" width="35" height="20" rx="2" fill="#1a202c" stroke="#2d3748" strokeWidth="0.5" />
              <rect x="157" y="50" width="15" height="8" fill="#0ea5e9" opacity="0.5" />
              <rect x="173" y="50" width="15" height="8" fill="#0ea5e9" opacity="0.5" />
              <rect x="157" y="60" width="15" height="6" fill="#0ea5e9" opacity="0.35" />
              <rect x="173" y="60" width="15" height="6" fill="#0ea5e9" opacity="0.35" />
              <rect x="170" y="68" width="4" height="14" fill="#4a5568" />
              {/* Crane */}
              <line x1="185" y1="18" x2="185" y2="68" stroke="#ecc94b" strokeWidth="2" />
              <line x1="165" y1="18" x2="198" y2="18" stroke="#ecc94b" strokeWidth="1.5" />
              <line x1="185" y1="18" x2="185" y2="68" stroke="#ecc94b" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
              <rect x="168" y="24" width="7" height="7" fill="#a0aec0">
                <animate attributeName="y" values="24;36;24" dur="4s" repeatCount="indefinite" />
              </rect>
              {/* Ground details */}
              <rect x="20" y="82" width="60" height="3" rx="1" fill="#636e72" opacity="0.4" />
              <rect x="110" y="84" width="40" height="2" rx="1" fill="#636e72" opacity="0.3" />
            </svg>
          </motion.div>

          {/* === MULTIPLE CYBERTRUCKS === */}
          {/* Cybertruck 1 - main, left to right */}
          <motion.div
            className="absolute bottom-4"
            animate={{ left: ['-14%', '110%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <motion.div animate={{ y: [0, -2, 0, -1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
              <svg width="80" height="40" viewBox="0 0 220 110" className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
                <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#c0c8d0" />
                <polygon points="25,65 25,80 110,80 110,65" fill="#a8b2bc" />
                <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.75" />
                <line x1="200" y1="50" x2="215" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <line x1="15" y1="62" x2="15" y2="72" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <circle cx="53" cy="84" r="12" fill="#1a202c" />
                <circle cx="53" cy="84" r="7" fill="#4a5568" />
                <circle cx="170" cy="84" r="12" fill="#1a202c" />
                <circle cx="170" cy="84" r="7" fill="#4a5568" />
              </svg>
            </motion.div>
            <div className="absolute -left-6 bottom-1 w-12 h-5 bg-gradient-to-l from-[#7f1d1d60] to-transparent rounded-full blur-[2px]" />
          </motion.div>

          {/* Cybertruck 2 - smaller, faster, opposite start */}
          <motion.div
            className="absolute bottom-6"
            animate={{ left: ['-10%', '112%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 8 }}
            aria-hidden="true"
          >
            <motion.div animate={{ y: [0, -1.5, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
              <svg width="55" height="28" viewBox="0 0 220 110" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] opacity-70">
                <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#e2e8f0" />
                <polygon points="25,65 25,80 110,80 110,65" fill="#cbd5e0" />
                <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.7" />
                <line x1="200" y1="50" x2="215" y2="62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <circle cx="53" cy="84" r="12" fill="#1a202c" />
                <circle cx="53" cy="84" r="7" fill="#4a5568" />
                <circle cx="170" cy="84" r="12" fill="#1a202c" />
                <circle cx="170" cy="84" r="7" fill="#4a5568" />
              </svg>
            </motion.div>
            <div className="absolute -left-4 bottom-0 w-8 h-3 bg-gradient-to-l from-[#7f1d1d50] to-transparent rounded-full blur-sm" />
          </motion.div>

          {/* Cybertruck 3 - going right to left (returning) */}
          <motion.div
            className="absolute bottom-10"
            animate={{ left: ['108%', '-12%'] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear', delay: 3 }}
            aria-hidden="true"
          >
            <motion.div animate={{ y: [0, -1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}>
              <svg width="45" height="22" viewBox="0 0 220 110" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] opacity-50 scale-x-[-1]">
                <polygon points="15,80 25,80 25,65 40,45 110,35 200,45 215,65 215,80 205,80" fill="#a0aec0" />
                <polygon points="25,65 25,80 110,80 110,65" fill="#8a9baa" />
                <polygon points="115,65 140,45 200,45 200,65" fill="#1a202c" opacity="0.6" />
                <circle cx="53" cy="84" r="12" fill="#1a202c" />
                <circle cx="170" cy="84" r="12" fill="#1a202c" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Robots - multiple */}
          <motion.div
            className="absolute bottom-10 right-[10%] sm:right-[15%] text-3xl sm:text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <span className="drop-shadow-[0_0_12px_rgba(116,185,255,0.6)]">🤖</span>
          </motion.div>

          <motion.div
            className="absolute bottom-6 right-[25%] sm:right-[30%] text-xl sm:text-2xl"
            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            aria-hidden="true"
          >
            <span className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">🤖</span>
          </motion.div>

          {/* Astronaut */}
          <motion.div
            className="absolute bottom-12 left-[42%] sm:left-[45%] text-2xl sm:text-3xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">👨‍🚀</span>
          </motion.div>

          {/* Flag */}
          <div className="absolute bottom-8 right-[42%] sm:right-[45%]" aria-hidden="true">
            <svg width="22" height="40" viewBox="0 0 22 40">
              <line x1="2" y1="4" x2="2" y2="40" stroke="#a0aec0" strokeWidth="1.5" />
              <motion.g animate={{ skewX: [0, 3, -2, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <rect x="4" y="4" width="16" height="11" rx="1" fill="#7c3aed" />
                <text x="7" y="13" fontSize="5.5" fill="#fff" fontWeight="bold">BS</text>
              </motion.g>
            </svg>
          </div>

          {/* Satellite dish */}
          <motion.div
            className="absolute bottom-12 right-[5%] sm:right-[8%] text-xl"
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            📡
          </motion.div>
        </div>
      </div>

      {/* ===== CONTENT AREA ===== */}
      <div className="flex-1 relative bg-gradient-to-b from-[#1a0f30] via-cream to-cream">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#7f1d1d] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center px-4 pt-10 pb-8">
          {/* Confetti */}
          <AnimatePresence>
            {confetti.map((c) => (
              <motion.span
                key={c.id}
                className="fixed pointer-events-none text-2xl z-50"
                style={{ left: c.x, top: c.y }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.6, 0], rotate: [0, 200, 400], opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                aria-hidden="true"
              >
                {c.emoji}
              </motion.span>
            ))}
          </AnimatePresence>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_SLOW}
          >
            <motion.div
              className="text-5xl sm:text-7xl mb-3 cursor-pointer inline-block"
              whileHover={{ scale: 1.3, rotate: [0, -15, 15, -10, 0] }}
              whileTap={{ scale: 0.7 }}
              transition={SPRING_BOUNCY}
              onClick={() => playWin()}
            >
              <span className="drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">🌱</span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-6xl font-display font-bold text-slate"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: 0.15 }}
            >
              BrainSprout
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-slate/60 mt-2 font-body font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
                initial={{ opacity: 0, y: 80, scale: 0.7, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ ...SPRING_GENTLE, delay: 0.4 + i * 0.15 }}
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
                      bg-white/85 backdrop-blur-lg
                      border border-white/70
                      shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_2px_0_rgba(255,255,255,1)]
                      ${tapped === g.id ? 'ring-3 ring-sun' : ''}
                    `}
                    whileHover={{
                      y: -10,
                      scale: 1.05,
                      boxShadow: `0 28px_70px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,1), 0 0 40px ${g.accentColor}15`,
                    }}
                    whileTap={{ scale: 0.9, y: 0 }}
                    transition={SPRING_BOUNCY}
                  >
                    {/* Accent glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${g.accentColor}30 0%, transparent 70%)` }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Top accent bar */}
                    <motion.div
                      className="absolute top-0 left-[10%] right-[10%] h-[3px] rounded-b-full"
                      style={{ background: g.accentColor, opacity: 0.5 }}
                      whileHover={{ left: '3%', right: '3%', opacity: 1, height: '4px' }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="text-4xl sm:text-5xl text-center"
                        whileHover={{ scale: 1.25, rotate: [0, -8, 8, -4, 0] }}
                        transition={SPRING_BOUNCY}
                      >
                        {g.emoji}
                      </motion.div>
                      <div className="mt-3 text-center">
                        <motion.div
                          className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-2 font-display font-bold text-white text-base sm:text-lg"
                          style={{ background: g.accentColor, boxShadow: `0 4px 16px ${g.accentColor}50` }}
                          whileHover={{ scale: 1.2, boxShadow: `0 6px 24px ${g.accentColor}70` }}
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
            transition={{ delay: 1.5, duration: 1 }}
          >
            Tap a card to begin your adventure
          </motion.p>
        </div>
      </div>
    </div>
  );
}
