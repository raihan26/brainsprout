import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import ShapeSvg from '../../components/ShapeSvg';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { sample, shuffle } from '../../utils/shuffle';

const SHAPES = ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart'];
const COLORS = ['#4CC9F0', '#06D6A0', '#EF476F', '#FFD166', '#9D4EDD'];

type Q = { shape: string; color: string; choices: string[] };

const build = (): Q => {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const others = sample(SHAPES.filter((s) => s !== shape), 2);
  return { shape, color: COLORS[Math.floor(Math.random() * COLORS.length)], choices: shuffle([shape, ...others]) };
};

export default function ShapeMatching() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL = 6;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build());
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak(`What shape is this?`); }, [q.shape, speak]);

  const handle = (c: string) => {
    if (picked) return;
    setPicked(c);
    const ok = c === q.shape;
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak(`Yes! ${q.shape}.`); }
    else { playWrong(); speak(`This is a ${q.shape}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('shapes.shapes', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1000);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Shape Matching" emoji="🟦" backTo="/shapes" speakText="What shape is this?">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-xl font-bold mb-2">What shape is this?</div>
        <div className="flex items-center justify-center animate-pop">
          <ShapeSvg shape={q.shape} color={q.color} size={200} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.shape ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={c}>
              <span className="capitalize">{c}</span>
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/shapes')} />
    </SectionLayout>
  );
}
