import React, { useEffect, useState } from 'react';
import {
  calculateCountdown,
  formatCountdownUnit,
  WEDDING_TARGET_MS,
  type CountdownState,
} from '../utils/invitationLogic';

export const CountdownTimer: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(WEDDING_TARGET_MS, Date.now()),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(calculateCountdown(WEDDING_TARGET_MS, Date.now()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (countdown.isPast) {
    return (
      <div
        data-testid="countdown-status"
        className="mx-auto mt-7 max-w-md rounded-xl border border-[#C5A059]/45 bg-[#F4EFEA]/80 px-5 py-4 text-center"
      >
        <p className="font-serif text-xl italic text-[#7A3528]">
          {countdown.isEventDay
            ? '¡Hoy celebramos nuestra boda civil!'
            : '¡Gracias por acompañarnos en nuestro gran día!'}
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Días', value: formatCountdownUnit(countdown.days) },
    { label: 'Horas', value: formatCountdownUnit(countdown.hours) },
    { label: 'Minutos', value: formatCountdownUnit(countdown.minutes) },
    { label: 'Segundos', value: formatCountdownUnit(countdown.seconds) },
  ];

  return (
    <div
      data-testid="countdown-timer"
      aria-label="Cuenta regresiva para la boda"
      className="mx-auto mt-7 w-full max-w-md rounded-xl border border-[#C5A059]/40 bg-[#F4EFEA]/75 px-2.5 py-4 sm:px-6 sm:py-5"
    >
      <p className="mb-3 text-center font-sans text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#7A3528]">
        Faltan para el gran día
      </p>
      <div className="grid grid-cols-4 divide-x divide-[#C5A059]/30">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center px-1 sm:px-2">
            <span
              key={unit.label === 'Segundos' ? unit.value : unit.label}
              className={`font-serif text-[28px] sm:text-4xl font-semibold leading-none tracking-tight text-[#2C2623] tabular-nums ${
                unit.label === 'Segundos' ? 'animate-digit-tick' : ''
              }`}
            >
              {unit.value}
            </span>
            <span className="mt-2 font-sans text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.07em] sm:tracking-[0.15em] text-[#7A3528]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
