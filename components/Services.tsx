import Reveal from "./Reveal";
import {
  WebIcon,
  MobileIcon,
  CodeIcon,
  PlugIcon,
  CloudIcon,
  ShieldIcon,
} from "./icons";

const services = [
  {
    icon: WebIcon,
    title: "Páginas y aplicaciones web",
    text: "Sitios corporativos, landing pages y plataformas web rápidas, responsivas y optimizadas para convertir visitas en clientes.",
  },
  {
    icon: MobileIcon,
    title: "Aplicaciones móviles",
    text: "Apps para Android e iOS con experiencias fluidas. Desde la idea hasta la publicación en las tiendas.",
  },
  {
    icon: CodeIcon,
    title: "Software a medida",
    text: "Sistemas de gestión, automatización de procesos y herramientas internas diseñadas exactamente para tu operación.",
  },
  {
    icon: PlugIcon,
    title: "APIs e integraciones",
    text: "Conectamos tus sistemas con pasarelas de pago, ERPs, CRMs y servicios externos para que todo trabaje en conjunto.",
  },
  {
    icon: CloudIcon,
    title: "Cloud y despliegue",
    text: "Infraestructura escalable en la nube, despliegues automatizados y monitoreo para que tu producto esté siempre disponible.",
  },
  {
    icon: ShieldIcon,
    title: "Mantención y soporte",
    text: "Acompañamiento continuo, mejoras, seguridad y respaldos. No te dejamos solo después del lanzamiento.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">Qué hacemos</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Soluciones de software de punta a punta
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg text-slate-300">
              Todo lo que tu proyecto digital necesita, con un solo equipo
              responsable.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 100} className="h-full">
                <article className="card group h-full p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-koi/20 to-koi-deep/10 text-koi-light ring-1 ring-koi/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {s.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
