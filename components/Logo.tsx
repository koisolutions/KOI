/**
 * Marca de Koi Labs: un pez koi estilizado nadando en un círculo (agua).
 */
export function KoiMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="koiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a5c" />
          <stop offset="60%" stopColor="#ff6a3d" />
          <stop offset="100%" stopColor="#f0492b" />
        </linearGradient>
      </defs>
      {/* anillo de agua */}
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke="url(#koiGrad)"
        strokeWidth="2"
        strokeOpacity="0.35"
      />
      {/* cuerpo del koi (forma de coma / yin) */}
      <path
        d="M24 8c8.8 0 16 6.7 16 15 0 6.6-5 11.2-11 11.2-4.3 0-7.6-2.7-7.6-6.6 0-3 2.2-5.2 5-5.2 2 0 3.4 1.2 3.4 3 0 1.3-.9 2.2-2 2.2"
        stroke="url(#koiGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* ojo */}
      <circle cx="27.5" cy="15.5" r="1.8" fill="#ff8a5c" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <KoiMark className="h-8 w-8 shrink-0" />
      <span className="font-display text-lg font-bold tracking-tight text-white">
        Koi<span className="text-gradient">Labs</span>
      </span>
    </span>
  );
}
