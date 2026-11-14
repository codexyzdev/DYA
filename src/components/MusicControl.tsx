import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
      aria-pressed={isPlaying}
      data-testid="music-toggle-button"
      className="fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A059]/60 bg-[#FDFBF7]/90 text-[#7A3528] shadow-[0_8px_20px_-8px_rgba(44,38,35,0.28)] backdrop-blur-sm transition-all duration-200 hover:border-[#B3583E] hover:bg-[#FDFBF7] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3528] focus-visible:ring-offset-2"
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4 opacity-75" aria-hidden="true" />
      )}
    </button>
  );
};
