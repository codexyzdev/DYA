import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, X, Heart, Sparkles } from 'lucide-react';
import {
  MAX_NO_DODGES,
  RSVP_NO_SURRENDER_LABEL,
  RSVP_YES_FEEDBACK,
  buildRandomAttendingWhatsAppTarget,
  buildWhatsAppUrl,
  getNoButtonDodgeOffset,
} from '../utils/invitationLogic';

interface RsvpSectionProps {
  onCelebrate?: (origin: { x: number; y: number }) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onCelebrate }) => {
  const [confirmedYes, setConfirmedYes] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [hasSurrendered, setHasSurrendered] = useState(false);
  const [whatsAppTarget, setWhatsAppTarget] = useState(() =>
    buildRandomAttendingWhatsAppTarget(),
  );

  const attendingWhatsAppUrl = buildWhatsAppUrl('yes');
  const dodgeOffset = getNoButtonDodgeOffset(dodgeCount);

  const emitBurstFromElement = (el: HTMLElement | null) => {
    if (!onCelebrate) return;
    if (!el) {
      onCelebrate({
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.65,
      });
      return;
    }
    const rect = el.getBoundingClientRect();
    onCelebrate({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handlePrimaryWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nextTarget = buildRandomAttendingWhatsAppTarget();
    e.currentTarget.href = nextTarget.url;
    setWhatsAppTarget(nextTarget);
    setConfirmedYes(true);
    emitBurstFromElement(e.currentTarget);
  };

  const handleConfirmYesClick = (e: React.MouseEvent<HTMLElement>) => {
    setConfirmedYes(true);
    emitBurstFromElement(e.currentTarget);
  };

  const handleNoAttempt = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasSurrendered) {
      setConfirmedYes(true);
      emitBurstFromElement(e.currentTarget);
      return;
    }

    if (dodgeCount < MAX_NO_DODGES) {
      setDodgeCount((prev) => prev + 1);
      return;
    }

    setDodgeCount(0);
    setHasSurrendered(true);
    setConfirmedYes(true);
    emitBurstFromElement(e.currentTarget);
  };

  return (
    <section
      aria-labelledby="rsvp-heading"
      className="rounded-xl border border-[#C5A059]/45 bg-[#F4EFEA]/80 px-5 py-7 sm:px-8 sm:py-9 text-center"
    >
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7A3528]">
        RSVP
      </p>
      <h2
        id="rsvp-heading"
        className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#7A3528]"
      >
        Confirma tu Asistencia
      </h2>
      <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-[#2C2623]/90">
        Tu lugar en nuestra mesa es muy especial. Agradecemos confirmar tu
        respuesta antes del 28 de noviembre.
      </p>

      <div className="mx-auto mt-6 max-w-md space-y-3.5">
        {/* Direct 1-tap WhatsApp confirmation CTA with random couple number & golden sheen */}
        <motion.a
          href={whatsAppTarget.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePrimaryWhatsAppClick}
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -1 }}
          data-testid="rsvp-yes-button"
          data-recipient-phone={whatsAppTarget.recipient.phone}
          className="relative overflow-hidden flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#B3583E] px-4 py-3 text-center font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.06em] sm:tracking-[0.12em] text-[#FDFBF7] shadow-[0_10px_22px_-8px_rgba(122,53,40,0.45)] transition-colors duration-200 hover:bg-[#98442D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFEA]"
        >
          <span
            aria-hidden="true"
            className="animate-cta-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FDFBF7]/25 to-transparent"
          />
          <MessageCircle className="relative z-10 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="relative z-10">Sí, asistiré · Confirmar por WhatsApp</span>
        </motion.a>

        {/* Playful runaway "No podré asistir" button */}
        <div className="relative flex items-center justify-center py-1">
          {hasSurrendered ? (
            <motion.a
              initial={{ opacity: 0.7, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              href={attendingWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleConfirmYesClick}
              data-testid="rsvp-no-button"
              data-dodge-count={dodgeCount}
              className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg border border-[#C5A059] bg-[#FDFBF7] px-4 py-3 text-center font-sans text-xs font-medium leading-relaxed text-[#7A3528] shadow-sm transition-colors duration-200 hover:border-[#B3583E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] focus-visible:ring-offset-2"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#C5A059]" aria-hidden="true" />
              <span>{RSVP_NO_SURRENDER_LABEL}</span>
            </motion.a>
          ) : (
            <button
              type="button"
              onClick={handleNoAttempt}
              data-testid="rsvp-no-button"
              data-dodge-count={dodgeCount}
              style={{
                transform: `translate3d(${dodgeOffset.x}px, ${dodgeOffset.y}px, 0) rotate(${
                  dodgeCount % 2 === 1 ? -1.5 : dodgeCount > 0 ? 1.5 : 0
                }deg)`,
              }}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-[#C5A059]/60 bg-[#FDFBF7] px-4 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#2C2623] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[#7A3528] hover:text-[#7A3528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] focus-visible:ring-offset-2"
            >
              <X className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>No podré asistir</span>
            </button>
          )}
        </div>

        {/* Thank-you confirmation note with spring reveal */}
        {confirmedYes && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            data-testid="rsvp-yes-feedback"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-[#C5A059]/55 bg-[#FDFBF7] px-4 py-3 text-center shadow-sm"
          >
            <Heart
              className="h-4 w-4 shrink-0 text-[#B3583E]"
              aria-hidden="true"
            />
            <p className="font-serif text-lg italic text-[#7A3528]">
              {RSVP_YES_FEEDBACK}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
