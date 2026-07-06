"use client";

import { WhatsAppIcon } from "./icons";
import { whatsappUrl } from "@/lib/site";

export default function WhatsappFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-4 shadow-xl shadow-black/30 transition-transform duration-300 hover:scale-105"
    >
      <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <WhatsAppIcon className="relative h-6 w-6 text-white" />
      <span className="relative hidden text-sm font-semibold text-white sm:inline">
        Escríbenos
      </span>
    </a>
  );
}
