"use client";

import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader } from "@/components/portal/ui";
import FacturasPanel from "@/components/portal/FacturasPanel";

export default function PortalFacturas() {
  const { cliente } = usePortal();
  if (!cliente) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Facturas"
        description="Revisa el estado de tus facturas y descarga cada documento."
      />
      <FacturasPanel clienteId={cliente.id} canPay />
    </div>
  );
}
