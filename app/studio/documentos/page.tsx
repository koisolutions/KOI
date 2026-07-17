"use client";

import Link from "next/link";
import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFecha } from "@/lib/portal/store";
import { generarPDF } from "@/lib/portal/pdf";
import { PLANTILLAS } from "@/lib/portal/plantillas";
import type { Cliente } from "@/lib/portal/types";
import {
  Badge,
  Button,
  CategoriaBadge,
  Modal,
  PageHeader,
  SubidoPorBadge,
} from "@/components/portal/ui";
import { DocIcon, DownloadIcon } from "@/components/icons";

// Cliente de ejemplo para previsualizar plantillas sin datos reales.
const EJEMPLO: Cliente = {
  id: "ejemplo",
  nombreEmpresa: "[Empresa del cliente]",
  rut: "[RUT]",
  contactoPrincipal: "[Contacto]",
  email: "[email]",
  telefono: "[teléfono]",
  estado: "activo",
  fechaInicio: new Date().toISOString(),
};

export default function StudioDocumentos() {
  const { state, descargarDocumento } = usePortal();
  const [previewId, setPreviewId] = useState<string | null>(null);

  const plantilla = PLANTILLAS.find((p) => p.id === previewId) ?? null;
  const doc = plantilla ? plantilla.construir({}, EJEMPLO) : null;

  const nombreCliente = (id: string) =>
    state.clientes.find((c) => c.id === id)?.nombreEmpresa ?? id;

  const documentos = [...state.documentos].sort((a, b) =>
    a.fechaSubida < b.fechaSubida ? 1 : -1
  );

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Panel interno"
        title="Documentos"
        description="Revisa los documentos base de KOI y todo lo compartido con los clientes."
      />

      {/* ---- Plantillas base ---- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-niebla">
            Documentos base
          </h2>
          <Badge tone="indigo">{PLANTILLAS.length} plantillas</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PLANTILLAS.map((p) => (
            <article key={p.id} className="panel flex flex-col p-5">
              <div className="flex items-center gap-2">
                <DocIcon className="h-5 w-5 text-koi" />
                <h3 className="font-display text-base font-semibold text-niebla">
                  {p.nombre}
                </h3>
              </div>
              <p className="mt-2 flex-1 text-sm text-junco">{p.descripcion}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-junco">
                  {p.campos.length} campos
                </span>
                <Button variant="subtle" onClick={() => setPreviewId(p.id)}>
                  Revisar
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="text-xs text-junco/80">
          Para generar un documento con los datos reales de un cliente, entra a
          su ficha en{" "}
          <Link href="/studio/clientes" className="text-indigo-light hover:text-koi">
            Clientes
          </Link>{" "}
          → pestaña <span className="text-niebla">Generar</span>.
        </p>
      </section>

      {/* ---- Documentos de clientes ---- */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-niebla">
          Documentos de clientes
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hair/10">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-hair/10 text-left font-mono text-xs uppercase tracking-wider text-junco">
                <th className="px-4 py-3 font-medium">Documento</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Origen</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-hair/10">
              {documentos.map((d) => (
                <tr key={d.id} className="bg-laguna/20 hover:bg-laguna/40">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 text-niebla">
                      <DocIcon className="h-4 w-4 shrink-0 text-indigo-light" />
                      {d.nombre}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/studio/clientes/${d.clienteId}`}
                      className="text-junco hover:text-koi"
                    >
                      {nombreCliente(d.clienteId)}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <CategoriaBadge categoria={d.categoria} />
                  </td>
                  <td className="px-4 py-3">
                    <SubidoPorBadge por={d.subidoPor} />
                  </td>
                  <td className="px-4 py-3 text-junco">
                    {formatFecha(d.fechaSubida)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => descargarDocumento(d.id)}
                      aria-label={`Descargar ${d.nombre}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco transition-colors hover:border-indigo hover:text-niebla"
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Modal preview de plantilla ---- */}
      <Modal
        open={!!plantilla}
        onClose={() => setPreviewId(null)}
        title={plantilla?.nombre ?? ""}
      >
        {plantilla && doc && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <CategoriaBadge categoria={plantilla.categoria} />
              <Badge tone="muted">{plantilla.campos.length} campos</Badge>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-junco">
                Campos que se completan
              </p>
              <div className="flex flex-wrap gap-1.5">
                {plantilla.campos.map((c) => (
                  <span
                    key={c.key}
                    className="rounded-md border border-hair/10 bg-veil/[0.04] px-2 py-1 text-xs text-junco"
                  >
                    {c.label}
                    {c.required && <span className="text-koi"> *</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Vista previa del contenido */}
            <div className="max-h-72 overflow-y-auto rounded-lg border border-hair/10 bg-sumi-900/40 p-4">
              <p className="mb-3 font-display text-sm font-semibold text-niebla">
                {doc.titulo}
              </p>
              <div className="space-y-2">
                {doc.bloques.map((b, i) => {
                  if (b.tipo === "space" || b.tipo === "divider")
                    return <div key={i} className="h-2 border-b border-hair/10" />;
                  if (b.tipo === "firma")
                    return (
                      <p key={i} className="pt-2 text-xs italic text-junco">
                        [ Espacio de firmas: KOI Labs Solutions SpA · El Cliente ]
                      </p>
                    );
                  if (b.tipo === "h1" || b.tipo === "h2")
                    return (
                      <p key={i} className="text-xs font-semibold text-niebla">
                        {b.texto}
                      </p>
                    );
                  return (
                    <p key={i} className="text-xs leading-relaxed text-junco">
                      {b.texto}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setPreviewId(null)}>
                Cerrar
              </Button>
              <Button
                onClick={() =>
                  generarPDF(`Ejemplo-${plantilla.nombre}`, doc.titulo, doc.bloques)
                }
              >
                <DownloadIcon className="h-4 w-4" />
                Descargar ejemplo PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
