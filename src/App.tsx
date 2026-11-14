import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { AmbientMotionLayer } from './components/AmbientMotionLayer';
import {
  BackgroundFoliage,
  CornerFlourish,
  HairlineDivider,
  MonogramCrest,
} from './components/BotanicalOrnaments';
import { CelebrationBurst } from './components/CelebrationBurst';
import { CountdownTimer } from './components/CountdownTimer';
import { DressCodeSection } from './components/DressCodeSection';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { GiftNoteSection } from './components/GiftNoteSection';
import { MusicControl } from './components/MusicControl';
import { RsvpSection } from './components/RsvpSection';
import { ScheduleSection } from './components/ScheduleSection';
import { ScrollReveal } from './components/ScrollReveal';
import { StorySection } from './components/StorySection';
import { VenueSection } from './components/VenueSection';
import {
  YouTubeMusicPlayer,
  type YouTubeMusicHandle,
} from './components/YouTubeMusicPlayer';
import {
  BACKGROUND_MUSIC_SRC,
  YOUTUBE_SONG_URL,
  extractYouTubeVideoId,
} from './utils/invitationLogic';

function shouldAutostart(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1';
}

const YOUTUBE_VIDEO_ID = extractYouTubeVideoId(YOUTUBE_SONG_URL) ?? '';

export default function App() {
  const autostart = shouldAutostart();
  const [isRevealing, setIsRevealing] = useState<boolean>(autostart);
  const [envelopeUnmounted, setEnvelopeUnmounted] = useState<boolean>(autostart);
  const [audioCheckDone, setAudioCheckDone] = useState<boolean>(false);
  const [hasAudioTrack, setHasAudioTrack] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [burstKey, setBurstKey] = useState<number>(0);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(
    null,
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const ytRef = useRef<YouTubeMusicHandle>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let active = true;
    fetch(BACKGROUND_MUSIC_SRC, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (active && res.ok && contentType.startsWith('audio/')) {
          setHasAudioTrack(true);
        }
      })
      .catch(() => {
        // Local audio track not placed yet; YouTube fallback will be used
      })
      .finally(() => {
        if (active) setAudioCheckDone(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleTapEnvelope = useCallback(() => {
    const audio = audioRef.current;
    if (hasAudioTrack && audio) {
      audio.volume = 0.45;
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
      return;
    }

    if (YOUTUBE_VIDEO_ID) {
      ytRef.current?.play();
    }
  }, [hasAudioTrack]);

  const handleToggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (hasAudioTrack && audio) {
      if (audio.paused) {
        audio.volume = 0.45;
        audio
          .play()
          .then(() => setIsMusicPlaying(true))
          .catch(() => setIsMusicPlaying(false));
      } else {
        audio.pause();
        setIsMusicPlaying(false);
      }
      return;
    }

    if (YOUTUBE_VIDEO_ID) {
      if (isMusicPlaying) {
        ytRef.current?.pause();
      } else {
        ytRef.current?.play();
      }
      return;
    }

    setIsMusicPlaying((prev) => !prev);
  }, [hasAudioTrack, isMusicPlaying]);

  const handleStartReveal = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setIsRevealing(true);
  }, []);

  const handleOpenComplete = useCallback(() => {
    setEnvelopeUnmounted(true);
  }, []);

  const handleReplayEnvelope = useCallback(() => {
    setIsRevealing(false);
    setEnvelopeUnmounted(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleCelebrate = useCallback((origin: { x: number; y: number }) => {
    setBurstOrigin(origin);
    setBurstKey((prev) => prev + 1);
  }, []);

  return (
    <div
      data-state={isRevealing ? 'opened' : 'envelope'}
      className="min-h-[100dvh] w-full bg-[#F4EFEA] paper-grain text-[#2C2623]"
    >
      {hasAudioTrack && (
        <audio
          ref={audioRef}
          src={BACKGROUND_MUSIC_SRC}
          loop
          preload="auto"
          onEnded={() => setIsMusicPlaying(false)}
          onError={() => {
            setHasAudioTrack(false);
            setIsMusicPlaying(false);
          }}
        />
      )}

      {audioCheckDone && !hasAudioTrack && YOUTUBE_VIDEO_ID && (
        <YouTubeMusicPlayer
          ref={ytRef}
          videoId={YOUTUBE_VIDEO_ID}
          enabled
          onPlayingChange={setIsMusicPlaying}
        />
      )}

      <CelebrationBurst triggerKey={burstKey} origin={burstOrigin} />

      {isRevealing && (
        <>
          <AmbientMotionLayer />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: smoothProgress }}
            className="pointer-events-none fixed top-0 left-0 right-0 z-40 h-[2px] origin-left bg-gradient-to-r from-[#C5A059] via-[#B3583E] to-[#C5A059]"
          />
          <MusicControl
            isPlaying={isMusicPlaying}
            onToggle={handleToggleMusic}
          />
        </>
      )}

      {!envelopeUnmounted && (
        <EnvelopeIntro
          onTapEnvelope={handleTapEnvelope}
          onStartReveal={handleStartReveal}
          onOpenComplete={handleOpenComplete}
        />
      )}

      <main
        data-testid="invitation-card"
        aria-hidden={!isRevealing}
        className={`mx-auto w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-12 transition-all duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isRevealing
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-5 scale-[0.985] pointer-events-none select-none'
        }`}
      >
        <article className="relative overflow-hidden rounded-2xl border border-[#C5A059]/45 bg-[#FDFBF7] px-5 py-9 sm:px-10 sm:py-14 shadow-[0_24px_60px_-28px_rgba(44,38,35,0.22)]">
          {/* Subtle botanical green foliage in the background */}
          <BackgroundFoliage />

          {/* Subtle letterpress gold corner ornaments */}
          <CornerFlourish position="tl" />
          <CornerFlourish position="tr" />
          <CornerFlourish position="bl" />
          <CornerFlourish position="br" />

          {/* 1. Encabezado y Fecha with staggered reveal */}
          <header className="relative z-10 text-center">
            <motion.div
              animate={
                isRevealing
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.94 }
              }
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <MonogramCrest className="mb-5" />
            </motion.div>

            <motion.div
              animate={
                isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A3528]">
                Nuestra Boda Civil
              </p>

              <h1 className="mt-3 font-serif text-[clamp(2.5rem,7vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-[#7A3528] text-balance">
                Dayneb &amp; Alejandro
              </h1>
            </motion.div>

            <HairlineDivider className="my-6" />

            <motion.div
              animate={
                isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mx-auto max-w-lg font-serif text-lg sm:text-xl italic leading-relaxed text-[#2C2623]/90">
                “Hay instantes en la vida que cobran verdadero sentido cuando se
                comparten con quienes más amamos. Acompáñanos a celebrar el
                comienzo de nuestra historia como esposos.”
              </p>

              {/* Fecha y Hora */}
              <div className="mt-7 flex flex-col items-center gap-1.5">
                <p className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#2C2623]">
                  Sábado, 12 de Diciembre de 2026
                </p>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#B3583E]">
                  10:00 AM · Puntual
                </p>
              </div>

              <CountdownTimer />
            </motion.div>
          </header>

          <HairlineDivider className="relative z-10 my-9 sm:my-11" />

          {/* 2. Nuestra Historia */}
          <ScrollReveal active={isRevealing} delay={0.05} yOffset={24} className="relative z-10">
            <StorySection />
          </ScrollReveal>

          <HairlineDivider className="relative z-10 my-9 sm:my-11" />

          {/* 3. Itinerario del Día */}
          <ScrollReveal active={isRevealing} delay={0.05} yOffset={26} className="relative z-10">
            <ScheduleSection active={isRevealing} />
          </ScrollReveal>

          <HairlineDivider className="relative z-10 my-9 sm:my-11" />

          {/* 4 & 5. Locación y Código de Vestimenta */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <ScrollReveal active={isRevealing} delay={0.05} yOffset={28} className="h-full">
              <VenueSection />
            </ScrollReveal>
            <ScrollReveal active={isRevealing} delay={0.14} yOffset={28} className="h-full flex">
              <DressCodeSection />
            </ScrollReveal>
          </div>

          <HairlineDivider className="relative z-10 my-9 sm:my-11" />

          {/* 6. Módulo RSVP y Obsequio */}
          <div className="relative z-10">
            <ScrollReveal active={isRevealing} delay={0.05} yOffset={28}>
              <RsvpSection onCelebrate={handleCelebrate} />
            </ScrollReveal>
            <ScrollReveal active={isRevealing} delay={0.12} yOffset={20}>
              <GiftNoteSection />
            </ScrollReveal>
          </div>

          {/* Quiet Editorial Footer */}
          <ScrollReveal active={isRevealing} delay={0.08} yOffset={16}>
            <footer className="relative z-10 mt-9 border-t border-[#C5A059]/25 pt-6 text-center">
              <p className="font-serif text-lg italic text-[#7A3528]">
                Con todo nuestro cariño, Dayneb &amp; Alejandro
              </p>
              <button
                type="button"
                onClick={handleReplayEnvelope}
                className="mt-3 inline-flex min-h-[44px] items-center justify-center px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A3528]/80 underline decoration-[#C5A059]/60 underline-offset-4 transition-colors hover:text-[#B3583E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] rounded-md"
              >
                Volver a ver el sobre
              </button>
            </footer>
          </ScrollReveal>
        </article>
      </main>
    </div>
  );
}
