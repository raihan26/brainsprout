type Props = { value: number; max?: number; size?: 'sm' | 'md' | 'lg' };

export default function ProgressStars({ value, max = 3, size = 'md' }: Props) {
  const sizes = { sm: 'text-xl', md: 'text-3xl', lg: 'text-5xl' } as const;
  return (
    <div
      className={`inline-flex gap-1 ${sizes[size]}`}
      role="img"
      aria-label={`${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < value ? '' : 'opacity-25'}>
          ⭐
        </span>
      ))}
    </div>
  );
}
