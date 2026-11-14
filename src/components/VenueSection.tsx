import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { GOOGLE_MAPS_URL } from '../utils/invitationLogic';

export const VenueSection: React.FC = () => {
  return (
    <section
      aria-labelledby="venue-heading"
      className="flex h-full flex-col justify-between rounded-xl border border-[#C5A059]/35 bg-[#F4EFEA]/55 px-5 py-7 sm:px-8 sm:py-8 text-center"
    >
      <div>
        <div className="inline-flex items-center justify-center gap-1.5 text-[#7A3528]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#B3583E]" aria-hidden="true" />
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]">
            Locación
          </p>
        </div>
        <h2
          id="venue-heading"
          className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#7A3528]"
        >
          Braseiro Steak House
        </h2>
        <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#2C2623]/75">
          Maracaibo, Zulia · Venezuela
        </p>

        <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-[#2C2623]/90">
          Desde la firma civil hasta el almuerzo de celebración, todo se
          realizará en este mismo espacio para disfrutar sin traslados.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#B3583E] bg-[#FDFBF7] px-4 sm:px-6 py-3 text-center font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.07em] sm:tracking-[0.14em] text-[#7A3528] transition-all duration-200 hover:bg-[#B3583E] hover:text-[#FDFBF7] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFEA]"
        >
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Ver Ubicación en Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
