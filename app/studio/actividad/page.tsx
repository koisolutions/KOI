"use client";

import Link from "next/link";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora } from "@/lib/portal/store";
import { Badge, EmptyState, PageHeader } from "@/components/portal/ui";
import { ClockIcon } from "@/components/icons";

export default function StudioActividad() {
  const { state } = usePortal();
  const items = [...state.actividad].sort((a, b) =>
    a.fecha < b.fecha ? 1 : -1
  );
  const nombreCliente = (id: string) =>
    state.clientes.find((c) => c.id === id)?.nombreEmpresa ?? id;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Panel interno"
        title="Actividad"
        description="Historial de acciones de todos los clientes: descargas, subidas, formularios y facturación."
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<ClockIcon className="h-8 w-8" />}
          title="Sin actividad"
        />
      ) : (
        <ul className="divide-y divide-hair/10 overflow-hidden rounded-xl border border-hair/10">
          {items.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-4 bg-laguna/20 p-4"
            >
              <div className="min-w-0">
                <p className="text-sm text-niebla">{a.detalle}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-junco">
                  <Link
                    href={`/studio/clientes/${a.clienteId}`}
                    className="text-indigo-light hover:text-koi"
                  >
                    {nombreCliente(a.clienteId)}
                  </Link>
                  <span>· {a.actor}</span>
                  <Badge tone={a.rol === "admin_koi" ? "koi" : "indigo"}>
                    {a.rol === "admin_koi" ? "KOI" : "Cliente"}
                  </Badge>
                </p>
              </div>
              <span className="shrink-0 font-mono text-xs text-junco/70">
                {formatFechaHora(a.fecha)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
