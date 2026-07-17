"use client";

import { PortalProvider } from "@/lib/portal/PortalProvider";
import AppShell, { type NavItem } from "@/components/portal/AppShell";
import {
  DashboardIcon,
  DocIcon,
  InvoiceIcon,
  FormIcon,
  TicketIcon,
  CalendarIcon,
  ChatIcon,
  UsersIcon,
} from "@/components/icons";

const nav: NavItem[] = [
  { href: "/portal", label: "Inicio", icon: DashboardIcon, exact: true },
  { href: "/portal/documentos", label: "Documentos", icon: DocIcon },
  { href: "/portal/facturas", label: "Facturas", icon: InvoiceIcon },
  { href: "/portal/soporte", label: "Soporte", icon: TicketIcon },
  { href: "/portal/reuniones", label: "Reuniones", icon: CalendarIcon },
  { href: "/portal/mensajes", label: "Mensajes", icon: ChatIcon },
  { href: "/portal/formulario", label: "Formulario", icon: FormIcon },
  { href: "/portal/perfil", label: "Mi perfil", icon: UsersIcon },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalProvider>
      <AppShell role="cliente" scope="Portal Cliente" nav={nav}>
        {children}
      </AppShell>
    </PortalProvider>
  );
}
