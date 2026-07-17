// =====================================================================
//  CONFIGURACIÓN DE KOI  —  edita SOLO este archivo
//  para cambiar datos de contacto, textos y enlaces de la landing.
// =====================================================================

export const site = {
  name: "KOI",
  legalName: "Koi Labs Solutions SpA",
  domain: "koi.cl",
  tagline: "El software que tu negocio no encuentra de fábrica",
  description:
    "KOI es un estudio de software boutique en Chile. Diseñamos y construimos sistemas internos, portales de cliente, automatizaciones y plataformas web escalables — con un proceso pautado y transparente, y un stack técnico real.",

  // ---- CONTACTO (⚠️ REEMPLAZA ESTOS DATOS) ------------------------
  // WhatsApp en formato internacional SIN "+", espacios ni guiones.
  // Ejemplo Chile: 56912345678  (56 = país, 9 = móvil, luego el número)
  whatsapp: "56912345678",
  email: "hola@koi.cl",
  phoneDisplay: "+56 9 1234 5678",
  location: "Chile · 100% remoto",

  // ---- FUNDADORES -------------------------------------------------
  founders: [
    {
      name: "Joaquín",
      role: "Comercial & Cliente",
      focus:
        "El puente con tu negocio: entiende el problema, define el alcance y mantiene la relación clara de principio a fin.",
    },
    {
      name: "Juan Pablo",
      role: "Arquitectura & Desarrollo",
      focus:
        "Diseña la arquitectura y escribe el código: sistemas mantenibles, seguros y pensados para escalar sin sustos.",
    },
  ],

  // ---- REDES (opcional, deja "" para ocultar) ---------------------
  social: {
    instagram: "",
    linkedin: "",
    github: "",
  },

  // ---- MENSAJE PRELLENADO DE WHATSAPP -----------------------------
  whatsappMessage:
    "Hola KOI, vengo desde koi.cl y me gustaría conversar sobre un proyecto.",
} as const;

// URL de WhatsApp lista para usar (no editar).
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;
