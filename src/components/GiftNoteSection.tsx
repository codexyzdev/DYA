import React from 'react';
import { Gift } from 'lucide-react';

export const GiftNoteSection: React.FC = () => {
  return (
    <aside
      aria-label="Detalle sobre obsequios"
      data-testid="gift-note-section"
      className="mx-auto mt-7 max-w-md rounded-xl border border-[#C5A059]/30 bg-[#FDFBF7]/85 px-5 py-4 text-center"
    >
      <div className="inline-flex items-center justify-center gap-2 text-[#7A3528]/85">
        <Gift className="h-3.5 w-3.5 shrink-0 text-[#C5A059]" aria-hidden="true" />
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em]">
          Obsequio
        </span>
      </div>
      <p className="mt-1.5 font-sans text-xs sm:text-[13px] leading-relaxed text-[#2C2623]/80">
        El mejor regalo es compartir este día contigo. Si deseas tener un detalle
        con nosotros, te agradecemos de corazón que sea en efectivo.
      </p>
    </aside>
  );
};
