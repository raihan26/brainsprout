import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playTap, playWrong } from '../../utils/sound';
import { shuffle } from '../../utils/shuffle';

type Mode = 'easy' | 'hard';

const buildSet = (mode: Mode): number[] => {
  if (mode === 'easy') {
    const start = Math.floor(Math.random() * 5) + 1;
    return [start, start + 1, start + 2, start + 3, start + 4];
  }
  // Hard: skip-counting or non-zero starts
  const start = Math.floor(Math.random() * 5);
  const step = [1, 2, 5][Math.floor(Math.random() * 3)];
  return Array.from({ length: 5 }, (_, i) => start + i * step);
};

export default function NumberOrder() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();

  const [mode, setMode] = useState<Mode>('easy');
  const [target, setTarget] = useState<number[]>(() => buildSet('easy'));
  const [pool, setPool] = useState<number[]>(() => shuffle(target));
  const [placed, setPlaced] = useState<(number | null)[]>([null, null, null, null, null]);
  const [done, setDone] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const t = buildSet(mode);
    setTarget(t);
    setPool(shuffle(t));
    setPlaced([null, null, null, null, null]);
    speak(`Put the numbers in order from ${t[0]} to ${t[t.length - 1]}.`);
  }, [mode, speak]);

  const placeNext = (n: number) => {
    const idx = placed.findIndex((p) => p === null);
    if (idx === -1) return;
    if (n === target[idx]) {
      const np = placed.slice();
      np[idx] = n;
      setPlaced(np);
      setPool(pool.filter((x) => x !== n));
      playCorrect();
      speak(`${n}!`);
      if (idx === target.length - 1) {
        const next = completed + 1;
        setCompleted(next);
        if (next >= 3) {
          setDone(true);
          record('math.order', next, 3);
        } else {
          window.setTimeout(() => {
            const t = buildSet(mode);
            setTarget(t);
            setPool(shuffle(t));
            setPlaced([null, null, null, null, null]);
          }, 800);
        }
      }
    } else {
      playWrong();
      speak(`The next number is ${target[idx]}.`);
    }
  };

  const reset = () => {
    setCompleted(0);
    setDone(false);
    const t = buildSet(mode);
    setTarget(t);
    setPool(shuffle(t));
    setPlaced([null, null, null, null, null]);
  };

  return (
    <SectionLayout title="Number Order" emoji="🔢" backTo="/math" speakText={`Put the numbers in order from ${target[0]} to ${target[target.length - 1]}.`}>
      <div className="kid-card">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="text-xl font-extrabold">Round {completed + 1} of 3</div>
          <div className="inline-flex gap-2">
            <button onClick={() => { setMode('easy'); playTap(); }} className={`kid-btn-light !py-2 !px-3 ${mode === 'easy' ? 'ring-4 ring-grass' : ''}`}>Easy</button>
            <button onClick={() => { setMode('hard'); playTap(); }} className={`kid-btn-light !py-2 !px-3 ${mode === 'hard' ? 'ring-4 ring-berry' : ''}`}>Harder</button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
          {placed.map((p, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl border-4 ${p === null ? 'border-dashed border-gray-300 bg-white/50' : 'border-grass bg-grass/20'} flex items-center justify-center text-4xl sm:text-5xl font-extrabold`}
            >
              {p ?? <span className="text-gray-300 text-2xl">{target[i]}</span>}
            </div>
          ))}
        </div>
        <div className="text-center text-lg text-gray-700 mb-2">Tap the next number:</div>
        <div className="flex flex-wrap gap-3 justify-center">
          {pool.map((n) => (
            <button
              key={n}
              onClick={() => placeNext(n)}
              className="kid-btn-blue text-3xl sm:text-4xl !py-5 !px-6 min-w-[72px]"
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <Celebration show={done} stars={3} onPlayAgain={reset} onHome={() => nav('/math')} />
    </SectionLayout>
  );
}
