import { useSpeech } from '../hooks/useSpeech';

export default function VoiceToggle() {
  const { enabled, toggle, supported } = useSpeech();
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={toggle}
      className="kid-btn-light text-lg px-4 py-3 inline-flex items-center gap-2"
      aria-pressed={enabled}
      title={enabled ? 'Voice on' : 'Voice off'}
    >
      <span aria-hidden="true">{enabled ? '🔊' : '🔇'}</span>
      <span className="hidden sm:inline">Voice {enabled ? 'On' : 'Off'}</span>
    </button>
  );
}
