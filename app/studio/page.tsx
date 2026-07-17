"use client";

import Link from "next/link";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatCLP, formatFechaHora, tiempoRelativo } from "@/lib/portal/store";
import {
  Badge,
  EstadoTicketBadge,
  PageHeader,
  StatCard,
} from "@/components/portal/ui";
import {
  UsersIcon,
  InvoiceIcon,
  TicketIcon,
  CalendarIcon,
  ArrowIcon,
} from "@/components/icons";

export default function StudioInicio() {
  const { user, state } = usePortal();

  const activos = state.clientes.filter((c) => c.estado === "activo").length;
  const facturado = state.facturas.reduce((a, f) => a + f.monto, 0);
  const pagado = state.facturas
    .filter((f) => f.estado === "pagada")
    .reduce((a, f) => a + f.monto, 0);
  const porCobrar = facturado - pagado;
  const ticketsAbiertos = state.tickets.filter((t) => t.estado !== "resuelto");
  const proximas = state.reuniones
    .filter((r) => r.estado !== "cancelada" && new Date(r.fecha).getTime() > Date.now())
    .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  const formPendientes = state.clientes.filter(
    (c) => !state.formularios.find((f) => f.clienteId === c.id)?.enviado
  );
  const actividad = [...state.actividad]
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
    .slice(0, 6);

  const nombreCliente = (id: string) =>
    state.clientes.find((c) => c.id === id)?.nombreEmpresa ?? id;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Panel interno"
        title={`Hola, ${user?.nombre.split(" ")[0] ?? "equipo"}`}
        description="Resumen de todos los clientes de KOI."
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Clientes"
          value={state.clientes.length}
          hint={`${activos} activos`}
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Por cobrar"
          value={formatCLP(porCobrar)}
          hint={`${formatCLP(pagado)} pagado`}
          icon={<InvoiceIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Tickets abiertos"
          value={ticketsAbiertos.length}
          hint="Soporte / cambios"
          icon={<TicketIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Reuniones próximas"
          value={proximas.length}
          hint="Agendadas"
          icon={<CalendarIcon className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximas reuniones */}
        <section className="panel p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-niebla">
              Próximas reuniones
            </h2>
            <Link href="/studio/agenda" className="text-xs text-indigo-light hover:text-koi">
              Ver agenda →
            </Link>
          </div>
          {proximas.length === 0 ? (
            <p className="text-sm text-junco">No hay reuniones agendadas.</p>
          ) : (
            <ul className="space-y-3">
              {proximas.slice(0, 4).map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-niebla">{r.motivo}</p>
                    <p className="text-xs text-junco">
                      {nombreCliente(r.clienteId)} · {formatFechaHora(r.fecha)}
                    </p>
                  </div>
                  <Badge tone={r.estado === "confirmada" ? "green" : "indigo"}>
                    {r.estado}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Tickets abiertos */}
        <section className="panel p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-niebla">
              Tickets abiertos
            </h2>
            <Link href="/studio/soporte" className="text-xs text-indigo-light hover:text-koi">
              Ver soporte →
            </Link>
          </div>
          {ticketsAbiertos.length === 0 ? (
            <p className="text-sm text-junco">Sin tickets pendientes. 🎉</p>
          ) : (
            <ul className="space-y-3">
              {ticketsAbiertos.slice(0, 4).map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/studio/clientes/${t.clienteId}`}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm text-niebla">
                        <span className="font-mono text-xs text-junco">
                          {t.codigo}
                        </span>{" "}
                        {t.asunto}
                      </p>
                      <p className="text-xs text-junco">
                        {nombreCliente(t.clienteId)}
                      </p>
                    </div>
                    <EstadoTicketBadge estado={t.estado} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Formularios pendientes + actividad */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-niebla">
            Formularios pendientes
          </h2>
          {formPendientes.length === 0 ? (
            <p className="text-sm text-junco">Todos completaron su onboarding.</p>
          ) : (
            <ul className="space-y-2">
              {formPendientes.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/studio/clientes/${c.id}`}
                    className="flex items-center justify-between rounded-lg border border-hair/10 bg-veil/[0.03] px-4 py-2.5 text-sm hover:border-vidrio"
                  >
                    <span className="text-niebla">{c.nombreEmpresa}</span>
                    <ArrowIcon className="h-4 w-4 text-junco" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-niebla">
            Actividad reciente
          </h2>
          <ul className="space-y-2.5">
            {actividad.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-junco">
                  <span className="text-niebla">{nombreCliente(a.clienteId)}</span>{" "}
                  — {a.detalle}
                </span>
                <span className="shrink-0 font-mono text-xs text-junco/70">
                  {tiempoRelativo(a.fecha)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
