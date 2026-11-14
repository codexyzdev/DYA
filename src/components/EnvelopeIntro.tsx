import React, { useEffect, useState } from 'react';

interface EnvelopeIntroProps {
  onTapEnvelope?: () => void;
  onStartReveal: () => void;
  onOpenComplete: () => void;
}

type EnvelopePhase =
  | 'closed'
  | 'seal-lift'
  | 'flap-open'
  | 'card-rise'
  | 'crossfade';

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  onTapEnvelope,
  onStartReveal,
  onOpenComplete,
}) => {
  const [phase, setPhase] = useState<EnvelopePhase>('closed');

  const handleOpen = () => {
    if (phase !== 'closed') return;
    onTapEnvelope?.();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onStartReveal();
      onOpenComplete();
      return;
    }

    setPhase('seal-lift');
  };

  useEffect(() => {
    if (phase === 'closed') return;

    if (phase === 'seal-lift') {
      const t = window.setTimeout(() => setPhase('flap-open'), 240);
      return () => window.clearTimeout(t);
    }

    if (phase === 'flap-open') {
      const t = window.setTimeout(() => {
        setPhase('card-rise');
        onStartReveal();
      }, 520);
      return () => window.clearTimeout(t);
    }

    if (phase === 'card-rise') {
      const t = window.setTimeout(() => setPhase('crossfade'), 320);
      return () => window.clearTimeout(t);
    }

    if (phase === 'crossfade') {
      const t = window.setTimeout(() => onOpenComplete(), 650);
      return () => window.clearTimeout(t);
    }
  }, [phase, onStartReveal, onOpenComplete]);

  const isSealLifted = phase !== 'closed';
  const isFlapOpen =
    phase === 'flap-open' || phase === 'card-rise' || phase === 'crossfade';
  const isCardRising = phase === 'card-rise' || phase === 'crossfade';
  const isCrossfading = phase === 'crossfade';

  return (
    <section
      aria-label="Sobre de invitación de boda"
      data-testid="envelope-intro"
      className={`fixed inset-0 z-50 flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#F4EFEA] paper-grain px-5 py-8 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isCrossfading
          ? 'opacity-0 scale-[0.985] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient soft paper vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(253,251,247,0.85)_0%,rgba(244,239,234,0.4)_58%,rgba(197,160,89,0.12)_100%)]"
      />

      {/* Delicate floating golden dust motes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-gold-mote absolute left-[18%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#C5A059]/55" />
        <span className="animate-gold-mote absolute right-[20%] top-[30%] h-2 w-2 rounded-full bg-[#C5A059]/40" style={{ animationDelay: '1.4s' }} />
        <span className="animate-gold-mote absolute left-[24%] bottom-[26%] h-1.5 w-1.5 rounded-full bg-[#B3583E]/35" style={{ animationDelay: '2.7s' }} />
        <span className="animate-gold-mote absolute right-[22%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-[#C5A059]/50" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Quiet top invitation header */}
      <div
        className={`relative z-10 mb-7 text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSealLifted ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#7A3528]">
          Invitación Especial
        </p>
        <p className="mt-1.5 font-serif text-2xl italic text-[#2C2623]">
          Dayneb &amp; Alejandro
        </p>
      </div>

      {/* Interactive 3D Envelope */}
      <div className="relative z-10 envelope-scene flex flex-col items-center">
        <button
          type="button"
          onClick={handleOpen}
          disabled={phase !== 'closed'}
          aria-label="Toca para abrir la invitación"
          data-testid="open-envelope-button"
          className="group relative block w-[min(88vw,380px)] sm:w-[420px] aspect-[4/2.75] cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4EFEA]"
        >
          {/* Envelope outer drop shadow */}
          <span
            aria-hidden="true"
            className={`absolute inset-x-4 -bottom-3 h-7 rounded-full bg-[#2C2623]/15 blur-lg transition-all duration-700 ${
              isCardRising ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            }`}
          />

          {/* Envelope base back wall */}
          <div
            className={`relative h-full w-full overflow-visible rounded-md border border-[#C5A059]/45 bg-[#EAE1D7] shadow-[0_18px_42px_-18px_rgba(44,38,35,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'closed' ? 'group-hover:-translate-y-1 group-active:scale-[0.985]' : ''
            }`}
          >
            {/* Inner Invitation Card emerging vertically */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-4 top-3 bottom-3 rounded-sm border border-[#C5A059]/60 bg-[#FDFBF7] px-6 py-5 text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCardRising
                  ? 'z-30 -translate-y-24 scale-[1.05] opacity-100 shadow-[0_22px_45px_-12px_rgba(44,38,35,0.28)]'
                  : isFlapOpen
                    ? 'z-20 -translate-y-10 opacity-100 shadow-[0_14px_30px_-10px_rgba(44,38,35,0.2)]'
                    : 'z-10 translate-y-0 opacity-100 shadow-sm'
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center border border-[#C5A059]/40 px-3 py-2">
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7A3528]">
                  Nuestra Boda Civil
                </span>
                <span className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#2C2623]">
                  Dayneb &amp; Alejandro
                </span>
                <span className="mt-2 h-px w-12 bg-[#C5A059]/70" />
                <span className="mt-2 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#7A3528]">
                  12 · Diciembre · 2026
                </span>
              </div>
            </div>

            {/* Envelope Front Pocket (Left, Right, Bottom V-folds) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-md"
            >
              <svg
                viewBox="0 0 400 275"
                preserveAspectRatio="none"
                className="h-full w-full"
                fill="none"
              >
                <polygon points="0,0 205,148 0,275" fill="#F2ECE4" />
                <polygon points="400,0 195,148 400,275" fill="#EDE5DB" />
                <polygon points="0,275 200,132 400,275" fill="#F7F3EE" />
                <path
                  d="M0 275 L200 132 L400 275"
                  stroke="#C5A059"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
                <path
                  d="M0 0 L195 142 M400 0 L205 142"
                  stroke="#C5A059"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Top 3D Envelope Flap */}
            <div
              aria-hidden="true"
              className={`envelope-flap pointer-events-none absolute inset-x-0 top-0 h-[58%] transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isFlapOpen ? 'z-10' : 'z-30'
              }`}
              style={{
                transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              }}
            >
              <svg
                viewBox="0 0 400 160"
                preserveAspectRatio="none"
                className="h-full w-full drop-shadow-[0_6px_12px_rgba(44,38,35,0.12)]"
                fill="none"
              >
                <polygon points="0,0 400,0 200,152" fill="#F9F6F1" />
                <path
                  d="M0 0 L200 152 L400 0"
                  stroke="#C5A059"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Embossed Wax Seal "D & A" */}
            <div
              aria-hidden="true"
              className={`absolute left-1/2 top-[52%] z-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isSealLifted
                  ? '-translate-y-[calc(50%+16px)] scale-110 opacity-0'
                  : 'opacity-100'
              }`}
            >
              <div
                className={`relative flex h-[74px] w-[74px] sm:h-[82px] sm:w-[82px] items-center justify-center rounded-full border-2 border-[#C5A059]/75 bg-[radial-gradient(circle_at_32%_30%,#C96A4D_0%,#B3583E_48%,#7A3528_100%)] text-[#FDFBF7] ${
                  phase === 'closed' ? 'wax-seal-pulse' : ''
                }`}
              >
                <span className="pointer-events-none absolute inset-[6px] rounded-full border border-[#C5A059]/55 shadow-inner" />
                <span className="relative font-serif text-lg sm:text-xl font-semibold tracking-[0.06em] text-[#FDFBF7] drop-shadow-[0_1px_1px_rgba(44,38,35,0.45)]">
                  D&amp;A
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Micro-copy prompt */}
        <p
          className={`mt-9 font-sans text-xs font-medium uppercase tracking-[0.24em] text-[#7A3528] transition-all duration-500 ${
            isSealLifted ? 'opacity-0 translate-y-1' : 'opacity-90'
          }`}
        >
          Toca para abrir la invitación
        </p>
      </div>
    </section>
  );
};
