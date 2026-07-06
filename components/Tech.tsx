import Reveal from "./Reveal";

const stacks = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Python", "PHP / Laravel", "REST & GraphQL", ".NET"],
  },
  {
    group: "Datos & Cloud",
    items: ["PostgreSQL", "MySQL", "MongoDB", "AWS", "Vercel", "Docker"],
  },
];

export default function Tech() {
  return (
    <section className="border-y border-white/5 bg-ink-800/50 py-16 sm:py-20">
      <div className="container-koi">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">Nuestro stack</span>
            <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
              Tecnologías modernas y probadas
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {stacks.map((stack, i) => (
            <Reveal key={stack.group} delay={i * 100}>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-koi-light">
                  {stack.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-koi/40 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
