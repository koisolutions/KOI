"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowIcon, LockIcon } from "@/components/icons";
import { usePortal } from "@/lib/portal/PortalProvider";
import { DEMO_CREDENCIALES } from "@/lib/portal/seed";
import { Button, Field, Input } from "@/components/portal/ui";

export default function AccesoPage() {
  const { ready, user, login } = usePortal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Si ya hay sesión, llevar a su entorno
  useEffect(() => {
    if (ready && user) {
      router.replace(user.rol === "admin_koi" ? "/studio" : "/portal");
    }
  }, [ready, user, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const u = login(email, password);
    if (!u) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.replace(u.rol === "admin_koi" ? "/studio" : "/portal");
  };

  const fill = (c: { email: string; password: string }) => {
    setEmail(c.email);
    setPassword(c.password);
    setError("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" aria-label="KOI — inicio">
            <Logo />
          </Link>
          <h1 className="mt-8 font-display text-2xl font-semibold tracking-tight text-niebla">
            Acceso al portal
          </h1>
          <p className="mt-2 text-sm text-junco">
            Ingresa con tus credenciales para ver tus documentos, facturas y el
            avance de tu proyecto.
          </p>
        </div>

        <div className="rounded-2xl border border-hair/10 bg-laguna/40 p-6 sm:p-8">
          <form onSubmit={submit} className="space-y-4">
            <Field label="Correo electrónico">
              <Input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@empresa.cl"
                required
              />
            </Field>
            <Field label="Contraseña">
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Field>

            {error && (
              <p className="rounded-lg border border-koi/30 bg-koi/10 px-3 py-2 text-sm text-koi-deep dark:text-koi-light">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full">
              <LockIcon className="h-4 w-4" />
              Ingresar
            </Button>
          </form>
        </div>

        {/* Credenciales de demostración */}
        <div className="mt-6 rounded-2xl border border-dashed border-hair/15 p-5">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-junco">
            Credenciales de demostración
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => fill(DEMO_CREDENCIALES.cliente)}
              className="rounded-lg border border-hair/10 bg-veil/[0.04] p-3 text-left transition-colors hover:border-indigo"
            >
              <p className="text-sm font-semibold text-niebla">Cliente</p>
              <p className="mt-0.5 truncate font-mono text-xs text-junco">
                {DEMO_CREDENCIALES.cliente.email}
              </p>
              <p className="font-mono text-xs text-junco">
                {DEMO_CREDENCIALES.cliente.password}
              </p>
            </button>
            <button
              onClick={() => fill(DEMO_CREDENCIALES.studio)}
              className="rounded-lg border border-hair/10 bg-veil/[0.04] p-3 text-left transition-colors hover:border-koi"
            >
              <p className="text-sm font-semibold text-niebla">Koi Labs (equipo)</p>
              <p className="mt-0.5 truncate font-mono text-xs text-junco">
                {DEMO_CREDENCIALES.studio.email}
              </p>
              <p className="font-mono text-xs text-junco">
                {DEMO_CREDENCIALES.studio.password}
              </p>
            </button>
          </div>
          <p className="mt-3 text-xs text-junco/70">
            Toca una tarjeta para autocompletar. Los datos son ficticios y viven
            solo en este navegador.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-junco transition-colors hover:text-niebla"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
