"use client";

import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora } from "@/lib/portal/store";
import type { ModalidadReunion, Reunion } from "@/lib/portal/types";
import {
  Button,
  EmptyState,
  EstadoReunionBadge,
  Field,
  Input,
  Modal,
  Select,
} from "./ui";
import {
  CalendarIcon,
  PlusIcon,
  VideoIcon,
  PinIcon,
  ArrowIcon,
} from "@/components/icons";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function ReunionesPanel({
  clienteId,
  canConfirm = false,
}: {
  clienteId: string;
  canConfirm?: boolean;
}) {
  const { agendarReunion, confirmarReunion, cancelarReunion, state } =
    usePortal();
  const [vista, setVista] = useState<"lista" | "calendario">("lista");
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState("");
  const [modalidad, setModalidad] = useState<ModalidadReunion>("videollamada");
  const [tocado, setTocado] = useState(false);

  const hoy = new Date();
  const [cursor, setCursor] = useState({
    y: hoy.getFullYear(),
    m: hoy.getMonth(),
  });

  const reuniones = state.reuniones
    .filter((r) => r.clienteId === clienteId)
    .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));

  const errMotivo = !motivo.trim() ? "Ingresa un motivo" : "";
  const errFecha = !fecha
    ? "Selecciona fecha y hora"
    : new Date(fecha).getTime() <= Date.now()
    ? "Debe ser una fecha futura"
    : "";
  const valido = !errMotivo && !errFecha;

  const abrir = () => {
    setTocado(false);
    setMotivo("");
    setFecha("");
    setModalidad("videollamada");
    setOpen(true);
  };

  const agendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valido) {
      setTocado(true);
      return;
    }
    agendarReunion(clienteId, {
      motivo: motivo.trim(),
      fecha: new Date(fecha).toISOString(),
      modalidad,
    });
    setOpen(false);
  };

  // ---- Datos del calendario -------------------------------------------
  const primerDia = new Date(cursor.y, cursor.m, 1);
  const offset = (primerDia.getDay() + 6) % 7; // lunes = 0
  const diasEnMes = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const celdas: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];
  const reunionesDelDia = (dia: number) =>
    reuniones.filter((r) => {
      const d = new Date(r.fecha);
      return (
        d.getFullYear() === cursor.y &&
        d.getMonth() === cursor.m &&
        d.getDate() === dia &&
        r.estado !== "cancelada"
      );
    });
  const moverMes = (delta: number) => {
    const d = new Date(cursor.y, cursor.m + delta, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };
  const esHoy = (dia: number) =>
    cursor.y === hoy.getFullYear() &&
    cursor.m === hoy.getMonth() &&
    dia === hoy.getDate();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Toggle de vista */}
        <div className="inline-flex rounded-lg border border-hair/10 p-0.5">
          {(["lista", "calendario"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVista(v)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                vista === v
                  ? "bg-koi/12 text-koi-deep dark:text-koi-light"
                  : "text-junco hover:text-niebla"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <Button variant="subtle" onClick={abrir}>
          <PlusIcon className="h-4 w-4" />
          {canConfirm ? "Agendar reunión" : "Solicitar reunión"}
        </Button>
      </div>

      {/* ---- Vista lista ---- */}
      {vista === "lista" &&
        (reuniones.length === 0 ? (
          <EmptyState
            icon={<CalendarIcon className="h-8 w-8" />}
            title="Sin reuniones"
            description="Solicita una reunión y coordinamos el mejor horario."
          />
        ) : (
          <ul className="space-y-3">
            {reuniones.map((r) => (
              <ReunionRow
                key={r.id}
                r={r}
                canConfirm={canConfirm}
                onConfirm={() => confirmarReunion(r.id)}
                onCancel={() => cancelarReunion(r.id)}
              />
            ))}
          </ul>
        ))}

      {/* ---- Vista calendario ---- */}
      {vista === "calendario" && (
        <div className="rounded-xl border border-hair/10 bg-laguna/20 p-4">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => moverMes(-1)}
              aria-label="Mes anterior"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco hover:text-niebla"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <span className="font-display text-base font-semibold capitalize text-niebla">
              {MESES[cursor.m]} {cursor.y}
            </span>
            <button
              onClick={() => moverMes(1)}
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
              const items = reunionesDelDia(dia);
              return (
                <div
                  key={dia}
                  className={`min-h-[64px] rounded-lg border p-1.5 text-left ${
                    esHoy(dia)
                      ? "border-koi/40 bg-koi/[0.06]"
                      : "border-hair/10"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      esHoy(dia) ? "font-bold text-koi-deep dark:text-koi-light" : "text-junco"
                    }`}
                  >
                    {dia}
                  </span>
                  <div className="mt-1 space-y-1">
                    {items.map((r) => (
                      <div
                        key={r.id}
                        title={`${r.motivo} · ${formatFechaHora(r.fecha)}`}
                        className={`truncate rounded px-1 py-0.5 text-[0.6rem] ${
                          r.estado === "confirmada"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : "bg-indigo/15 text-indigo dark:text-indigo-light"
                        }`}
                      >
                        {new Date(r.fecha).toLocaleTimeString("es-CL", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        {r.motivo}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal agendar/solicitar */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={canConfirm ? "Agendar reunión" : "Solicitar reunión"}
      >
        <form onSubmit={agendar} className="space-y-4" noValidate>
          <Field label="Motivo" error={tocado ? errMotivo : ""}>
            <Input
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej: Revisión de avance"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Fecha y hora" error={tocado ? errFecha : ""}>
              <Input
                type="datetime-local"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Field>
            <Field label="Modalidad">
              <Select
                value={modalidad}
                onChange={(e) =>
                  setModalidad(e.target.value as ModalidadReunion)
                }
              >
                <option value="videollamada">Videollamada</option>
                <option value="presencial">Presencial</option>
              </Select>
            </Field>
          </div>
          {!canConfirm && (
            <p className="text-xs text-junco">
              KOI confirmará el horario o te propondrá otro cercano.
            </p>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {canConfirm ? "Agendar" : "Solicitar"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function ReunionRow({
  r,
  canConfirm,
  onConfirm,
  onCancel,
}: {
  r: Reunion;
  canConfirm: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <li
      className={`flex flex-wrap items-center gap-4 rounded-xl border border-hair/10 bg-laguna/30 p-4 ${
        r.estado === "cancelada" ? "opacity-60" : ""
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-vidrio/60 text-indigo-light">
        {r.modalidad === "videollamada" ? (
          <VideoIcon className="h-5 w-5" />
        ) : (
          <PinIcon className="h-5 w-5" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-niebla">{r.motivo}</p>
        <p className="mt-0.5 text-xs text-junco">
          {formatFechaHora(r.fecha)} · {r.modalidad} · pedida por{" "}
          {r.solicitadaPor}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <EstadoReunionBadge estado={r.estado} />
        {canConfirm && r.estado === "solicitada" && (
          <button
            onClick={onConfirm}
            className="rounded-lg border border-vidrio px-2.5 py-1.5 text-xs font-medium text-junco transition-colors hover:border-emerald-500/50 hover:text-emerald-500"
          >
            Confirmar
          </button>
        )}
        {r.estado !== "cancelada" && (
          <button
            onClick={onCancel}
            className="rounded-lg border border-vidrio px-2.5 py-1.5 text-xs font-medium text-junco transition-colors hover:border-koi/50 hover:text-koi"
          >
            Cancelar
          </button>
        )}
      </div>
    </li>
  );
}
