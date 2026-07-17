import type { PortalState } from "./types";
import { SEED } from "./seed";

// =====================================================================
//  Store client-side sobre localStorage. Simula la BD del backend.
//  El PortalProvider envuelve estas funciones y añade reactividad.
// =====================================================================

const KEY = "koi-portal-state";
const VERSION = "v3";
const VKEY = "koi-portal-version";

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export function loadState(): PortalState {
  if (typeof window === "undefined") return clone(SEED);
  try {
    const version = window.localStorage.getItem(VKEY);
    const raw = window.localStorage.getItem(KEY);
    if (version === VERSION && raw) {
      return JSON.parse(raw) as PortalState;
    }
  } catch {
    /* corrupto o inaccesible → reseed */
  }
  const fresh = clone(SEED);
  saveState(fresh);
  return fresh;
}

export function saveState(state: PortalState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    window.localStorage.setItem(VKEY, VERSION);
  } catch {
    /* sin espacio o modo privado: se pierde al recargar, no es crítico en demo */
  }
}

export function resetState(): PortalState {
  const fresh = clone(SEED);
  saveState(fresh);
  return fresh;
}

// ---- ID incremental legible ------------------------------------------
export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---- Formateadores ----------------------------------------------------
export function formatCLP(monto: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(monto);
}

export function formatFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatFechaHora(iso: string): string {
  return new Date(iso).toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function tiempoRelativo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "recién";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  if (d < 30) return `hace ${d} día${d === 1 ? "" : "s"}`;
  return formatFecha(iso);
}

// ---- Descarga simulada de archivos -----------------------------------
// En producción esto sería un GET al backend con X-Accel-Redirect.
export function descargarArchivo(nombre: string, contenido: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre.replace(/\.[^.]+$/, "") + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
