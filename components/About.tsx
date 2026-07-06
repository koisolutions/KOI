import Reveal from "./Reveal";
import { CheckIcon } from "./icons";
import { KoiMark } from "./Logo";

const values = [
  {
    title: "Cercanía real",
    text: "Hablas directo con quienes desarrollan tu proyecto, sin intermediarios ni tickets perdidos.",
  },
  {
    title: "Código de calidad",
    text: "Escribimos software mantenible y seguro, pensado para crecer contigo con el tiempo.",
  },
  {
    title: "Cumplimos plazos",
    text: "Trabajamos por entregas claras y avances constantes, para que siempre sepas dónde estamos.",
  },
  {
    title: "Enfocados en tu negocio",
    text: "No vendemos tecnología por moda: proponemos lo que realmente aporta valor a tus objetivos.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <div>
            <Reveal>
              <span className="eyebrow">Sobre nosotros</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Un equipo pequeño, <span className="text-gradient">grandes resultados</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-300">
                <p>
                  Koi Labs Solutions SpA nace de la pasión de dos desarrolladores
                  por construir tecnología que resuelve problemas reales. Combinamos
                  experiencia en desarrollo full stack, seguridad y redes para
                  entregar productos sólidos y confiables.
                </p>
                <p>
                  Como el koi que remonta la corriente, creemos en la constancia y en
                  hacer las cosas bien. Cada proyecto lo tomamos como propio: nos
                  importa que tu inversión se traduzca en un producto que funcione y
                  que tu negocio pueda escalar sin miedo.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Tarjeta visual + valores */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="sm:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-600/80 to-ink-800/80 p-8">
                <KoiMark className="absolute -right-6 -top-6 h-40 w-40 opacity-10" />
                <p className="font-display text-2xl font-semibold text-white">
                  &ldquo;Tu socio tecnológico, no solo un proveedor.&rdquo;
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  Nuestra misión: que las pymes y emprendedores accedan a software
                  de nivel profesional.
                </p>
              </div>
            </Reveal>

            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-water/15 text-water ring-1 ring-water/25">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
