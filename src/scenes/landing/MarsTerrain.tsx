export default function MarsTerrain() {
  return (
    <svg
      viewBox="0 0 1400 160"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mg1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="mg2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a93226" />
          <stop offset="50%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#922b21" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 Q100,30 250,50 Q400,75 550,40 Q700,10 850,55 Q1000,80 1150,45 Q1300,20 1400,50 L1400,160 L0,160 Z"
        fill="url(#mg1)"
      />
      <path
        d="M0,80 Q200,60 400,82 Q600,100 800,70 Q1000,50 1200,80 Q1350,95 1400,75 L1400,160 L0,160 Z"
        fill="url(#mg2)"
      />
      <path
        d="M0,110 Q350,95 700,115 Q1050,130 1400,105 L1400,160 L0,160 Z"
        fill="#7f1d1d"
      />
      <ellipse cx="200" cy="130" rx="25" ry="8" fill="#6b1515" opacity="0.5" />
      <ellipse cx="600" cy="140" rx="18" ry="6" fill="#6b1515" opacity="0.4" />
      <ellipse cx="1000" cy="125" rx="30" ry="9" fill="#6b1515" opacity="0.45" />
      <ellipse cx="1250" cy="145" rx="15" ry="5" fill="#6b1515" opacity="0.35" />
    </svg>
  );
}
