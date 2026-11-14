import React from 'react';

export const DressCodeSection: React.FC = () => {
  return (
    <section
      aria-labelledby="dresscode-heading"
      className="flex flex-col justify-center rounded-xl border border-[#C5A059]/35 bg-[#FDFBF7]/90 px-5 py-7 sm:px-8 sm:py-8 text-center"
    >
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7A3528]">
        Etiqueta
      </p>
      <h2
        id="dresscode-heading"
        className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#7A3528]"
      >
        Código de Vestimenta
      </h2>
      <p className="mt-2 font-serif text-xl sm:text-2xl italic text-[#2C2623]">
        Cóctel de Día
      </p>

      <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-[#2C2623]/90">
        Tonos frescos y elegantes para una mañana de celebración. Sugerencia:
        vestidos midi, trajes livianos o guayaberas de lino o camisas formales.
      </p>
    </section>
  );
};
