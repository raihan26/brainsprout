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
  const h = size * 0.65;
  return (
    <svg
      viewBox="0 0 240 140"
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

function Wheel({ cx, cy, r = 16 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#2d3436" />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="#636e72" />
      <circle cx={cx} cy={cy} r={r * 0.25} fill="#2d3436" />
    </g>
  );
}

function BigWheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={24} fill="#2d3436" />
      <circle cx={cx} cy={cy} r={18} fill="#636e72" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={cx + Math.cos(rad) * 8}
            y1={cy + Math.sin(rad) * 8}
            x2={cx + Math.cos(rad) * 16}
            y2={cy + Math.sin(rad) * 16}
            stroke="#2d3436"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={6} fill="#fdcb6e" />
    </g>
  );
}

function FireTruck() {
  return (
    <g>
      {/* Main body - bright red, boxy */}
      <rect x="20" y="55" width="130" height="50" rx="8" fill="#e74c3c" />
      {/* Cab */}
      <rect x="150" y="45" width="65" height="60" rx="10" fill="#c0392b" />
      {/* Windshield */}
      <rect x="158" y="52" width="48" height="28" rx="6" fill="#74b9ff" />
      {/* Ladder on top */}
      <rect x="35" y="42" width="100" height="8" rx="3" fill="#b2bec3" />
      <rect x="35" y="42" width="4" height="8" fill="#636e72" />
      <rect x="55" y="42" width="4" height="8" fill="#636e72" />
      <rect x="75" y="42" width="4" height="8" fill="#636e72" />
      <rect x="95" y="42" width="4" height="8" fill="#636e72" />
      <rect x="115" y="42" width="4" height="8" fill="#636e72" />
      <rect x="131" y="42" width="4" height="8" fill="#636e72" />
      {/* Siren light on top */}
      <rect x="170" y="35" width="30" height="12" rx="6" fill="#e74c3c" />
      <circle cx="178" cy="41" r="4" fill="#ff7675" />
      <circle cx="192" cy="41" r="4" fill="#0984e3" />
      {/* Hose compartment */}
      <rect x="30" y="70" width="40" height="25" rx="4" fill="#d63031" />
      <circle cx="50" cy="82" r="8" fill="#fdcb6e" />
      {/* Number */}
      <text x="100" y="90" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">911</text>
      <Wheel cx={55} cy={112} r={18} />
      <Wheel cx={125} cy={112} r={18} />
      <Wheel cx={185} cy={112} r={18} />
    </g>
  );
}

function PoliceCar() {
  return (
    <g>
      {/* Body - white with black bottom */}
      <rect x="30" y="65" width="180" height="42" rx="12" fill="#ffffff" />
      <rect x="30" y="90" width="180" height="17" rx="6" fill="#2d3436" />
      {/* Roof / cabin */}
      <path d="M 80 65 Q 80 40 120 38 Q 160 40 160 65 Z" fill="#dfe6e9" />
      {/* Windshield */}
      <path d="M 88 65 Q 88 48 120 46 Q 152 48 152 65 Z" fill="#74b9ff" />
      {/* Siren on top */}
      <rect x="100" y="30" width="40" height="10" rx="5" fill="#dfe6e9" />
      <circle cx="112" cy="35" r="4" fill="#e74c3c" />
      <circle cx="128" cy="35" r="4" fill="#0984e3" />
      {/* POLICE text */}
      <text x="120" y="83" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2d3436">POLICE</text>
      {/* Blue stripe */}
      <rect x="30" y="85" width="180" height="5" fill="#0984e3" />
      {/* Headlights */}
      <circle cx="205" cy="80" r="5" fill="#fdcb6e" />
      <circle cx="35" cy="80" r="5" fill="#e74c3c" />
      <Wheel cx={72} cy={112} r={16} />
      <Wheel cx={168} cy={112} r={16} />
    </g>
  );
}

function SchoolBus() {
  return (
    <g>
      {/* Main body - bright yellow */}
      <rect x="20" y="48" width="200" height="55" rx="10" fill="#fdcb6e" />
      {/* Roof stripe */}
      <rect x="20" y="48" width="200" height="8" rx="4" fill="#e17055" />
      {/* Windows - evenly spaced */}
      <rect x="35" y="62" width="24" height="22" rx="4" fill="#74b9ff" />
      <rect x="65" y="62" width="24" height="22" rx="4" fill="#74b9ff" />
      <rect x="95" y="62" width="24" height="22" rx="4" fill="#74b9ff" />
      <rect x="125" y="62" width="24" height="22" rx="4" fill="#74b9ff" />
      <rect x="155" y="62" width="24" height="22" rx="4" fill="#74b9ff" />
      {/* Front windshield (bigger) */}
      <rect x="188" y="58" width="28" height="30" rx="5" fill="#74b9ff" />
      {/* STOP sign on side */}
      <rect x="20" y="75" width="10" height="18" rx="2" fill="#e74c3c" />
      {/* Black bottom */}
      <rect x="20" y="95" width="200" height="8" rx="3" fill="#2d3436" />
      {/* SCHOOL BUS text */}
      <text x="120" y="100" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2d3436">SCHOOL BUS</text>
      <Wheel cx={60} cy={112} r={16} />
      <Wheel cx={180} cy={112} r={16} />
    </g>
  );
}

function DumpTruck() {
  return (
    <g>
      {/* Cab */}
      <rect x="140" y="48" width="70" height="55" rx="10" fill="#e17055" />
      {/* Cab windshield */}
      <rect x="150" y="55" width="50" height="28" rx="6" fill="#74b9ff" />
      {/* Dump bed - tilted slightly to show it dumps */}
      <polygon points="20,55 135,55 135,100 20,100" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="3" />
      {/* Dirt in the bed */}
      <ellipse cx="78" cy="65" rx="45" ry="12" fill="#b2bec3" />
      <ellipse cx="78" cy="62" rx="40" ry="10" fill="#636e72" />
      {/* Hydraulic arm */}
      <rect x="130" y="60" width="8" height="38" rx="3" fill="#636e72" />
      {/* Exhaust */}
      <rect x="138" y="35" width="6" height="15" rx="3" fill="#636e72" />
      <Wheel cx={55} cy={112} r={18} />
      <Wheel cx={115} cy={112} r={14} />
      <Wheel cx={178} cy={112} r={18} />
    </g>
  );
}

function RaceCar() {
  return (
    <g>
      {/* Low sleek body */}
      <ellipse cx="120" cy="88" rx="90" ry="22" fill="#e74c3c" />
      {/* Cockpit bubble */}
      <ellipse cx="120" cy="72" rx="28" ry="18" fill="#2d3436" />
      <ellipse cx="120" cy="72" rx="22" ry="14" fill="#74b9ff" />
      {/* Racing stripe */}
      <rect x="30" y="84" width="180" height="6" rx="3" fill="#ffffff" />
      {/* Number circle */}
      <circle cx="70" cy="88" r="12" fill="#ffffff" />
      <text x="70" y="93" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#e74c3c">7</text>
      {/* Spoiler on back */}
      <rect x="20" y="70" width="6" height="20" rx="2" fill="#2d3436" />
      <rect x="10" y="66" width="24" height="5" rx="2" fill="#e74c3c" />
      {/* Front nose */}
      <ellipse cx="205" cy="88" rx="8" ry="12" fill="#c0392b" />
      {/* Headlight */}
      <circle cx="208" cy="84" r="3" fill="#fdcb6e" />
      <Wheel cx={65} cy={108} r={14} />
      <Wheel cx={175} cy={108} r={14} />
    </g>
  );
}

function GarbageTruck() {
  return (
    <g>
      {/* Main body - green */}
      <rect x="20" y="45" width="130" height="58" rx="8" fill="#00b894" />
      {/* Cab */}
      <rect x="150" y="52" width="65" height="51" rx="10" fill="#00cec9" />
      {/* Windshield */}
      <rect x="158" y="58" width="48" height="26" rx="6" fill="#74b9ff" />
      {/* Compactor top */}
      <path d="M 20 45 Q 85 30 150 45" fill="#009688" />
      {/* Recycling symbol */}
      <circle cx="85" cy="75" r="14" fill="#ffffff" />
      <text x="85" y="80" textAnchor="middle" fontSize="16" fill="#00b894">♻️</text>
      {/* Loading arm */}
      <rect x="14" y="55" width="8" height="35" rx="3" fill="#636e72" />
      <rect x="8" y="52" width="20" height="6" rx="3" fill="#636e72" />
      <Wheel cx={55} cy={112} r={16} />
      <Wheel cx={120} cy={112} r={16} />
      <Wheel cx={185} cy={112} r={16} />
    </g>
  );
}

function MonsterTruck() {
  return (
    <g>
      {/* Massive wheels */}
      <BigWheel cx={60} cy={105} />
      <BigWheel cx={180} cy={105} />
      {/* Suspension bars */}
      <line x1="60" y1="82" x2="80" y2="60" stroke="#636e72" strokeWidth="5" strokeLinecap="round" />
      <line x1="60" y1="82" x2="95" y2="60" stroke="#636e72" strokeWidth="5" strokeLinecap="round" />
      <line x1="180" y1="82" x2="160" y2="60" stroke="#636e72" strokeWidth="5" strokeLinecap="round" />
      <line x1="180" y1="82" x2="145" y2="60" stroke="#636e72" strokeWidth="5" strokeLinecap="round" />
      {/* Lifted truck body */}
      <rect x="60" y="25" width="120" height="38" rx="8" fill="#6c5ce7" />
      {/* Windshield */}
      <rect x="140" y="30" width="34" height="25" rx="5" fill="#74b9ff" />
      {/* Flames on side */}
      <path d="M 70 50 Q 80 38 90 50 Q 100 38 110 50" fill="none" stroke="#fdcb6e" strokeWidth="3" strokeLinecap="round" />
      {/* Exhaust pipes */}
      <rect x="125" y="12" width="6" height="16" rx="3" fill="#636e72" />
      <rect x="135" y="14" width="6" height="14" rx="3" fill="#636e72" />
      {/* Headlights */}
      <circle cx="178" cy="45" r="5" fill="#fdcb6e" />
      {/* MONSTER text */}
      <text x="100" y="48" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">MONSTER</text>
    </g>
  );
}

function Cybertruck() {
  return (
    <g>
      {/* Angular body - the signature look */}
      <polygon
        points="15,100 25,100 25,80 40,55 110,42 200,55 215,80 215,100 205,100"
        fill="#b2bec3"
      />
      {/* Flat bed area */}
      <polygon points="25,80 25,100 110,100 110,80" fill="#95a5a6" />
      {/* Angular windshield */}
      <polygon points="115,80 140,55 200,55 200,80" fill="#2d3436" opacity="0.7" />
      {/* LED light bar */}
      <line x1="200" y1="62" x2="215" y2="76" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
      {/* Tail light */}
      <line x1="25" y1="62" x2="25" y2="78" stroke="#e74c3c" strokeWidth="4" strokeLinecap="round" />
      {/* Panel crease */}
      <line x1="110" y1="42" x2="110" y2="100" stroke="#636e72" strokeWidth="1" opacity="0.5" />
      {/* Futuristic wheel covers */}
      <rect x="38" y="92" width="30" height="12" rx="4" fill="#636e72" />
      <rect x="155" y="92" width="30" height="12" rx="4" fill="#636e72" />
      <Wheel cx={53} cy={104} r={14} />
      <Wheel cx={170} cy={104} r={14} />
    </g>
  );
}

function Tractor() {
  return (
    <g>
      {/* Cab body */}
      <rect x="80" y="40" width="65" height="50" rx="8" fill="#27ae60" />
      {/* Windshield */}
      <rect x="88" y="46" width="48" height="26" rx="5" fill="#74b9ff" />
      {/* Engine hood */}
      <rect x="145" y="58" width="40" height="32" rx="6" fill="#2ecc71" />
      {/* Exhaust pipe */}
      <rect x="175" y="38" width="6" height="22" rx="3" fill="#636e72" />
      <ellipse cx="178" cy="36" rx="5" ry="3" fill="#b2bec3" />
      {/* Hitch at back */}
      <rect x="60" y="78" width="22" height="8" rx="3" fill="#636e72" />
      {/* Small front wheel */}
      <Wheel cx={170} cy={108} r={12} />
      {/* Big rear wheel */}
      <BigWheel cx={80} cy={105} />
    </g>
  );
}
