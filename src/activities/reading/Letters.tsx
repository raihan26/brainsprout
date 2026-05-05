import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { sample, shuffle } from '../../utils/shuffle';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type Q = { upper: string; choices: string[] };

const build = (): Q => {
  const upper = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  const others = sample(ALPHABET.filter((l) => l !== upper), 2).map((l) => l.toLowerCase());
  return { upper, choices: shuffle([upper.toLowerCase(), ...others]) };
};

export default function Letters() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();
  const TOTAL = 8;

  const [i, setI] = useState(0);
  const [q, setQ] = useState<Q>(() => build());
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak(`Match capital ${q.upper}.`); }, [q.upper, speak]);

  const handle = (c: string) => {
    if (picked) return;
    setPicked(c);
    const ok = c === q.upper.toLowerCase();
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak(`Yes! ${q.upper}.`); }
    else { playWrong(); speak(`This is ${q.upper.toLowerCase()}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('reading.letters', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1000);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Letter Recognition" emoji="🔤" backTo={`/${grade}/reading`} speakText={`Find the small letter for capital ${q.upper}.`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-xl font-bold mb-2">Find the matching small letter</div>
        <div className="text-9xl font-extrabold text-plum animate-pop" aria-label={`Capital ${q.upper}`}>{q.upper}</div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.upper.toLowerCase() ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={`Letter ${c}`}>
              <span className="text-6xl">{c}</span>
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/reading`)} />
    </SectionLayout>
  );
}
