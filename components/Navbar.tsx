"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { WhatsAppIcon, LockIcon } from "./icons";
import { whatsappUrl } from "@/lib/site";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#estudio", label: "Estudio" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-hair/10 bg-sumi/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-koi flex h-16 items-center justify-between">
        <a href="#inicio" aria-label="KOI — inicio">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-junco transition-colors hover:text-niebla"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/acceso"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-junco transition-colors hover:text-niebla"
          >
            <LockIcon className="h-3.5 w-3.5" />
            Acceso
          </Link>
          <ThemeToggle />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-5 !py-2.5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Conversemos
          </a>
        </div>

        {/* Controles móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-vidrio text-niebla"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-niebla transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-niebla transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-niebla transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      <div
        className={`overflow-hidden border-t border-hair/10 bg-sumi/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-koi flex flex-col gap-1 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-widest text-junco hover:bg-veil/[0.06] hover:text-niebla"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/acceso"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-widest text-junco hover:bg-veil/[0.06] hover:text-niebla"
          >
            <LockIcon className="h-4 w-4" />
            Acceso clientes
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Conversemos por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
