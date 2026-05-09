import { useEffect, useState, type ReactNode } from 'react';

type State = 'idle' | 'correct' | 'wrong';

type Props = {
  children: ReactNode;
  onClick: () => void;
  state?: State;
  disabled?: boolean;
  ariaLabel?: string;
  color?: 'sun' | 'sky' | 'grass' | 'berry' | 'plum';
  size?: 'md' | 'lg';
};

const colorMap = {
  sun: 'kid-btn-primary',
  sky: 'kid-btn-blue',
  grass: 'kid-btn-green',
  berry: 'kid-btn-pink',
  plum: 'kid-btn-purple',
} as const;

export default function AnswerButton({
  children,
  onClick,
  state = 'idle',
  disabled,
  ariaLabel,
  color = 'sky',
  size = 'lg',
}: Props) {
  const [shake, setShake] = useState(false);
  useEffect(() => {
    if (state === 'wrong') {
      setShake(true);
      const t = window.setTimeout(() => setShake(false), 450);
      return () => window.clearTimeout(t);
    }
  }, [state]);

  const stateRing =
    state === 'correct'
      ? 'ring-4 ring-emerald-400 ring-offset-2 brightness-110'
      : state === 'wrong'
        ? 'ring-4 ring-red-400 ring-offset-2 opacity-70'
        : '';
  const sizeCls = size === 'lg' ? 'text-2xl sm:text-3xl py-5 px-5 min-h-[72px]' : 'text-xl sm:text-2xl py-4 px-5';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${colorMap[color]} ${sizeCls} ${stateRing} ${shake ? 'animate-shake' : ''} w-full font-body`}
    >
      {children}
    </button>
  );
}
