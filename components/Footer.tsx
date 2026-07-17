import { Logo } from "./Logo";
import { site } from "@/lib/site";

const nav = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#estudio", label: "Estudio" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/acceso", label: "Acceso clientes" },
];

const legal = [
  { href: "/politica-de-privacidad", label: "Política de Privacidad" },
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-hair/10 bg-sumi-900">
      <div className="container-koi py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="max-w-sm md:col-span-1">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-junco">
              Estudio de software boutique en Chile. Sistemas a medida con
              proceso claro y stack real — escuchamos antes de programar.
            </p>
            <p className="mt-4 font-mono text-xs text-junco/70">{site.domain}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-niebla">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-junco transition-colors hover:text-niebla"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-niebla">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-junco">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-niebla"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-niebla"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-niebla">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-junco transition-colors hover:text-niebla"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hair/10 pt-6 sm:flex-row">
          <p className="text-xs text-junco/80">
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p className="font-mono text-xs text-junco/70">
            Hecho en Chile · 100% remoto
          </p>
        </div>
      </div>
    </footer>
  );
}
