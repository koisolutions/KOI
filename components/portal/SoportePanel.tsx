"use client";

import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora, tiempoRelativo } from "@/lib/portal/store";
import type {
  CategoriaTicket,
  EstadoTicket,
  PrioridadTicket,
} from "@/lib/portal/types";
import {
  Badge,
  Button,
  EmptyState,
  EstadoTicketBadge,
  Field,
  Input,
  Modal,
  PrioridadBadge,
  Select,
  Textarea,
} from "./ui";
import { PlusIcon, TicketIcon } from "@/components/icons";

const CATEGORIAS: { value: CategoriaTicket; label: string }[] = [
  { value: "soporte", label: "Soporte técnico" },
  { value: "consulta", label: "Consulta" },
  { value: "cambio", label: "Solicitud de cambio" },
  { value: "bug", label: "Reportar error" },
];
const ESTADOS: EstadoTicket[] = ["abierto", "en_proceso", "resuelto"];

export default function SoportePanel({
  clienteId,
  actorRole,
}: {
  clienteId: string;
  actorRole: "cliente" | "admin_koi";
}) {
  const { state, crearTicket, responderTicket, cambiarEstadoTicket } =
    usePortal();
  const [open, setOpen] = useState(false);
  const [abierto, setAbierto] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState("");

  const [asunto, setAsunto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaTicket>("soporte");
  const [prioridad, setPrioridad] = useState<PrioridadTicket>("media");
  const [descripcion, setDescripcion] = useState("");

  const tickets = state.tickets
    .filter((t) => t.clienteId === clienteId)
    .sort((a, b) => (a.fechaCreacion < b.fechaCreacion ? 1 : -1));

  const crear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asunto.trim() || !descripcion.trim()) return;
    crearTicket(clienteId, {
      asunto: asunto.trim(),
      categoria,
      prioridad,
      descripcion: descripcion.trim(),
    });
    setOpen(false);
    setAsunto("");
    setDescripcion("");
    setCategoria("soporte");
    setPrioridad("media");
  };

  const enviarRespuesta = (ticketId: string) => {
    if (!respuesta.trim()) return;
    responderTicket(ticketId, respuesta.trim());
    setRespuesta("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-junco">
          {tickets.filter((t) => t.estado !== "resuelto").length} solicitud(es)
          abierta(s)
        </p>
        <Button variant="subtle" onClick={() => setOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Nueva solicitud
        </Button>
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon={<TicketIcon className="h-8 w-8" />}
          title="Sin solicitudes"
          description="Abre una solicitud de soporte, una consulta o pide un cambio."
        />
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => {
            const expandido = abierto === t.id;
            return (
              <li
                key={t.id}
                className="overflow-hidden rounded-xl border border-hair/10 bg-laguna/30"
              >
                <button
                  onClick={() => {
                    setAbierto(expandido ? null : t.id);
                    setRespuesta("");
                  }}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-laguna/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-junco">
                        {t.codigo}
                      </span>
                      <PrioridadBadge prioridad={t.prioridad} />
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-niebla">
                      {t.asunto}
                    </p>
                    <p className="text-xs text-junco">
                      {t.mensajes.length} mensaje(s) ·{" "}
                      {tiempoRelativo(
                        t.mensajes[t.mensajes.length - 1].fecha
                      )}
                    </p>
                  </div>
                  <EstadoTicketBadge estado={t.estado} />
                </button>

                {expandido && (
                  <div className="border-t border-hair/10 p-4">
                    {/* Controles de estado (studio) */}
                    {actorRole === "admin_koi" && (
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {ESTADOS.map((es) => (
                          <button
                            key={es}
                            onClick={() => cambiarEstadoTicket(t.id, es)}
                            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                              t.estado === es
                                ? "border-koi/40 bg-koi/10 text-koi-deep dark:text-koi-light"
                                : "border-hair/10 text-junco hover:border-vidrio"
                            }`}
                          >
                            {es.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Hilo */}
                    <ul className="space-y-3">
                      {t.mensajes.map((m) => (
                        <li
                          key={m.id}
                          className={`rounded-lg p-3 ${
                            m.rol === "admin_koi"
                              ? "bg-koi/[0.06]"
                              : "bg-veil/[0.04]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-semibold text-niebla">
                              {m.autor}
                              <Badge
                                tone={m.rol === "admin_koi" ? "koi" : "indigo"}
                              >
                                {m.rol === "admin_koi" ? "KOI" : "Cliente"}
                              </Badge>
                            </span>
                            <span className="font-mono text-xs text-junco/70">
                              {formatFechaHora(m.fecha)}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-junco">
                            {m.texto}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Responder */}
                    {t.estado !== "resuelto" && (
                      <div className="mt-4 space-y-2">
                        <Textarea
                          rows={2}
                          value={respuesta}
                          onChange={(e) => setRespuesta(e.target.value)}
                          placeholder="Escribe una respuesta…"
                        />
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            onClick={() => enviarRespuesta(t.id)}
                            disabled={!respuesta.trim()}
                          >
                            Responder
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Modal nueva solicitud */}
      <Modal open={open} onClose={() => setOpen(false)} title="Nueva solicitud">
        <form onSubmit={crear} className="space-y-4">
          <Field label="Asunto">
            <Input
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Describe brevemente tu solicitud"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Categoría">
              <Select
                value={categoria}
                onChange={(e) =>
                  setCategoria(e.target.value as CategoriaTicket)
                }
              >
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Prioridad">
              <Select
                value={prioridad}
                onChange={(e) =>
                  setPrioridad(e.target.value as PrioridadTicket)
                }
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </Select>
            </Field>
          </div>
          <Field label="Descripción">
            <Textarea
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Cuéntanos en detalle qué necesitas…"
              required
            />
          </Field>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear solicitud</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
