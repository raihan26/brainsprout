import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import AnswerButton from '../../components/AnswerButton';
import Celebration from '../../components/Celebration';
import ProgressStars from '../../components/ProgressStars';
import SpeakButton from '../../components/SpeakButton';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { calcStars } from '../../utils/storage';
import { playCorrect, playWrong } from '../../utils/sound';
import { sample, shuffle } from '../../utils/shuffle';

const WORDS = [
  { word: 'cat', emoji: '🐱' },
  { word: 'dog', emoji: '🐶' },
  { word: 'sun', emoji: '☀️' },
  { word: 'bat', emoji: '🦇' },
  { word: 'hat', emoji: '🎩' },
  { word: 'cup', emoji: '🥤' },
  { word: 'pig', emoji: '🐷' },
  { word: 'bus', emoji: '🚌' },
  { word: 'bee', emoji: '🐝' },
  { word: 'log', emoji: '🪵' },
];

type Q = { word: string; emoji: string; choices: string[] };

const build = (): Q => {
  const item = WORDS[Math.floor(Math.random() * WORDS.length)];
  const others = sample(WORDS.filter((w) => w.word !== item.word), 2).map((w) => w.word);
  return { word: item.word, emoji: item.emoji, choices: shuffle([item.word, ...others]) };
};

export default function SimpleWords() {
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

  useEffect(() => { speak(q.word); }, [q.word, speak]);

  const handle = (c: string) => {
    if (picked) return;
    setPicked(c);
    const ok = c === q.word;
    if (ok) { playCorrect(); setCorrect((x) => x + 1); speak('Great reading!'); }
    else { playWrong(); speak(`The word is ${q.word}.`); }
    window.setTimeout(() => {
      if (i + 1 >= TOTAL) {
        setDone(true);
        record('reading.words', ok ? correct + 1 : correct, TOTAL);
      } else {
        setI(i + 1); setQ(build()); setPicked(null);
      }
    }, 1100);
  };

  const stars = calcStars(correct, TOTAL);
  const reset = () => { setI(0); setQ(build()); setPicked(null); setCorrect(0); setDone(false); };

  return (
    <SectionLayout title="Simple Words" emoji="🐱" backTo={`/${grade}/reading`} speakText={`What word is this?`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">Question {i + 1} of {TOTAL}</div>
        <ProgressStars value={Math.min(3, Math.round((correct / TOTAL) * 3))} size="sm" />
      </div>
      <div className="kid-card text-center">
        <div className="text-9xl animate-floaty" aria-hidden="true">{q.emoji}</div>
        <div className="text-xl font-bold mt-2">What word is this?</div>
        <div className="mt-2"><SpeakButton text={q.word} label="Say it" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {q.choices.map((c, k) => {
          const state = picked === null ? 'idle' : c === q.word ? 'correct' : c === picked ? 'wrong' : 'idle';
          return (
            <AnswerButton key={c} color={(['sky', 'grass', 'berry'] as const)[k % 3]} state={state} disabled={picked !== null} onClick={() => handle(c)} ariaLabel={`Word ${c}`}>
              <span className="text-4xl tracking-widest uppercase">{c}</span>
            </AnswerButton>
          );
        })}
      </div>
      <Celebration show={done} stars={stars} onPlayAgain={reset} onHome={() => nav(`/${grade}/reading`)} />
    </SectionLayout>
  );
}
