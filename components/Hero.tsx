import Reveal from "./Reveal";
import KoiRibbon from "./KoiRibbon";
import { WhatsAppIcon, ArrowIcon } from "./icons";
import { whatsappUrl } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      <div className="container-koi">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Columna de texto — alineada a la izquierda, editorial */}
          <div className="max-w-xl">
            <Reveal>
              <p className="section-label">Estudio de software · Chile</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-niebla sm:text-5xl lg:text-6xl">
                El software que tu negocio{" "}
                <span className="text-koi">no encuentra de fábrica.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 text-lg leading-relaxed text-junco">
                Somos un equipo que diseña y construye sistemas a medida para
                pymes y empresas chilenas. Proceso claro, arquitectura sólida y
                trazabilidad de principio a fin — sin humo de agencia.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Conversemos tu proyecto
                </a>
                <a href="#proceso" className="btn-ghost">
                  Ver cómo trabajamos
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-8 font-mono text-xs text-junco/80">
                Contrato claro · Portal de cliente · Estrategia documentada
              </p>
            </Reveal>
          </div>

          {/* Columna firma — el trazo koi */}
          <Reveal delay={200} className="hidden justify-self-center lg:block">
            <KoiRibbon className="h-[26rem] w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
