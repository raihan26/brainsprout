import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
import { getWorldDisplay } from '../data/worldDisplay';
import type { ActivityAttemptEvent, Question, QuestionAttemptEvent, SectionId } from '../types';

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
  const { speak, stop: stopSpeech, enabled: speechEnabled } = useSpeech();
  const reduceMotion = useReducedMotion();

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
  const world = (() => {
    try {
      return getWorldDisplay(worldId as SectionId);
    } catch {
      return null;
    }
  })();

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

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  const handleStart = () => {
    startedAtRef.current = new Date().toISOString();
    recordedRef.current = false;
    setStarted(true);
  };

  const handlePick = (choice: string) => {
    if (picked) return;
    setPicked(choice);
    const isRight = choice === q.answer;

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
      speak('Great job, explorer!');
    } else {
      playWrong();
      if (q.explanation) {
        speak(q.explanation);
      } else {
        speak(`The answer is ${q.answer}. You're still learning!`);
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
  const accent = world?.accent ?? '#219ebc';
  const progressPct = ((index + (picked ? 1 : 0)) / set.length) * 100;

  const handlePlayAgain = () => {
    recordedRef.current = false;
    startedAtRef.current = new Date().toISOString();
    setSet(buildSet());
    setIndex(0);
    setCorrect(0);
    setPicked(null);
    setDone(false);
  };

  // Intro screen — mission briefing
  if (!started) {
    return (
      <SectionLayout title={title} emoji={emoji} backTo={`/${grade}/${backPath}`}>
        <motion.div
          className="mission-card text-center max-w-md mx-auto"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          style={{ borderTop: `6px solid ${accent}` }}
        >
          <div className="text-xs font-display font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
            {world?.label ?? 'Mission'} · Briefing
          </div>
          <motion.div
            className="text-7xl sm:text-8xl mb-3"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            {emoji}
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate">{title}</h2>
          {world?.missionCopy && (
            <p className="text-sm sm:text-base text-slate/70 font-body mt-2">{world.missionCopy}</p>
          )}
          <p className="text-sm text-slate/60 font-body mt-3">
            {set.length} questions · Take your time, explorer.
          </p>
          {bestStars > 0 && (
            <div className="mt-3">
              <span className="text-xs text-slate/50 font-body">Your best: </span>
              <ProgressStars value={bestStars} size="sm" />
            </div>
          )}
          <button
            type="button"
            onClick={handleStart}
            className="mission-cta w-full mt-5"
          >
            <span aria-hidden="true">🚀</span>
            <span>Let's Go!</span>
          </button>
          <div className="mt-4 inline-flex items-center gap-2 bg-slate/5 rounded-2xl px-3 py-2 text-xs sm:text-sm font-body text-slate/70">
            <span className="text-base" aria-hidden="true">🤖</span>
            <span>You've got this. I'll cheer you on!</span>
          </div>
        </motion.div>
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
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-display font-semibold text-slate/70">
          Question {index + 1} of {set.length}
        </div>
        <ProgressStars value={Math.min(3, Math.round((correct / set.length) * 3))} size="sm" />
      </div>

      <div className="h-3 rounded-full bg-slate/10 mb-5 overflow-hidden" aria-label="Mission progress">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #fdcb6e)` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          className="mission-card text-center"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {q.visual && (
            <div className="text-5xl sm:text-7xl mb-3 tracking-wider" aria-label={q.visual}>
              {q.visual}
            </div>
          )}
          {q.emoji && !q.visual && (
            <motion.div
              className="text-7xl sm:text-8xl mb-3"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              {q.emoji}
            </motion.div>
          )}
          <div className="text-2xl sm:text-3xl font-display font-bold text-slate">{q.prompt}</div>
          <div className="mt-3">
            <SpeakButton text={q.speakText ?? q.prompt} label="Read to me" />
          </div>
        </motion.div>
      </AnimatePresence>

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

      {/* Feedback */}
      <AnimatePresence>
        {picked && (
          <motion.div
            className="mt-4 text-center"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            {picked === q.answer ? (
              <p className="text-xl font-display font-bold text-emerald-600">
                ✓ Great job, explorer!
              </p>
            ) : (
              <p className="text-lg font-display font-bold text-orange-600">
                The answer is: {q.answer}
                {q.explanation && (
                  <span className="block text-sm font-body text-slate/70 mt-1">{q.explanation}</span>
                )}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Celebration
        show={done}
        stars={stars}
        message={stars === 3 ? 'Mission complete! 🎉' : stars === 2 ? 'Great mission!' : 'Mission complete!'}
        onPlayAgain={handlePlayAgain}
        onHome={() => nav(`/${grade}/${backPath}`)}
      />
    </SectionLayout>
  );
}
