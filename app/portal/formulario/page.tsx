"use client";

import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader } from "@/components/portal/ui";
import FormularioPanel from "@/components/portal/FormularioPanel";

export default function PortalFormulario() {
  const { cliente } = usePortal();
  if (!cliente) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Formulario de onboarding"
        description="Estas preguntas nos ayudan a entender tu negocio antes de escribir una línea de código. Puedes guardarlas y volver cuando quieras."
      />
      <FormularioPanel clienteId={cliente.id} editable />
    </div>
  );
}
