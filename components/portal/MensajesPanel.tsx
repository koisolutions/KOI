"use client";

import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFechaHora } from "@/lib/portal/store";
import { Button } from "./ui";
import { ChatIcon } from "@/components/icons";

export default function MensajesPanel({
  clienteId,
  actorRole,
}: {
  clienteId: string;
  actorRole: "cliente" | "admin_koi";
}) {
  const { state, enviarMensaje } = usePortal();
  const [texto, setTexto] = useState("");

  const mensajes = state.mensajes
    .filter((m) => m.clienteId === clienteId)
    .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    enviarMensaje(clienteId, texto.trim());
    setTexto("");
  };

  return (
    <div className="flex flex-col rounded-xl border border-hair/10 bg-laguna/20">
      {/* Hilo */}
      <div className="flex max-h-[460px] min-h-[280px] flex-col gap-3 overflow-y-auto p-5">
        {mensajes.length === 0 ? (
          <div className="m-auto flex flex-col items-center text-center text-junco">
            <ChatIcon className="mb-2 h-8 w-8 opacity-60" />
            <p className="text-sm">Aún no hay mensajes. Escribe el primero.</p>
          </div>
        ) : (
          mensajes.map((m) => {
            const propio = m.rol === actorRole;
            return (
              <div
                key={m.id}
                className={`flex flex-col ${propio ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    propio
                      ? "bg-koi text-[#0B1418]"
                      : "border border-hair/10 bg-veil/[0.05] text-niebla"
                  }`}
                >
                  {!propio && (
                    <p className="mb-0.5 text-xs font-semibold opacity-80">
                      {m.autor}
                    </p>
                  )}
                  <p className="leading-relaxed">{m.texto}</p>
                </div>
                <span className="mt-1 px-1 font-mono text-[0.65rem] text-junco/60">
                  {formatFechaHora(m.fecha)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Redactar */}
      <form
        onSubmit={enviar}
        className="flex items-center gap-2 border-t border-hair/10 p-3"
      >
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe un mensaje…"
          className="flex-1 rounded-lg border border-vidrio/60 bg-sumi-900/60 px-3.5 py-2.5 text-sm text-niebla placeholder:text-junco/50 focus:border-indigo focus:outline-none"
        />
        <Button type="submit" disabled={!texto.trim()}>
          Enviar
        </Button>
      </form>
    </div>
  );
}
