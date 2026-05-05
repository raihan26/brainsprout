import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import TruckSvg, { TRUCK_NAMES, TRUCK_SOUNDS, type TruckId } from '../../components/TruckSvg';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playEngine, playWrong } from '../../utils/sound';
import { sample, shuffle, pick } from '../../utils/shuffle';

const ALL: TruckId[] = ['cybertruck', 'monster', 'fire', 'police', 'dump', 'race', 'schoolbus'];

type Q = { truck: TruckId; choices: TruckId[] };

const build = (): Q => {
  const truck = pick(ALL);
  const others = sample(ALL.filter((t) => t !== truck), 2);
  return { truck, choices: shuffle([truck, ...others]) };
};

export default function TruckSounds() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL = 6;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build());
  const [picked, setPicked] = useState<TruckId | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => playEngine(TRUCK_SOUNDS[q.truck].engine), 350);
    speak(`Listen! ${TRUCK_SOUNDS[q.truck].word} Which truck is it?`);
    return () => window.clearTimeout(t);
  }, [q.truck, speak]);

  const handle = (t: TruckId) => {
    if (picked) return;
    setPicked(t);
    const ok = t === q.truck;
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak(`Yes! ${TRUCK_NAMES[q.truck]}!`); }
    else { playWrong(); speak(`That was a ${TRUCK_NAMES[q.truck]}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('trucks.sounds', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1300);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Truck Sounds" emoji="📢" backTo="/trucks" speakText="Listen — which truck makes this sound?">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-2xl sm:text-3xl font-extrabold mb-3">Which truck makes this sound?</div>
        <button
          type="button"
          onClick={() => playEngine(TRUCK_SOUNDS[q.truck].engine)}
          className="kid-btn-primary text-3xl mt-1"
          aria-label="Play sound again"
        >
          🔊 {TRUCK_SOUNDS[q.truck].word}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.truck ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={TRUCK_NAMES[c]}>
              <div className="flex flex-col items-center gap-2">
                <TruckSvg id={c} size={130} />
                <div className="text-base">{TRUCK_NAMES[c]}</div>
              </div>
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/trucks')} />
    </SectionLayout>
  );
}
