"use client";

import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader } from "@/components/portal/ui";
import DocumentosPanel from "@/components/portal/DocumentosPanel";

export default function PortalDocumentos() {
  const { cliente } = usePortal();
  if (!cliente) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Documentos"
        description="Descarga lo que KOI comparte contigo y sube tus propios insumos (comprobantes, materiales, feedback)."
      />
      <DocumentosPanel clienteId={cliente.id} uploaderRole="cliente" />
    </div>
  );
}
