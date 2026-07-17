"use client";

import { useMemo, useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora } from "@/lib/portal/store";
import { PREGUNTAS_ONBOARDING } from "@/lib/portal/types";
import { Badge, Button, EmptyState } from "./ui";
import { CheckIcon, FormIcon } from "@/components/icons";

export default function FormularioPanel({
  clienteId,
  editable,
}: {
  clienteId: string;
  editable: boolean;
}) {
  const { state, guardarFormulario } = usePortal();
  const registro = state.formularios.find((f) => f.clienteId === clienteId);

  const inicial = useMemo(() => {
    const map: Record<string, string> = {};
    PREGUNTAS_ONBOARDING.forEach((p) => {
      map[p] = registro?.respuestas.find((r) => r.pregunta === p)?.respuesta ?? "";
    });
    return map;
  }, [registro]);

  const [respuestas, setRespuestas] = useState<Record<string, string>>(inicial);
  const [guardado, setGuardado] = useState(false);

  // ---- Modo studio: solo lectura --------------------------------------
  if (!editable) {
    if (!registro?.enviado) {
      return (
        <EmptyState
          icon={<FormIcon className="h-8 w-8" />}
          title="Formulario sin responder"
          description="El cliente todavía no completa el formulario de onboarding."
        />
      );
    }
    return (
      <div className="space-y-4">
        <Badge tone="green">
          <CheckIcon className="h-3 w-3" /> Completado{" "}
          {registro.fechaRespuesta && `· ${formatFechaHora(registro.fechaRespuesta)}`}
        </Badge>
        <div className="space-y-4">
          {registro.respuestas.map((r) => (
            <div key={r.pregunta} className="panel p-5">
              <p className="text-sm font-medium text-niebla">{r.pregunta}</p>
              <p className="mt-2 text-sm leading-relaxed text-junco">
                {r.respuesta}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---- Modo cliente: editable -----------------------------------------
  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const arr = PREGUNTAS_ONBOARDING.filter((p) => respuestas[p]?.trim()).map(
      (p) => ({ pregunta: p, respuesta: respuestas[p].trim() })
    );
    guardarFormulario(clienteId, arr);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <form onSubmit={enviar} className="space-y-5">
      {registro?.enviado && (
        <Badge tone="green">
          <CheckIcon className="h-3 w-3" /> Ya enviado — puedes actualizarlo
        </Badge>
      )}

      {PREGUNTAS_ONBOARDING.map((p, i) => (
        <div key={p} className="panel p-5">
          <label className="block">
            <span className="flex gap-2 text-sm font-medium text-niebla">
              <span className="font-mono text-koi">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </span>
            <textarea
              rows={2}
              value={respuestas[p]}
              onChange={(e) =>
                setRespuestas((r) => ({ ...r, [p]: e.target.value }))
              }
              placeholder="Tu respuesta…"
              className="mt-3 w-full resize-none rounded-lg border border-vidrio/60 bg-sumi-900/60 px-3.5 py-2.5 text-sm text-niebla placeholder:text-junco/50 focus:border-indigo focus:outline-none"
            />
          </label>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <Button type="submit">Guardar respuestas</Button>
        {guardado && (
          <span className="text-sm text-emerald-500">✓ Guardado</span>
        )}
      </div>
    </form>
  );
}
