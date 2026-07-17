"use client";

import Link from "next/link";
import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { tiempoRelativo } from "@/lib/portal/store";
import type { EstadoTicket } from "@/lib/portal/types";
import {
  EmptyState,
  EstadoTicketBadge,
  PageHeader,
  PrioridadBadge,
  StatCard,
} from "@/components/portal/ui";
import { TicketIcon, ArrowIcon } from "@/components/icons";

const FILTROS: (EstadoTicket | "todos")[] = [
  "todos",
  "abierto",
  "en_proceso",
  "resuelto",
];

export default function StudioSoporte() {
  const { state } = usePortal();
  const [filtro, setFiltro] = useState<EstadoTicket | "todos">("todos");

  const nombreCliente = (id: string) =>
    state.clientes.find((c) => c.id === id)?.nombreEmpresa ?? id;

  const tickets = [...state.tickets]
    .filter((t) => filtro === "todos" || t.estado === filtro)
    .sort((a, b) => (a.fechaCreacion < b.fechaCreacion ? 1 : -1));

  const abiertos = state.tickets.filter((t) => t.estado === "abierto").length;
  const enProceso = state.tickets.filter((t) => t.estado === "en_proceso").length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Panel interno"
        title="Soporte"
        description="Todas las solicitudes y tickets de los clientes."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Abiertos" value={abiertos} icon={<TicketIcon className="h-5 w-5" />} />
        <StatCard label="En proceso" value={enProceso} />
        <StatCard label="Total" value={state.tickets.length} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
              filtro === f
                ? "border-koi/40 bg-koi/10 text-koi-deep dark:text-koi-light"
                : "border-hair/10 text-junco hover:border-vidrio"
            }`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon={<TicketIcon className="h-8 w-8" />}
          title="Sin tickets"
          description="No hay solicitudes en este filtro."
        />
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li key={t.id}>
              <Link
                href={`/studio/clientes/${t.clienteId}`}
                className="flex items-center gap-4 rounded-xl border border-hair/10 bg-laguna/30 p-4 transition-colors hover:border-vidrio"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-junco">{t.codigo}</span>
                    <PrioridadBadge prioridad={t.prioridad} />
                    <span className="text-xs text-junco">
                      {nombreCliente(t.clienteId)}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-niebla">
                    {t.asunto}
                  </p>
                  <p className="text-xs text-junco">
                    {t.mensajes.length} mensaje(s) ·{" "}
                    {tiempoRelativo(t.mensajes[t.mensajes.length - 1].fecha)}
                  </p>
                </div>
                <EstadoTicketBadge estado={t.estado} />
                <ArrowIcon className="h-4 w-4 shrink-0 text-junco" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
