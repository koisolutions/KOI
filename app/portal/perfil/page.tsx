"use client";

import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { PageHeader, Field, Input, Button, Badge } from "@/components/portal/ui";
import { validarTelefono } from "@/lib/portal/validaciones";

export default function PortalPerfil() {
  const { user, cliente, actualizarPerfil, cambiarPassword } = usePortal();

  const [contacto, setContacto] = useState(cliente?.contactoPrincipal ?? "");
  const [telefono, setTelefono] = useState(cliente?.telefono ?? "");
  const [tocado, setTocado] = useState(false);
  const [okPerfil, setOkPerfil] = useState(false);

  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [tocadoPass, setTocadoPass] = useState(false);
  const [okPass, setOkPass] = useState(false);

  if (!user || !cliente) return null;

  const errContacto = !contacto.trim() ? "Requerido" : "";
  const errTelefono = !validarTelefono(telefono) ? "Teléfono inválido" : "";
  const perfilValido = !errContacto && !errTelefono;

  const errPass = pass.length < 6 ? "Mínimo 6 caracteres" : "";
  const errPass2 = pass !== pass2 ? "Las contraseñas no coinciden" : "";
  const passValido = !errPass && !errPass2;

  const guardarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfilValido) {
      setTocado(true);
      return;
    }
    actualizarPerfil({ contactoPrincipal: contacto, telefono });
    setOkPerfil(true);
    setTimeout(() => setOkPerfil(false), 3000);
  };

  const guardarPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passValido) {
      setTocadoPass(true);
      return;
    }
    cambiarPassword(pass);
    setPass("");
    setPass2("");
    setTocadoPass(false);
    setOkPass(true);
    setTimeout(() => setOkPass(false), 3000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Portal cliente"
        title="Mi perfil"
        description="Tus datos de contacto y acceso al portal."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Datos */}
        <form onSubmit={guardarPerfil} className="panel space-y-4 p-6" noValidate>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-niebla">
              Datos de contacto
            </h2>
            <Badge tone="muted">{cliente.nombreEmpresa}</Badge>
          </div>
          <Field label="Empresa">
            <Input value={cliente.nombreEmpresa} disabled />
          </Field>
          <Field label="Nombre de contacto" error={tocado ? errContacto : ""}>
            <Input
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />
          </Field>
          <Field label="Teléfono" error={tocado ? errTelefono : ""}>
            <Input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Field>
          <Field label="Email (no editable)">
            <Input value={user.email} disabled />
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit">Guardar cambios</Button>
            {okPerfil && (
              <span className="text-sm text-emerald-500">✓ Guardado</span>
            )}
          </div>
        </form>

        {/* Contraseña */}
        <form onSubmit={guardarPass} className="panel space-y-4 p-6" noValidate>
          <h2 className="font-display text-base font-semibold text-niebla">
            Cambiar contraseña
          </h2>
          <Field label="Nueva contraseña" error={tocadoPass ? errPass : ""}>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </Field>
          <Field label="Repetir contraseña" error={tocadoPass ? errPass2 : ""}>
            <Input
              type="password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit">Actualizar contraseña</Button>
            {okPass && (
              <span className="text-sm text-emerald-500">✓ Actualizada</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
