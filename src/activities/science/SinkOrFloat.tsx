import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { shuffle } from '../../utils/shuffle';

type Item = { name: string; emoji: string; floats: boolean };

const ITEMS: Item[] = [
  { name: 'rock', emoji: '🪨', floats: false },
  { name: 'leaf', emoji: '🍃', floats: true },
  { name: 'boat', emoji: '⛵', floats: true },
  { name: 'coin', emoji: '🪙', floats: false },
  { name: 'rubber duck', emoji: '🦆', floats: true },
  { name: 'feather', emoji: '🪶', floats: true },
  { name: 'key', emoji: '🔑', floats: false },
  { name: 'apple', emoji: '🍎', floats: true },
];

export default function SinkOrFloat() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();

  const [order] = useState(() => shuffle(ITEMS).slice(0, 6));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<'sink' | 'float' | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [animate, setAnimate] = useState(false);
  const item = order[i];

  const handle = (choice: 'sink' | 'float') => {
    if (picked) return;
    setPicked(choice);
    const right = item.floats ? 'float' : 'sink';
    const ok = choice === right;
    if (ok) { playCorrect(); setCorrect((c) => c + 1); speak(item.floats ? `Yes! It floats!` : `Yes! It sinks!`); }
    else { playWrong(); speak(`The ${item.name} ${item.floats ? 'floats' : 'sinks'}.`); }
    setAnimate(true);
    window.setTimeout(() => {
      if (i + 1 >= order.length) {
        setDone(true);
        record('science.sinkfloat', ok ? correct + 1 : correct, order.length);
      } else {
        setI(i + 1);
        setPicked(null);
        setAnimate(false);
      }
    }, 1500);
  };

  const stars = calcStars(correct, order.length);
  const reset = () => { setI(0); setPicked(null); setCorrect(0); setDone(false); setAnimate(false); };

  const fall = picked && (picked === 'sink' ? !item.floats : item.floats);
  // What we show: if picked, show actual outcome; else hover
  const showFloat = picked ? item.floats : false;

  return (
    <SectionLayout title="Sink or Float" emoji="🛟" backTo="/science" speakText={`Will the ${item.name} sink or float?`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Item {i + 1} of {order.length}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / order.length) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-xl sm:text-2xl font-extrabold">Will the {item.name} sink or float?</div>
        <div className="relative mt-3 h-56 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100 via-sky-200 to-blue-400 border-4 border-white">
          <div className="absolute left-0 right-0 top-1/3 border-t-4 border-blue-300/60" aria-hidden="true" />
          <div
            className={`absolute left-1/2 -translate-x-1/2 text-7xl transition-all duration-1200 ease-in-out`}
            style={{
              top: animate ? (item.floats ? '20%' : '75%') : '10%',
              transitionDuration: '1200ms',
            }}
            aria-hidden="true"
          >
            {item.emoji}
          </div>
          {animate && (
            <div className="absolute left-0 right-0 top-1/3 flex justify-around" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, k) => (
                <span key={k} className="text-2xl animate-pop" style={{ animationDelay: `${k * 80}ms` }}>💧</span>
              ))}
            </div>
          )}
          {fall && (
            <div className="absolute inset-0 flex items-end justify-center pb-3 text-white text-xl font-extrabold animate-pop">
              {showFloat ? 'Floats!' : 'Sinks!'}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <AnswerButton color="sky" state={picked === null ? 'idle' : item.floats ? 'correct' : picked === 'float' ? 'wrong' : 'idle'} disabled={picked !== null} onClick={() => handle('float')}>
          🛟 Float
        </AnswerButton>
        <AnswerButton color="plum" state={picked === null ? 'idle' : !item.floats ? 'correct' : picked === 'sink' ? 'wrong' : 'idle'} disabled={picked !== null} onClick={() => handle('sink')}>
          ⬇️ Sink
        </AnswerButton>
      </div>

      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/science')} />
    </SectionLayout>
  );
}
