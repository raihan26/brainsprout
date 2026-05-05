import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLayout from '../../components/SectionLayout';
import Celebration from '../../components/Celebration';
import { useProgress } from '../../hooks/useProgress';
import { useGrade } from '../../hooks/useGrade';
import { useSpeech } from '../../hooks/useSpeech';
import { playCorrect, playTap } from '../../utils/sound';

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function NumberTracing() {
  const nav = useNavigate();
  const grade = useGrade();
  const { record } = useProgress(grade);
  const { speak } = useSpeech();

  const [num, setNum] = useState('1');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [traced, setTraced] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    drawGuide(ctx, rect.width, rect.height, num);
    speak(`Trace the number ${num}.`);
  }, [num, speak]);

  const drawGuide = (ctx: CanvasRenderingContext2D, w: number, h: number, ch: string) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#FFF7E6';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(76,201,240,0.20)';
    ctx.font = `bold ${Math.min(w, h) * 0.95}px "Comic Sans MS", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ch, w / 2, h / 2);
  };

  const startDraw = (x: number, y: number) => {
    drawing.current = true;
    last.current = { x, y };
  };
  const moveDraw = (x: number, y: number) => {
    if (!drawing.current || !last.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#EF476F';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
  };
  const endDraw = () => {
    drawing.current = false;
    last.current = null;
  };

  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const t = 'touches' in e ? e.touches[0] ?? (e as React.TouchEvent).changedTouches[0] : (e as React.MouseEvent);
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  };

  const reset = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    drawGuide(ctx, c.getBoundingClientRect().width, c.getBoundingClientRect().height, num);
    playTap();
  };

  const finishOne = () => {
    playCorrect();
    speak('Great job!');
    const next = traced + 1;
    setTraced(next);
    if (next >= 5) {
      setDone(true);
      record('math.tracing', next, 5);
    } else {
      const idx = (NUMBERS.indexOf(num) + 1) % NUMBERS.length;
      setNum(NUMBERS[idx]);
    }
  };

  return (
    <SectionLayout title="Number Tracing" emoji="✏️" backTo={`/${grade}/math`} speakText={`Trace the number ${num} with your finger or mouse.`}>
      <div className="kid-card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="text-2xl font-extrabold">Trace this number</div>
          <div className="flex items-center gap-2">
            {NUMBERS.map((n) => (
              <button
                key={n}
                onClick={() => setNum(n)}
                className={`kid-btn-light text-xl !py-2 !px-3 ${num === n ? 'ring-4 ring-sky' : ''}`}
                aria-label={`Number ${n}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border-4 border-white">
          <canvas
            ref={canvasRef}
            className="w-full h-[60vw] max-h-[420px] bg-cream touch-none"
            onMouseDown={(e) => { const p = pos(e); startDraw(p.x, p.y); }}
            onMouseMove={(e) => { if (drawing.current) { const p = pos(e); moveDraw(p.x, p.y); } }}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={(e) => { const p = pos(e); startDraw(p.x, p.y); }}
            onTouchMove={(e) => { e.preventDefault(); const p = pos(e); moveDraw(p.x, p.y); }}
            onTouchEnd={endDraw}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <button className="kid-btn-light text-xl" onClick={reset}>🧽 Erase</button>
          <button className="kid-btn-green text-xl" onClick={finishOne}>✅ All done!</button>
        </div>
        <p className="text-center text-gray-700 mt-2">Traced {traced} of 5</p>
      </div>

      <Celebration show={done} stars={3} onPlayAgain={() => { setTraced(0); setNum('1'); setDone(false); }} onHome={() => nav(`/${grade}/math`)} />
    </SectionLayout>
  );
}
