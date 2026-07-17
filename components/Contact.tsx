"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { WhatsAppIcon, MailIcon, PinIcon, ArrowIcon } from "./icons";
import { site } from "@/lib/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hola KOI 👋%0A%0A` +
      `*Nombre:* ${form.name}%0A` +
      `*Contacto:* ${form.contact}%0A` +
      `*Proyecto:* ${form.message}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
  };

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const contactCards = [
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: site.phoneDisplay,
      href: `https://wa.me/${site.whatsapp}`,
    },
    {
      icon: MailIcon,
      label: "Correo",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: PinIcon,
      label: "Dónde estamos",
      value: site.location,
      href: null,
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-vidrio/60 bg-sumi-900/60 px-4 py-3 text-niebla placeholder:text-junco/60 transition-colors focus:border-indigo focus:outline-none";

  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="overflow-hidden rounded-3xl border border-hair/10 bg-laguna/30">
          <div className="grid lg:grid-cols-2">
            {/* Info */}
            <div className="p-8 sm:p-12">
              <Reveal>
                <p className="section-label">Conversemos</p>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-niebla sm:text-4xl">
                  ¿Tienes un proyecto en mente?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-junco">
                  Cuéntanos qué necesitas y te respondemos con una propuesta
                  clara. La primera conversación es sin costo y sin compromiso.
                </p>
              </Reveal>

              <div className="mt-8 space-y-3">
                {contactCards.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <div className="flex items-center gap-4 rounded-xl border border-hair/10 bg-sumi/40 p-4 transition-colors hover:border-vidrio">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-vidrio/60 text-indigo-light">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-mono text-xs uppercase tracking-wider text-junco">
                          {c.label}
                        </div>
                        <div className="text-sm font-medium text-niebla">
                          {c.value}
                        </div>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={c.label}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Formulario */}
            <div className="border-t border-hair/10 bg-sumi-900/40 p-8 sm:p-12 lg:border-l lg:border-t-0">
              <Reveal delay={100}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-junco"
                    >
                      Tu nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Ej: Juan Pérez"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact"
                      className="mb-2 block text-sm font-medium text-junco"
                    >
                      Correo o teléfono
                    </label>
                    <input
                      id="contact"
                      type="text"
                      required
                      value={form.contact}
                      onChange={update("contact")}
                      placeholder="tucorreo@ejemplo.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-junco"
                    >
                      Cuéntanos sobre tu proyecto
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Necesito un sistema / portal / automatización para..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Enviar por WhatsApp
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-junco/80">
                    Al enviar, se abrirá WhatsApp con tu mensaje listo para
                    despacharlo.
                  </p>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
