import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import TruckSvg, { TRUCK_NAMES, type TruckId } from '../../components/TruckSvg';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playEngine, playWrong } from '../../utils/sound';
import { sample, shuffle, pick } from '../../utils/shuffle';

const ALL: TruckId[] = ['cybertruck', 'monster', 'fire', 'police', 'dump', 'race', 'schoolbus', 'garbage', 'tractor'];

type Q = { truck: TruckId; choices: TruckId[] };

const build = (): Q => {
  const truck = pick(ALL);
  const others = sample(ALL.filter((t) => t !== truck), 2);
  return { truck, choices: shuffle([truck, ...others]) };
};

export default function NameTheTruck() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL = 8;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build());
  const [picked, setPicked] = useState<TruckId | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak('What truck is this?'); }, [q.truck, speak]);

  const handle = (t: TruckId) => {
    if (picked) return;
    setPicked(t);
    const ok = t === q.truck;
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak(`Yes! ${TRUCK_NAMES[q.truck]}!`); }
    else { playWrong(); speak(`This is a ${TRUCK_NAMES[q.truck]}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('trucks.name', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1200);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Name the Truck" emoji="🛻" backTo="/trucks" speakText="What truck is this?">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-xl font-bold mb-2">What truck is this?</div>
        <div className="flex items-center justify-center animate-pop">
          <TruckSvg id={q.truck} size={280} />
        </div>
        <button
          type="button"
          onClick={() => playEngine('vroom')}
          className="kid-btn-light text-base mt-2"
          aria-label="Make engine sound"
        >
          🔊 Vroom!
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.truck ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={TRUCK_NAMES[c]}>
              {TRUCK_NAMES[c]}
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/trucks')} />
    </SectionLayout>
  );
}
