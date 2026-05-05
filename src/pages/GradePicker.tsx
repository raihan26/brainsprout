import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GRADES } from '../data/grades';

const mascots = ['🦁', '🐶', '🦊', '🐸', '🐼', '🐯', '🦄', '🐵'];

export default function GradePicker() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Floating background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mascots.map((m, i) => (
          <span
            key={i}
            className="absolute text-4xl sm:text-5xl opacity-20 animate-floaty"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${5 + (i * 17) % 70}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
            aria-hidden="true"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="text-6xl sm:text-7xl mb-3 animate-floaty">🧠</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          BrainSprout
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mt-2 font-bold">
          Pick your grade to start learning!
        </p>
      </div>

      {/* Grade cards */}
      <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
        {GRADES.map((g) => {
          const isHovered = hoveredId === g.id;
          const isClicked = clicked === g.id;
          return (
            <Link
              key={g.id}
              to={`/${g.id}`}
              className={`
                group relative kid-card bg-gradient-to-br ${g.bgGradient}
                no-underline text-gray-900
                transition-all duration-300
                ${isHovered ? 'scale-105 -translate-y-2 shadow-2xl' : 'hover:scale-105 hover:-translate-y-2'}
                ${isClicked ? 'scale-95' : ''}
              `}
              onMouseEnter={() => setHoveredId(g.id)}
              onMouseLeave={() => setHoveredId(null)}
              onMouseDown={() => setClicked(g.id)}
              onMouseUp={() => setClicked(null)}
              onTouchStart={() => { setHoveredId(g.id); setClicked(g.id); }}
              onTouchEnd={() => { setHoveredId(null); setClicked(null); }}
            >
              {/* Sparkle effect on hover */}
              {isHovered && (
                <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
              )}

              <div className={`text-6xl sm:text-7xl text-center transition-transform duration-300 ${isHovered ? 'animate-wiggle' : ''}`}>
                {g.emoji}
              </div>

              <div className="mt-3 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/70 shadow-md mb-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {g.label}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold">{g.title}</div>
                <div className="text-sm text-gray-700 mt-1">{g.description}</div>
              </div>

              {/* Fun bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(90deg, #FFD166, #EF476F, #9D4EDD, #4CC9F0)' }}
              />
            </Link>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Tap your grade and let's go! 🎉
        </p>
      </div>
    </div>
  );
}
