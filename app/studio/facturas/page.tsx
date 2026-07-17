"use client";

import Link from "next/link";
import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatCLP, formatFecha } from "@/lib/portal/store";
import type { EstadoFactura } from "@/lib/portal/types";
import {
  EstadoFacturaBadge,
  PageHeader,
  StatCard,
} from "@/components/portal/ui";
import { DownloadIcon, InvoiceIcon } from "@/components/icons";

const FILTROS: (EstadoFactura | "todas")[] = [
  "todas",
  "pendiente",
  "vencida",
  "pagada",
];

export default function StudioFacturas() {
  const { state, marcarFacturaPagada, descargarFactura } = usePortal();
  const [filtro, setFiltro] = useState<EstadoFactura | "todas">("todas");

  const nombreCliente = (id: string) =>
    state.clientes.find((c) => c.id === id)?.nombreEmpresa ?? id;

  const facturas = [...state.facturas]
    .filter((f) => filtro === "todas" || f.estado === filtro)
    .sort((a, b) => (a.fechaEmision < b.fechaEmision ? 1 : -1));

  const total = state.facturas.reduce((a, f) => a + f.monto, 0);
  const pagado = state.facturas
    .filter((f) => f.estado === "pagada")
    .reduce((a, f) => a + f.monto, 0);
  const porCobrar = total - pagado;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Panel interno"
        title="Facturación"
        description="Todas las facturas emitidas a los clientes de KOI."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Facturado" value={formatCLP(total)} icon={<InvoiceIcon className="h-5 w-5" />} />
        <StatCard label="Pagado" value={formatCLP(pagado)} />
        <StatCard label="Por cobrar" value={formatCLP(porCobrar)} />
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
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-hair/10">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-hair/10 text-left font-mono text-xs uppercase tracking-wider text-junco">
              <th className="px-4 py-3 font-medium">N°</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Concepto</th>
              <th className="px-4 py-3 font-medium">Monto</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-hair/10">
            {facturas.map((f) => (
              <tr key={f.id} className="bg-laguna/20 hover:bg-laguna/40">
                <td className="px-4 py-3 font-mono text-junco">{f.numero}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/studio/clientes/${f.clienteId}`}
                    className="text-niebla hover:text-koi"
                  >
                    {nombreCliente(f.clienteId)}
                  </Link>
                  <div className="text-xs text-junco">
                    vence {formatFecha(f.fechaVencimiento)}
                  </div>
                </td>
                <td className="px-4 py-3 text-junco">{f.concepto}</td>
                <td className="px-4 py-3 font-medium text-niebla">
                  {formatCLP(f.monto)}
                </td>
                <td className="px-4 py-3">
                  <EstadoFacturaBadge estado={f.estado} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {f.estado !== "pagada" && (
                      <button
                        onClick={() => marcarFacturaPagada(f.id)}
                        className="rounded-lg border border-vidrio px-2.5 py-1.5 text-xs font-medium text-junco transition-colors hover:border-emerald-500/50 hover:text-emerald-500"
                      >
                        Marcar pagada
                      </button>
                    )}
                    <button
                      onClick={() => descargarFactura(f.id)}
                      aria-label={`Descargar factura ${f.numero}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco transition-colors hover:border-indigo hover:text-niebla"
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
