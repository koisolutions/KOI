import Link from "next/link";
import { Logo } from "./Logo";
import Footer from "./Footer";
import WhatsappFloat from "./WhatsappFloat";
import { ArrowIcon } from "./icons";

/**
 * Marco visual para páginas legales (privacidad, términos).
 * Cabecera simple con logo + volver al inicio, contenido tipo documento y footer.
 */
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="container-koi flex h-16 items-center justify-between">
          <Link href="/" aria-label="Koi Labs Solutions — inicio">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container-koi py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-koi-light">
            Documento legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Última actualización: {updated}
          </p>

          <div className="legal-prose mt-10">{children}</div>
        </div>
      </main>

      <Footer />
      <WhatsappFloat />
    </>
  );
}
