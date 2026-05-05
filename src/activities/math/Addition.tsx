import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { shuffle, pick } from '../../utils/shuffle';

const ITEMS = ['🍎', '⭐', '🐸', '🌼', '⚽'];

type Q = { a: number; b: number; emoji: string; choices: number[] };

const build = (level: number): Q => {
  const max = level < 4 ? 5 : 10;
  let a = 1 + Math.floor(Math.random() * (max - 1));
  let b = 1 + Math.floor(Math.random() * Math.max(1, max - a));
  if (a + b > max) { a = Math.min(a, max - 1); b = Math.min(b, max - a); }
  const sum = a + b;
  const distractors = new Set<number>();
  while (distractors.size < 2) {
    const d = Math.max(0, sum + (Math.floor(Math.random() * 5) - 2));
    if (d !== sum) distractors.add(d);
  }
  return { a, b, emoji: pick(ITEMS), choices: shuffle([sum, ...distractors]) };
};

export default function Addition() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL = 8;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build(0));
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const left = useMemo(() => Array.from({ length: q.a }), [q]);
  const right = useMemo(() => Array.from({ length: q.b }), [q]);

  const handle = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    const isRight = n === q.a + q.b;
    if (isRight) {
      playCorrect();
      setCorrect((c) => c + 1);
      speak('Great!');
    } else {
      playWrong();
      speak(`The answer is ${q.a + q.b}.`);
    }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('math.addition', isRight ? correct + 1 : correct, TOTAL);
      } else {
        setI((x) => x + 1);
        setQ(build(i + 1));
        setPicked(null);
      }
    }, 1100);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build(0)); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Addition Game" emoji="➕" backTo="/math" speakText={`What is ${q.a} plus ${q.b}?`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>

      <div className="kid-card text-center">
        <div className="text-2xl sm:text-3xl font-extrabold mb-3">{q.a} + {q.b} = ?</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-2xl border-4 border-white p-3 min-h-[150px] flex flex-wrap gap-2 items-center justify-center">
            {left.map((_, k) => (
              <span key={k} className="text-5xl sm:text-6xl animate-pop" style={{ animationDelay: `${k * 60}ms` }} aria-hidden="true">{q.emoji}</span>
            ))}
          </div>
          <div className="bg-blue-50 rounded-2xl border-4 border-white p-3 min-h-[150px] flex flex-wrap gap-2 items-center justify-center">
            {right.map((_, k) => (
              <span key={k} className="text-5xl sm:text-6xl animate-pop" style={{ animationDelay: `${k * 60 + 200}ms` }} aria-hidden="true">{q.emoji}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state =
            picked === null ? 'idle' : c === q.a + q.b ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry', 'plum', 'sun'] as const)[k % 5]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={`Answer ${c}`}>
              {c}
            </AnswerButton>
          );
        })}
      </div>

      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/math')} />
    </SectionLayout>
  );
}
