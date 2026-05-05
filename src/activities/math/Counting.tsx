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

const ITEMS = ['🍎', '⭐', '⚽', '🚗', '🐶', '🐱', '🌸', '🍌'];
const TOTAL = 8;

type Q = { count: number; emoji: string; choices: number[] };

const buildQuestion = (level: number): Q => {
  const max = Math.min(10, 3 + level);
  const count = 1 + Math.floor(Math.random() * max);
  const emoji = pick(ITEMS);
  const distractors = new Set<number>();
  while (distractors.size < 2) {
    const d = Math.max(1, count + (Math.floor(Math.random() * 5) - 2));
    if (d !== count) distractors.add(d);
  }
  return { count, emoji, choices: shuffle([count, ...distractors]) };
};

export default function Counting() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL_Q = TOTAL;

  const [qIndex, setQIndex] = useState(0);
  const [q, setQ] = useState<Q>(() => buildQuestion(0));
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const items = useMemo(
    () => Array.from({ length: q.count }, (_, i) => ({ id: i, x: (i * 37) % 100, y: (i * 53) % 100 })),
    [q],
  );

  const handle = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    const isRight = n === q.count;
    if (isRight) {
      playCorrect();
      setCorrect((c) => c + 1);
      speak('Yes!');
    } else {
      playWrong();
      speak(`There are ${q.count}.`);
    }
    window.setTimeout(() => {
      if (qIndex + 1 >= TOTAL_Q) {
        setDone(true);
        record('math.counting', isRight ? correct + 1 : correct, TOTAL_Q);
      } else {
        setQIndex((i) => i + 1);
        setQ(buildQuestion(qIndex + 1));
        setPicked(null);
      }
    }, 1100);
  };

  const stars = calcStars(correct, TOTAL_Q);

  const reset = () => {
    setQIndex(0);
    setQ(buildQuestion(0));
    setPicked(null);
    setCorrect(0);
    setDone(false);
  };

  return (
    <SectionLayout
      title="Counting Game"
      emoji="🍎"
      backTo="/math"
      speakText="How many do you see? Tap the right number."
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">
          Question {qIndex + 1} of {TOTAL_Q}
        </div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL_Q) * 3))} size="sm" />
      </div>

      <div className="kid-card text-center">
        <div className="text-2xl sm:text-3xl font-extrabold mb-3">How many do you see?</div>
        <div
          className="relative bg-yellow-50 rounded-2xl border-4 border-white p-4 min-h-[200px] flex flex-wrap gap-3 items-center justify-center"
          aria-label={`${q.count} ${q.emoji}`}
        >
          {items.map((it) => (
            <span
              key={it.id}
              className="text-6xl sm:text-7xl animate-pop"
              style={{ animationDelay: `${it.id * 60}ms` }}
              aria-hidden="true"
            >
              {q.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, i) => {
          const state =
            picked === null
              ? 'idle'
              : c === q.count
                ? 'correct'
                : c === picked
                  ? 'wrong'
                  : 'idle';
          return (
            <AnswerButton
              key={c}
              color={(['sky', 'grass', 'berry', 'plum', 'sun'] as const)[i % 5]}
              state={state}
              disabled={picked !== null}
              onClick={() => handle(c)}
              ariaLabel={`Answer ${c}`}
            >
              {c}
            </AnswerButton>
          );
        })}
      </div>

      <Celebration
        show={done}
        stars={stars}
        onPlayAgain={reset}
        onHome={() => nav('/math')}
      />
    </SectionLayout>
  );
}
