import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import TruckSvg, { type TruckId } from '../../components/TruckSvg';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playEngine, playWin } from '../../utils/sound';

const PLAYER: TruckId = 'cybertruck';
const RIVAL: TruckId = 'monster';

const FINISH = 100;

export default function TruckRace() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();

  const [me, setMe] = useState(0);
  const [rival, setRival] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [winner, setWinner] = useState<'me' | 'rival' | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  const start = () => {
    if (running) return;
    setMe(0); setRival(0); setDone(false); setWinner(null); setRunning(true);
    speak('Tap your Cybertruck button as fast as you can!');
    playEngine('vroom');
    timerRef.current = window.setInterval(() => {
      setRival((r) => {
        const next = r + 0.6 + Math.random() * 1.0;
        return Math.min(FINISH, next);
      });
    }, 80);
  };

  const tap = () => {
    if (!running) return;
    setMe((m) => Math.min(FINISH, m + 3 + Math.random() * 2));
  };

  useEffect(() => {
    if (!running) return;
    if (me >= FINISH || rival >= FINISH) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      setRunning(false);
      const youWin = me >= FINISH;
      setWinner(youWin ? 'me' : 'rival');
      if (youWin) { playWin(); speak('You won!'); record('trucks.race', 1, 1); }
      else { playCorrect(); speak('Good race! Try again.'); record('trucks.race', 0, 1); }
      window.setTimeout(() => setDone(true), 800);
    }
  }, [me, rival, running, record, speak]);

  const reset = () => { setMe(0); setRival(0); setDone(false); setWinner(null); setRunning(false); };

  return (
    <SectionLayout title="Truck Race!" emoji="🏁" backTo={`/${grade}/trucks`} speakText="Tap fast to win the race!">
      <div className="kid-card">
        <div className="text-center text-xl font-extrabold mb-2">
          {!running && !winner && 'Press START, then tap as fast as you can!'}
          {running && 'GO GO GO! Tap the button!'}
          {winner === 'me' && '🏆 You won the race!'}
          {winner === 'rival' && 'Monster Truck won! Try again!'}
        </div>

        {/* Track */}
        <div className="space-y-2">
          <Lane label="You" color="#D1D5DB" truck={PLAYER} progress={me} />
          <Lane label="Rival" color="#EF4444" truck={RIVAL} progress={rival} />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {!running && (
            <button type="button" onClick={start} className="kid-btn-green text-3xl !py-5 !px-8">
              🏁 START
            </button>
          )}
          {running && (
            <button
              type="button"
              onClick={tap}
              className="kid-btn-pink text-4xl !py-7 !px-10 animate-pop"
              aria-label="Tap to drive your Cybertruck"
            >
              ⚡ GO!
            </button>
          )}
          {!running && winner && (
            <button type="button" onClick={reset} className="kid-btn-light text-2xl">↻ Race Again</button>
          )}
        </div>
      </div>

      <Celebration
        show={done && winner === 'me'}
        stars={3}
        message="You're the fastest! 🏆"
        onPlayAgain={reset}
        onHome={() => nav(`/${grade}/trucks`)}
      />
      <Celebration
        show={done && winner === 'rival'}
        stars={1}
        message="Great racing! Try again!"
        onPlayAgain={reset}
        onHome={() => nav(`/${grade}/trucks`)}
      />
    </SectionLayout>
  );
}

function Lane({ label, color, truck, progress }: { label: string; color: string; truck: TruckId; progress: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-bold text-gray-700 mb-1">
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="relative h-20 rounded-2xl border-4 border-white overflow-hidden" style={{ background: `repeating-linear-gradient(90deg, ${color}22, ${color}22 16px, ${color}11 16px, ${color}11 32px)` }}>
        <div className="absolute right-1 top-1 bottom-1 w-2 bg-black/70 rounded-sm" aria-hidden="true" />
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-150 ease-linear"
          style={{ left: `calc(${progress}% - 60px)` }}
        >
          <TruckSvg id={truck} size={120} />
        </div>
      </div>
    </div>
  );
}
