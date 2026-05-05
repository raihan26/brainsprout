import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { sample, shuffle } from '../../utils/shuffle';

type Item = { emoji: string; healthy: boolean; name: string };

const ITEMS: Item[] = [
  { emoji: '🍎', healthy: true, name: 'apple' },
  { emoji: '🥕', healthy: true, name: 'carrot' },
  { emoji: '🥦', healthy: true, name: 'broccoli' },
  { emoji: '🥛', healthy: true, name: 'milk' },
  { emoji: '🍊', healthy: true, name: 'orange' },
  { emoji: '🍓', healthy: true, name: 'strawberry' },
  { emoji: '🍗', healthy: true, name: 'chicken' },
  { emoji: '🥚', healthy: true, name: 'egg' },
  { emoji: '🍩', healthy: false, name: 'donut' },
  { emoji: '🍬', healthy: false, name: 'candy' },
  { emoji: '🥤', healthy: false, name: 'soda' },
  { emoji: '🍰', healthy: false, name: 'cake' },
  { emoji: '🍫', healthy: false, name: 'chocolate bar' },
  { emoji: '🍟', healthy: false, name: 'fries' },
];

export default function HealthyFood() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();

  const [pool, setPool] = useState<Item[]>(() => shuffle([...sample(ITEMS.filter((i) => i.healthy), 4), ...sample(ITEMS.filter((i) => !i.healthy), 4)]));
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const healthyCount = pool.filter((x) => x.healthy).length;

  useEffect(() => { speak('Tap the healthy foods.'); }, [speak]);

  const tap = (idx: number) => {
    if (picked.has(idx) || wrong.has(idx)) return;
    const it = pool[idx];
    if (it.healthy) {
      const ns = new Set(picked); ns.add(idx); setPicked(ns);
      playCorrect(); speak(it.name);
      if (ns.size >= healthyCount) {
        setDone(true);
        const score = Math.max(0, ns.size - wrong.size);
        record('life.food', score, healthyCount);
      }
    } else {
      const ns = new Set(wrong); ns.add(idx); setWrong(ns);
      playWrong(); speak(`${it.name} is a sometimes food.`);
    }
  };

  const stars = calcStars(Math.max(0, picked.size - wrong.size), healthyCount);
  const reset = () => {
    setPool(shuffle([...sample(ITEMS.filter((i) => i.healthy), 4), ...sample(ITEMS.filter((i) => !i.healthy), 4)]));
    setPicked(new Set()); setWrong(new Set()); setDone(false);
  };

  return (
    <SectionLayout title="Healthy Food" emoji="🥕" backTo="/life-skills" speakText="Tap the healthy foods.">
      <div className="kid-card text-center">
        <div className="text-2xl font-extrabold mb-1">Tap all the healthy foods!</div>
        <div className="text-gray-700">Found {picked.size} of {pool.filter((x) => x.healthy).length}</div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-5">
        {pool.map((it, k) => {
          const isPicked = picked.has(k);
          const isWrong = wrong.has(k);
          return (
            <button
              key={k}
              onClick={() => tap(k)}
              className={`kid-card !p-3 text-7xl flex items-center justify-center transition ${isPicked ? 'ring-4 ring-grass animate-pop' : ''} ${isWrong ? 'animate-shake ring-4 ring-red-400 opacity-80' : ''}`}
              aria-label={it.name}
            >
              {it.emoji}
            </button>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/life-skills')} />
    </SectionLayout>
  );
}
