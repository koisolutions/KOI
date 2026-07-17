"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePortal } from "@/lib/portal/PortalProvider";
import { formatCLP } from "@/lib/portal/store";
import type { EstadoCliente } from "@/lib/portal/types";
import {
  Badge,
  Button,
  EstadoClienteBadge,
  Field,
  Input,
  Modal,
  PageHeader,
  Select,
  StatCard,
} from "@/components/portal/ui";
import { UsersIcon, InvoiceIcon, ArrowIcon, PlusIcon } from "@/components/icons";
import {
  formatearRut,
  validarEmail,
  validarRut,
  validarTelefono,
} from "@/lib/portal/validaciones";

const VACIO = {
  nombreEmpresa: "",
  rut: "",
  contactoPrincipal: "",
  email: "",
  telefono: "",
  estado: "prospecto" as EstadoCliente,
  password: "",
  proyectoNombre: "",
};

export default function StudioClientes() {
  const { state, crearCliente } = usePortal();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tocado, setTocado] = useState(false);
  const [form, setForm] = useState(VACIO);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const err = {
    nombreEmpresa: !form.nombreEmpresa.trim() ? "Requerido" : "",
    rut: !validarRut(form.rut) ? "RUT inválido" : "",
    contactoPrincipal: !form.contactoPrincipal.trim() ? "Requerido" : "",
    email: !validarEmail(form.email)
      ? "Email inválido"
      : state.usuarios.some(
          (u) => u.email.toLowerCase() === form.email.trim().toLowerCase()
        )
      ? "Ya existe un usuario con este email"
      : "",
    telefono: !validarTelefono(form.telefono) ? "Teléfono inválido" : "",
    password: form.password.length < 6 ? "Mínimo 6 caracteres" : "",
  };
  const valido = Object.values(err).every((e) => !e);

  const abrir = () => {
    setForm(VACIO);
    setTocado(false);
    setOpen(true);
  };

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valido) {
      setTocado(true);
      return;
    }
    const c = crearCliente({
      nombreEmpresa: form.nombreEmpresa.trim(),
      rut: form.rut,
      contactoPrincipal: form.contactoPrincipal.trim(),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      estado: form.estado,
      password: form.password,
      proyectoNombre: form.proyectoNombre,
    });
    setOpen(false);
    router.push(`/studio/clientes/${c.id}`);
  };

  const activos = state.clientes.filter((c) => c.estado === "activo").length;
  const porCobrar = state.facturas
    .filter((f) => f.estado !== "pagada")
    .reduce((a, f) => a + f.monto, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Panel interno"
        title="Clientes"
        description="Gestiona todos los clientes de KOI desde un solo lugar."
        action={
          <Button onClick={abrir}>
            <PlusIcon className="h-4 w-4" />
            Nuevo cliente
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Clientes"
          value={state.clientes.length}
          hint={`${activos} activos`}
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Por cobrar"
          value={formatCLP(porCobrar)}
          hint="Todas las facturas pendientes"
          icon={<InvoiceIcon className="h-5 w-5" />}
        />
        <StatCard
          label="Proyectos activos"
          value={state.proyectos.length}
          hint="Con desarrollo en curso"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-hair/10">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-hair/10 text-left font-mono text-xs uppercase tracking-wider text-junco">
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Fase</th>
              <th className="px-4 py-3 font-medium">Por cobrar</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-hair/10">
            {state.clientes.map((c) => {
              const proyecto = state.proyectos.find((p) => p.clienteId === c.id);
              const pend = state.facturas
                .filter((f) => f.clienteId === c.id && f.estado !== "pagada")
                .reduce((a, f) => a + f.monto, 0);
              return (
                <tr
                  key={c.id}
                  className="bg-laguna/20 transition-colors hover:bg-laguna/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/studio/clientes/${c.id}`}
                      className="font-medium text-niebla hover:text-koi"
                    >
                      {c.nombreEmpresa}
                    </Link>
                    <div className="font-mono text-xs text-junco">{c.rut}</div>
                  </td>
                  <td className="px-4 py-3 text-junco">
                    <div className="text-niebla">{c.contactoPrincipal}</div>
                    <div className="text-xs">{c.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <EstadoClienteBadge estado={c.estado} />
                  </td>
                  <td className="px-4 py-3">
                    {proyecto ? (
                      <Badge tone="indigo">{proyecto.faseActual}</Badge>
                    ) : (
                      <span className="text-junco/60">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-niebla">
                    {pend > 0 ? formatCLP(pend) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/studio/clientes/${c.id}`}
                      aria-label={`Ver ${c.nombreEmpresa}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-vidrio text-junco transition-colors hover:border-indigo hover:text-niebla"
                    >
                      <ArrowIcon className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo cliente">
        <form onSubmit={guardar} className="space-y-4" noValidate>
          <Field label="Nombre de la empresa" error={tocado ? err.nombreEmpresa : ""}>
            <Input
              value={form.nombreEmpresa}
              onChange={(e) => set("nombreEmpresa", e.target.value)}
              placeholder="Ej: Panadería San Miguel"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="RUT empresa" error={tocado ? err.rut : ""}>
              <Input
                value={form.rut}
                onChange={(e) => set("rut", formatearRut(e.target.value))}
                placeholder="76.543.210-8"
              />
            </Field>
            <Field label="Estado">
              <Select
                value={form.estado}
                onChange={(e) => set("estado", e.target.value)}
              >
                <option value="prospecto">Prospecto</option>
                <option value="activo">Activo</option>
                <option value="pausado">Pausado</option>
                <option value="finalizado">Finalizado</option>
              </Select>
            </Field>
          </div>
          <Field label="Contacto principal" error={tocado ? err.contactoPrincipal : ""}>
            <Input
              value={form.contactoPrincipal}
              onChange={(e) => set("contactoPrincipal", e.target.value)}
              placeholder="Ej: María González"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email (login)" error={tocado ? err.email : ""}>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="maria@empresa.cl"
              />
            </Field>
            <Field label="Teléfono" error={tocado ? err.telefono : ""}>
              <Input
                value={form.telefono}
                onChange={(e) => set("telefono", e.target.value)}
                placeholder="+56 9 8765 4321"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Contraseña de acceso"
              error={tocado ? err.password : ""}
              hint="El cliente la usará para entrar al portal"
            >
              <Input
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </Field>
            <Field label="Proyecto (opcional)">
              <Input
                value={form.proyectoNombre}
                onChange={(e) => set("proyectoNombre", e.target.value)}
                placeholder="Ej: Sistema de pedidos"
              />
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear cliente</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
