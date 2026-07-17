"use client";

import { useEffect, useMemo, useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { generarPDF } from "@/lib/portal/pdf";
import { PLANTILLAS, plantillaPorId } from "@/lib/portal/plantillas";
import { Badge, Button, Field, Input, Textarea } from "./ui";
import { DocIcon, DownloadIcon } from "@/components/icons";

export default function GeneradorPanel({ clienteId }: { clienteId: string }) {
  const { state, subirDocumento } = usePortal();
  const cliente = state.clientes.find((c) => c.id === clienteId);

  const [plantillaId, setPlantillaId] = useState(PLANTILLAS[0].id);
  const [valores, setValores] = useState<Record<string, string>>({});
  const [tocado, setTocado] = useState(false);
  const [registrar, setRegistrar] = useState(true);
  const [ok, setOk] = useState(false);

  const plantilla = plantillaPorId(plantillaId)!;

  // Autorrelleno desde el cliente cada vez que cambia la plantilla
  useEffect(() => {
    if (!cliente) return;
    const init: Record<string, string> = {};
    plantilla.campos.forEach((campo) => {
      init[campo.key] = campo.auto ? campo.auto(cliente) : "";
    });
    setValores(init);
    setTocado(false);
    setOk(false);
  }, [plantillaId, cliente]);

  const errores = useMemo(() => {
    const e: Record<string, string> = {};
    plantilla.campos.forEach((campo) => {
      if (campo.required && !(valores[campo.key] ?? "").trim()) {
        e[campo.key] = "Requerido";
      }
    });
    return e;
  }, [plantilla, valores]);
  const valido = Object.keys(errores).length === 0;

  if (!cliente) return null;

  const set = (k: string, v: string) =>
    setValores((prev) => ({ ...prev, [k]: v }));

  const generar = async () => {
    if (!valido) {
      setTocado(true);
      return;
    }
    const doc = plantilla.construir(valores, cliente);
    await generarPDF(doc.nombreArchivo, doc.titulo, doc.bloques);
    if (registrar) {
      subirDocumento(
        clienteId,
        {
          nombre: `${doc.nombreArchivo}.pdf`,
          categoria: plantilla.categoria,
          tamano: "PDF",
          descripcion: plantilla.nombre,
        },
        "KOI"
      );
    }
    setOk(true);
    setTimeout(() => setOk(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Selector de plantilla */}
      <div className="grid gap-3 sm:grid-cols-2">
        {PLANTILLAS.map((p) => {
          const activo = p.id === plantillaId;
          return (
            <button
              key={p.id}
              onClick={() => setPlantillaId(p.id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                activo
                  ? "border-koi/50 bg-koi/[0.06]"
                  : "border-hair/10 hover:border-vidrio"
              }`}
            >
              <div className="flex items-center gap-2">
                <DocIcon
                  className={`h-5 w-5 ${activo ? "text-koi" : "text-indigo-light"}`}
                />
                <span className="font-display text-sm font-semibold text-niebla">
                  {p.nombre}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-junco">{p.descripcion}</p>
            </button>
          );
        })}
      </div>

      {/* Formulario dinámico */}
      <div className="rounded-xl border border-hair/10 bg-laguna/20 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-niebla">
            {plantilla.nombre}
          </h3>
          <Badge tone="indigo">Autorrellenado desde el cliente</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {plantilla.campos.map((campo) => {
            const err = tocado ? errores[campo.key] : "";
            const full = campo.ancho !== "half";
            return (
              <div key={campo.key} className={full ? "sm:col-span-2" : ""}>
                <Field label={campo.label} error={err}>
                  {campo.tipo === "textarea" ? (
                    <Textarea
                      rows={3}
                      value={valores[campo.key] ?? ""}
                      onChange={(e) => set(campo.key, e.target.value)}
                      placeholder={campo.placeholder}
                    />
                  ) : (
                    <Input
                      type={campo.tipo === "number" ? "text" : campo.tipo}
                      inputMode={campo.tipo === "number" ? "numeric" : undefined}
                      value={valores[campo.key] ?? ""}
                      onChange={(e) => set(campo.key, e.target.value)}
                      placeholder={campo.placeholder}
                    />
                  )}
                </Field>
              </div>
            );
          })}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-junco">
          <input
            type="checkbox"
            checked={registrar}
            onChange={(e) => setRegistrar(e.target.checked)}
            className="h-4 w-4 accent-koi"
          />
          Registrar el documento en el portal del cliente
        </label>
        <div className="flex items-center gap-3">
          {ok && (
            <span className="text-sm text-emerald-500">✓ PDF generado</span>
          )}
          <Button onClick={generar}>
            <DownloadIcon className="h-4 w-4" />
            Generar y descargar PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
