"use client";

import { PortalProvider } from "@/lib/portal/PortalProvider";

export default function AccesoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalProvider>{children}</PortalProvider>;
}
