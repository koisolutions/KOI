"use client";

import Link from "next/link";
import { usePortal } from "@/lib/portal/PortalProvider";
import {
  formatCLP,
  formatFecha,
  formatFechaHora,
  tiempoRelativo,
} from "@/lib/portal/store";
import {
  Badge,
  EstadoFacturaBadge,
  PageHeader,
  ProgressBar,
  StatCard,
} from "@/components/portal/ui";
import {
  DocIcon,
  InvoiceIcon,
  ArrowIcon,
  BellIcon,
} from "@/components/icons";
import type { FaseProyecto } from "@/lib/portal/types";

const FASES: FaseProyecto[] = [
  "Contrato",
  "Estrategia",
  "Desarrollo",
  "Revisión",
  "Entregado",
];

export default function PortalInicio() {
  const { user, cliente, state } = usePortal();
  if (!cliente || !user) return null;

  const proyecto = state.proyectos.find((p) => p.clienteId === cliente.id);
  const docs = state.documentos.filter((d) => d.clienteId === cliente.id);
  const facturas = state.facturas.filter((f) => f.clienteId === cliente.id);
  const porCobrar = facturas
    .filter((f) => f.estado !== "pagada")
    .reduce((acc, f) => acc + f.monto, 0);
  const actividad = state.actividad
    .filter((a) => a.clienteId === cliente.id)
    .slice(0, 5);
  const faseIdx = proyecto ? FASES.indexOf(proyecto.faseActual) : -1;

  // ---- Recordatorios ---------------------------------------------------
  const now = Date.now();
  const facturasPend = facturas.filter((f) => f.estado !== "pagada");
  const proximas = state.reuniones
    .filter(
      (r) =>
        r.clienteId === cliente.id &&
        r.estado !== "cancelada" &&
        new Date(r.fecha).getTime() > now
    )
    .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  const ticketsAbiertos = state.tickets.filter(
    (t) => t.clienteId === cliente.id && t.estado !== "resuelto"
  );
  const formPend = !state.formularios.find((f) => f.clienteId === cliente.id)
    ?.enviado;

  type Rec = { tone: "koi" | "indigo" | "green"; text: string; href: string; cta: string };
  const recordatorios: Rec[] = [];
  facturasPend.forEach((f) =>
    recordatorios.push({
      tone: f.estado === "vencida" ? "koi" : "indigo",
      text: `Factura N° ${f.numero} ${
        f.estado === "vencida" ? "vencida" : "por pagar"
      } — ${formatCLP(f.monto)}`,
      href: "/portal/facturas",
      cta: "Pagar",
    })
  );
  proximas.slice(0, 2).forEach((r) =>
    recordatorios.push({
      tone: "green",
      text: `Reunión ${
        r.estado === "confirmada" ? "confirmada" : "solicitada"
      }: ${r.motivo} — ${formatFechaHora(r.fecha)}`,
      href: "/portal/reuniones",
      cta: "Ver",
    })
  );
  if (ticketsAbiertos.length)
    recordatorios.push({
      tone: "indigo",
      text: `${ticketsAbiertos.length} solicitud(es) de soporte en curso`,
      href: "/portal/soporte",
      cta: "Ver",
    });
  if (formPend)
    recordatorios.push({
      tone: "koi",
      text: "Completa tu formulario de onboarding",
      href: "/portal/formulario",
      cta: "Completar",
    });

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={cliente.nombreEmpresa}
        title={`Hola, ${user.nombre.split(" ")[0]} 👋`}
        description="Este es el resumen de tu proyecto con KOI."
      />

      {/* Recordatorios */}
      {recordatorios.length > 0 && (
        <section className="panel p-5">
          <div className="mb-3 flex items-center gap-2">
            <BellIcon className="h-4 w-4 text-koi" />
            <h2 className="font-display text-base font-semibold text-niebla">
              Recordatorios
            </h2>
          </div>
          <ul className="space-y-2">
            {recordatorios.map((r, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-lg border border-hair/10 bg-veil/[0.03] px-4 py-2.5"
              >
                <span className="flex items-center gap-2.5 text-sm text-niebla">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      r.tone === "koi"
                        ? "bg-koi"
                        : r.tone === "green"
                        ? "bg-emerald-400"
                        : "bg-indigo-light"
                    }`}
                  />
                  {r.text}
                </span>
                <Link
                  href={r.href}
                  className="shrink-0 text-xs font-medium text-indigo-light hover:text-koi"
                >
                  {r.cta} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Estado del proyecto */}
      {proyecto && (
        <section className="panel p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="section-label">Tu proyecto</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-niebla">
                {proyecto.nombre}
              </h2>
              <p className="mt-1 max-w-lg text-sm text-junco">
                {proyecto.resumen}
              </p>
            </div>
            <Badge tone="koi">{proyecto.faseActual}</Badge>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-junco">
              <span>Avance general</span>
              <span className="font-mono">{proyecto.progreso}%</span>
            </div>
            <ProgressBar value={proyecto.progreso} />
          </div>

          {/* Línea de fases */}
          <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {FASES.map((fase, i) => {
              const done = i < faseIdx;
              const current = i === faseIdx;
              return (
                <li
                  key={fase}
                  className={`rounded-lg border px-3 py-2 text-center text-xs ${
                    current
                      ? "border-koi/40 bg-koi/10 text-koi-deep dark:text-koi-light"
                      : done
                      ? "border-hair/10 text-niebla"
                      : "border-hair/10 text-junco/60"
                  }`}
                >
                  <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                  <div className="mt-0.5 font-medium">{fase}</div>
                </li>
              );
            })}
          </ol>

          <p className="mt-4 text-xs text-junco">
            Entrega estimada:{" "}
            <span className="text-niebla">
              {formatFecha(proyecto.fechaEstimadaEntrega)}
            </span>
          </p>
        </section>
      )}

      {/* Métricas rápidas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Documentos"
          value={docs.length}
          hint="Disponibles en tu portal"
          icon={<DocIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Por cobrar"
          value={formatCLP(porCobrar)}
          hint={`${facturas.filter((f) => f.estado !== "pagada").length} factura(s) pendiente(s)`}
          icon={<InvoiceIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Formulario"
          value={
            state.formularios.find((f) => f.clienteId === cliente.id)?.enviado
              ? "Completo"
              : "Pendiente"
          }
          hint="Onboarding"
        />
      </div>

      {/* Documentos recientes + actividad */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-niebla">
              Documentos recientes
            </h3>
            <Link
              href="/portal/documentos"
              className="inline-flex items-center gap-1 text-xs text-indigo-light hover:text-koi"
            >
              Ver todos <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {docs.slice(0, 4).map((d) => (
              <li key={d.id} className="flex items-center gap-3">
                <DocIcon className="h-5 w-5 shrink-0 text-indigo-light" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-niebla">{d.nombre}</p>
                  <p className="text-xs text-junco">
                    {tiempoRelativo(d.fechaSubida)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel p-6">
          <h3 className="font-display text-base font-semibold text-niebla">
            Facturas
          </h3>
          <ul className="mt-4 space-y-3">
            {facturas.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-niebla">
                    N° {f.numero} — {formatCLP(f.monto)}
                  </p>
                  <p className="truncate text-xs text-junco">{f.concepto}</p>
                </div>
                <EstadoFacturaBadge estado={f.estado} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Actividad reciente */}
      {actividad.length > 0 && (
        <section className="panel p-6">
          <h3 className="font-display text-base font-semibold text-niebla">
            Actividad reciente
          </h3>
          <ul className="mt-4 space-y-2.5">
            {actividad.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-junco">{a.detalle}</span>
                <span className="shrink-0 font-mono text-xs text-junco/70">
                  {tiempoRelativo(a.fecha)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
