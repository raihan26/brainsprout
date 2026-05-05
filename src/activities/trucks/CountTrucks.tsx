import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import TruckSvg, { type TruckId, TRUCK_NAMES } from '../../components/TruckSvg';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { shuffle, pick } from '../../utils/shuffle';

const ALL: TruckId[] = ['cybertruck', 'monster', 'fire', 'police', 'dump', 'race'];

type Q = { truck: TruckId; count: number; choices: number[] };

const build = (level: number): Q => {
  const max = Math.min(10, 4 + level);
  const count = 1 + Math.floor(Math.random() * max);
  const truck = pick(ALL);
  const distractors = new Set<number>();
  while (distractors.size < 2) {
    const d = Math.max(1, count + (Math.floor(Math.random() * 5) - 2));
    if (d !== count) distractors.add(d);
  }
  return { truck, count, choices: shuffle([count, ...distractors]) };
};

export default function CountTrucks() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();
  const TOTAL = 8;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build(0));
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const items = useMemo(() => Array.from({ length: q.count }, (_, k) => k), [q]);

  const handle = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    const ok = n === q.count;
    if (ok) { playCorrect(); setCorrect((c) => c + 1); speak('Yes!'); }
    else { playWrong(); speak(`There are ${q.count}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('trucks.count', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build(i + 1)); setPicked(null);
      }
    }, 1100);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build(0)); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Count the Trucks" emoji="🚚" backTo={`/${grade}/trucks`} speakText={`How many ${TRUCK_NAMES[q.truck]}s do you see?`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-2xl sm:text-3xl font-extrabold mb-3">
          How many {TRUCK_NAMES[q.truck]}s do you see?
        </div>
        <div className="bg-blue-50 rounded-2xl border-4 border-white p-4 min-h-[180px] flex flex-wrap gap-2 items-center justify-center">
          {items.map((k) => (
            <div key={k} className="animate-pop" style={{ animationDelay: `${k * 80}ms` }}>
              <TruckSvg id={q.truck} size={110} />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.count ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry', 'plum', 'sun'] as const)[k % 5]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={`Answer ${c}`}>
              {c}
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/trucks`)} />
    </SectionLayout>
  );
}
