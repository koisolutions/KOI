"use client";

import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora } from "@/lib/portal/store";
import { Button, EmptyState, Textarea } from "./ui";
import { NoteIcon } from "@/components/icons";

export default function NotasPanel({ clienteId }: { clienteId: string }) {
  const { state, agregarNota } = usePortal();
  const [texto, setTexto] = useState("");

  const notas = state.notas
    .filter((n) => n.clienteId === clienteId)
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    agregarNota(clienteId, texto.trim());
    setTexto("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-koi/20 bg-koi/[0.06] px-4 py-2.5 text-xs text-junco">
        🔒 Las notas internas <strong className="text-niebla">no</strong> son
        visibles para el cliente.
      </div>

      <form onSubmit={enviar} className="space-y-3">
        <Textarea
          rows={3}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe una nota interna sobre este cliente…"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!texto.trim()}>
            Agregar nota
          </Button>
        </div>
      </form>

      {notas.length === 0 ? (
        <EmptyState
          icon={<NoteIcon className="h-8 w-8" />}
          title="Sin notas"
          description="Aún no hay notas internas para este cliente."
        />
      ) : (
        <ul className="space-y-3">
          {notas.map((n) => (
            <li key={n.id} className="panel p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-niebla">
                  {n.autor}
                </span>
                <span className="font-mono text-xs text-junco/70">
                  {formatFechaHora(n.fecha)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-junco">{n.texto}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
