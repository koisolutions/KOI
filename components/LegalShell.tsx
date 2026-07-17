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
      <header className="border-b border-hair/10 bg-sumi/80 backdrop-blur-xl">
        <div className="container-koi flex h-16 items-center justify-between">
          <Link href="/" aria-label="KOI — inicio">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-junco transition-colors hover:text-niebla"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container-koi py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="section-label">Documento legal</p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-niebla sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-junco">
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
