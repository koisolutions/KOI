// =====================================================================
//  CONFIGURACIÓN DE LA EMPRESA  —  edita SOLO este archivo
//  para cambiar datos de contacto, textos y enlaces de la landing.
// =====================================================================

export const site = {
  name: "Koi Labs Solutions",
  legalName: "Koi Labs Solutions SpA",
  tagline: "Software que impulsa tu negocio",
  description:
    "Desarrollamos software a medida, páginas web y aplicaciones móviles para empresas que quieren crecer. Tecnología confiable, diseño moderno y soporte cercano.",

  // ---- CONTACTO (⚠️ REEMPLAZA ESTOS DATOS) ------------------------
  // WhatsApp en formato internacional SIN "+", espacios ni guiones.
  // Ejemplo Chile: 56912345678  (56 = país, 9 = móvil, luego el número)
  whatsapp: "56912345678",
  email: "contacto@koilabs.cl",
  phoneDisplay: "+56 9 1234 5678",
  location: "Santiago, Chile",

  // ---- REDES (opcional, deja "" para ocultar) ---------------------
  social: {
    instagram: "",
    linkedin: "",
    github: "",
  },

  // ---- MENSAJE PRELLENADO DE WHATSAPP -----------------------------
  whatsappMessage:
    "¡Hola Koi Labs! Vengo desde su sitio web y me gustaría conversar sobre un proyecto.",
} as const;

// URL de WhatsApp lista para usar (no editar).
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;
