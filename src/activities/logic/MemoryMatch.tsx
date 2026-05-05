import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playTap, playWrong } from '../../utils/sound';
import { sample, shuffle } from '../../utils/shuffle';

const ICONS = ['🐶', '🐱', '🦊', '🐸', '🐵', '🐯', '🦁', '🐰', '🐼', '🐨', '🐮', '🐷'];

type Mode = 'easy' | 'medium';
type Card = { id: number; emoji: string; matched: boolean };

const buildDeck = (mode: Mode): Card[] => {
  const pairs = mode === 'easy' ? 3 : 6; // 2x3 = 6, 3x4 = 12
  const picks = sample(ICONS, pairs);
  const deck = shuffle([...picks, ...picks]).map((emoji, i) => ({ id: i, emoji, matched: false }));
  return deck;
};

export default function MemoryMatch() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();

  const [mode, setMode] = useState<Mode>('easy');
  const [deck, setDeck] = useState<Card[]>(() => buildDeck('easy'));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak('Match the pairs.'); }, [speak]);

  const cols = mode === 'easy' ? 3 : 4;
  const totalPairs = deck.length / 2;

  const flip = (id: number) => {
    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;
    if (deck.find((c) => c.id === id)?.matched) return;
    playTap();
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((nid) => deck.find((c) => c.id === nid)!);
      if (a.emoji === b.emoji) {
        window.setTimeout(() => {
          setDeck((d) => d.map((c) => (c.id === a.id || c.id === b.id ? { ...c, matched: true } : c)));
          setFlipped([]);
          playCorrect();
          speak('Match!');
        }, 500);
      } else {
        window.setTimeout(() => { setFlipped([]); playWrong(); }, 900);
      }
    }
  };

  useEffect(() => {
    if (deck.length > 0 && deck.every((c) => c.matched) && !done) {
      const ideal = totalPairs;
      const earned = moves <= ideal ? 3 : moves <= ideal + 2 ? 2 : 1;
      setDone(true);
      record('logic.memory', earned, 3);
    }
  }, [deck, moves, record, totalPairs, done]);

  const restart = (m: Mode = mode) => {
    setMode(m);
    setDeck(buildDeck(m));
    setFlipped([]);
    setMoves(0);
    setDone(false);
  };

  const ideal = totalPairs;
  const stars = moves <= ideal ? 3 : moves <= ideal + 2 ? 2 : 1;

  return (
    <SectionLayout title="Memory Match" emoji="🃏" backTo={`/${grade}/logic`} speakText="Match the pairs.">
      <div className="kid-card">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="text-xl font-extrabold">Moves: {moves}</div>
          <div className="inline-flex gap-2">
            <button onClick={() => restart('easy')} className={`kid-btn-light !py-2 !px-3 ${mode === 'easy' ? 'ring-4 ring-grass' : ''}`}>2×3 Easy</button>
            <button onClick={() => restart('medium')} className={`kid-btn-light !py-2 !px-3 ${mode === 'medium' ? 'ring-4 ring-berry' : ''}`}>3×4 Medium</button>
          </div>
        </div>
        <div className={`grid gap-2 sm:gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {deck.map((c) => {
            const showing = flipped.includes(c.id) || c.matched;
            return (
              <button
                key={c.id}
                onClick={() => flip(c.id)}
                className={`aspect-square rounded-2xl border-4 ${showing ? 'bg-white border-white' : 'bg-sky border-sky'} flex items-center justify-center text-5xl sm:text-6xl shadow-kid transition`}
                aria-label={showing ? c.emoji : 'face down card'}
              >
                {showing ? <span className="animate-pop">{c.emoji}</span> : <span aria-hidden="true">❓</span>}
              </button>
            );
          })}
        </div>
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={() => restart(mode)} onHome={() => nav(`/${grade}/logic`)} />
    </SectionLayout>
  );
}
