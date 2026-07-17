import Reveal from "./Reveal";
import { KoiMark } from "./Logo";

const principles = [
  {
    title: "Cercanía real",
    text: "Hablas directo con quien trabaja tu proyecto. Sin intermediarios, sin tickets perdidos.",
  },
  {
    title: "Pocos proyectos, bien hechos",
    text: "Preferimos seriedad antes que volumen. Nos comprometemos con lo que sí podemos entregar.",
  },
  {
    title: "Proceso y trazabilidad",
    text: "Contrato, portal de cliente y estrategia por escrito. Siempre sabes en qué punto vamos.",
  },
  {
    title: "Enfocados en tu negocio",
    text: "No vendemos tecnología de moda: proponemos lo que realmente mueve tus objetivos.",
  },
];

export default function About() {
  return (
    <section id="estudio" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* El porqué */}
          <div className="max-w-xl">
            <Reveal>
              <p className="section-label">El estudio</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-niebla sm:text-4xl">
                Un equipo pequeño, cansado del software mal hecho.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-junco">
                <p>
                  KOI nace de una molestia compartida: demasiadas pymes chilenas
                  fueron decepcionadas por freelancers informales o agencias que
                  sobre-venden y sub-entregan.
                </p>
                <p>
                  Somos un estudio pequeño y 100% remoto, por diseño. Preferimos
                  pocos proyectos hechos con seriedad — con contrato y proceso —
                  antes que crecer prometiendo de todo.
                </p>
                <p className="border-l-2 border-koi/60 pl-4 font-display text-niebla">
                  Como el koi que remonta la corriente: constancia, dirección y
                  las cosas bien hechas.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Principios */}
          <div className="relative">
            <KoiMark className="pointer-events-none absolute -right-4 -top-10 h-32 w-32 opacity-[0.06]" />
            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <article className="panel h-full p-6">
                    <h3 className="font-display text-base font-semibold text-niebla">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-junco">
                      {p.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
