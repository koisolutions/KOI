import { Logo } from "./Logo";
import { site } from "@/lib/site";

const nav = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#contacto", label: "Contacto" },
];

const legal = [
  { href: "/politica-de-privacidad", label: "Política de Privacidad" },
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-white/10 bg-ink-800/60">
      <div className="container-koi py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="max-w-sm md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Nos gusta escuchar antes de programar. Acompañamos a personas y
              empresas a convertir sus ideas en software, con cercanía y
              compromiso de principio a fin.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-slate-400 transition-colors hover:text-koi-light"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-koi-light"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-koi-light"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-koi-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-500">
            Hecho con dedicación en Chile 🇨🇱
          </p>
        </div>
      </div>
    </footer>
  );
}
