import { useCallback, useEffect, useState } from 'react';

const KEY = 'kinder-learn:voice:v1';

function loadEnabled(): boolean {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw === null ? true : raw === '1';
  } catch {
    return true;
  }
}

export function useSpeech() {
  const [enabled, setEnabled] = useState<boolean>(() => loadEnabled());
  const [supported, setSupported] = useState<boolean>(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, enabled ? '1' : '0');
    } catch {
      /* ignore */
    }
    if (!enabled && supported) window.speechSynthesis.cancel();
  }, [enabled, supported]);

  const speak = useCallback(
    (text: string, opts?: { rate?: number; pitch?: number }) => {
      if (!enabled || !supported || !text) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = opts?.rate ?? 0.95;
        u.pitch = opts?.pitch ?? 1.15;
        u.lang = 'en-US';
        window.speechSynthesis.speak(u);
      } catch {
        /* ignore */
      }
    },
    [enabled, supported],
  );

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return { enabled, supported, speak, stop, toggle };
}
