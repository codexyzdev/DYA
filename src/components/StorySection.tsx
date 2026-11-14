import React from 'react';

export const StorySection: React.FC = () => {
  return (
    <section
      aria-labelledby="story-heading"
      data-testid="story-section"
      className="mx-auto max-w-xl px-2 py-2 text-center"
    >
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7A3528]">
        Nuestra Historia
      </p>
      <h2
        id="story-heading"
        className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#7A3528] text-balance"
      >
        Un capítulo escrito paso a paso
      </h2>
      <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-[#2C2623]/90">
        Entre risas espontáneas, conversaciones largas y sueños compartidos,
        descubrimos que nuestro hogar siempre está donde caminamos de la mano.
        Hoy celebramos ese amor frente a quienes iluminan nuestra vida.
      </p>
    </section>
  );
};
