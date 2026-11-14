import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YTPlayerEvent {
  target: YTPlayerInstance;
  data: number;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      height?: string | number;
      width?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: YTPlayerEvent) => void;
        onStateChange?: (event: YTPlayerEvent) => void;
        onError?: () => void;
      };
    },
  ) => YTPlayerInstance;
  PlayerState?: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface YouTubeMusicHandle {
  play: () => void;
  pause: () => void;
}

interface YouTubeMusicPlayerProps {
  videoId: string;
  enabled: boolean;
  onPlayingChange: (playing: boolean) => void;
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT && typeof window.YT.Player === 'function') {
    return Promise.resolve();
  }
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve, reject) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      resolve();
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => reject(new Error('YouTube IFrame API failed to load'));
    document.head.appendChild(script);
  });

  return ytApiPromise;
}

export const YouTubeMusicPlayer = forwardRef<
  YouTubeMusicHandle,
  YouTubeMusicPlayerProps
>(({ videoId, enabled, onPlayingChange }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const isReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (!enabled) return;
        pendingPlayRef.current = true;
        if (isReadyRef.current && playerRef.current) {
          try {
            playerRef.current.setVolume(45);
            playerRef.current.playVideo();
            onPlayingChange(true);
          } catch {
            onPlayingChange(false);
          }
        }
      },
      pause: () => {
        pendingPlayRef.current = false;
        if (isReadyRef.current && playerRef.current) {
          try {
            playerRef.current.pauseVideo();
          } catch {
            // ignore
          }
        }
        onPlayingChange(false);
      },
    }),
    [enabled, onPlayingChange],
  );

  useEffect(() => {
    if (!enabled || !videoId) return;

    let cancelled = false;

    loadYouTubeIframeApi()
      .then(() => {
        if (cancelled || !containerRef.current || !window.YT?.Player) return;

        // Clean mount target inside container
        const mountEl = document.createElement('div');
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(mountEl);

        playerRef.current = new window.YT.Player(mountEl, {
          videoId,
          width: '200',
          height: '200',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            playlist: videoId,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;
              isReadyRef.current = true;
              try {
                event.target.setVolume(45);
                if (pendingPlayRef.current) {
                  event.target.playVideo();
                  onPlayingChange(true);
                }
              } catch {
                onPlayingChange(false);
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const playingState = window.YT?.PlayerState?.PLAYING ?? 1;
              const pausedState = window.YT?.PlayerState?.PAUSED ?? 2;
              const endedState = window.YT?.PlayerState?.ENDED ?? 0;

              if (event.data === playingState) {
                onPlayingChange(true);
              } else if (event.data === pausedState || event.data === endedState) {
                onPlayingChange(false);
              }
            },
            onError: () => {
              if (!cancelled) {
                onPlayingChange(false);
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          onPlayingChange(false);
        }
      });

    return () => {
      cancelled = true;
      isReadyRef.current = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
    };
  }, [enabled, videoId, onPlayingChange]);

  if (!enabled || !videoId) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-testid="youtube-music-container"
      className="pointer-events-none fixed -bottom-52 -right-52 h-[200px] w-[200px] opacity-0 overflow-hidden"
    />
  );
});

YouTubeMusicPlayer.displayName = 'YouTubeMusicPlayer';
