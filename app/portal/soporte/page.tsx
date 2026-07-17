"use client";

import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader } from "@/components/portal/ui";
import SoportePanel from "@/components/portal/SoportePanel";

export default function PortalSoporte() {
  const { cliente } = usePortal();
  if (!cliente) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Soporte y solicitudes"
        description="Abre un ticket para soporte técnico, una consulta o una solicitud de cambio. Te respondemos por aquí mismo."
      />
      <SoportePanel clienteId={cliente.id} actorRole="cliente" />
    </div>
  );
}
