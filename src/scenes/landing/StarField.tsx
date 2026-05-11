import { motion, useReducedMotion, type MotionValue } from 'motion/react';
import { useMemo } from 'react';

type Props = {
  count: number;
  minSize?: number;
  maxSize?: number;
  maxTop?: number;
  glow?: boolean;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
};

export default function StarField({
  count,
  minSize = 0.5,
  maxSize = 1.7,
  maxTop = 70,
  glow = false,
  x,
  y,
}: Props) {
  const reduceMotion = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: minSize + Math.random() * (maxSize - minSize),
        left: Math.random() * 100,
        top: Math.random() * maxTop,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    [count, minSize, maxSize, maxTop],
  );

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ x, y }}>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.left}%`,
            top: `${s.top}%`,
            boxShadow: glow ? `0 0 ${3 + s.size}px rgba(255,255,255,0.8)` : undefined,
          }}
          animate={
            reduceMotion
              ? { opacity: 0.6 }
              : { opacity: [0.2, glow ? 1 : 0.8, 0.2], scale: [1, 1.3, 1] }
          }
          transition={{
            duration: s.duration,
            repeat: reduceMotion ? 0 : Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}
