import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playWrong } from '../../utils/sound';
import { shuffle, pick } from '../../utils/shuffle';

type Step = { id: string; label: string; emoji: string };
type Story = { name: string; steps: Step[] };

const STORIES: Story[] = [
  {
    name: 'Morning routine',
    steps: [
      { id: 'wake', label: 'Wake up', emoji: '⏰' },
      { id: 'brush', label: 'Brush teeth', emoji: '🪥' },
      { id: 'eat', label: 'Eat breakfast', emoji: '🥣' },
      { id: 'school', label: 'Go to school', emoji: '🎒' },
    ],
  },
  {
    name: 'Make a sandwich',
    steps: [
      { id: 'bread', label: 'Get bread', emoji: '🍞' },
      { id: 'jam', label: 'Spread jam', emoji: '🍓' },
      { id: 'close', label: 'Close it up', emoji: '🥪' },
      { id: 'eat', label: 'Yum!', emoji: '😋' },
    ],
  },
  {
    name: 'Plant a flower',
    steps: [
      { id: 'pot', label: 'Get a pot', emoji: '🪴' },
      { id: 'seed', label: 'Plant seed', emoji: '🌰' },
      { id: 'water', label: 'Water it', emoji: '💧' },
      { id: 'sun', label: 'It grows', emoji: '🌻' },
    ],
  },
  {
    name: 'Bath time',
    steps: [
      { id: 'tub', label: 'Fill the tub', emoji: '🛁' },
      { id: 'wash', label: 'Wash up', emoji: '🧼' },
      { id: 'dry', label: 'Dry off', emoji: '🧻' },
      { id: 'pjs', label: 'Put on PJs', emoji: '🧸' },
    ],
  },
];

export default function Sequence() {
  const nav = useNavigate();
  const { record } = useProgress();
  const { speak } = useSpeech();

  const [story, setStory] = useState<Story>(() => pick(STORIES));
  const [pool, setPool] = useState<Step[]>(() => shuffle(story.steps));
  const [placed, setPlaced] = useState<Step[]>([]);
  const [completed, setCompleted] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { speak(`${story.name}. Put the steps in order.`); }, [story, speak]);

  const tap = (s: Step) => {
    const expected = story.steps[placed.length];
    if (s.id === expected.id) {
      setPlaced((p) => [...p, s]);
      setPool((p) => p.filter((x) => x.id !== s.id));
      playCorrect();
      speak(s.label);
      if (placed.length + 1 === story.steps.length) {
        const next = completed + 1;
        setCompleted(next);
        if (next >= 2) {
          setDone(true);
          record('logic.sequence', next, 2);
        } else {
          window.setTimeout(() => {
            const ns = pick(STORIES.filter((s) => s.name !== story.name));
            setStory(ns);
            setPool(shuffle(ns.steps));
            setPlaced([]);
          }, 1100);
        }
      }
    } else {
      playWrong();
      speak(`Next is ${expected.label}.`);
    }
  };

  const reset = () => {
    const ns = pick(STORIES);
    setStory(ns); setPool(shuffle(ns.steps)); setPlaced([]); setCompleted(0); setDone(false);
  };

  return (
    <SectionLayout title="Puzzle Sequence" emoji="🧠" backTo="/logic" speakText={`${story.name}. Tap steps in order.`}>
      <div className="kid-card">
        <div className="text-2xl font-extrabold text-center mb-3">{story.name}</div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {story.steps.map((s, i) => {
            const has = placed[i];
            return (
              <div key={s.id} className={`rounded-2xl border-4 p-2 text-center ${has ? 'bg-green-100 border-green-400 animate-pop' : 'bg-white/60 border-white'}`}>
                <div className="text-4xl sm:text-5xl">{has ? has.emoji : i + 1}</div>
                <div className="text-xs sm:text-sm font-bold mt-1">{has ? has.label : '...'}</div>
              </div>
            );
          })}
        </div>
        <div className="text-center text-gray-700 mb-2">Tap the next step:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {pool.map((s) => (
            <button key={s.id} onClick={() => tap(s)} className="kid-btn-light !py-4">
              <div className="text-5xl">{s.emoji}</div>
              <div className="text-base mt-1">{s.label}</div>
            </button>
          ))}
        </div>
        <div className="text-center text-gray-700 mt-3">Round {completed + 1} of 2</div>
      </div>
      <Celebration show={done} stars={3} onPlayAgain={reset} onHome={() => nav('/logic')} />
    </SectionLayout>
  );
}
