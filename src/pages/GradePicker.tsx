import { useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GRADES } from '../data/grades';
import { playWin } from '../utils/sound';
import { useProgressV2 } from '../hooks/useProgressV2';
import { getUnlockedUpgrades } from '../data/baseUpgrades';
import MarsLandingScene from '../scenes/landing/MarsLandingScene';
import LandingTopBar from '../scenes/landing/LandingTopBar';
import LandingHero from '../scenes/landing/LandingHero';
import MissionGradeCard from '../scenes/landing/MissionGradeCard';

export default function GradePicker() {
  const { progress: kProgress } = useProgressV2('k');
  const missionSectionRef = useRef<HTMLDivElement>(null);

  const totalStars = kProgress.totalStars;
  const unlockedCount = useMemo(
    () => getUnlockedUpgrades(kProgress, 'k').length,
    [kProgress],
  );

  const handleStart = () => {
    playWin();
    missionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGradeClick = (id: string) => {
    playWin();
    // navigation handled by Link; this fires sound
    void id;
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#060614]">
      <div className="relative w-full">
        <LandingTopBar totalStars={totalStars} />
        <MarsLandingScene grade="k" unlockedCount={unlockedCount} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none" style={{ paddingTop: '52px' }}>
          <div className="pointer-events-auto w-full">
            <LandingHero onStart={handleStart} />
          </div>
        </div>
      </div>

      {/* Transition */}
      <div className="h-6 bg-gradient-to-b from-[#2d1854] to-cream" aria-hidden="true" />

      <div ref={missionSectionRef} className="bg-cream px-4 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-slate/5 text-slate/70 text-xs font-display font-bold uppercase tracking-wider">
              Pick your mission
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate">
              Which mission will you launch today?
            </h2>
            <p className="text-sm sm:text-base text-slate/60 font-body mt-1">
              Each mission is tuned for your explorer's level.
            </p>
          </div>

          <AnimatePresence>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GRADES.map((g, i) => (
                <MissionGradeCard
                  key={g.id}
                  grade={g}
                  index={i}
                  totalStars={g.id === 'k' ? totalStars : 0}
                  onClick={() => handleGradeClick(g.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center text-xs text-slate/50 font-body">
            Progress is saved on this device only. No account needed.
          </div>
        </div>
      </div>
    </div>
  );
}
