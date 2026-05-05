import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswerButton from './AnswerButton';
import Celebration from './Celebration';
import ProgressStars from './ProgressStars';
import SpeakButton from './SpeakButton';
import { useProgress } from '../hooks/useProgress';
import { useGrade } from '../hooks/useGrade';
import { useSpeech } from '../hooks/useSpeech';
import { calcStars } from '../utils/storage';
import { playCorrect, playWrong } from '../utils/sound';
import { shuffle } from '../utils/shuffle';
import type { Question } from '../types';

type Props = {
  activityId: string;
  homePath: string;
  questions: Question[];
  speakChoices?: boolean;
  numQuestions?: number;
};

const colors = ['sky', 'grass', 'berry', 'plum', 'sun'] as const;

export default function QuestionRunner({
  activityId,
  homePath,
  questions,
  speakChoices = false,
  numQuestions,
}: Props) {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();

  const gradeHomePath = `/${grade}${homePath}`;

  const buildSet = () => {
    const shuffled = shuffle(questions);
    return numQuestions ? shuffled.slice(0, Math.min(numQuestions, shuffled.length)) : shuffled;
  };

  const [set, setSet] = useState<Question[]>(() => buildSet());
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const recordedRef = useRef(false);

  const q = set[index];
  const shuffledChoices = useMemo(
    () => shuffle(q?.choices ?? []),
    [q?.id],
  );

  useEffect(() => {
    setPicked(null);
  }, [index]);

  useEffect(() => {
    if (q) speak(q.prompt);
  }, [q?.id, speak]);

  if (!q) return null;

  const handlePick = (choice: string) => {
    if (picked) return;
    setPicked(choice);
    const isRight = choice === q.answer;
    if (isRight) {
      playCorrect();
      setCorrect((c) => c + 1);
      speak('Correct!');
    } else {
      playWrong();
      speak(`The answer is ${q.answer}.`);
    }
    window.setTimeout(() => {
      if (index + 1 >= set.length) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 1100);
  };

  useEffect(() => {
    if (done && !recordedRef.current) {
      recordedRef.current = true;
      record(activityId, correct, set.length);
    }
  }, [done, correct, set.length, activityId, record]);

  const stars = calcStars(correct, set.length);

  const handlePlayAgain = () => {
    recordedRef.current = false;
    setSet(buildSet());
    setIndex(0);
    setCorrect(0);
    setPicked(null);
    setDone(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-gray-700">
          Question {index + 1} of {set.length}
        </div>
        <ProgressStars value={Math.min(3, Math.round((correct / set.length) * 3))} size="sm" />
      </div>

      <div className="kid-card text-center">
        {q.emoji && (
          <div className="text-7xl sm:text-8xl mb-2 animate-floaty" aria-hidden="true">
            {q.emoji}
          </div>
        )}
        <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{q.prompt}</div>
        <div className="mt-2">
          <SpeakButton text={q.prompt} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {shuffledChoices.map((c, i) => {
          const state =
            picked === null
              ? 'idle'
              : c === q.answer
                ? 'correct'
                : c === picked
                  ? 'wrong'
                  : 'idle';
          return (
            <AnswerButton
              key={c + i}
              color={colors[i % colors.length]}
              state={state}
              disabled={picked !== null}
              onClick={() => {
                if (speakChoices) speak(c);
                handlePick(c);
              }}
              ariaLabel={`Answer ${c}`}
            >
              {c}
            </AnswerButton>
          );
        })}
      </div>

      <Celebration
        show={done}
        stars={stars}
        onPlayAgain={handlePlayAgain}
        onHome={() => nav(gradeHomePath)}
      />
    </div>
  );
}
