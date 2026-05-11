import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import StarField from './StarField';
import MarsTerrain from './MarsTerrain';
import MarsBase from './MarsBase';
import RocketLaunch from './RocketLaunch';
import RoverScene from './RoverScene';
import LearningHotspot from './LearningHotspot';
import type { GradeId } from '../../types';

type Props = {
  grade: GradeId;
  unlockedCount: number;
};

export default function MarsLandingScene({ grade, unlockedCount }: Props) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const nebulaX = useTransform(smoothX, [0, 1], [-20, 20]);
  const nebulaY = useTransform(smoothY, [0, 1], [-10, 10]);
  const starsX = useTransform(smoothX, [0, 1], [-6, 6]);
  const starsY = useTransform(smoothY, [0, 1], [-4, 4]);
  const brightStarsX = useTransform(smoothX, [0, 1], [-10, 10]);
  const brightStarsY = useTransform(smoothY, [0, 1], [-6, 6]);
  const baseX = useTransform(smoothX, [0, 1], [-10, 10]);

  const handleMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div
      className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden"
      onMouseMove={handleMove}
    >
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060620] via-[#12103a] to-[#2d1854]" aria-hidden="true" />

      {/* Nebula clouds */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: nebulaX, y: nebulaY }} aria-hidden="true">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#7c3aed] blur-[120px] top-[-80px] left-[5%] opacity-20" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#06b6d4] blur-[100px] top-[10%] right-[10%] opacity-15" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#f97316] blur-[110px] bottom-[20%] left-[35%] opacity-12" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-[#ec4899] blur-[80px] top-[30%] left-[60%] opacity-10" />
      </motion.div>

      {/* Stars */}
      <StarField count={80} x={starsX} y={starsY} />
      <StarField count={20} minSize={1.5} maxSize={3.5} maxTop={55} glow x={brightStarsX} y={brightStarsY} />

      {/* Earth */}
      <motion.div
        className="absolute top-6 right-[6%] sm:right-[10%] pointer-events-none"
        style={{ x: useTransform(smoothX, [0, 1], [10, -10]), y: useTransform(smoothY, [0, 1], [5, -5]) }}
        aria-hidden="true"
      >
        <motion.div
          className="relative w-14 h-14 sm:w-20 sm:h-20"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-[-4px] rounded-full bg-[#74b9ff] opacity-20 blur-md" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#74b9ff] via-[#0984e3] to-[#0652DD] shadow-[0_0_50px_rgba(9,132,227,0.6)]" />
          <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-[#00b894] via-transparent to-[#00b894] opacity-40" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/15" />
        </motion.div>
      </motion.div>

      {/* Rockets */}
      <RocketLaunch />

      {/* Mars surface */}
      <div className="absolute bottom-0 left-0 right-0 h-[110px] sm:h-[130px]">
        <MarsTerrain />
        <MarsBase x={baseX} unlockedCount={unlockedCount} />
        <RoverScene />
      </div>

      {/* Learning hotspots — kept low to avoid overlap with hero title */}
      <LearningHotspot worldId="math" grade={grade} top="52%" left="3%" delay={0.5} />
      <LearningHotspot worldId="reading" grade={grade} top="58%" right="3%" delay={0.65} />
      <LearningHotspot worldId="science" grade={grade} top="72%" left="42%" delay={0.8} />
      <LearningHotspot worldId="stem" grade={grade} top="52%" right="22%" delay={0.95} />
    </div>
  );
}
