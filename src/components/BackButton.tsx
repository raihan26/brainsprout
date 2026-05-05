import { useNavigate } from 'react-router-dom';

type Props = { to?: string; label?: string };

export default function BackButton({ to, label = 'Back' }: Props) {
  const nav = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (to ? nav(to) : nav(-1))}
      className="kid-btn-light text-xl px-4 py-3 inline-flex items-center gap-2"
      aria-label={label}
    >
      <span aria-hidden="true">←</span>
      <span>{label}</span>
    </button>
  );
}
