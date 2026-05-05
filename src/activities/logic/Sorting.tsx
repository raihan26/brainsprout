import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playWrong } from '../../utils/sound';
import { sample } from '../../utils/shuffle';

type Group = 'animal' | 'food' | 'vehicle' | 'shape';
type Item = { emoji: string; group: Group };

const ITEMS: Item[] = [
  { emoji: '🐶', group: 'animal' }, { emoji: '🐱', group: 'animal' },
  { emoji: '🐸', group: 'animal' }, { emoji: '🦁', group: 'animal' },
  { emoji: '🐝', group: 'animal' }, { emoji: '🐰', group: 'animal' },
  { emoji: '🍎', group: 'food' }, { emoji: '🍌', group: 'food' },
  { emoji: '🥕', group: 'food' }, { emoji: '🍕', group: 'food' },
  { emoji: '🍞', group: 'food' }, { emoji: '🧀', group: 'food' },
  { emoji: '🚗', group: 'vehicle' }, { emoji: '🚌', group: 'vehicle' },
  { emoji: '✈️', group: 'vehicle' }, { emoji: '🚲', group: 'vehicle' },
  { emoji: '🚂', group: 'vehicle' }, { emoji: '🚜', group: 'vehicle' },
  { emoji: '⭐', group: 'shape' }, { emoji: '❤️', group: 'shape' },
  { emoji: '🔵', group: 'shape' }, { emoji: '🟥', group: 'shape' },
  { emoji: '🔺', group: 'shape' }, { emoji: '🟩', group: 'shape' },
];

const GROUPS: { id: Group; label: string; emoji: string; color: string }[] = [
  { id: 'animal', label: 'Animals', emoji: '🐾', color: 'bg-emerald-100' },
  { id: 'food', label: 'Food', emoji: '🍽️', color: 'bg-yellow-100' },
  { id: 'vehicle', label: 'Vehicles', emoji: '🚦', color: 'bg-sky-100' },
  { id: 'shape', label: 'Shapes', emoji: '🔷', color: 'bg-pink-100' },
];

export default function Sorting() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL = 8;

  const [pool, setPool] = useState<Item[]>(() => sample(ITEMS, TOTAL));
  const [bins, setBins] = useState<Record<Group, Item[]>>({ animal: [], food: [], vehicle: [], shape: [] });
  const [active, setActive] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak('Drag or tap to sort each item into the right group.'); }, [speak]);

  const place = (item: Item, idx: number, group: Group) => {
    if (item.group === group) {
      playCorrect(); speak('Yes!');
      setBins((b) => ({ ...b, [group]: [...b[group], item] }));
      setPool((p) => p.filter((_, k) => k !== idx));
      setCorrect((c) => c + 1);
    } else {
      playWrong(); speak('Try again.');
    }
    setActive(null);
  };

  useEffect(() => {
    if (pool.length === 0 && !done) {
      setDone(true);
      record('logic.sorting', correct, TOTAL);
    }
  }, [pool, done, record, correct]);

  const reset = () => {
    setPool(sample(ITEMS, TOTAL));
    setBins({ animal: [], food: [], vehicle: [], shape: [] });
    setActive(null); setCorrect(0); setDone(false);
  };

  return (
    <SectionLayout title="Sorting Game" emoji="📦" backTo="/logic" speakText="Tap an item, then tap its group.">
      <div className="kid-card">
        <div className="text-xl font-extrabold mb-2 text-center">Tap an item, then tap its group</div>
        <div className="bg-yellow-50 rounded-2xl border-4 border-white p-3 min-h-[100px] flex flex-wrap gap-2 justify-center mb-3">
          {pool.length === 0 ? (
            <div className="text-gray-500">All sorted! 🎉</div>
          ) : pool.map((it, k) => (
            <button
              key={k}
              onClick={() => setActive(active === k ? null : k)}
              className={`text-5xl sm:text-6xl px-3 py-2 rounded-2xl border-4 ${active === k ? 'border-grass bg-white animate-pop' : 'border-white bg-white/70'}`}
              aria-label={it.emoji}
            >
              {it.emoji}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => active !== null && place(pool[active], active, g.id)}
              disabled={active === null}
              className={`rounded-2xl border-4 border-white p-3 ${g.color} text-left disabled:opacity-60 transition active:scale-95`}
            >
              <div className="text-2xl font-extrabold">{g.emoji} {g.label}</div>
              <div className="mt-2 flex flex-wrap gap-1 min-h-[40px]">
                {bins[g.id].map((it, k) => <span key={k} className="text-3xl animate-pop">{it.emoji}</span>)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Celebration show={done} stars={correct >= TOTAL ? 3 : 2} onPlayAgain={reset} onHome={() => nav('/logic')} />
    </SectionLayout>
  );
}
