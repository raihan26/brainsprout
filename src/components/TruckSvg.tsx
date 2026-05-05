export type TruckId =
  | 'cybertruck'
  | 'monster'
  | 'fire'
  | 'police'
  | 'dump'
  | 'race'
  | 'schoolbus'
  | 'garbage'
  | 'tractor';

type Props = { id: TruckId; size?: number; className?: string };

export const TRUCK_NAMES: Record<TruckId, string> = {
  cybertruck: 'Cybertruck',
  monster: 'Monster Truck',
  fire: 'Fire Truck',
  police: 'Police Car',
  dump: 'Dump Truck',
  race: 'Race Car',
  schoolbus: 'School Bus',
  garbage: 'Garbage Truck',
  tractor: 'Tractor',
};

export const TRUCK_SOUNDS: Record<TruckId, { word: string; engine: 'vroom' | 'rumble' | 'beep' | 'siren' | 'horn' }> = {
  cybertruck: { word: 'Whoosh!', engine: 'vroom' },
  monster: { word: 'RRRRRROAR!', engine: 'rumble' },
  fire: { word: 'WEE-OOO!', engine: 'siren' },
  police: { word: 'WEE-WOO WEE-WOO!', engine: 'siren' },
  dump: { word: 'BEEP BEEP!', engine: 'beep' },
  race: { word: 'VROOOOM!', engine: 'vroom' },
  schoolbus: { word: 'HONK HONK!', engine: 'horn' },
  garbage: { word: 'BEEP BEEP!', engine: 'beep' },
  tractor: { word: 'putt-putt-putt', engine: 'rumble' },
};

export default function TruckSvg({ id, size = 200, className = '' }: Props) {
  const w = size;
  const h = id === 'monster' ? size * 0.78 : size * 0.55;
  return (
    <svg
      viewBox="0 0 220 130"
      width={w}
      height={h}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label={TRUCK_NAMES[id]}
    >
      {render(id)}
    </svg>
  );
}

function render(id: TruckId) {
  switch (id) {
    case 'cybertruck':   return <Cybertruck />;
    case 'monster':      return <MonsterTruck />;
    case 'fire':         return <FireTruck />;
    case 'police':       return <PoliceCar />;
    case 'dump':         return <DumpTruck />;
    case 'race':         return <RaceCar />;
    case 'schoolbus':    return <SchoolBus />;
    case 'garbage':      return <GarbageTruck />;
    case 'tractor':      return <Tractor />;
  }
}

const STROKE = '#1f2937';
const SW = 2.5;

function Wheel({ cx, cy, r = 14, hub = '#9CA3AF' }: { cx: number; cy: number; r?: number; hub?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#111827" stroke={STROKE} strokeWidth={SW} />
      <circle cx={cx} cy={cy} r={r * 0.45} fill={hub} />
      <circle cx={cx} cy={cy} r={r * 0.18} fill="#111827" />
    </g>
  );
}

function MonsterWheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={28} fill="#111827" stroke={STROKE} strokeWidth={SW} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (Math.PI / 4) * i;
        const x1 = cx + Math.cos(a) * 12;
        const y1 = cy + Math.sin(a) * 12;
        const x2 = cx + Math.cos(a) * 26;
        const y2 = cy + Math.sin(a) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#374151" strokeWidth={3} />;
      })}
      <circle cx={cx} cy={cy} r={12} fill="#FFD166" stroke={STROKE} strokeWidth={SW} />
    </g>
  );
}

function Cybertruck() {
  return (
    <g>
      {/* Main body - sharp triangular silhouette */}
      <polygon
        points="8,95 18,95 18,78 30,50 95,38 195,50 210,78 210,95 200,95"
        fill="#B0B8C4"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="miter"
      />
      {/* Flat bed */}
      <polygon
        points="18,78 18,95 95,95 95,78"
        fill="#9CA3AF"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="miter"
      />
      {/* Windshield - single sharp angle */}
      <polygon points="100,78 130,50 195,50 195,78" fill="#1F2937" opacity="0.6" />
      {/* Roofline crease */}
      <line x1="95" y1="38" x2="130" y2="50" stroke={STROKE} strokeWidth="1.5" />
      {/* LED light bar across front */}
      <line x1="196" y1="60" x2="210" y2="72" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* Rear light bar */}
      <line x1="18" y1="60" x2="18" y2="75" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      {/* Panel line */}
      <line x1="95" y1="38" x2="95" y2="95" stroke={STROKE} strokeWidth="1" opacity="0.4" />
      <Wheel cx={50} cy={98} />
      <Wheel cx={172} cy={98} />
    </g>
  );
}

function MonsterTruck() {
  return (
    <g>
      {/* Massive tires */}
      <MonsterWheel cx={55} cy={100} />
      <MonsterWheel cx={168} cy={100} />
      {/* Suspension/axle bars */}
      <line x1="55" y1="80" x2="70" y2="55" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1="55" y1="80" x2="85" y2="55" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1="168" y1="80" x2="150" y2="55" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <line x1="168" y1="80" x2="135" y2="55" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      {/* Lifted truck body */}
      <rect x="50" y="20" width="125" height="38" rx="4" fill="#EF4444" stroke={STROKE} strokeWidth={SW} />
      {/* Cab windshield */}
      <rect x="130" y="26" width="38" height="24" rx="3" fill="#BFDBFE" stroke={STROKE} strokeWidth={SW} />
      {/* Bed */}
      <rect x="55" y="26" width="68" height="28" rx="2" fill="#B91C1C" stroke={STROKE} strokeWidth="1.5" />
      {/* Headlights */}
      <circle cx="175" cy="40" r="4" fill="#FFD166" stroke={STROKE} strokeWidth="1.5" />
      {/* Exhaust stacks */}
      <rect x="120" y="10" width="5" height="14" rx="2" fill="#374151" stroke={STROKE} strokeWidth="1.5" />
      <rect x="128" y="12" width="5" height="12" rx="2" fill="#374151" stroke={STROKE} strokeWidth="1.5" />
      {/* Flame decal */}
      <path d="M 60 44 Q 70 36 75 44 Q 80 36 85 44 Q 90 36 95 44" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function FireTruck() {
  return (
    <g>
      <rect x="14" y="50" width="120" height="48" rx="4" fill="#DC2626" stroke={STROKE} strokeWidth={SW} />
      <rect x="134" y="40" width="72" height="58" rx="4" fill="#DC2626" stroke={STROKE} strokeWidth={SW} />
      <rect x="142" y="50" width="56" height="28" rx="3" fill="#BFDBFE" stroke={STROKE} strokeWidth={SW} />
      <line x1="40" y1="40" x2="120" y2="65" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="40" x2="40" y2="48" stroke={STROKE} strokeWidth="2" />
      <line x1="120" y1="65" x2="120" y2="55" stroke={STROKE} strokeWidth="2" />
      <rect x="82" y="34" width="22" height="12" rx="2" fill="#3B82F6" stroke={STROKE} strokeWidth={SW} />
      <rect x="82" y="34" width="22" height="6" rx="2" fill="#EF4444" />
      <Wheel cx={45} cy={98} />
      <Wheel cx={108} cy={98} />
      <Wheel cx={170} cy={98} />
    </g>
  );
}

function PoliceCar() {
  return (
    <g>
      <path
        d="M 12 92 L 22 70 L 60 50 L 150 50 L 190 70 L 208 92 L 200 100 L 22 100 Z"
        fill="#FFFFFF"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M 22 70 L 60 50 L 150 50 L 190 70 L 22 70 Z" fill="#1F2937" opacity="0.85" />
      <polygon points="65,55 145,55 178,68 70,68" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="14" y="78" width="194" height="6" fill="#1F2937" />
      <rect x="80" y="40" width="60" height="12" rx="3" fill="#FFFFFF" stroke={STROKE} strokeWidth={SW} />
      <rect x="80" y="40" width="30" height="12" fill="#EF4444" />
      <rect x="110" y="40" width="30" height="12" fill="#3B82F6" />
      <text x="110" y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1F2937">POLICE</text>
      <Wheel cx={55} cy={100} />
      <Wheel cx={165} cy={100} />
    </g>
  );
}

function DumpTruck() {
  return (
    <g>
      <polygon points="14,90 14,52 80,52 80,90" fill="#F59E0B" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <polygon points="84,90 84,42 200,52 200,90" fill="#FBBF24" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <rect x="20" y="58" width="50" height="22" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth={SW} />
      <circle cx="105" cy="64" r="5" fill="#9CA3AF" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="125" cy="62" r="5" fill="#9CA3AF" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="150" cy="64" r="5" fill="#9CA3AF" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="170" cy="62" r="5" fill="#9CA3AF" stroke={STROKE} strokeWidth="1.5" />
      <Wheel cx={45} cy={96} />
      <Wheel cx={120} cy={96} />
      <Wheel cx={170} cy={96} />
    </g>
  );
}

function RaceCar() {
  return (
    <g>
      <path
        d="M 8 88 L 30 70 L 70 60 L 130 56 L 175 62 L 200 78 L 208 88 L 200 96 L 18 96 Z"
        fill="#EF4444"
        stroke={STROKE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M 70 60 L 130 56 L 165 70 L 75 70 Z" fill="#1F2937" opacity="0.7" />
      <circle cx="105" cy="64" r="9" fill="#FFFFFF" stroke={STROKE} strokeWidth="1.5" />
      <text x="105" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1F2937">3</text>
      <rect x="55" y="72" width="20" height="6" fill="#FACC15" />
      <rect x="80" y="72" width="20" height="6" fill="#FFFFFF" />
      <rect x="105" y="72" width="20" height="6" fill="#FACC15" />
      <Wheel cx={50} cy={96} r={16} hub="#FBBF24" />
      <Wheel cx={170} cy={96} r={16} hub="#FBBF24" />
    </g>
  );
}

function SchoolBus() {
  return (
    <g>
      <rect x="14" y="46" width="186" height="52" rx="6" fill="#FACC15" stroke={STROKE} strokeWidth={SW} />
      <rect x="22" y="56" width="22" height="20" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="50" y="56" width="22" height="20" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="78" y="56" width="22" height="20" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="106" y="56" width="22" height="20" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="134" y="56" width="22" height="20" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="162" y="56" width="36" height="22" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="14" y="80" width="186" height="6" fill="#000000" />
      <rect x="50" y="42" width="120" height="6" rx="2" fill="#000000" />
      <Wheel cx={50} cy={100} />
      <Wheel cx={165} cy={100} />
    </g>
  );
}

function GarbageTruck() {
  return (
    <g>
      <rect x="14" y="38" width="120" height="60" rx="4" fill="#10B981" stroke={STROKE} strokeWidth={SW} />
      <rect x="134" y="50" width="72" height="48" rx="4" fill="#059669" stroke={STROKE} strokeWidth={SW} />
      <rect x="142" y="58" width="56" height="22" rx="3" fill="#BFDBFE" stroke={STROKE} strokeWidth={SW} />
      <line x1="14" y1="68" x2="134" y2="68" stroke={STROKE} strokeWidth="1.5" />
      <text x="74" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">RECYCLE</text>
      <Wheel cx={45} cy={98} />
      <Wheel cx={108} cy={98} />
      <Wheel cx={170} cy={98} />
    </g>
  );
}

function Tractor() {
  return (
    <g>
      <rect x="68" y="40" width="60" height="40" rx="3" fill="#22C55E" stroke={STROKE} strokeWidth={SW} />
      <rect x="76" y="48" width="44" height="22" rx="2" fill="#BFDBFE" stroke={STROKE} strokeWidth="1.5" />
      <rect x="46" y="62" width="22" height="20" fill="#22C55E" stroke={STROKE} strokeWidth={SW} />
      <rect x="14" y="76" width="32" height="6" fill="#374151" />
      <Wheel cx={32} cy={88} r={10} hub="#9CA3AF" />
      <MonsterWheel cx={150} cy={92} />
    </g>
  );
}
