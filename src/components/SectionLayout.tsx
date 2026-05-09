import type { ReactNode } from 'react';
import BackButton from './BackButton';
import VoiceToggle from './VoiceToggle';
import SpeakButton from './SpeakButton';

type Props = {
  title: string;
  emoji?: string;
  intro?: string;
  backTo?: string;
  speakText?: string;
  children: ReactNode;
};

export default function SectionLayout({ title, emoji, intro, backTo, speakText, children }: Props) {
  return (
    <div className="min-h-screen px-3 sm:px-6 py-5 max-w-5xl mx-auto">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <BackButton to={backTo} />
        <div className="flex gap-2 items-center">
          {speakText && <SpeakButton text={speakText} />}
          <VoiceToggle />
        </div>
      </header>
      <h1 className="mt-5 text-3xl sm:text-4xl font-display font-bold text-center text-slate text-shadow-kid">
        {emoji && (
          <span className="mr-2" aria-hidden="true">
            {emoji}
          </span>
        )}
        {title}
      </h1>
      {intro && <p className="text-center text-lg text-slate/60 font-body mt-1">{intro}</p>}
      <main className="mt-6">{children}</main>
    </div>
  );
}
