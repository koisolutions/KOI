"use client";

import { useRef, useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatFecha } from "@/lib/portal/store";
import type { CategoriaDoc } from "@/lib/portal/types";
import {
  Badge,
  Button,
  CategoriaBadge,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  SubidoPorBadge,
  Textarea,
} from "./ui";
import { DocIcon, DownloadIcon, UploadIcon } from "@/components/icons";

const CATEGORIAS: { value: CategoriaDoc; label: string }[] = [
  { value: "contrato", label: "Contrato" },
  { value: "welcome_doc", label: "Welcome doc" },
  { value: "estrategia", label: "Estrategia" },
  { value: "reporte", label: "Reporte" },
  { value: "otro", label: "Otro" },
];

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentosPanel({
  clienteId,
  uploaderRole,
}: {
  clienteId: string;
  uploaderRole: "cliente" | "admin_koi";
}) {
  const { state, subirDocumento, descargarDocumento } = usePortal();
  const [filtro, setFiltro] = useState<CategoriaDoc | "todos">("todos");
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tamano, setTamano] = useState("");
  const [categoria, setCategoria] = useState<CategoriaDoc>(
    uploaderRole === "cliente" ? "otro" : "reporte"
  );
  const [descripcion, setDescripcion] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const subidoPor = uploaderRole === "admin_koi" ? "KOI" : "cliente";

  const docs = state.documentos
    .filter((d) => d.clienteId === clienteId)
    .filter((d) => filtro === "todos" || d.categoria === filtro);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setNombre(f.name);
    setTamano(humanSize(f.size));
  };

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre) return;
    subirDocumento(
      clienteId,
      { nombre, categoria, tamano: tamano || "—", descripcion: descripcion || undefined },
      subidoPor
    );
    setOpen(false);
    setNombre("");
    setTamano("");
    setDescripcion("");
    setCategoria(uploaderRole === "cliente" ? "otro" : "reporte");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Barra de filtros + subir */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {(["todos", ...CATEGORIAS.map((c) => c.value)] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c as CategoriaDoc | "todos")}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filtro === c
                  ? "border-koi/40 bg-koi/10 text-koi-deep dark:text-koi-light"
                  : "border-hair/10 text-junco hover:border-vidrio"
              }`}
            >
              {c === "todos"
                ? "Todos"
                : CATEGORIAS.find((x) => x.value === c)?.label}
            </button>
          ))}
        </div>
        <Button variant="subtle" onClick={() => setOpen(true)}>
          <UploadIcon className="h-4 w-4" />
          Subir documento
        </Button>
      </div>

      {/* Lista */}
      {docs.length === 0 ? (
        <EmptyState
          icon={<DocIcon className="h-8 w-8" />}
          title="Sin documentos"
          description="Todavía no hay documentos en esta categoría."
        />
      ) : (
        <ul className="divide-y divide-hair/10 overflow-hidden rounded-xl border border-hair/10">
          {docs.map((d) => (
            <li
              key={d.id}
              className="flex items-center gap-4 bg-laguna/30 p-4 transition-colors hover:bg-laguna/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-vidrio/60 text-indigo-light">
                <DocIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-niebla">
                  {d.nombre}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-junco">
                  <CategoriaBadge categoria={d.categoria} />
                  <SubidoPorBadge por={d.subidoPor} />
                  <span>{formatFecha(d.fechaSubida)}</span>
                  <span>· {d.tamano}</span>
                </div>
                {d.descripcion && (
                  <p className="mt-1.5 text-xs text-junco">{d.descripcion}</p>
                )}
              </div>
              <button
                onClick={() => descargarDocumento(d.id)}
                aria-label={`Descargar ${d.nombre}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-vidrio text-junco transition-colors hover:border-indigo hover:text-niebla"
              >
                <DownloadIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal subir */}
      <Modal open={open} onClose={() => setOpen(false)} title="Subir documento">
        <form onSubmit={guardar} className="space-y-4">
          <Field label="Archivo">
            <input
              ref={fileRef}
              type="file"
              onChange={onFile}
              className="block w-full text-sm text-junco file:mr-3 file:rounded-lg file:border-0 file:bg-koi file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#0B1418] hover:file:bg-koi-light"
            />
          </Field>
          <Field label="Nombre">
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del documento"
              required
            />
          </Field>
          <Field label="Categoría">
            <Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as CategoriaDoc)}
            >
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Descripción (opcional)">
            <Textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Breve nota sobre el documento"
            />
          </Field>
          <div className="flex items-center justify-between gap-3 pt-1">
            <Badge tone={subidoPor === "KOI" ? "koi" : "indigo"}>
              Se subirá como {subidoPor}
            </Badge>
            <div className="flex gap-2">
              <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Subir</Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
