"use client";

import Link from "next/link";
import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora } from "@/lib/portal/store";
import {
  Badge,
  Button,
  EstadoReunionBadge,
  PageHeader,
} from "@/components/portal/ui";
import { ArrowIcon } from "@/components/icons";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function StudioAgenda() {
  const { state, confirmarReunion } = usePortal();
  const hoy = new Date();
  const [cursor, setCursor] = useState({ y: hoy.getFullYear(), m: hoy.getMonth() });

  const nombreCliente = (id: string) =>
    state.clientes.find((c) => c.id === id)?.nombreEmpresa ?? id;

  const reuniones = state.reuniones.filter((r) => r.estado !== "cancelada");

  const primerDia = new Date(cursor.y, cursor.m, 1);
  const offset = (primerDia.getDay() + 6) % 7;
  const diasEnMes = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const celdas: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];
  const delDia = (dia: number) =>
    reuniones.filter((r) => {
      const d = new Date(r.fecha);
      return (
        d.getFullYear() === cursor.y &&
        d.getMonth() === cursor.m &&
        d.getDate() === dia
      );
    });
  const mover = (delta: number) => {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };
  const esHoy = (dia: number) =>
    cursor.y === hoy.getFullYear() &&
    cursor.m === hoy.getMonth() &&
    dia === hoy.getDate();

  const proximas = reuniones
    .filter((r) => new Date(r.fecha).getTime() > Date.now())
    .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Panel interno"
        title="Agenda"
        description="Todas las reuniones agendadas con los clientes de KOI."
      />

      {/* Calendario */}
      <div className="rounded-xl border border-hair/10 bg-laguna/20 p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => mover(-1)}
            aria-label="Mes anterior"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco hover:text-niebla"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <span className="font-display text-base font-semibold capitalize text-niebla">
            {MESES[cursor.m]} {cursor.y}
          </span>
          <button
            onClick={() => mover(1)}
            aria-label="Mes siguiente"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco hover:text-niebla"
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {DIAS.map((d) => (
            <div key={d} className="py-1 font-mono text-[0.65rem] uppercase text-junco">
              {d}
            </div>
          ))}
          {celdas.map((dia, i) => {
            if (dia === null) return <div key={`e${i}`} />;
            const items = delDia(dia);
            return (
              <div
                key={dia}
                className={`min-h-[72px] rounded-lg border p-1.5 text-left ${
                  esHoy(dia) ? "border-koi/40 bg-koi/[0.06]" : "border-hair/10"
                }`}
              >
                <span
                  className={`text-xs ${
                    esHoy(dia)
                      ? "font-bold text-koi-deep dark:text-koi-light"
                      : "text-junco"
                  }`}
                >
                  {dia}
                </span>
                <div className="mt-1 space-y-1">
                  {items.map((r) => (
                    <Link
                      key={r.id}
                      href={`/studio/clientes/${r.clienteId}`}
                      title={`${nombreCliente(r.clienteId)} · ${r.motivo} · ${formatFechaHora(r.fecha)}`}
                      className={`block truncate rounded px-1 py-0.5 text-[0.6rem] ${
                        r.estado === "confirmada"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : "bg-indigo/15 text-indigo dark:text-indigo-light"
                      }`}
                    >
                      {new Date(r.fecha).toLocaleTimeString("es-CL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {nombreCliente(r.clienteId)}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Próximas */}
      <section>
        <h2 className="mb-3 font-display text-base font-semibold text-niebla">
          Próximas reuniones
        </h2>
        {proximas.length === 0 ? (
          <p className="text-sm text-junco">No hay reuniones futuras.</p>
        ) : (
          <ul className="space-y-3">
            {proximas.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-hair/10 bg-laguna/30 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-niebla">{r.motivo}</p>
                  <p className="mt-0.5 text-xs text-junco">
                    <Link
                      href={`/studio/clientes/${r.clienteId}`}
                      className="text-indigo-light hover:text-koi"
                    >
                      {nombreCliente(r.clienteId)}
                    </Link>{" "}
                    · {formatFechaHora(r.fecha)} · {r.modalidad}
                  </p>
                </div>
                <Badge tone="muted">{r.modalidad}</Badge>
                <EstadoReunionBadge estado={r.estado} />
                {r.estado === "solicitada" && (
                  <Button variant="subtle" onClick={() => confirmarReunion(r.id)}>
                    Confirmar
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
