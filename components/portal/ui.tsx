"use client";

import { useEffect } from "react";
import type {
  CategoriaDoc,
  EstadoCliente,
  EstadoFactura,
  EstadoReunion,
  EstadoTicket,
  PrioridadTicket,
  SubidoPor,
} from "@/lib/portal/types";

// ---- Badge genérico ---------------------------------------------------
type Tone = "teal" | "indigo" | "koi" | "muted" | "green";

const toneClasses: Record<Tone, string> = {
  teal: "bg-water/10 text-teal-700 dark:text-teal-300 border-water/30",
  green:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  indigo: "bg-indigo/12 text-indigo dark:text-indigo-light border-indigo/30",
  koi: "bg-koi/12 text-koi-deep dark:text-koi-light border-koi/30",
  muted: "bg-veil/[0.05] text-junco border-hair/15",
};

export function Badge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

const estadoClienteTone: Record<EstadoCliente, Tone> = {
  activo: "green",
  prospecto: "indigo",
  pausado: "koi",
  finalizado: "muted",
};

export function EstadoClienteBadge({ estado }: { estado: EstadoCliente }) {
  return <Badge tone={estadoClienteTone[estado]}>{estado}</Badge>;
}

const estadoFacturaTone: Record<EstadoFactura, Tone> = {
  pagada: "green",
  pendiente: "indigo",
  vencida: "koi",
};

export function EstadoFacturaBadge({ estado }: { estado: EstadoFactura }) {
  return <Badge tone={estadoFacturaTone[estado]}>{estado}</Badge>;
}

const categoriaLabel: Record<CategoriaDoc, string> = {
  contrato: "Contrato",
  welcome_doc: "Welcome doc",
  estrategia: "Estrategia",
  reporte: "Reporte",
  otro: "Otro",
};

export function CategoriaBadge({ categoria }: { categoria: CategoriaDoc }) {
  return <Badge tone="muted">{categoriaLabel[categoria]}</Badge>;
}

export function SubidoPorBadge({ por }: { por: SubidoPor }) {
  return (
    <Badge tone={por === "KOI" ? "koi" : "indigo"}>
      {por === "KOI" ? "KOI" : "Cliente"}
    </Badge>
  );
}

const estadoTicketTone: Record<EstadoTicket, Tone> = {
  abierto: "indigo",
  en_proceso: "koi",
  resuelto: "green",
};
const estadoTicketLabel: Record<EstadoTicket, string> = {
  abierto: "Abierto",
  en_proceso: "En proceso",
  resuelto: "Resuelto",
};

export function EstadoTicketBadge({ estado }: { estado: EstadoTicket }) {
  return <Badge tone={estadoTicketTone[estado]}>{estadoTicketLabel[estado]}</Badge>;
}

const prioridadTone: Record<PrioridadTicket, Tone> = {
  baja: "muted",
  media: "indigo",
  alta: "koi",
};

export function PrioridadBadge({ prioridad }: { prioridad: PrioridadTicket }) {
  return <Badge tone={prioridadTone[prioridad]}>{prioridad}</Badge>;
}

const estadoReunionTone: Record<EstadoReunion, Tone> = {
  solicitada: "indigo",
  confirmada: "green",
  cancelada: "muted",
};

export function EstadoReunionBadge({ estado }: { estado: EstadoReunion }) {
  return <Badge tone={estadoReunionTone[estado]}>{estado}</Badge>;
}

// ---- Botón ------------------------------------------------------------
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "subtle";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    primary: "bg-koi text-[#0B1418] hover:bg-koi-light",
    ghost: "border border-vidrio text-niebla hover:border-indigo",
    subtle: "bg-veil/[0.06] text-niebla hover:bg-veil/[0.12]",
  }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

// ---- Encabezado de página --------------------------------------------
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-niebla sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-junco">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ---- Tarjeta de métrica ----------------------------------------------
export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-junco">
          {label}
        </span>
        {icon && <span className="text-indigo-light">{icon}</span>}
      </div>
      <div className="mt-3 font-display text-2xl font-semibold text-niebla">
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-junco">{hint}</div>}
    </div>
  );
}

// ---- Barra de progreso -----------------------------------------------
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-veil/[0.08]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-koi to-indigo transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// ---- Estado vacío -----------------------------------------------------
export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hair/15 px-6 py-14 text-center">
      {icon && <div className="mb-3 text-junco/60">{icon}</div>}
      <p className="font-display text-base font-semibold text-niebla">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-junco">{description}</p>
      )}
    </div>
  );
}

// ---- Modal ------------------------------------------------------------
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-[#050a0d]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-hair/10 bg-laguna shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-hair/10 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-niebla">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg p-1 text-junco transition-colors hover:bg-veil/[0.06] hover:text-niebla"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ---- Campos de formulario --------------------------------------------
const fieldClass =
  "w-full rounded-lg border border-vidrio/60 bg-sumi-900/60 px-3.5 py-2.5 text-sm text-niebla placeholder:text-junco/50 transition-colors focus:border-indigo focus:outline-none";

export function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-junco">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-koi-deep dark:text-koi-light">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-junco/70">{hint}</span>
      ) : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClass} ${props.className ?? ""}`} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={`${fieldClass} resize-none ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${fieldClass} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}
