// Tiny WebAudio sound helpers — no external files, no internet.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function tone(freq: number, durMs: number, type: OscillatorType = 'sine', gain = 0.15, atMs = 0) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime + atMs / 1000;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, now);
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(gain, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + durMs / 1000);
  o.connect(g).connect(ac.destination);
  o.start(now);
  o.stop(now + durMs / 1000 + 0.05);
}

export function playCorrect() {
  tone(660, 120, 'triangle', 0.18, 0);
  tone(880, 160, 'triangle', 0.18, 100);
  tone(1175, 220, 'triangle', 0.16, 220);
}

export function playWrong() {
  tone(220, 220, 'sawtooth', 0.08, 0);
  tone(180, 260, 'sawtooth', 0.08, 180);
}

export function playWin() {
  const notes = [523, 659, 784, 1046];
  notes.forEach((n, i) => tone(n, 220, 'triangle', 0.18, i * 140));
}

export function playTap() {
  tone(440, 60, 'sine', 0.08, 0);
}

export function playHorn() {
  tone(330, 280, 'square', 0.18, 0);
  tone(247, 280, 'square', 0.16, 80);
}

export function playSiren() {
  tone(700, 220, 'sawtooth', 0.10, 0);
  tone(1100, 220, 'sawtooth', 0.10, 220);
  tone(700, 220, 'sawtooth', 0.10, 440);
  tone(1100, 220, 'sawtooth', 0.10, 660);
}

export function playEngine(kind: 'vroom' | 'rumble' | 'beep' | 'siren' | 'horn') {
  switch (kind) {
    case 'vroom':
      tone(120, 320, 'sawtooth', 0.18, 0);
      tone(180, 280, 'sawtooth', 0.16, 200);
      tone(260, 220, 'sawtooth', 0.14, 380);
      break;
    case 'rumble':
      tone(70, 500, 'square', 0.20, 0);
      tone(90, 460, 'square', 0.18, 220);
      break;
    case 'beep':
      tone(880, 130, 'square', 0.18, 0);
      tone(880, 130, 'square', 0.18, 220);
      break;
    case 'siren':
      playSiren();
      break;
    case 'horn':
      playHorn();
      break;
  }
}
