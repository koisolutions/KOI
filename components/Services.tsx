import Reveal from "./Reveal";
import {
  CodeIcon,
  WebIcon,
  MobileIcon,
  DashboardIcon,
  PlugIcon,
  CloudIcon,
} from "./icons";

const services = [
  {
    n: "01",
    icon: CodeIcon,
    title: "Sistemas internos",
    text: "Herramientas de gestión hechas a la medida de tu operación: inventario, agendamiento, fichas, reportería. Software que se adapta a tu proceso, no al revés.",
  },
  {
    n: "02",
    icon: WebIcon,
    title: "Páginas y sitios web",
    text: "Sitios corporativos, landings y catálogos rápidos, modernos y optimizados para buscadores — pensados para convertir visitas en clientes.",
  },
  {
    n: "03",
    icon: MobileIcon,
    title: "Aplicaciones móviles",
    text: "Apps para Android e iOS con experiencias fluidas, desde la idea hasta la publicación en las tiendas.",
  },
  {
    n: "04",
    icon: DashboardIcon,
    title: "Portales de cliente",
    text: "Espacios privados donde tus clientes ven su información, documentos y avances en tiempo real. Menos correos, menos llamadas, más confianza.",
  },
  {
    n: "05",
    icon: PlugIcon,
    title: "Automatizaciones e integraciones",
    text: "Conectamos tus sistemas y eliminamos el trabajo manual repetitivo: pasarelas de pago, ERPs, CRMs y servicios externos que trabajan solos.",
  },
  {
    n: "06",
    icon: CloudIcon,
    title: "Plataformas web escalables",
    text: "Productos web que soportan crecimiento real: arquitectura pensada para escalar, desplegada en infraestructura cloud y monitoreada.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="max-w-2xl">
          <Reveal>
            <p className="section-label">Qué construye KOI</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-niebla sm:text-4xl">
              No vendemos plantillas. Construimos lo que tu operación necesita.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hair/10 bg-hair/10 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <article className="group h-full bg-sumi p-8 transition-colors duration-300 hover:bg-laguna/40">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-vidrio/60 text-indigo-light transition-colors duration-300 group-hover:border-koi/50 group-hover:text-koi">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-junco/60">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-niebla">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-junco">
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
