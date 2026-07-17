"use client";

import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader } from "@/components/portal/ui";
import MensajesPanel from "@/components/portal/MensajesPanel";

export default function PortalMensajes() {
  const { cliente } = usePortal();
  if (!cliente) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Mensajes"
        description="Conversa directamente con el equipo de KOI. Para temas puntuales usa Soporte; aquí, lo del día a día."
      />
      <MensajesPanel clienteId={cliente.id} actorRole="cliente" />
    </div>
  );
}
