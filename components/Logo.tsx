/**
 * Identidad de KOI.
 *
 * KoiMark  — el glifo: un koi que remonta en forma de ola y cierra la
 *            silueta de una "K" geométrica, con unos pocos píxeles que se
 *            dispersan (base técnica + trazo orgánico). Cálido koi sólo en
 *            el pez; la "K" en niebla.
 * Logo     — marca + wordmark "KOI" (la "O" es un cuadrado redondeado koi).
 */

export function KoiMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="KOI"
    >
      <defs>
        <linearGradient id="koiTail" x1="24" y1="58" x2="70" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F08359" />
          <stop offset="55%" stopColor="#E4633A" />
          <stop offset="100%" stopColor="#C44A26" />
        </linearGradient>
        <linearGradient id="kFace" x1="58" y1="26" x2="96" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CFD9DC" />
        </linearGradient>
      </defs>

      {/* Sombra/borde 3D de la "K" (detrás, desplazada) */}
      <path
        d="M62 62 94 32 M61 63 96 97"
        stroke="rgb(var(--bg-900))"
        strokeOpacity="0.5"
        strokeWidth="15"
        strokeLinecap="round"
      />
      {/* "K": dos piernas diagonales gruesas (el cuerpo del koi es el asta).
          Usa el color de texto del tema para verse en claro y oscuro. */}
      <path
        d="M60 60 92 30 M59 61 94 95"
        stroke="rgb(var(--text))"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Cola del koi: swoosh naranja que forma el arco inferior */}
      <path
        d="M22 60c0 18 10 34 29 37 9 1 17-4 22-13-7 4-15 4-22 2-11-3-17-12-18-25-2-5-8-5-11-1Z"
        fill="url(#koiTail)"
      />

      {/* Cuerpo del koi (blanco), remontando */}
      <path
        d="M54 20C37 20 24 34 22 54c-2 22 9 41 30 44-6-8-11-19-11-37 0-16 6-28 17-31-1-6-1-10-4-10Z"
        fill="#EAF1F2"
      />
      {/* Aleta dorsal */}
      <path
        d="M40 26c-6-5-12-5-16 0 5 1 10 4 13 9Z"
        fill="#EAF1F2"
      />

      {/* Manchas koi */}
      <ellipse cx="47" cy="37" rx="6.5" ry="5" fill="#E4633A" />
      <ellipse cx="37.5" cy="53" rx="5" ry="6.5" fill="#E4633A" />
      <ellipse cx="52" cy="26" rx="4" ry="3.2" fill="#E4633A" />
      {/* Ojo */}
      <circle cx="52" cy="31" r="2.4" fill="#0A1216" />

      {/* Píxeles que se dispersan */}
      <rect x="99" y="26" width="8" height="8" rx="1.5" fill="#E4633A" />
      <rect x="106" y="16" width="6" height="6" rx="1.5" fill="#F08359" opacity="0.85" />
      <rect x="101" y="40" width="6" height="6" rx="1.5" fill="#8AA1A6" opacity="0.5" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <KoiMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-niebla">
          K<span className="text-koi">O</span>I
        </span>
        <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-junco">
          Solutions
        </span>
      </span>
    </span>
  );
}
