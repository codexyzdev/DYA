import React from 'react';

interface FloatingElement {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  kind: 'leaf' | 'double-leaf' | 'mote';
  color: string;
}

const AMBIENT_ELEMENTS: FloatingElement[] = [
  { id: 1, left: '6%', size: 13, duration: '18s', delay: '-2s', kind: 'leaf', color: '#6B7B5C' },
  { id: 2, left: '15%', size: 15, duration: '23s', delay: '-10s', kind: 'double-leaf', color: '#8A997B' },
  { id: 3, left: '22%', size: 5, duration: '15s', delay: '-7s', kind: 'mote', color: '#C5A059' },
  { id: 4, left: '31%', size: 11, duration: '21s', delay: '-11s', kind: 'leaf', color: '#8A997B' },
  { id: 5, left: '43%', size: 4, duration: '16s', delay: '-4s', kind: 'mote', color: '#C5A059' },
  { id: 6, left: '54%', size: 12, duration: '24s', delay: '-14s', kind: 'leaf', color: '#6B7B5C' },
  { id: 7, left: '64%', size: 14, duration: '19s', delay: '-9s', kind: 'double-leaf', color: '#8A997B' },
  { id: 8, left: '74%', size: 5, duration: '14s', delay: '-1s', kind: 'mote', color: '#C5A059' },
  { id: 9, left: '84%', size: 12, duration: '22s', delay: '-13s', kind: 'leaf', color: '#7D8E6D' },
  { id: 10, left: '92%', size: 13, duration: '20s', delay: '-5s', kind: 'leaf', color: '#8A997B' },
  { id: 11, left: '96%', size: 4, duration: '17s', delay: '-6s', kind: 'mote', color: '#B3583E' },
];

export const AmbientMotionLayer: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      data-testid="ambient-motion-layer"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle warm radial glow behind the stationery */}
      <div className="animate-aura-breathe absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.09)_0%,rgba(179,88,62,0.04)_45%,transparent_72%)] blur-2xl" />

      {/* Outer backdrop swaying olive & eucalyptus framing branches (desktop & tablet margins) */}
      <svg
        viewBox="0 0 240 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-foliage-sway-left hidden md:block absolute -top-8 -left-8 w-56 lg:w-72 text-[#6B7B5C] opacity-[0.18]"
      >
        <path d="M16 14C56 58 84 112 108 178C118 206 128 230 144 256" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M46 50C72 44 90 54 96 70C76 74 58 64 46 50Z" fill="#8A997B" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.9" />
        <path d="M52 84C30 96 26 116 38 128C54 116 58 98 52 84Z" fill="#8A997B" fillOpacity="0.34" stroke="currentColor" strokeWidth="0.9" />
        <path d="M80 112C106 108 122 120 124 136C104 140 88 128 80 112Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
        <path d="M90 156C68 166 64 186 76 196C92 186 96 170 90 156Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
        <path d="M116 190C138 188 152 198 152 214C136 216 122 204 116 190Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.9" />
      </svg>

      <svg
        viewBox="0 0 240 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-foliage-sway hidden md:block absolute -top-8 -right-8 w-56 lg:w-72 text-[#6B7B5C] opacity-[0.18]"
      >
        <path d="M224 16C184 60 156 114 132 180C122 208 112 232 96 258" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M194 52C168 46 150 56 144 72C164 76 182 66 194 52Z" fill="#8A997B" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.9" />
        <path d="M188 86C210 98 214 118 202 130C186 118 182 100 188 86Z" fill="#8A997B" fillOpacity="0.34" stroke="currentColor" strokeWidth="0.9" />
        <path d="M160 114C134 110 118 122 116 138C136 142 152 130 160 114Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
        <path d="M150 158C172 168 176 188 164 198C148 188 144 172 150 158Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
        <path d="M124 192C102 190 88 200 88 216C104 218 118 206 124 192Z" fill="#8A997B" fillOpacity="0.32" stroke="currentColor" strokeWidth="0.9" />
      </svg>

      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-foliage-sway-gentle hidden md:block absolute -bottom-8 -left-6 w-52 lg:w-64 text-[#6B7B5C] opacity-[0.17]"
      >
        <path d="M14 206C54 166 96 132 146 102" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M52 170C46 148 58 132 76 128C76 146 66 160 52 170Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
        <path d="M84 152C104 160 120 152 128 136C110 132 94 140 84 152Z" fill="#8A997B" fillOpacity="0.34" stroke="currentColor" strokeWidth="0.9" />
        <path d="M104 124C104 102 116 88 134 88C132 106 120 118 104 124Z" fill="#8A997B" fillOpacity="0.36" stroke="currentColor" strokeWidth="0.9" />
        <path d="M128 114C146 120 160 112 166 98C152 94 138 102 128 114Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
      </svg>

      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-foliage-sway-bottom hidden md:block absolute -bottom-8 -right-6 w-52 lg:w-64 text-[#6B7B5C] opacity-[0.17]"
      >
        <path d="M206 206C166 166 124 132 74 102" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M168 170C174 148 162 132 144 128C144 146 154 160 168 170Z" fill="#8A997B" fillOpacity="0.38" stroke="currentColor" strokeWidth="0.9" />
        <path d="M136 152C116 160 100 152 92 136C110 132 126 140 136 152Z" fill="#8A997B" fillOpacity="0.34" stroke="currentColor" strokeWidth="0.9" />
        <path d="M116 124C116 102 104 88 86 88C88 106 100 118 116 124Z" fill="#8A997B" fillOpacity="0.36" stroke="currentColor" strokeWidth="0.9" />
        <path d="M92 114C74 120 60 112 54 98C68 94 82 102 92 114Z" fill="#8A997B" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9" />
      </svg>

      {AMBIENT_ELEMENTS.map((item) => (
        <span
          key={item.id}
          className="animate-petal-drift absolute top-0 block"
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        >
          {item.kind === 'leaf' && (
            <svg
              width={item.size}
              height={item.size * 1.45}
              viewBox="0 0 12 18"
              fill="none"
            >
              <path
                d="M6 1C9.5 4.8 10.5 11 6 17C1.5 11 2.5 4.8 6 1Z"
                fill={item.color}
                fillOpacity="0.35"
              />
              <path
                d="M6 2.5V15.5"
                stroke={item.color}
                strokeOpacity="0.45"
                strokeWidth="0.6"
              />
            </svg>
          )}
          {item.kind === 'double-leaf' && (
            <svg
              width={item.size * 1.35}
              height={item.size * 1.4}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 17C10 11 10 6 11 2"
                stroke={item.color}
                strokeOpacity="0.42"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M10 12C6 11 3.5 8 4 4.5C7 5.2 9.2 8 10 12Z"
                fill={item.color}
                fillOpacity="0.32"
              />
              <path
                d="M10.5 9.5C14.5 8.5 17 5.5 16.5 2C13.5 2.7 11.2 5.5 10.5 9.5Z"
                fill={item.color}
                fillOpacity="0.28"
              />
            </svg>
          )}
          {item.kind === 'mote' && (
            <span
              className="block rounded-full"
              style={{
                width: item.size,
                height: item.size,
                backgroundColor: item.color,
                opacity: 0.36,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};
