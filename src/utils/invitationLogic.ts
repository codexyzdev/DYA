export type AttendanceChoice = 'yes' | 'no' | null;

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isEventDay: boolean;
}

// Sábado, 12 de Diciembre de 2026 — 10:00 AM (Hora de Venezuela, UTC-4)
export const WEDDING_TARGET_ISO = '2026-12-12T10:00:00-04:00';
export const WEDDING_TARGET_MS = new Date(WEDDING_TARGET_ISO).getTime();

export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Braseiro+Steak+House+Maracaibo+Zulia+Venezuela';

// Coloca aquí tu archivo de audio local opcional en: public/music/cancion.mp3
export const BACKGROUND_MUSIC_SRC = '/music/cancion.mp3';

// Canción de fondo vía YouTube (se usa automáticamente si no hay cancion.mp3 local)
export const YOUTUBE_SONG_URL = 'https://youtu.be/rtOvBOTyX00?si=B-AwD2x1ZOCuQ6h3';

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return v;
      const parts = parsed.pathname.split('/').filter(Boolean);
      const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'shorts');
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        return parts[embedIdx + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

export interface WhatsAppRecipient {
  name: string;
  phone: string;
}

export const RSVP_WHATSAPP_RECIPIENTS: ReadonlyArray<WhatsAppRecipient> = [
  { name: 'Alejandro Baez', phone: '584125146317' },
  { name: 'Dayneb Camargo', phone: '584246624356' },
];

// Opcional: Coloca aquí un número fijo si se desea usar fuera del botón principal.
export const WHATSAPP_PHONE = '';

export const RSVP_ATTENDING_COPY =
  '¡Hola Dayneb y Alejandro! Qué alegría recibir su invitación. Confirmo con todo cariño mi asistencia a su boda civil el sábado 12 de diciembre a las 10:00 AM. Será un honor acompañarlos y brindar juntos por el comienzo de esta hermosa etapa.';

export const RSVP_DECLINING_COPY =
  '¡Hola Dayneb y Alejandro! Con el corazón los acompaño, pero en esta ocasión no podré asistir. Les deseo el mayor de los éxitos en su gran día.';

export const RSVP_YES_FEEDBACK = '¡Gracias por acompañarnos en este día!';

export const RSVP_NO_SURRENDER_LABEL =
  'Viendo tu insistencia, déjame decirte que no hay forma que no asista. ¡Gracias!';

export const MAX_NO_DODGES = 3;

const DODGE_OFFSETS: ReadonlyArray<{ x: number; y: number }> = [
  { x: -18, y: -14 },
  { x: 20, y: 14 },
  { x: -14, y: 16 },
];

export function getNoButtonDodgeOffset(attempt: number): { x: number; y: number } {
  if (attempt <= 0 || attempt > MAX_NO_DODGES) {
    return { x: 0, y: 0 };
  }
  return DODGE_OFFSETS[(attempt - 1) % DODGE_OFFSETS.length];
}

export function calculateCountdown(
  targetMs: number = WEDDING_TARGET_MS,
  nowMs: number = Date.now(),
): CountdownState {
  const diffMs = targetMs - nowMs;

  if (diffMs <= 0) {
    const elapsedHours = Math.abs(diffMs) / (1000 * 60 * 60);
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      isEventDay: elapsedHours < 14,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    isEventDay: false,
  };
}

export function formatCountdownUnit(value: number): string {
  const safeValue = Math.max(0, Math.floor(value));
  return String(safeValue).padStart(2, '0');
}

export function buildWhatsAppMessage(
  attendance: Exclude<AttendanceChoice, null> = 'yes',
): string {
  return attendance === 'yes' ? RSVP_ATTENDING_COPY : RSVP_DECLINING_COPY;
}

export function buildWhatsAppUrl(
  attendance: Exclude<AttendanceChoice, null> = 'yes',
  phoneNumber: string = WHATSAPP_PHONE,
): string {
  const message = buildWhatsAppMessage(attendance);
  const encodedText = encodeURIComponent(message);
  const cleanPhone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;
}

export function pickRandomWhatsAppRecipient(
  recipients: ReadonlyArray<WhatsAppRecipient> = RSVP_WHATSAPP_RECIPIENTS,
  randomFn: () => number = Math.random,
): WhatsAppRecipient {
  const safeIndex = Math.min(
    recipients.length - 1,
    Math.max(0, Math.floor(randomFn() * recipients.length)),
  );
  return recipients[safeIndex];
}

export function buildRandomAttendingWhatsAppTarget(
  randomFn: () => number = Math.random,
): { recipient: WhatsAppRecipient; url: string } {
  const recipient = pickRandomWhatsAppRecipient(
    RSVP_WHATSAPP_RECIPIENTS,
    randomFn,
  );
  return {
    recipient,
    url: buildWhatsAppUrl('yes', recipient.phone),
  };
}

export type ParticleKind = 'petal' | 'sparkle' | 'heart';

export interface CelebrationParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  color: string;
  kind: ParticleKind;
  swayPhase: number;
}

const CELEBRATION_COLORS = [
  '#C5A059', // Gold
  '#B3583E', // Terracotta
  '#7A3528', // Deep burgundy
  '#E8DDD1', // Warm ivory petal
  '#8A997B', // Sage leaf
];

export function createCelebrationParticles(
  count: number,
  originX: number,
  originY: number,
  randomFn: () => number = Math.random,
): CelebrationParticle[] {
  const safeCount = Math.max(0, Math.floor(count));
  const particles: CelebrationParticle[] = [];

  for (let i = 0; i < safeCount; i += 1) {
    const angle = -Math.PI / 2 + (randomFn() - 0.5) * Math.PI * 1.35;
    const speed = 3.2 + randomFn() * 6.5;
    const kindRoll = randomFn();
    const kind: ParticleKind =
      kindRoll < 0.45 ? 'petal' : kindRoll < 0.8 ? 'sparkle' : 'heart';

    particles.push({
      x: originX + (randomFn() - 0.5) * 40,
      y: originY + (randomFn() - 0.5) * 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      size: kind === 'sparkle' ? 3 + randomFn() * 3.5 : 6 + randomFn() * 5.5,
      rotation: randomFn() * Math.PI * 2,
      vRot: (randomFn() - 0.5) * 0.14,
      opacity: 0.9 + randomFn() * 0.1,
      color:
        CELEBRATION_COLORS[
          Math.floor(randomFn() * CELEBRATION_COLORS.length)
        ],
      kind,
      swayPhase: randomFn() * Math.PI * 2,
    });
  }

  return particles;
}
