"use client";

import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader } from "@/components/portal/ui";
import ReunionesPanel from "@/components/portal/ReunionesPanel";

export default function PortalReuniones() {
  const { cliente } = usePortal();
  if (!cliente) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Reuniones"
        description="Solicita una reunión con el equipo de KOI. Coordinamos videollamada o presencial según lo que necesites."
      />
      <ReunionesPanel clienteId={cliente.id} />
    </div>
  );
}
