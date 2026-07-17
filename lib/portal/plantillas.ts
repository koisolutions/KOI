import type { Bloque } from "./pdf";
import type { CategoriaDoc, Cliente } from "./types";

// =====================================================================
//  Plantillas de documentos generables. Cada una define sus campos
//  (con autorrelleno desde el cliente) y cómo construir el documento.
// =====================================================================

export type CampoTipo = "text" | "textarea" | "date" | "number";

export interface Campo {
  key: string;
  label: string;
  tipo: CampoTipo;
  placeholder?: string;
  required?: boolean;
  ancho?: "full" | "half";
  auto?: (c: Cliente) => string;
}

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaDoc;
  campos: Campo[];
  construir: (
    v: Record<string, string>,
    c: Cliente
  ) => { titulo: string; nombreArchivo: string; bloques: Bloque[] };
}

// Datos de KOI (edítalos aquí si cambian)
const KOI_DATOS = {
  legalName: "Koi Labs Solutions SpA",
  rut: "[RUT KOI]",
  representante: "Joaquín",
  domicilio: "Santiago, Chile",
  email: "hola@koi.cl",
};

const P = (texto: string): Bloque => ({ tipo: "p", texto });
const H1 = (texto: string): Bloque => ({ tipo: "h1", texto });
const H2 = (texto: string): Bloque => ({ tipo: "h2", texto });
const SP = (alto?: number): Bloque => ({ tipo: "space", alto });

export const PLANTILLAS: Plantilla[] = [
  // -------------------------------------------------------------------
  {
    id: "contrato",
    nombre: "Contrato de Prestación de Servicios",
    descripcion: "Documento principal para un proyecto completo a medida.",
    categoria: "contrato",
    campos: [
      { key: "fecha", label: "Fecha", tipo: "text", ancho: "half", placeholder: "17 de julio de 2026", required: true },
      { key: "nombreCliente", label: "Cliente (empresa)", tipo: "text", required: true, auto: (c) => c.nombreEmpresa },
      { key: "rutCliente", label: "RUT cliente", tipo: "text", ancho: "half", required: true, auto: (c) => c.rut },
      { key: "repCliente", label: "Representante cliente", tipo: "text", ancho: "half", required: true, auto: (c) => c.contactoPrincipal },
      { key: "descripcion", label: "Descripción del proyecto", tipo: "textarea", required: true, placeholder: "Sistema de gestión de pedidos para 3 locales…" },
      { key: "monto", label: "Monto total (CLP)", tipo: "number", ancho: "half", required: true, placeholder: "3000000" },
      { key: "plazo", label: "Plazo estimado", tipo: "text", ancho: "half", required: true, placeholder: "10 semanas" },
      { key: "formaPago", label: "Forma de pago", tipo: "textarea", placeholder: "40% anticipo, 30% avance, 30% entrega" },
      { key: "garantiaDias", label: "Garantía (días)", tipo: "number", ancho: "half", placeholder: "60" },
      { key: "jurisdiccion", label: "Jurisdicción", tipo: "text", ancho: "half", placeholder: "los tribunales de Santiago" },
    ],
    construir: (v, c) => ({
      titulo: "Contrato de Prestación de Servicios de Desarrollo de Software",
      nombreArchivo: `Contrato-${c.nombreEmpresa}`,
      bloques: [
        P(`En Santiago de Chile, a ${v.fecha || "[fecha]"}, entre ${KOI_DATOS.legalName}, RUT ${KOI_DATOS.rut}, representada por ${KOI_DATOS.representante}, con domicilio en ${KOI_DATOS.domicilio} (el "Proveedor" o "KOI"); y ${v.nombreCliente || c.nombreEmpresa}, RUT ${v.rutCliente || c.rut}, representada por ${v.repCliente || c.contactoPrincipal} (el "Cliente"); en conjunto las "Partes", se acuerda el siguiente contrato:`),
        H1("Primero — Objeto"),
        P(`El Proveedor prestará servicios de diseño y desarrollo de software a medida consistentes en: ${v.descripcion || "[descripción del proyecto]"} (el "Proyecto"), conforme al alcance acordado por las Partes.`),
        H1("Segundo — Precio y forma de pago"),
        P(`El precio total de los servicios es de $${Number(v.monto || 0).toLocaleString("es-CL")} (CLP). Forma de pago: ${v.formaPago || "40% anticipo, 30% avance, 30% entrega"}. El Proveedor emitirá el documento tributario correspondiente y el pago se efectuará según lo pactado.`),
        H1("Tercero — Plazo"),
        P(`El Proyecto se ejecutará en un plazo estimado de ${v.plazo || "[plazo]"}, contado desde la recepción del anticipo. Los plazos podrán ajustarse por demoras del Cliente en entregar información, accesos o aprobaciones, o por trabajo adicional acordado.`),
        H1("Cuarto — Obligaciones del Cliente"),
        P("El Cliente entregará oportunamente la información, contenidos, accesos y aprobaciones necesarios, designará una contraparte con facultades de decisión y pagará el precio en los términos pactados."),
        H1("Quinto — Aceptación y control de cambios"),
        P("Entregado un hito, el Cliente dispondrá de un plazo razonable para aceptarlo u observarlo por escrito; sin observaciones se entenderá aceptado. Toda modificación al alcance constará por escrito indicando su impacto en plazo y precio."),
        H1("Sexto — Propiedad intelectual"),
        P("Pagado íntegramente el precio, el Proveedor cede al Cliente los derechos patrimoniales sobre el código y los entregables desarrollados específicamente para el Proyecto. Se exceptúan los componentes de terceros (regidos por sus licencias) y el know-how y herramientas preexistentes del Proveedor, que quedan licenciados para el uso del Proyecto."),
        H1("Séptimo — Confidencialidad y datos personales"),
        P("Cada Parte mantendrá reserva de la información confidencial de la otra. El tratamiento de datos personales se realizará conforme a la Ley N° 19.628 y su normativa sucesora, solo para los fines del Proyecto."),
        H1("Octavo — Garantía"),
        P(`El Proveedor corregirá sin costo los defectos reportados dentro de ${v.garantiaDias || "60"} días desde la aceptación final, salvo que deriven de modificaciones de terceros, mal uso o cambios de entorno ajenos al Proveedor.`),
        H1("Noveno — Limitación de responsabilidad"),
        P("Salvo dolo o culpa grave, la responsabilidad total del Proveedor no excederá el monto efectivamente pagado por el Cliente, y no responderá por daños indirectos, lucro cesante o pérdida de datos no imputables a su culpa."),
        H1("Décimo — Ley aplicable y jurisdicción"),
        P(`Este contrato se rige por la ley chilena y cualquier controversia se someterá a ${v.jurisdiccion || "los tribunales de Santiago"}.`),
        { tipo: "firma" },
      ],
    }),
  },

  // -------------------------------------------------------------------
  {
    id: "orden",
    nombre: "Orden de Trabajo",
    descripcion: "Encargo acotado o cliente con contrato marco vigente.",
    categoria: "contrato",
    campos: [
      { key: "numero", label: "N° de orden", tipo: "text", ancho: "half", required: true, placeholder: "OT-001" },
      { key: "fecha", label: "Fecha", tipo: "text", ancho: "half", required: true, placeholder: "17 de julio de 2026" },
      { key: "nombreCliente", label: "Cliente", tipo: "text", required: true, auto: (c) => c.nombreEmpresa },
      { key: "trabajo", label: "Trabajo a realizar", tipo: "textarea", required: true, placeholder: "Módulo de reportería exportable a Excel…" },
      { key: "entregables", label: "Entregables", tipo: "textarea", placeholder: "Un entregable por línea" },
      { key: "monto", label: "Valor (CLP)", tipo: "number", ancho: "half", required: true, placeholder: "600000" },
      { key: "plazo", label: "Plazo", tipo: "text", ancho: "half", placeholder: "2 semanas" },
      { key: "formaPago", label: "Forma de pago", tipo: "text", placeholder: "50% anticipo, 50% contra entrega" },
    ],
    construir: (v, c) => ({
      titulo: `Orden de Trabajo N° ${v.numero || ""}`,
      nombreArchivo: `Orden-${v.numero || c.nombreEmpresa}`,
      bloques: [
        P(`Proveedor: ${KOI_DATOS.legalName} — RUT ${KOI_DATOS.rut}`),
        P(`Cliente: ${v.nombreCliente || c.nombreEmpresa} — RUT ${c.rut}`),
        P(`Fecha: ${v.fecha || "[fecha]"}`),
        H1("1. Trabajo a realizar"),
        P(v.trabajo || "[descripción del encargo]"),
        H1("2. Entregables"),
        P(v.entregables || "[entregables]"),
        H1("3. Plazo"),
        P(`Entrega estimada: ${v.plazo || "[plazo]"}, sujeto a la entrega oportuna de información y accesos por parte del Cliente.`),
        H1("4. Valor y pago"),
        P(`Valor: $${Number(v.monto || 0).toLocaleString("es-CL")} (CLP). Forma de pago: ${v.formaPago || "50% anticipo, 50% contra entrega"}, a convenir en el documento tributario.`),
        H1("5. Condiciones"),
        P("La propiedad intelectual de lo desarrollado se transfiere al Cliente una vez pagado el total, excluyendo componentes de terceros y las herramientas preexistentes de KOI. Garantía de corrección de errores por 30 días desde la aceptación. En lo no previsto, rige el contrato marco vigente entre las Partes."),
        { tipo: "firma" },
      ],
    }),
  },

  // -------------------------------------------------------------------
  {
    id: "nda",
    nombre: "Acuerdo de Confidencialidad (NDA)",
    descripcion: "Antes de compartir información sensible o cotizar.",
    categoria: "otro",
    campos: [
      { key: "fecha", label: "Fecha", tipo: "text", ancho: "half", required: true, placeholder: "17 de julio de 2026" },
      { key: "ciudad", label: "Ciudad", tipo: "text", ancho: "half", placeholder: "Santiago" },
      { key: "nombreCliente", label: "Cliente", tipo: "text", required: true, auto: (c) => c.nombreEmpresa },
      { key: "rutCliente", label: "RUT cliente", tipo: "text", ancho: "half", auto: (c) => c.rut },
      { key: "anios", label: "Años de reserva", tipo: "number", ancho: "half", placeholder: "3" },
      { key: "proposito", label: "Propósito", tipo: "textarea", required: true, placeholder: "Evaluar y eventualmente desarrollar el proyecto…" },
      { key: "jurisdiccion", label: "Jurisdicción", tipo: "text", placeholder: "los tribunales de Santiago" },
    ],
    construir: (v, c) => ({
      titulo: "Acuerdo de Confidencialidad (NDA)",
      nombreArchivo: `NDA-${c.nombreEmpresa}`,
      bloques: [
        P(`En ${v.ciudad || "Santiago"}, a ${v.fecha || "[fecha]"}, entre ${KOI_DATOS.legalName}, RUT ${KOI_DATOS.rut} ("KOI"), y ${v.nombreCliente || c.nombreEmpresa}, RUT ${v.rutCliente || c.rut} (el "Cliente"), en conjunto las "Partes", se acuerda:`),
        H1("1. Propósito"),
        P(v.proposito || "Las Partes desean intercambiar información para evaluar y eventualmente desarrollar el proyecto."),
        H1("2. Información confidencial"),
        P('Es "Información Confidencial" toda información técnica, comercial, financiera u operativa, en cualquier formato, que una Parte comparta con la otra. No es confidencial la que sea pública sin culpa de la receptora, la que ya poseía lícitamente, o la que deba revelarse por mandato legal.'),
        H1("3. Obligaciones"),
        P("La receptora usará la información solo para el Propósito, no la divulgará a terceros sin autorización escrita, la protegerá con cuidado razonable y limitará el acceso a quienes la necesiten, quienes quedarán sujetos a iguales obligaciones."),
        H1("4. Datos personales"),
        P("Cuando se compartan datos personales, se tratarán conforme a la Ley N° 19.628 y su normativa sucesora, solo para el Propósito."),
        H1("5. Plazo"),
        P(`Las obligaciones de confidencialidad subsisten por ${v.anios || "3"} años desde el término de la relación entre las Partes.`),
        H1("6. Ley y jurisdicción"),
        P(`Se rige por la ley chilena y se somete a ${v.jurisdiccion || "los tribunales de Santiago"}. Este acuerdo no transfiere derechos de propiedad intelectual ni obliga a celebrar contrato alguno.`),
        { tipo: "firma" },
      ],
    }),
  },

  // -------------------------------------------------------------------
  {
    id: "welcome",
    nombre: "Welcome Document",
    descripcion: "Se entrega tras la firma, para arrancar el proyecto.",
    categoria: "welcome_doc",
    campos: [
      { key: "contacto", label: "Nombre del contacto", tipo: "text", ancho: "half", required: true, auto: (c) => c.contactoPrincipal },
      { key: "nombreProyecto", label: "Nombre del proyecto", tipo: "text", ancho: "half", required: true, placeholder: "Sistema de pedidos" },
      { key: "resumen", label: "Resumen del proyecto", tipo: "textarea", required: true, placeholder: "Qué problema resolvemos y para quién…" },
      { key: "comercial", label: "Contraparte comercial", tipo: "text", ancho: "half", placeholder: "Joaquín — joaquin@koi.cl" },
      { key: "tecnico", label: "Contraparte técnica", tipo: "text", ancho: "half", placeholder: "Juan Pablo — juanpablo@koi.cl" },
      { key: "necesitamos", label: "Qué necesitamos de ti", tipo: "textarea", placeholder: "Accesos, contenidos, formulario…" },
      { key: "inicio", label: "Inicio estimado", tipo: "text", ancho: "half", placeholder: "julio 2026" },
      { key: "entrega", label: "Entrega estimada", tipo: "text", ancho: "half", placeholder: "septiembre 2026" },
      { key: "hitosPago", label: "Hitos de pago", tipo: "text", placeholder: "40% anticipo · 30% avance · 30% entrega" },
    ],
    construir: (v, c) => ({
      titulo: `Bienvenido/a a KOI — ${c.nombreEmpresa}`,
      nombreArchivo: `Welcome-${c.nombreEmpresa}`,
      bloques: [
        P(`Hola ${v.contacto || c.contactoPrincipal}, gracias por confiar en KOI. Este documento resume cómo vamos a trabajar juntos en el proyecto "${v.nombreProyecto || "[proyecto]"}". Todo lo mencionado aquí también estará en tu portal de cliente.`),
        H1("Tu proyecto en una frase"),
        P(v.resumen || "[resumen del objetivo del proyecto]"),
        H1("Quién te acompaña"),
        P(`Contraparte comercial: ${v.comercial || "Joaquín — joaquin@koi.cl"}.`),
        P(`Contraparte técnica: ${v.tecnico || "Juan Pablo — juanpablo@koi.cl"}.`),
        H1("El proceso KOI"),
        P("1. Contrato claro (firmado). 2. Formulario de preguntas en el portal. 3. Welcome doc (este documento). 4. Portal de cliente. 5. Estrategia documentada. 6. Llamada estratégica. 7. Desarrollo con avances visibles en el portal."),
        H1("Qué necesitamos de ti para partir"),
        P(v.necesitamos || "Responder el formulario de onboarding, entregar accesos y contenidos, confirmar tu contraparte con poder de decisión y pagar el anticipo."),
        H1("Plazos y pagos"),
        P(`Inicio estimado: ${v.inicio || "[fecha]"}. Entrega estimada: ${v.entrega || "[fecha]"}. Hitos de pago: ${v.hitosPago || "40% anticipo · 30% avance · 30% entrega"} (el detalle está en tus facturas del portal).`),
        H1("Tu portal de cliente"),
        P("En el portal podrás ver y descargar documentos, revisar y pagar facturas, abrir solicitudes de soporte, agendar reuniones y seguir el avance del proyecto en tiempo real."),
        SP(6),
        P("Estamos felices de partir. Si algo no queda claro, escríbenos antes de avanzar. — El equipo de KOI."),
      ],
    }),
  },
];

export function plantillaPorId(id: string): Plantilla | undefined {
  return PLANTILLAS.find((p) => p.id === id);
}
