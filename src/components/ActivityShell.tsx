import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswerButton from './AnswerButton';
import Celebration from './Celebration';
import ProgressStars from './ProgressStars';
import SpeakButton from './SpeakButton';
import SectionLayout from './SectionLayout';
import { useGrade } from '../hooks/useGrade';
import { useProgressV2 } from '../hooks/useProgressV2';
import { useSpeech } from '../hooks/useSpeech';
import { calcStars, generateId } from '../utils/progress';
import { playCorrect, playWrong } from '../utils/sound';
import { shuffle } from '../utils/shuffle';
import type { ActivityAttemptEvent, Question, QuestionAttemptEvent } from '../types';

type Props = {
  activityId: string;
  title: string;
  emoji: string;
  worldId: string;
  backPath: string;
  questions: Question[];
  skillIds?: string[];
  numQuestions?: number;
  speakChoices?: boolean;
};

const colors = ['sky', 'grass', 'berry', 'plum', 'sun'] as const;

export default function ActivityShell({
  activityId,
  title,
  emoji,
  worldId,
  backPath,
  questions,
  skillIds = [],
  numQuestions = 6,
  speakChoices = false,
}: Props) {
  const nav = useNavigate();
  const grade = useGrade();
  const { progress, recordActivity, recordQuestion } = useProgressV2(grade);
  const { speak, enabled: speechEnabled } = useSpeech();

  const startedAtRef = useRef<string>(new Date().toISOString());
  const recordedRef = useRef(false);

  const buildSet = useCallback(() => {
    const shuffled = shuffle(questions);
    return shuffled.slice(0, Math.min(numQuestions, shuffled.length));
  }, [questions, numQuestions]);

  const [set, setSet] = useState<Question[]>(() => buildSet());
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const q = set[index];
  const shuffledChoices = useMemo(
    () => shuffle(q?.choices ?? []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q?.id],
  );

  useEffect(() => {
    setPicked(null);
  }, [index]);

  useEffect(() => {
    if (started && q) {
      speak(q.speakText ?? q.prompt);
    }
  }, [q?.id, speak, started]);

  const handleStart = () => {
    startedAtRef.current = new Date().toISOString();
    recordedRef.current = false;
    setStarted(true);
  };

  const handlePick = (choice: string) => {
    if (picked) return;
    setPicked(choice);
    const isRight = choice === q.answer;

    // Record question attempt
    const qEvent: QuestionAttemptEvent = {
      id: generateId(),
      grade,
      worldId,
      activityId,
      questionId: q.id,
      skillIds: q.skillIds ?? skillIds,
      answeredAt: new Date().toISOString(),
      selectedAnswer: choice,
      correctAnswer: q.answer,
      isCorrect: isRight,
      attemptNumber: 1,
    };
    recordQuestion(qEvent);

    if (isRight) {
      playCorrect();
      setCorrect((c) => c + 1);
      speak('Correct!');
    } else {
      playWrong();
      if (q.explanation) {
        speak(q.explanation);
      } else {
        speak(`The answer is ${q.answer}.`);
      }
    }

    window.setTimeout(() => {
      if (index + 1 >= set.length) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 1200);
  };

  useEffect(() => {
    if (done && !recordedRef.current) {
      recordedRef.current = true;
      const now = new Date().toISOString();
      const durationMs = new Date(now).getTime() - new Date(startedAtRef.current).getTime();
      const stars = calcStars(correct, set.length);

      const event: ActivityAttemptEvent = {
        id: generateId(),
        grade,
        worldId,
        activityId,
        skillIds,
        startedAt: startedAtRef.current,
        completedAt: now,
        durationMs,
        totalQuestions: set.length,
        correctAnswers: correct,
        incorrectAnswers: set.length - correct,
        speechUsed: speechEnabled,
        starsEarned: stars,
      };
      recordActivity(event);
    }
  }, [done, correct, set.length, activityId, worldId, grade, skillIds, recordActivity, speechEnabled]);

  const stars = calcStars(correct, set.length);
  const bestStars = progress.activityBestStars[activityId] ?? 0;

  const handlePlayAgain = () => {
    recordedRef.current = false;
    startedAtRef.current = new Date().toISOString();
    setSet(buildSet());
    setIndex(0);
    setCorrect(0);
    setPicked(null);
    setDone(false);
  };

  // Intro screen
  if (!started) {
    return (
      <SectionLayout title={title} emoji={emoji} backTo={`/${grade}/${backPath}`}>
        <div className="kid-card text-center max-w-md mx-auto">
          <div className="text-7xl sm:text-8xl mb-4 animate-floaty" aria-hidden="true">{emoji}</div>
          <h2 className="text-2xl font-display font-bold mb-2 text-slate">{title}</h2>
          <p className="text-lg text-slate/60 font-body mb-1">{set.length} questions</p>
          {bestStars > 0 && (
            <div className="mb-3">
              <span className="text-sm text-slate/50 font-body">Your best: </span>
              <ProgressStars value={bestStars} size="sm" />
            </div>
          )}
          <button
            type="button"
            onClick={handleStart}
            className="kid-btn-green text-2xl w-full mt-4"
          >
            Let's Go!
          </button>
        </div>
      </SectionLayout>
    );
  }

  if (!q) return null;

  return (
    <SectionLayout
      title={title}
      emoji={emoji}
      backTo={`/${grade}/${backPath}`}
      speakText={q.speakText ?? q.prompt}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-base font-display font-semibold text-slate/70">
          {index + 1} of {set.length}
        </div>
        <ProgressStars value={Math.min(3, Math.round((correct / set.length) * 3))} size="sm" />
      </div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full bg-slate/10 mb-5 overflow-hidden">
        <div
          className="h-full bg-grass rounded-full transition-all duration-500"
          style={{ width: `${((index + (picked ? 1 : 0)) / set.length) * 100}%` }}
        />
      </div>

      <div className="kid-card text-center">
        {q.visual && (
          <div className="text-5xl sm:text-6xl mb-3 tracking-wider animate-pop" aria-label={q.visual}>
            {q.visual}
          </div>
        )}
        {q.emoji && !q.visual && (
          <div className="text-6xl sm:text-7xl mb-3 animate-floaty" aria-hidden="true">
            {q.emoji}
          </div>
        )}
        <div className="text-2xl sm:text-3xl font-display font-bold text-slate">{q.prompt}</div>
        <div className="mt-2">
          <SpeakButton text={q.speakText ?? q.prompt} label="Read to me" />
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
              ariaLabel={`Answer: ${c}`}
            >
              {c}
            </AnswerButton>
          );
        })}
      </div>

      {/* Feedback text */}
      {picked && (
        <div className="mt-4 text-center animate-pop">
          {picked === q.answer ? (
            <p className="text-xl font-bold text-green-600">✓ Correct!</p>
          ) : (
            <p className="text-xl font-bold text-orange-600">
              The answer is: {q.answer}
              {q.explanation && <span className="block text-base text-gray-700 mt-1">{q.explanation}</span>}
            </p>
          )}
        </div>
      )}

      <Celebration
        show={done}
        stars={stars}
        onPlayAgain={handlePlayAgain}
        onHome={() => nav(`/${grade}/${backPath}`)}
      />
    </SectionLayout>
  );
}
