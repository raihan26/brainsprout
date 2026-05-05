type Props = { shape: string; color?: string; size?: number; className?: string };

export default function ShapeSvg({ shape, color = '#4CC9F0', size = 120, className = '' }: Props) {
  const half = size / 2;
  const stroke = '#1f2937';
  const strokeWidth = 4;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-label={shape}>
      {shape === 'circle' && (
        <circle cx={half} cy={half} r={half - strokeWidth} fill={color} stroke={stroke} strokeWidth={strokeWidth} />
      )}
      {shape === 'square' && (
        <rect x={strokeWidth} y={strokeWidth} width={size - strokeWidth * 2} height={size - strokeWidth * 2} rx={10} fill={color} stroke={stroke} strokeWidth={strokeWidth} />
      )}
      {shape === 'rectangle' && (
        <rect x={strokeWidth} y={size * 0.2} width={size - strokeWidth * 2} height={size * 0.6} rx={10} fill={color} stroke={stroke} strokeWidth={strokeWidth} />
      )}
      {shape === 'triangle' && (
        <polygon
          points={`${half},${strokeWidth} ${size - strokeWidth},${size - strokeWidth} ${strokeWidth},${size - strokeWidth}`}
          fill={color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}
      {shape === 'star' && (
        <polygon
          points={star5(half, half, half - strokeWidth, (half - strokeWidth) / 2.4)}
          fill={color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}
      {shape === 'heart' && (
        <path
          d={`M ${half} ${size * 0.85}
              C ${size * 0.1} ${size * 0.55}, ${size * 0.05} ${size * 0.25}, ${half} ${size * 0.30}
              C ${size * 0.95} ${size * 0.25}, ${size * 0.9} ${size * 0.55}, ${half} ${size * 0.85} Z`}
          fill={color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function star5(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return points.join(' ');
}
