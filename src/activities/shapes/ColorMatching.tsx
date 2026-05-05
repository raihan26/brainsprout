import { useEffect, useState } from 'react';
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
import { sample, shuffle } from '../../utils/shuffle';

const COLORS = [
  { name: 'red', hex: '#EF4444' },
  { name: 'blue', hex: '#3B82F6' },
  { name: 'green', hex: '#10B981' },
  { name: 'yellow', hex: '#F59E0B' },
  { name: 'orange', hex: '#F97316' },
  { name: 'purple', hex: '#8B5CF6' },
  { name: 'black', hex: '#111827' },
  { name: 'white', hex: '#F9FAFB' },
];

type Q = { color: typeof COLORS[number]; choices: string[] };

const build = (): Q => {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const others = sample(COLORS.filter((c) => c.name !== color.name), 2).map((c) => c.name);
  return { color, choices: shuffle([color.name, ...others]) };
};

export default function ColorMatching() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();
  const TOTAL = 6;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build());
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak('What color is this?'); }, [q.color.name, speak]);

  const handle = (c: string) => {
    if (picked) return;
    setPicked(c);
    const ok = c === q.color.name;
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak(`Yes! ${q.color.name}.`); }
    else { playWrong(); speak(`This is ${q.color.name}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('shapes.colors', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1000);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Color Matching" emoji="🎨" backTo={`/${grade}/shapes`} speakText="What color is this?">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-xl font-bold mb-2">What color is this?</div>
        <div
          className="mx-auto rounded-3xl border-4 border-white animate-pop"
          style={{ background: q.color.hex, width: 220, height: 220 }}
          aria-label={`color ${q.color.name}`}
        />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.color.name ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={c}>
              <span className="capitalize">{c}</span>
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/shapes`)} />
    </SectionLayout>
  );
}
