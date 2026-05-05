import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playEngine, playWrong } from '../../utils/sound';

type Step = {
  prompt: string;
  options: { label: string; ok: boolean; render: () => React.ReactNode }[];
};

const STROKE = '#1f2937';

function BodyChoice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 110" width="100%" height="80">
      <polygon
        points="10,90 22,68 72,40 145,40 200,72 205,90 200,98 22,98"
        fill={color}
        stroke={STROKE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <polygon points="80,52 145,52 175,68 75,68" fill="#1F2937" opacity="0.5" />
    </svg>
  );
}

function WheelChoice({ kind }: { kind: 'mini' | 'normal' | 'monster' }) {
  const r = kind === 'mini' ? 12 : kind === 'normal' ? 22 : 34;
  return (
    <svg viewBox="0 0 100 80" width="100%" height="70">
      <circle cx="50" cy="50" r={r} fill="#111827" stroke={STROKE} strokeWidth="2" />
      <circle cx="50" cy="50" r={r * 0.45} fill="#9CA3AF" />
      <circle cx="50" cy="50" r={r * 0.18} fill="#111827" />
    </svg>
  );
}

function LightChoice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 60" width="100%" height="50">
      <line x1="20" y1="30" x2="80" y2="30" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx="20" cy="30" r="6" fill={color} stroke={STROKE} strokeWidth="2" />
      <circle cx="80" cy="30" r="6" fill={color} stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    prompt: 'Pick the Cybertruck shape',
    options: [
      { label: 'Angular', ok: true, render: () => <BodyChoice color="#D1D5DB" /> },
      { label: 'Round', ok: false, render: () => (
        <svg viewBox="0 0 220 110" width="100%" height="80">
          <ellipse cx="110" cy="65" rx="100" ry="35" fill="#FCA5A5" stroke={STROKE} strokeWidth="2.5" />
        </svg>
      ) },
      { label: 'Boxy', ok: false, render: () => (
        <svg viewBox="0 0 220 110" width="100%" height="80">
          <rect x="20" y="40" width="180" height="55" fill="#FCD34D" stroke={STROKE} strokeWidth="2.5" />
        </svg>
      ) },
    ],
  },
  {
    prompt: 'Pick the right wheel size',
    options: [
      { label: 'Big tires', ok: true, render: () => <WheelChoice kind="monster" /> },
      { label: 'Tiny', ok: false, render: () => <WheelChoice kind="mini" /> },
      { label: 'Medium', ok: false, render: () => <WheelChoice kind="normal" /> },
    ],
  },
  {
    prompt: 'Pick the headlights',
    options: [
      { label: 'Light bar', ok: true, render: () => <LightChoice color="#FFD166" /> },
      { label: 'Red lights', ok: false, render: () => <LightChoice color="#EF4444" /> },
      { label: 'No lights', ok: false, render: () => (
        <svg viewBox="0 0 100 60" width="100%" height="50">
          <rect x="0" y="0" width="100" height="60" fill="transparent" />
        </svg>
      ) },
    ],
  },
];

export default function BuildCybertruck() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();

  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => { speak(STEPS[step]?.prompt ?? ''); }, [step, speak]);

  useEffect(() => {
    if (step >= STEPS.length && !done) {
      const correct = picks.filter(Boolean).length;
      setDone(true);
      record('trucks.build', correct, STEPS.length);
    }
  }, [step, done, picks, record]);

  const handle = (i: number, ok: boolean) => {
    if (picked !== null) return;
    setPicked(i);
    if (ok) { playCorrect(); playEngine('vroom'); speak('Yes!'); }
    else { playWrong(); speak('Try again next time.'); }
    setPicks((p) => [...p, ok]);
    window.setTimeout(() => {
      setPicked(null);
      setStep((s) => s + 1);
    }, 1100);
  };

  const reset = () => { setStep(0); setPicks([]); setPicked(null); setDone(false); };

  const correctCount = picks.filter(Boolean).length;
  const stars = correctCount === STEPS.length ? 3 : correctCount >= 2 ? 2 : 1;

  if (step >= STEPS.length) {
    return (
      <SectionLayout title="Build a Cybertruck" emoji="🔧" backTo={`/${grade}/trucks`}>
        <div className="kid-card text-center">
          <div className="text-3xl font-extrabold mb-3">Your Cybertruck!</div>
          <FinishedTruck good={picks} />
          <div className="text-lg text-gray-700 mt-3">{correctCount} of {STEPS.length} parts perfect!</div>
        </div>
        <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/trucks`)} />
      </SectionLayout>
    );
  }

  const cur = STEPS[step];

  return (
    <SectionLayout title="Build a Cybertruck" emoji="🔧" backTo={`/${grade}/trucks`} speakText={cur.prompt}>
      <div className="kid-card text-center">
        <div className="text-2xl sm:text-3xl font-extrabold">{cur.prompt}</div>
        <div className="text-base text-gray-700 mt-1">Step {step + 1} of {STEPS.length}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {cur.options.map((opt, idx) => {
          const ring =
            picked === null
              ? 'border-white'
              : opt.ok
                ? 'border-green-400 ring-4 ring-green-300'
                : picked === idx
                  ? 'border-red-400 ring-4 ring-red-300 animate-shake'
                  : 'border-white';
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handle(idx, opt.ok)}
              disabled={picked !== null}
              className={`kid-card !p-3 border-4 ${ring} disabled:opacity-90`}
              aria-label={opt.label}
            >
              <div className="flex items-center justify-center">{opt.render()}</div>
              <div className="text-lg font-bold mt-2">{opt.label}</div>
            </button>
          );
        })}
      </div>
    </SectionLayout>
  );
}

function FinishedTruck({ good }: { good: boolean[] }) {
  // good[0]=body, good[1]=wheels, good[2]=lights
  const body = good[0] ?? false;
  const big = good[1] ?? false;
  const lights = good[2] ?? false;
  const bodyColor = body ? '#D1D5DB' : '#FCA5A5';
  const wheelR = big ? 22 : 14;
  return (
    <svg viewBox="0 0 220 130" width="100%" height={180}>
      {body ? (
        <polygon
          points="10,90 22,68 72,40 145,40 200,72 205,90 200,98 22,98"
          fill={bodyColor}
          stroke={STROKE}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      ) : (
        <ellipse cx="110" cy="78" rx="100" ry="32" fill={bodyColor} stroke={STROKE} strokeWidth="2.5" />
      )}
      {body && <polygon points="80,52 145,52 175,68 75,68" fill="#1F2937" opacity="0.55" />}
      {lights && <line x1="190" y1="68" x2="208" y2="68" stroke="#FFD166" strokeWidth="4" strokeLinecap="round" />}
      <circle cx="50" cy={body ? 100 : 102} r={wheelR} fill="#111827" stroke={STROKE} strokeWidth="2" />
      <circle cx="50" cy={body ? 100 : 102} r={wheelR * 0.45} fill="#9CA3AF" />
      <circle cx="170" cy={body ? 100 : 102} r={wheelR} fill="#111827" stroke={STROKE} strokeWidth="2" />
      <circle cx="170" cy={body ? 100 : 102} r={wheelR * 0.45} fill="#9CA3AF" />
    </svg>
  );
}
