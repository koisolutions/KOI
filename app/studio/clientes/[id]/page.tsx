"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFecha, tiempoRelativo } from "@/lib/portal/store";
import type { FaseProyecto } from "@/lib/portal/types";
import {
  Badge,
  Button,
  EstadoClienteBadge,
  EmptyState,
  ProgressBar,
} from "@/components/portal/ui";
import DocumentosPanel from "@/components/portal/DocumentosPanel";
import FacturasPanel from "@/components/portal/FacturasPanel";
import FormularioPanel from "@/components/portal/FormularioPanel";
import NotasPanel from "@/components/portal/NotasPanel";
import SoportePanel from "@/components/portal/SoportePanel";
import ReunionesPanel from "@/components/portal/ReunionesPanel";
import GeneradorPanel from "@/components/portal/GeneradorPanel";
import MensajesPanel from "@/components/portal/MensajesPanel";
import { ArrowIcon, ClockIcon } from "@/components/icons";

const FASES: FaseProyecto[] = [
  "Contrato",
  "Estrategia",
  "Desarrollo",
  "Revisión",
  "Entregado",
];

const TABS = [
  "Resumen",
  "Documentos",
  "Generar",
  "Facturas",
  "Soporte",
  "Reuniones",
  "Mensajes",
  "Formulario",
  "Actividad",
  "Notas",
] as const;
type Tab = (typeof TABS)[number];

export default function ClienteDetalle() {
  const params = useParams();
  const id = String(params.id);
  const { state, actualizarProyecto } = usePortal();
  const [tab, setTab] = useState<Tab>("Resumen");

  const cliente = state.clientes.find((c) => c.id === id);
  const proyecto = state.proyectos.find((p) => p.clienteId === id);

  if (!cliente) {
    return (
      <EmptyState
        title="Cliente no encontrado"
        description="Vuelve al listado y selecciona un cliente."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <Link
          href="/studio/clientes"
          className="inline-flex items-center gap-2 text-sm text-junco transition-colors hover:text-niebla"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          Clientes
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-niebla sm:text-3xl">
              {cliente.nombreEmpresa}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-junco">
              <span className="font-mono">{cliente.rut}</span>
              <span>{cliente.contactoPrincipal}</span>
              <span>{cliente.email}</span>
              <span>{cliente.telefono}</span>
            </div>
          </div>
          <EstadoClienteBadge estado={cliente.estado} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-hair/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t
                ? "border-koi text-niebla"
                : "border-transparent text-junco hover:text-niebla"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {tab === "Resumen" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-5">
              <p className="section-label">Cliente</p>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Empresa" v={cliente.nombreEmpresa} />
                <Row k="RUT" v={cliente.rut} />
                <Row k="Contacto" v={cliente.contactoPrincipal} />
                <Row k="Email" v={cliente.email} />
                <Row k="Teléfono" v={cliente.telefono} />
                <Row k="Inicio" v={formatFecha(cliente.fechaInicio)} />
              </dl>
            </div>

            {proyecto ? (
              <div className="panel p-5">
                <p className="section-label">Proyecto</p>
                <h3 className="mt-4 font-display text-lg font-semibold text-niebla">
                  {proyecto.nombre}
                </h3>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-junco">
                    <span>Avance</span>
                    <span className="font-mono">{proyecto.progreso}%</span>
                  </div>
                  <ProgressBar value={proyecto.progreso} />
                </div>

                <div className="mt-5 space-y-3">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-junco">
                      Fase actual
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {FASES.map((fase) => (
                        <button
                          key={fase}
                          onClick={() =>
                            actualizarProyecto(cliente.id, { faseActual: fase })
                          }
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            proyecto.faseActual === fase
                              ? "border-koi/40 bg-koi/10 text-koi-deep dark:text-koi-light"
                              : "border-hair/10 text-junco hover:border-vidrio"
                          }`}
                        >
                          {fase}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-junco">
                      Progreso: {proyecto.progreso}%
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={proyecto.progreso}
                      onChange={(e) =>
                        actualizarProyecto(cliente.id, {
                          progreso: Number(e.target.value),
                        })
                      }
                      className="w-full accent-koi"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <EmptyState title="Sin proyecto" description="Este cliente aún no tiene un proyecto en curso." />
            )}
          </div>
        </div>
      )}

      {tab === "Documentos" && (
        <DocumentosPanel clienteId={cliente.id} uploaderRole="admin_koi" />
      )}
      {tab === "Generar" && <GeneradorPanel clienteId={cliente.id} />}
      {tab === "Facturas" && (
        <FacturasPanel clienteId={cliente.id} canManage />
      )}
      {tab === "Soporte" && (
        <SoportePanel clienteId={cliente.id} actorRole="admin_koi" />
      )}
      {tab === "Reuniones" && (
        <ReunionesPanel clienteId={cliente.id} canConfirm />
      )}
      {tab === "Mensajes" && (
        <MensajesPanel clienteId={cliente.id} actorRole="admin_koi" />
      )}
      {tab === "Formulario" && (
        <FormularioPanel clienteId={cliente.id} editable={false} />
      )}
      {tab === "Actividad" && <ActividadCliente clienteId={cliente.id} />}
      {tab === "Notas" && <NotasPanel clienteId={cliente.id} />}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-junco">{k}</dt>
      <dd className="text-right font-medium text-niebla">{v}</dd>
    </div>
  );
}

function ActividadCliente({ clienteId }: { clienteId: string }) {
  const { state } = usePortal();
  const items = state.actividad
    .filter((a) => a.clienteId === clienteId)
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ClockIcon className="h-8 w-8" />}
        title="Sin actividad"
        description="Todavía no hay registros para este cliente."
      />
    );
  }

  return (
    <ul className="space-y-1">
      {items.map((a) => (
        <li
          key={a.id}
          className="flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-veil/[0.04]"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-light" />
            <div>
              <p className="text-sm text-niebla">{a.detalle}</p>
              <p className="text-xs text-junco">
                {a.actor} ·{" "}
                <Badge tone={a.rol === "admin_koi" ? "koi" : "indigo"}>
                  {a.rol === "admin_koi" ? "KOI" : "Cliente"}
                </Badge>
              </p>
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs text-junco/70">
            {tiempoRelativo(a.fecha)}
          </span>
        </li>
      ))}
    </ul>
  );
}
