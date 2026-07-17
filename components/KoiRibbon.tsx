"use client";

import { useEffect, useState } from "react";

/**
 * Elemento firma: un koi visto desde arriba, hecho con formas rellenas
 * (cuerpo crema + manchas kohaku + aletas y cola en abanico + barbillas).
 * Reveal suave + nado (drift) en bucle. Estático con prefers-reduced-motion.
 */
export default function KoiRibbon({ className = "" }: { className?: string }) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 120);
    return () => clearTimeout(t);
  }, []);

  const pop = (delay: number): React.CSSProperties => ({
    opacity: drawn ? 1 : 0,
    transform: drawn ? "scale(1)" : "scale(0.5)",
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: `opacity 0.45s ease ${delay}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
  });

  return (
    <svg
      viewBox="0 0 320 340"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="koiPatch" x1="120" y1="80" x2="210" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F08359" />
          <stop offset="55%" stopColor="#E4633A" />
          <stop offset="100%" stopColor="#C44A26" />
        </linearGradient>
      </defs>

      {/* Onda de agua sutil */}
      <path
        d="M40 316C120 302 200 304 290 320"
        stroke="rgb(var(--indigo))"
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ opacity: drawn ? 1 : 0, transition: "opacity 1s ease 700ms" }}
      />

      {/* Reveal general */}
      <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.7s ease" }}>
        {/* Orientación */}
        <g transform="rotate(16 165 170)">
          {/* Nado continuo */}
          <g className={drawn ? "koi-swim" : ""}>
            {/* Aletas pectorales (detrás del cuerpo) */}
            <ellipse cx="116" cy="150" rx="13" ry="31" fill="#E7DECF" opacity="0.9" transform="rotate(-42 116 150)" />
            <ellipse cx="214" cy="150" rx="13" ry="31" fill="#E7DECF" opacity="0.9" transform="rotate(42 214 150)" />

            {/* Cola en abanico (detrás) */}
            <ellipse cx="150" cy="294" rx="17" ry="35" fill="#EDE6D9" transform="rotate(22 150 294)" />
            <ellipse cx="181" cy="294" rx="17" ry="35" fill="#EDE6D9" transform="rotate(-22 181 294)" />

            {/* Cuerpo del koi (crema) */}
            <ellipse
              cx="165"
              cy="165"
              rx="47"
              ry="97"
              fill="#F4EEE2"
              stroke="rgb(var(--text) / 0.12)"
              strokeWidth="1.5"
            />
            {/* pedúnculo hacia la cola */}
            <path d="M150 250c6 20 24 20 30 0-4 22-26 22-30 0Z" fill="#F4EEE2" />

            {/* Manchas kohaku (aparecen en secuencia) */}
            <ellipse cx="165" cy="100" rx="28" ry="18" fill="url(#koiPatch)" style={pop(500)} />
            <ellipse cx="146" cy="162" rx="20" ry="16" fill="url(#koiPatch)" transform="rotate(18 146 162)" style={pop(650)} />
            <ellipse cx="184" cy="214" rx="15" ry="20" fill="url(#koiPatch)" transform="rotate(-16 184 214)" style={pop(800)} />
            {/* mancha oscura pequeña */}
            <ellipse cx="150" cy="128" rx="9" ry="7" fill="#2A1712" opacity="0.5" transform="rotate(20 150 128)" style={pop(750)} />

            {/* Ojos */}
            <circle cx="150" cy="102" r="5" fill="#0A1216" style={pop(950)} />
            <circle cx="180" cy="102" r="5" fill="#0A1216" style={pop(950)} />

            {/* Barbillas / bigotes */}
            <path
              d="M158 74c-5-6-11-9-16-8"
              stroke="#C44A26"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.5s ease 1050ms" }}
            />
            <path
              d="M172 74c5-6 11-9 16-8"
              stroke="#C44A26"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.5s ease 1100ms" }}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
