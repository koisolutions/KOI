import Reveal from "./Reveal";
import { WhatsAppIcon, ArrowIcon } from "./icons";
import { whatsappUrl } from "@/lib/site";

const stats = [
  { value: "100%", label: "Código a medida" },
  { value: "24/7", label: "Soporte y monitoreo" },
  { value: "+15", label: "Tecnologías dominadas" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Blobs de fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-koi/20 blur-3xl animate-blob" />
        <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-water/10 blur-3xl animate-blob [animation-delay:4s]" />
      </div>

      <div className="container-koi">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-water" />
              Fábrica de software · Santiago, Chile
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
              Convertimos tus ideas en{" "}
              <span className="text-gradient">software que funciona</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              En <strong className="text-white">Koi Labs Solutions</strong> diseñamos y
              desarrollamos páginas web, aplicaciones móviles y sistemas a medida.
              Tecnología moderna, resultados medibles y un equipo cercano que
              entiende tu negocio.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Cotiza tu proyecto
              </a>
              <a href="#servicios" className="btn-ghost w-full sm:w-auto">
                Ver servicios
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Métricas de confianza */}
        <Reveal delay={320}>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-5 text-center backdrop-blur"
              >
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
