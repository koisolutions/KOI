import Reveal from "./Reveal";
import {
  SearchIcon,
  DesignIcon,
  DevIcon,
  DeployIcon,
  SupportIcon,
} from "./icons";

const processSteps = [
  {
    icon: SearchIcon,
    title: "1. Descubrimiento y Estrategia",
    text: "Nos sumergimos en tu negocio para entender tus objetivos. Definimos el alcance, la tecnología y la hoja de ruta del proyecto para asegurar que la solución final cumpla y supere tus expectativas.",
  },
  {
    icon: DesignIcon,
    title: "2. Diseño UX/UI y Prototipado",
    text: "Creamos una experiencia de usuario intuitiva y un diseño visual atractivo. A través de prototipos interactivos, validamos el flujo y la funcionalidad antes de escribir una sola línea de código.",
  },
  {
    icon: DevIcon,
    title: "3. Desarrollo Ágil",
    text: "Construimos tu software en ciclos cortos (sprints), lo que te permite ver el progreso de forma continua y hacer ajustes sobre la marcha. Calidad, eficiencia y comunicación son nuestros pilares.",
  },
  {
    icon: DeployIcon,
    title: "4. Despliegue y Lanzamiento",
    text: "Preparamos la infraestructura en la nube, automatizamos el despliegue y realizamos pruebas exhaustivas para garantizar un lanzamiento exitoso, seguro y sin contratiempos.",
  },
  {
    icon: SupportIcon,
    title: "5. Soporte y Evolución",
    text: "Tu proyecto sigue vivo después del lanzamiento. Ofrecemos planes de mantenimiento, soporte continuo y desarrollo de nuevas funcionalidades para que tu software crezca contigo.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">Nuestro Método</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Un camino claro hacia el éxito de tu proyecto
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg text-slate-300">
              Seguimos un proceso probado que garantiza resultados de alta
              calidad, entregados a tiempo y dentro del presupuesto.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* La línea de conexión */}
          <div
            className="absolute left-1/2 top-2 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-y-12 lg:grid-cols-1 lg:gap-y-20">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="relative lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-8"
              >
                {/* Tarjeta de contenido (izquierda o derecha) */}
                <article
                  className={`card group lg:col-start-${
                    i % 2 === 0 ? 1 : 3
                  } lg:row-start-1`}
                >
                  <Reveal
                    className={`h-full ${
                      i % 2 === 0 ? "reveal-from-left" : "reveal-from-right"
                    }`}
                  >
                    <div className={`p-6 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <h3 className="font-display text-lg font-semibold text-koi-light">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                </article>

                {/* El ÍCONO en la línea de tiempo */}
                <div className="relative flex items-center justify-center lg:col-start-2 lg:row-start-1">
                  <div className="absolute -top-12 h-20 w-px bg-white/10 lg:hidden" />
                  <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-ink-600 text-koi-light ring-2 ring-koi/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"><step.icon className="h-7 w-7" /></div>
                </div> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
