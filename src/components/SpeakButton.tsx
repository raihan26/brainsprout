import { useSpeech } from '../hooks/useSpeech';

type Props = { text: string; label?: string; className?: string };

export default function SpeakButton({ text, label = 'Read to me', className = '' }: Props) {
  const { speak, supported, enabled } = useSpeech();
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      disabled={!enabled}
      className={`kid-btn-light text-lg px-4 py-3 inline-flex items-center gap-2 ${className}`}
      aria-label={label}
      title={enabled ? label : 'Voice is off'}
    >
      <span aria-hidden="true">🔊</span>
      <span>{label}</span>
    </button>
  );
}
