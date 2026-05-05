import TruckSvg from './TruckSvg';
import { playEngine } from '../utils/sound';

export default function TruckBanner() {
  return (
    <div className="relative h-32 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-kid mb-4 bg-gradient-to-b from-sky-200 via-sky-100 to-yellow-100">
      {/* Sun */}
      <div className="absolute top-2 right-4 text-4xl" aria-hidden="true">☀️</div>
      {/* Clouds */}
      <div className="absolute top-3 left-6 text-3xl opacity-80" aria-hidden="true">☁️</div>
      <div className="absolute top-6 left-1/3 text-2xl opacity-70" aria-hidden="true">☁️</div>
      {/* Mountains */}
      <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute bottom-12 left-0 right-0 w-full h-12 opacity-60" aria-hidden="true">
        <polygon points="0,80 60,30 120,80" fill="#A78BFA" />
        <polygon points="80,80 160,15 240,80" fill="#C4B5FD" />
        <polygon points="200,80 280,35 360,80" fill="#A78BFA" />
        <polygon points="300,80 360,40 400,80" fill="#C4B5FD" />
      </svg>
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-700">
        <div
          className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
          style={{
            background: 'repeating-linear-gradient(to right, #FFD166 0 18px, transparent 18px 36px)',
          }}
        />
      </div>
      {/* Driving truck */}
      <button
        type="button"
        onClick={() => playEngine('vroom')}
        className="absolute bottom-2 left-0 animate-drive cursor-pointer hover:scale-110 transition"
        aria-label="Honk the cybertruck"
      >
        <div className="animate-bounceTruck">
          <TruckSvg id="cybertruck" size={130} />
        </div>
      </button>
      {/* Monster truck offset, going opposite direction (using delay) */}
      <div
        className="absolute bottom-2 left-0 animate-drive"
        style={{ animationDelay: '-7s', animationDuration: '18s' }}
        aria-hidden="true"
      >
        <div className="animate-bounceTruck" style={{ animationDuration: '0.35s' }}>
          <TruckSvg id="monster" size={120} />
        </div>
      </div>
    </div>
  );
}
