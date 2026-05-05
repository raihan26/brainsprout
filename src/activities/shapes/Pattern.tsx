import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import ShapeSvg from '../../components/ShapeSvg';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { sample, shuffle, pick } from '../../utils/shuffle';

type Token = { kind: 'shape'; shape: string; color: string } | { kind: 'color'; hex: string; name: string };

const SHAPES = ['circle', 'square', 'triangle', 'star'];
const COLOR_PAIRS: { name: string; hex: string }[] = [
  { name: 'red', hex: '#EF4444' },
  { name: 'blue', hex: '#3B82F6' },
  { name: 'green', hex: '#10B981' },
  { name: 'yellow', hex: '#F59E0B' },
  { name: 'purple', hex: '#8B5CF6' },
];

type Q = { sequence: Token[]; missing: Token; choices: Token[] };

const buildShapePattern = (): Q => {
  const [a, b] = sample(SHAPES, 2);
  const c1 = pick(COLOR_PAIRS).hex; const c2 = pick(COLOR_PAIRS).hex;
  const seq: Token[] = [
    { kind: 'shape', shape: a, color: c1 },
    { kind: 'shape', shape: b, color: c2 },
    { kind: 'shape', shape: a, color: c1 },
    { kind: 'shape', shape: b, color: c2 },
  ];
  const missing: Token = { kind: 'shape', shape: a, color: c1 };
  const distract = sample(SHAPES.filter((s) => s !== a), 2).map((s) => ({ kind: 'shape' as const, shape: s, color: c2 }));
  return { sequence: seq, missing, choices: shuffle([missing, ...distract]) };
};

const buildColorPattern = (): Q => {
  const [c1, c2] = sample(COLOR_PAIRS, 2);
  const seq: Token[] = [
    { kind: 'color', hex: c1.hex, name: c1.name },
    { kind: 'color', hex: c2.hex, name: c2.name },
    { kind: 'color', hex: c1.hex, name: c1.name },
    { kind: 'color', hex: c2.hex, name: c2.name },
  ];
  const missing: Token = { kind: 'color', hex: c1.hex, name: c1.name };
  const distract = sample(COLOR_PAIRS.filter((c) => c.name !== c1.name), 2).map((c) => ({ kind: 'color' as const, hex: c.hex, name: c.name }));
  return { sequence: seq, missing, choices: shuffle([missing, ...distract]) };
};

const build = (): Q => (Math.random() < 0.5 ? buildShapePattern() : buildColorPattern());

const tokenKey = (t: Token) => (t.kind === 'shape' ? `s:${t.shape}:${t.color}` : `c:${t.name}`);

function TokenView({ t, size = 80 }: { t: Token; size?: number }) {
  if (t.kind === 'shape') return <ShapeSvg shape={t.shape} color={t.color} size={size} />;
  return <div className="rounded-2xl border-4 border-white" style={{ background: t.hex, width: size, height: size }} aria-label={t.name} />;
}

export default function Pattern() {
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

  useEffect(() => { speak('Finish the pattern.'); }, [q, speak]);

  const handle = (t: Token) => {
    if (picked) return;
    setPicked(tokenKey(t));
    const ok = tokenKey(t) === tokenKey(q.missing);
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak('Yes!'); }
    else { playWrong(); speak('Try again next time.'); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('shapes.pattern', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1000);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Pattern Game" emoji="🔁" backTo={`/${grade}/shapes`} speakText="Finish the pattern.">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-xl font-bold mb-3">Finish the pattern</div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {q.sequence.map((t, k) => (
            <div key={k} className="animate-pop" style={{ animationDelay: `${k * 80}ms` }}>
              <TokenView t={t} size={70} />
            </div>
          ))}
          <div className="rounded-2xl border-4 border-dashed border-gray-300 bg-white/40 flex items-center justify-center text-4xl text-gray-400" style={{ width: 70, height: 70 }} aria-label="Missing">?</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((t, k) => {
          const key = tokenKey(t);
          const state = picked === null ? 'idle' : key === tokenKey(q.missing) ? 'correct' : key === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={key + k} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(t)} ariaLabel="choice">
              <div className="flex items-center justify-center"><TokenView t={t} size={60} /></div>
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/shapes`)} />
    </SectionLayout>
  );
}
