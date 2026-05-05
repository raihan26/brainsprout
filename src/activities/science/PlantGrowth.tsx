import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playWrong } from '../../utils/sound';
import { shuffle } from '../../utils/shuffle';

const STEPS = [
  { id: 'seed', label: 'Seed', emoji: '🌰' },
  { id: 'water', label: 'Water', emoji: '💧' },
  { id: 'sun', label: 'Sun', emoji: '☀️' },
  { id: 'sprout', label: 'Sprout', emoji: '🌱' },
  { id: 'plant', label: 'Plant', emoji: '🌻' },
];

export default function PlantGrowth() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();

  const [step, setStep] = useState(0);
  const [pool, setPool] = useState(() => shuffle(STEPS));
  const [done, setDone] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    speak('Help the plant grow! Tap the steps in the right order.');
  }, [speak]);

  const handle = (id: string) => {
    if (id === STEPS[step].id) {
      playCorrect();
      speak(STEPS[step].label);
      const ns = step + 1;
      setStep(ns);
      setPool(pool.filter((s) => s.id !== id));
      if (ns >= STEPS.length) {
        const next = completed + 1;
        setCompleted(next);
        if (next >= 2) {
          setDone(true);
          record('science.plant', next, 2);
        } else {
          window.setTimeout(() => {
            setStep(0);
            setPool(shuffle(STEPS));
          }, 1200);
        }
      }
    } else {
      playWrong();
      speak(`The next step is ${STEPS[step].label}.`);
    }
  };

  const reset = () => { setStep(0); setPool(shuffle(STEPS)); setCompleted(0); setDone(false); };

  return (
    <SectionLayout title="Plant Growth" emoji="🌱" backTo={`/${grade}/science`} speakText="Tap the steps in order to grow the plant.">
      <div className="kid-card">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`text-center rounded-2xl border-4 p-2 ${i < step ? 'bg-green-100 border-green-400' : i === step ? 'bg-yellow-100 border-yellow-400 animate-pop' : 'bg-white/60 border-white'}`}>
              <div className="text-4xl sm:text-5xl">{i < step ? s.emoji : '❓'}</div>
              <div className="text-xs sm:text-sm font-bold mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-3">
          <div className="text-xl font-extrabold text-gray-800">Next step?</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pool.map((s) => (
            <button
              key={s.id}
              onClick={() => handle(s.id)}
              className="kid-btn-light text-3xl !py-5"
              aria-label={s.label}
            >
              <div className="text-5xl">{s.emoji}</div>
              <div className="text-base mt-1">{s.label}</div>
            </button>
          ))}
        </div>
        <p className="text-center text-gray-700 mt-3">Round {completed + 1} of 2</p>
      </div>

      <Celebration show={done} stars={3} onPlayAgain={reset} onHome={() => nav(`/${grade}/science`)} />
    </SectionLayout>
  );
}
