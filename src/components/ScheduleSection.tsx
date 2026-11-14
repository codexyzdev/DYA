import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock, HeartHandshake, UtensilsCrossed } from 'lucide-react';

interface ScheduleStep {
  time: string;
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
}

const SCHEDULE_STEPS: ScheduleStep[] = [
  {
    time: '10:00 AM',
    title: 'Bienvenida',
    description: 'Recibimiento de invitados y primeros abrazos.',
    Icon: Clock,
  },
  {
    time: '10:30 AM',
    title: 'Ceremonia Civil',
    description: 'Lectura de votos y firma oficial de nuestra unión.',
    Icon: HeartHandshake,
  },
  {
    time: '12:00 PM',
    title: 'Almuerzo y Brindis',
    description: 'Compartiremos la mesa para festejar juntos.',
    Icon: UtensilsCrossed,
  },
];

interface ScheduleSectionProps {
  active: boolean;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ active }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="schedule-heading"
      data-testid="schedule-section"
      className="rounded-xl border border-[#C5A059]/35 bg-[#F4EFEA]/55 px-5 py-7 sm:px-8 sm:py-8 text-center"
    >
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7A3528]">
        Itinerario
      </p>
      <h2
        id="schedule-heading"
        className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#7A3528]"
      >
        Momentos de la Mañana
      </h2>

      <ol className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 text-center">
        {SCHEDULE_STEPS.map(({ time, title, description, Icon }, idx) => {
          const content = (
            <div className="flex h-full flex-col items-center rounded-lg border border-[#C5A059]/30 bg-[#FDFBF7]/90 px-4 py-5 transition-transform duration-300 hover:-translate-y-0.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5A059]/50 bg-[#F4EFEA] text-[#7A3528]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B3583E] tabular-nums">
                {time}
              </span>
              <h3 className="mt-1 font-serif text-xl font-medium text-[#2C2623]">
                {title}
              </h3>
              <p className="mt-1.5 font-sans text-xs leading-relaxed text-[#2C2623]/80">
                {description}
              </p>
            </div>
          );

          if (prefersReducedMotion) {
            return <li key={time}>{content}</li>;
          }

          return (
            <motion.li
              key={time}
              initial={{ opacity: 0, y: 18 }}
              whileInView={
                active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {content}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
};
