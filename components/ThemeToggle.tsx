"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getCurrent(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * Alterna entre claro y oscuro. Por defecto el sitio sigue el tema del
 * dispositivo (ver script pre-paint en layout); al pulsar, la preferencia
 * queda guardada y anula la del dispositivo.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getCurrent());
    setMounted(true);

    // Si el usuario no ha elegido, seguir cambios del dispositivo en vivo
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!localStorage.getItem("koi-theme")) {
        const next: Theme = mq.matches ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        setTheme(next);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("koi-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
      }
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-vidrio text-junco transition-colors hover:text-niebla ${className}`}
    >
      {/* Antes de montar, un placeholder neutro evita mismatch de hidratación */}
      {mounted && theme === "dark" ? (
        // Sol
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Luna
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
