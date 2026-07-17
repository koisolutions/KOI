import Reveal from "./Reveal";

const layers = [
  {
    tag: "cliente/",
    title: "Interfaz",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    tag: "servidor/",
    title: "Lógica & datos",
    items: ["Django", "DRF", "PostgreSQL", "REST APIs"],
  },
  {
    tag: "infra/",
    title: "Despliegue & operación",
    items: ["Docker", "CI/CD", "Cloud infra", "Monitoreo"],
  },
];

export default function Tech() {
  return (
    <section id="stack" className="border-y border-white/[0.06] bg-laguna-700/40 py-20 sm:py-28">
      <div className="container-koi">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Texto */}
          <div className="max-w-md">
            <Reveal>
              <p className="section-label">Stack</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-niebla sm:text-4xl">
                Un stack acotado, elegido a propósito.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 leading-relaxed text-junco">
                No perseguimos la tecnología de moda. Trabajamos con
                herramientas maduras y probadas que conocemos a fondo, para
                entregar software que sigue en pie años después del lanzamiento.
              </p>
            </Reveal>
          </div>

          {/* Manifiesto de arquitectura por capas */}
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-sumi-900/80 font-mono text-sm">
              {/* Barra tipo terminal */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-koi/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-vidrio" />
                <span className="h-2.5 w-2.5 rounded-full bg-vidrio" />
                <span className="ml-3 text-xs text-junco">koi · arquitectura.txt</span>
              </div>

              <div className="divide-y divide-white/[0.05]">
                {layers.map((layer) => (
                  <div key={layer.tag} className="px-5 py-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-koi">{layer.tag}</span>
                      <span className="text-xs uppercase tracking-widest text-junco">
                        {layer.title}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-niebla">
                      {layer.items.map((item) => (
                        <span key={item} className="flex items-center gap-2">
                          <span className="text-indigo-light">›</span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
