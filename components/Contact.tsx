"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { WhatsAppIcon, MailIcon, PhoneIcon, PinIcon, ArrowIcon } from "./icons";
import { site } from "@/lib/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hola Koi Labs 👋%0A%0A` +
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
      icon: PhoneIcon,
      label: "Teléfono",
      value: site.phoneDisplay,
      href: `tel:+${site.whatsapp}`,
    },
    {
      icon: PinIcon,
      label: "Ubicación",
      value: site.location,
      href: null,
    },
  ];

  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="container-koi">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-700/80 to-ink-800/80">
          <div className="grid lg:grid-cols-2">
            {/* Lado izquierdo: info */}
            <div className="relative p-8 sm:p-12">
              <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-koi/15 blur-3xl" />
              <Reveal>
                <span className="eyebrow">Hablemos</span>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿Tienes un proyecto en mente?
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Cuéntanos qué necesitas y te respondemos con una propuesta clara.
                  La primera conversación siempre es gratis.
                </p>
              </Reveal>

              <div className="mt-8 space-y-3">
                {contactCards.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-koi/40">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-koi/15 text-koi-light">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400">
                          {c.label}
                        </div>
                        <div className="text-sm font-medium text-white">
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

            {/* Lado derecho: formulario */}
            <div className="border-t border-white/10 bg-ink-800/40 p-8 sm:p-12 lg:border-l lg:border-t-0">
              <Reveal delay={100}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-300"
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
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-koi focus:outline-none focus:ring-1 focus:ring-koi"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact"
                      className="mb-2 block text-sm font-medium text-slate-300"
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
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-koi focus:outline-none focus:ring-1 focus:ring-koi"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Cuéntanos sobre tu proyecto
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Necesito una página web / app para..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-koi focus:outline-none focus:ring-1 focus:ring-koi"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Enviar por WhatsApp
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-slate-500">
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
