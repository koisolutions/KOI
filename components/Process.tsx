import Reveal from "./Reveal";
import {
  ShieldIcon,
  SearchIcon,
  MailIcon,
  WebIcon,
  DesignIcon,
  PhoneIcon,
  CodeIcon,
} from "./icons";

const steps = [
  {
    icon: ShieldIcon,
    title: "Contrato claro",
    text: "Antes de todo, un acuerdo transparente: alcance, plazos y condiciones por escrito. Sabes exactamente qué esperar.",
  },
  {
    icon: SearchIcon,
    title: "Formulario de preguntas",
    text: "Un cuestionario pautado para entender tu negocio, tus objetivos y las restricciones reales de tu operación.",
  },
  {
    icon: MailIcon,
    title: "Welcome doc",
    text: "Recibes un documento de bienvenida con todo lo acordado, los próximos pasos y cómo será trabajar juntos.",
  },
  {
    icon: WebIcon,
    title: "Portal de cliente",
    text: "Te damos acceso a nuestro portal propio: avances, documentos y estado del proyecto siempre a la vista.",
  },
  {
    icon: DesignIcon,
    title: "Estrategia documentada",
    text: "Escribimos la estrategia técnica y de producto antes de programar. La arquitectura queda decidida y justificada.",
  },
  {
    icon: PhoneIcon,
    title: "Llamada estratégica",
    text: "Revisamos juntos el plan, resolvemos dudas y confirmamos el rumbo antes de escribir la primera línea de código.",
  },
  {
    icon: CodeIcon,
    title: "Desarrollo",
    text: "Construimos en ciclos con avances visibles en el portal. Comunicación directa con quien programa, sin intermediarios.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="max-w-2xl">
          <Reveal>
            <p className="section-label">Cómo trabajamos</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-niebla sm:text-4xl">
              Un proceso pautado, de principio a fin.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-junco">
              La confianza no se promete, se demuestra en el método. Así avanza
              cada proyecto con KOI:
            </p>
          </Reveal>
        </div>

        {/* Corriente: línea vertical que atraviesa los pasos */}
        <div className="relative mt-16 pl-10 sm:pl-14">
          <div
            className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-koi/50 via-vidrio to-transparent sm:left-[21px]"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative">
                  {/* Nodo en la corriente */}
                  <span
                    className="absolute -left-10 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-vidrio bg-sumi sm:-left-14 sm:h-11 sm:w-11"
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4 text-indigo-light sm:h-5 sm:w-5" />
                  </span>

                  <Reveal delay={(i % 3) * 60}>
                    <div className="panel p-6">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-koi">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-niebla">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-junco">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
