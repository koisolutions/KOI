"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { LogoutIcon } from "@/components/icons";
import { usePortal } from "@/lib/portal/PortalProvider";
import type { Rol } from "@/lib/portal/types";
import { Badge } from "./ui";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

export default function AppShell({
  role,
  scope,
  nav,
  children,
}: {
  role: Rol;
  scope: string; // etiqueta del entorno (ej. "Portal Cliente")
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const { ready, user, cliente, logout, reset } = usePortal();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && (!user || user.rol !== role)) {
      router.replace("/acceso");
    }
  }, [ready, user, role, router]);

  if (!ready || !user || user.rol !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-junco">
          <span className="h-3 w-3 animate-ping rounded-full bg-koi" />
          Cargando…
        </div>
      </div>
    );
  }

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const navLinks = (
    <>
      {nav.map((item) => {
        const Icon = item.icon;
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-koi/12 text-koi-deep dark:text-koi-light"
                : "text-junco hover:bg-veil/[0.06] hover:text-niebla"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-hair/10 bg-sumi-900 lg:flex">
        <div className="flex h-16 items-center border-b border-hair/10 px-5">
          <Link href="/" aria-label="KOI — inicio">
            <Logo />
          </Link>
        </div>

        <div className="px-4 pt-4">
          <Badge tone={role === "admin_koi" ? "koi" : "indigo"}>{scope}</Badge>
        </div>

        <nav className="flex-1 space-y-1 p-4">{navLinks}</nav>

        <div className="space-y-3 border-t border-hair/10 p-4">
          <div className="rounded-lg bg-veil/[0.04] p-3">
            <p className="truncate text-sm font-semibold text-niebla">
              {user.nombre}
            </p>
            <p className="truncate text-xs text-junco">
              {cliente ? cliente.nombreEmpresa : user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                router.replace("/acceso");
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-vidrio px-3 py-2 text-sm font-medium text-junco transition-colors hover:text-niebla"
            >
              <LogoutIcon className="h-4 w-4" />
              Salir
            </button>
            <ThemeToggle />
          </div>
          <button
            onClick={reset}
            className="w-full text-left font-mono text-[0.65rem] uppercase tracking-wider text-junco/60 transition-colors hover:text-junco"
            title="Restaurar los datos de demostración"
          >
            ↺ Reiniciar datos demo
          </button>
        </div>
      </aside>

      {/* Top bar (mobile) */}
      <header className="sticky top-0 z-40 border-b border-hair/10 bg-sumi/90 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" aria-label="KOI — inicio">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => {
                logout();
                router.replace("/acceso");
              }}
              aria-label="Salir"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-vidrio text-junco"
            >
              <LogoutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-koi/12 text-koi-deep dark:text-koi-light"
                    : "text-junco hover:bg-veil/[0.06]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
