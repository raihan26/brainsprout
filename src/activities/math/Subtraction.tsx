import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { shuffle, pick } from '../../utils/shuffle';

const ITEMS = [
  { e: '🐦', label: 'birds', verb: 'fly away' },
  { e: '🍎', label: 'apples', verb: 'are eaten' },
  { e: '🎈', label: 'balloons', verb: 'pop' },
  { e: '⭐', label: 'stars', verb: 'go away' },
  { e: '🐠', label: 'fish', verb: 'swim away' },
];

type Q = {
  start: number;
  remove: number;
  emoji: string;
  label: string;
  verb: string;
  choices: number[];
};

const build = (): Q => {
  const start = 3 + Math.floor(Math.random() * 8); // 3..10
  const remove = 1 + Math.floor(Math.random() * (start - 1)); // 1..start-1
  const ans = start - remove;
  const item = pick(ITEMS);
  const distractors = new Set<number>();
  while (distractors.size < 2) {
    const d = Math.max(0, ans + (Math.floor(Math.random() * 5) - 2));
    if (d !== ans) distractors.add(d);
  }
  return { start, remove, emoji: item.e, label: item.label, verb: item.verb, choices: shuffle([ans, ...distractors]) };
};

export default function Subtraction() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();
  const TOTAL = 8;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build());
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);

  const items = useMemo(() => Array.from({ length: q.start }, (_, k) => k), [q]);

  useEffect(() => {
    setShowRemoved(false);
    const t = window.setTimeout(() => setShowRemoved(true), 700);
    return () => window.clearTimeout(t);
  }, [q]);

  const handle = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    const isRight = n === q.start - q.remove;
    if (isRight) { playCorrect(); setCorrect((c) => c + 1); speak('Yes!'); }
    else { playWrong(); speak(`The answer is ${q.start - q.remove}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('math.subtraction', isRight ? correct + 1 : correct, TOTAL);
      } else {
        setI((x) => x + 1);
        setQ(build());
        setPicked(null);
      }
    }, 1300);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Subtraction Game" emoji="➖" backTo={`/${grade}/math`} speakText={`There are ${q.start} ${q.label}. ${q.remove} ${q.verb}. How many are left?`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>

      <div className="kid-card text-center">
        <div className="text-xl sm:text-2xl font-extrabold mb-3">
          There are {q.start} {q.label}. {q.remove} {q.verb}. How many are left?
        </div>
        <div className="bg-pink-50 rounded-2xl border-4 border-white p-4 min-h-[180px] flex flex-wrap gap-2 items-center justify-center">
          {items.map((k) => {
            const removed = k >= q.start - q.remove;
            return (
              <span
                key={k}
                className={`text-5xl sm:text-6xl transition-all duration-700 ${removed && showRemoved ? 'opacity-0 -translate-y-10' : 'animate-pop'}`}
                style={{ animationDelay: `${k * 60}ms` }}
                aria-hidden="true"
              >
                {q.emoji}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.start - q.remove ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry', 'plum', 'sun'] as const)[k % 5]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={`Answer ${c}`}>
              {c}
            </AnswerButton>
          );
        })}
      </div>

      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/math`)} />
    </SectionLayout>
  );
}
