import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import ShapeSvg from '../../components/ShapeSvg';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong, playWin } from '../../utils/sound';
import { shuffle, sample } from '../../utils/shuffle';

const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart'];
const COLORS = ['#4CC9F0', '#06D6A0', '#EF476F', '#FFD166', '#9D4EDD'];

type Cell = { id: number; shape: string; color: string };

const buildBoard = (target: string): Cell[] => {
  const targetCount = 3 + Math.floor(Math.random() * 3); // 3..5
  const distractorPool = SHAPES.filter((s) => s !== target);
  const cells: Cell[] = [];
  for (let i = 0; i < targetCount; i++) {
    cells.push({ id: i, shape: target, color: sample(COLORS, 1)[0] });
  }
  for (let i = 0; i < 12 - targetCount; i++) {
    cells.push({ id: targetCount + i, shape: sample(distractorPool, 1)[0], color: sample(COLORS, 1)[0] });
  }
  return shuffle(cells);
};

export default function FindShape() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();
  const TOTAL_ROUNDS = 3;

  const [round, setRound] = useState(0);
  const [target, setTarget] = useState(() => sample(SHAPES, 1)[0]);
  const [board, setBoard] = useState(() => buildBoard(target));
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const [correctRounds, setCorrectRounds] = useState(0);

  useEffect(() => { speak(`Find all the ${target}s.`); }, [target, speak]);

  const targetIds = useMemo(() => board.filter((c) => c.shape === target).map((c) => c.id), [board, target]);

  const tap = (cell: Cell) => {
    if (tapped.has(cell.id)) return;
    if (cell.shape === target) {
      const ns = new Set(tapped); ns.add(cell.id); setTapped(ns);
      playCorrect(); speak(target);
      if (targetIds.every((id) => ns.has(id))) {
        playWin();
        const next = correctRounds + 1;
        setCorrectRounds(next);
        if (round + 1 >= TOTAL_ROUNDS) {
          setDone(true);
          record('shapes.find', next, TOTAL_ROUNDS);
        } else {
          window.setTimeout(() => {
            const t = sample(SHAPES, 1)[0];
            setTarget(t); setBoard(buildBoard(t)); setTapped(new Set()); setWrong(new Set()); setRound((r) => r + 1);
          }, 900);
        }
      }
    } else {
      const nw = new Set(wrong); nw.add(cell.id); setWrong(nw);
      playWrong();
      window.setTimeout(() => { setWrong((w) => { const n = new Set(w); n.delete(cell.id); return n; }); }, 600);
    }
  };

  const stars = calcStars(correctRounds, TOTAL_ROUNDS);
  const reset = () => {
    const t = sample(SHAPES, 1)[0];
    setRound(0); setTarget(t); setBoard(buildBoard(t)); setTapped(new Set()); setWrong(new Set());
    setCorrectRounds(0); setDone(false);
  };

  return (
    <SectionLayout title="Find the Shape" emoji="🔵" backTo="/shapes" speakText={`Find all the ${target}s.`}>
      <div className="kid-card text-center">
        <div className="text-2xl font-extrabold capitalize">Find all the {target}s — Round {round + 1} of {TOTAL_ROUNDS}</div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-5">
        {board.map((c) => {
          const isTapped = tapped.has(c.id);
          const isWrong = wrong.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => tap(c)}
              className={`kid-card !p-3 flex items-center justify-center transition ${isTapped ? 'ring-4 ring-grass' : ''} ${isWrong ? 'animate-shake ring-4 ring-red-400' : ''}`}
              aria-label={`${c.shape}`}
            >
              <ShapeSvg shape={c.shape} color={c.color} size={80} />
            </button>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav('/shapes')} />
    </SectionLayout>
  );
}
