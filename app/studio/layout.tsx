"use client";

import { PortalProvider } from "@/lib/portal/PortalProvider";
import AppShell, { type NavItem } from "@/components/portal/AppShell";
import {
  DashboardIcon,
  UsersIcon,
  InvoiceIcon,
  TicketIcon,
  CalendarIcon,
  DocIcon,
  ClockIcon,
} from "@/components/icons";

const nav: NavItem[] = [
  { href: "/studio", label: "Inicio", icon: DashboardIcon, exact: true },
  { href: "/studio/clientes", label: "Clientes", icon: UsersIcon },
  { href: "/studio/documentos", label: "Documentos", icon: DocIcon },
  { href: "/studio/facturas", label: "Facturación", icon: InvoiceIcon },
  { href: "/studio/soporte", label: "Soporte", icon: TicketIcon },
  { href: "/studio/agenda", label: "Agenda", icon: CalendarIcon },
  { href: "/studio/actividad", label: "Actividad", icon: ClockIcon },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalProvider>
      <AppShell role="admin_koi" scope="Koi Labs" nav={nav}>
        {children}
      </AppShell>
    </PortalProvider>
  );
}
