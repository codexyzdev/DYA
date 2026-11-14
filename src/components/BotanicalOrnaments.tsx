import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export const MonogramCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex flex-col items-center justify-center ${className}`} aria-hidden="true">
    <svg
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#C5A059]"
    >
      <circle
        cx="44"
        cy="44"
        r="41"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.55"
        strokeDasharray="3 4"
        className="animate-crest-orbit"
      />
      <circle cx="44" cy="44" r="35" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.45" />
      <path
        d="M38 11C40.5 9 42.5 9 44 12C45.5 9 47.5 9 50 11"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 77C40.5 79 42.5 79 44 76C45.5 79 47.5 79 50 77"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="44"
        y="49"
        textAnchor="middle"
        className="font-serif"
        fill="#7A3528"
        fontSize="21"
        fontWeight="500"
        letterSpacing="1.5"
      >
        D &amp; A
      </text>
    </svg>
  </div>
);

export const HairlineDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`flex items-center justify-center gap-3 w-full max-w-[240px] mx-auto ${className}`} aria-hidden="true">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]/70" />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#C5A059] shrink-0">
          <path
            d="M8 1.5L9.8 6.2L14.5 8L9.8 9.8L8 14.5L6.2 9.8L1.5 8L6.2 6.2L8 1.5Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="#FDFBF7"
          />
        </svg>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]/70" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.45 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-center gap-3 w-full max-w-[240px] mx-auto ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]/70" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#C5A059] shrink-0">
        <path
          d="M8 1.5L9.8 6.2L14.5 8L9.8 9.8L8 14.5L6.2 9.8L1.5 8L6.2 6.2L8 1.5Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="#FDFBF7"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]/70" />
    </motion.div>
  );
};

export const CornerFlourish: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  const placement = {
    tl: 'top-3 left-3',
    tr: 'top-3 right-3',
    br: 'bottom-3 right-3',
    bl: 'bottom-3 left-3',
  }[position];

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute ${placement} ${rotation} text-[#C5A059]/60`}
    >
      <path d="M1 14V2.5C1 1.67 1.67 1 2.5 1H14" stroke="currentColor" strokeWidth="1" />
      <path d="M5 10V5H10" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
    </svg>
  );
};

export const BackgroundFoliage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const topRightBranchY = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const topLeftBranchY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const upperMidRightY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const midSprigY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const lowerMidRightY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const lowerLeftSprigY = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const bottomTwigY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const bottomRightBranchY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <div
      aria-hidden="true"
      data-testid="background-foliage"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Top-left delicate sage sprig */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: topLeftBranchY }}
        className="absolute -top-5 -left-8 w-32 sm:w-44"
      >
        <svg
          viewBox="0 0 190 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway-left w-full text-[#6B7B5C] opacity-[0.20]"
        >
          <path
            d="M14 14C44 46 66 86 88 136C98 158 108 176 122 194"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M40 44C60 40 74 48 78 62C62 64 48 56 40 44Z" fill="#8A997B" fillOpacity="0.42" stroke="currentColor" strokeWidth="0.9" />
          <path d="M46 72C28 80 24 96 34 106C46 96 50 82 46 72Z" fill="#8A997B" fillOpacity="0.34" stroke="currentColor" strokeWidth="0.9" />
          <path d="M68 96C88 94 100 104 102 118C86 120 74 110 68 96Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
          <path d="M78 132C60 140 58 156 68 164C80 156 84 142 78 132Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.9" />
          <path d="M98 158C114 156 126 164 126 178C112 178 102 170 98 158Z" fill="#8A997B" fillOpacity="0.30" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </motion.div>

      {/* Top-right delicate olive branch with scroll parallax + breeze sway */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: topRightBranchY }}
        className="absolute -top-6 -right-8 w-40 sm:w-52"
      >
        <svg
          viewBox="0 0 220 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway w-full text-[#6B7B5C] opacity-[0.24]"
        >
          <path
            d="M205 12C172 48 148 92 126 144C112 178 96 206 72 232"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path d="M174 48C152 44 136 52 132 66C148 68 164 60 174 48Z" fill="#8A997B" fillOpacity="0.45" stroke="currentColor" strokeWidth="0.9" />
          <path d="M180 62C196 76 196 94 182 104C172 90 172 74 180 62Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M150 92C126 88 110 98 106 112C124 114 140 105 150 92Z" fill="#8A997B" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.9" />
          <path d="M148 116C166 128 166 146 154 156C142 142 141 128 148 116Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M122 148C100 146 86 156 84 170C100 170 114 161 122 148Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
          <path d="M108 184C122 196 122 212 110 220C100 208 100 194 108 184Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.9" />
          <path d="M84 214C66 214 54 224 54 236C68 235 78 226 84 214Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </motion.div>

      {/* Upper-mid right slender olive stem */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: upperMidRightY }}
        className="absolute top-[22%] -right-9 w-32 sm:w-44"
      >
        <svg
          viewBox="0 0 180 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway-gentle w-full text-[#6B7B5C] opacity-[0.18]"
        >
          <path
            d="M168 18C142 58 122 106 108 162C102 184 96 202 86 218"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path d="M142 52C122 48 108 56 104 70C120 72 134 64 142 52Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.85" />
          <path d="M140 84C156 96 156 112 144 122C134 110 134 96 140 84Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.85" />
          <path d="M120 112C100 110 88 118 84 132C100 134 112 124 120 112Z" fill="#8A997B" fillOpacity="0.36" stroke="currentColor" strokeWidth="0.85" />
          <path d="M114 146C128 158 128 172 116 182C106 170 106 156 114 146Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.85" />
          <path d="M98 178C80 178 70 188 70 200C84 200 94 190 98 178Z" fill="#8A997B" fillOpacity="0.28" stroke="currentColor" strokeWidth="0.85" />
        </svg>
      </motion.div>

      {/* Mid-left airy eucalyptus sprig */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: midSprigY }}
        className="absolute top-[42%] -left-10 w-32 sm:w-44"
      >
        <svg
          viewBox="0 0 180 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway-left w-full text-[#6B7B5C] opacity-[0.20]"
        >
          <path
            d="M18 18C44 62 62 112 72 168C76 192 78 210 74 226"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M36 52C56 46 70 54 74 68C58 72 44 64 36 52Z" fill="#8A997B" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.9" />
          <path d="M40 82C22 92 18 108 28 118C40 108 44 94 40 82Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M56 106C76 102 90 112 92 126C76 128 62 120 56 106Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
          <path d="M62 142C44 150 40 166 50 176C62 168 66 154 62 142Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.9" />
          <path d="M72 174C90 174 102 184 102 196C88 196 76 186 72 174Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </motion.div>

      {/* Lower-mid right botanical sprig */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: lowerMidRightY }}
        className="absolute top-[61%] -right-8 w-36 sm:w-48"
      >
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway w-full text-[#6B7B5C] opacity-[0.19]"
        >
          <path
            d="M188 24C158 64 138 112 120 166C110 194 98 214 82 228"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M160 56C140 50 124 58 120 72C136 74 152 68 160 56Z" fill="#8A997B" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.9" />
          <path d="M156 88C172 100 172 118 158 128C148 116 148 100 156 88Z" fill="#8A997B" fillOpacity="0.34" stroke="currentColor" strokeWidth="0.9" />
          <path d="M134 118C114 114 100 124 96 138C112 140 126 132 134 118Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
          <path d="M126 154C142 166 142 182 130 192C118 180 118 166 126 154Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.9" />
          <path d="M106 188C88 188 76 198 76 210C90 210 100 200 106 188Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </motion.div>

      {/* Lower-left delicate olive branch */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: lowerLeftSprigY }}
        className="absolute top-[76%] -left-8 w-32 sm:w-40"
      >
        <svg
          viewBox="0 0 180 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway-left w-full text-[#6B7B5C] opacity-[0.17]"
        >
          <path
            d="M12 28C38 66 58 112 72 162C76 180 78 194 74 204"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path d="M36 58C54 52 68 60 72 74C56 76 44 68 36 58Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.85" />
          <path d="M44 92C26 100 24 116 34 124C46 116 48 102 44 92Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.85" />
          <path d="M62 122C80 120 92 130 94 142C78 144 66 134 62 122Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.85" />
          <path d="M68 158C52 164 50 178 60 186C70 178 72 166 68 158Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.85" />
        </svg>
      </motion.div>

      {/* Bottom-left subtle olive twig */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: bottomTwigY }}
        className="absolute -bottom-6 -left-6 w-36 sm:w-48"
      >
        <svg
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway-left w-full text-[#6B7B5C] opacity-[0.21]"
        >
          <path
            d="M12 166C44 134 78 106 118 82"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M42 138C38 120 48 106 62 104C62 118 54 130 42 138Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
          <path d="M68 124C84 130 98 124 104 110C90 108 76 114 68 124Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M84 102C84 84 94 72 108 72C106 86 98 96 84 102Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M104 94C118 100 130 94 136 82C124 80 112 84 104 94Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.85" />
        </svg>
      </motion.div>

      {/* Bottom-right matching olive branch */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: bottomRightBranchY }}
        className="absolute -bottom-6 -right-6 w-36 sm:w-48"
      >
        <svg
          viewBox="0 0 190 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-foliage-sway-bottom w-full text-[#6B7B5C] opacity-[0.21]"
        >
          <path
            d="M178 176C144 142 108 114 66 90"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M148 148C152 130 142 116 128 114C128 128 136 140 148 148Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
          <path d="M120 132C104 138 90 132 84 118C98 116 112 122 120 132Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M102 108C102 90 92 78 78 78C80 92 88 102 102 108Z" fill="#8A997B" fillOpacity="0.35" stroke="currentColor" strokeWidth="0.9" />
          <path d="M80 100C66 106 54 100 48 88C60 86 72 90 80 100Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.85" />
        </svg>
      </motion.div>
    </div>
  );
};
