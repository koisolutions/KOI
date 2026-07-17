import type { PortalState } from "./types";

// =====================================================================
//  Datos semilla ficticios. Sirven para demostrar el portal completo
//  sin backend. Credenciales de demo al final del archivo.
// =====================================================================

export const SEED: PortalState = {
  clientes: [
    {
      id: "c1",
      nombreEmpresa: "Panadería San Miguel",
      rut: "76.543.210-8",
      contactoPrincipal: "María González",
      email: "maria@sanmiguel.cl",
      telefono: "+56 9 8765 4321",
      estado: "activo",
      fechaInicio: "2026-03-04T00:00:00.000Z",
    },
    {
      id: "c2",
      nombreEmpresa: "Transportes Andes SpA",
      rut: "77.111.222-3",
      contactoPrincipal: "Rodrigo Fuentes",
      email: "rodrigo@transandes.cl",
      telefono: "+56 9 5555 1212",
      estado: "activo",
      fechaInicio: "2026-05-19T00:00:00.000Z",
    },
    {
      id: "c3",
      nombreEmpresa: "Clínica Dental Sonrisa",
      rut: "78.999.000-1",
      contactoPrincipal: "Carla Rojas",
      email: "carla@sonrisa.cl",
      telefono: "+56 9 4242 8080",
      estado: "pausado",
      fechaInicio: "2026-01-15T00:00:00.000Z",
    },
    {
      id: "c4",
      nombreEmpresa: "Ferretería El Clavo",
      rut: "79.222.333-4",
      contactoPrincipal: "Luis Torres",
      email: "luis@elclavo.cl",
      telefono: "+56 9 3131 7070",
      estado: "prospecto",
      fechaInicio: "2026-07-01T00:00:00.000Z",
    },
  ],

  usuarios: [
    // Internos KOI
    {
      id: "u-koi-1",
      clienteId: null,
      rol: "admin_koi",
      nombre: "Joaquín",
      email: "joaquin@koi.cl",
      password: "koi1234",
    },
    {
      id: "u-koi-2",
      clienteId: null,
      rol: "admin_koi",
      nombre: "Juan Pablo",
      email: "juanpablo@koi.cl",
      password: "koi1234",
    },
    // Clientes
    {
      id: "u-c1",
      clienteId: "c1",
      rol: "cliente",
      nombre: "María González",
      email: "maria@sanmiguel.cl",
      password: "demo1234",
    },
    {
      id: "u-c2",
      clienteId: "c2",
      rol: "cliente",
      nombre: "Rodrigo Fuentes",
      email: "rodrigo@transandes.cl",
      password: "demo1234",
    },
  ],

  documentos: [
    // Panadería San Miguel
    {
      id: "d1",
      clienteId: "c1",
      nombre: "Contrato de servicios KOI.pdf",
      categoria: "contrato",
      subidoPor: "KOI",
      tamano: "412 KB",
      fechaSubida: "2026-03-04T14:20:00.000Z",
      descripcion: "Contrato marco de desarrollo firmado por ambas partes.",
    },
    {
      id: "d2",
      clienteId: "c1",
      nombre: "Welcome Doc - Panadería San Miguel.pdf",
      categoria: "welcome_doc",
      subidoPor: "KOI",
      tamano: "1.1 MB",
      fechaSubida: "2026-03-05T09:00:00.000Z",
      descripcion: "Documento de bienvenida: alcance, equipo y próximos pasos.",
    },
    {
      id: "d3",
      clienteId: "c1",
      nombre: "Estrategia técnica v1.pdf",
      categoria: "estrategia",
      subidoPor: "KOI",
      tamano: "860 KB",
      fechaSubida: "2026-03-18T17:30:00.000Z",
      descripcion: "Arquitectura propuesta para el sistema de pedidos.",
    },
    {
      id: "d4",
      clienteId: "c1",
      nombre: "Reporte de avance - Marzo.pdf",
      categoria: "reporte",
      subidoPor: "KOI",
      tamano: "540 KB",
      fechaSubida: "2026-03-31T12:00:00.000Z",
      descripcion: "Resumen del primer sprint de desarrollo.",
    },
    {
      id: "d5",
      clienteId: "c1",
      nombre: "Logo y manual de marca.zip",
      categoria: "otro",
      subidoPor: "cliente",
      tamano: "3.4 MB",
      fechaSubida: "2026-03-06T11:15:00.000Z",
      descripcion: "Insumos de marca enviados por el cliente.",
    },
    // Transportes Andes
    {
      id: "d6",
      clienteId: "c2",
      nombre: "Contrato de servicios KOI.pdf",
      categoria: "contrato",
      subidoPor: "KOI",
      tamano: "418 KB",
      fechaSubida: "2026-05-19T15:00:00.000Z",
    },
    {
      id: "d7",
      clienteId: "c2",
      nombre: "Welcome Doc - Transportes Andes.pdf",
      categoria: "welcome_doc",
      subidoPor: "KOI",
      tamano: "1.0 MB",
      fechaSubida: "2026-05-20T10:00:00.000Z",
    },
    {
      id: "d8",
      clienteId: "c2",
      nombre: "Base de datos de rutas.xlsx",
      categoria: "otro",
      subidoPor: "cliente",
      tamano: "220 KB",
      fechaSubida: "2026-05-22T08:45:00.000Z",
      descripcion: "Planilla de rutas actuales para migrar al sistema.",
    },
  ],

  facturas: [
    {
      id: "f1",
      clienteId: "c1",
      numero: "0001",
      concepto: "Anticipo 40% - Sistema de pedidos",
      monto: 1200000,
      estado: "pagada",
      fechaEmision: "2026-03-04T00:00:00.000Z",
      fechaVencimiento: "2026-03-14T00:00:00.000Z",
    },
    {
      id: "f2",
      clienteId: "c1",
      numero: "0007",
      concepto: "Hito 2 - Módulo de inventario",
      monto: 900000,
      estado: "pendiente",
      fechaEmision: "2026-07-01T00:00:00.000Z",
      fechaVencimiento: "2026-07-31T00:00:00.000Z",
    },
    {
      id: "f3",
      clienteId: "c2",
      numero: "0005",
      concepto: "Anticipo 40% - Plataforma de rutas",
      monto: 1600000,
      estado: "pagada",
      fechaEmision: "2026-05-19T00:00:00.000Z",
      fechaVencimiento: "2026-05-29T00:00:00.000Z",
    },
    {
      id: "f4",
      clienteId: "c2",
      numero: "0009",
      concepto: "Hito 1 - Módulo de seguimiento",
      monto: 1100000,
      estado: "vencida",
      fechaEmision: "2026-06-10T00:00:00.000Z",
      fechaVencimiento: "2026-06-30T00:00:00.000Z",
    },
  ],

  formularios: [
    {
      clienteId: "c1",
      enviado: true,
      fechaRespuesta: "2026-03-05T16:40:00.000Z",
      respuestas: [
        {
          pregunta: "¿A qué se dedica tu empresa y cuál es tu rol en ella?",
          respuesta:
            "Somos una panadería con 3 locales. Soy la dueña y administro todo.",
        },
        {
          pregunta: "¿Qué problema concreto esperas resolver con este proyecto?",
          respuesta:
            "Tomar pedidos por WhatsApp es un caos. Necesito centralizarlos.",
        },
        {
          pregunta:
            "¿Qué haces hoy para resolverlo (herramientas, planillas, procesos manuales)?",
          respuesta: "Un cuaderno y un grupo de WhatsApp por local.",
        },
      ],
    },
    {
      clienteId: "c2",
      enviado: false,
      fechaRespuesta: null,
      respuestas: [],
    },
  ],

  proyectos: [
    {
      clienteId: "c1",
      nombre: "Sistema de pedidos y despacho",
      faseActual: "Desarrollo",
      progreso: 55,
      fechaEstimadaEntrega: "2026-09-15T00:00:00.000Z",
      resumen:
        "Plataforma para centralizar pedidos de los 3 locales, con inventario y despacho.",
    },
    {
      clienteId: "c2",
      nombre: "Plataforma de gestión de rutas",
      faseActual: "Estrategia",
      progreso: 20,
      fechaEstimadaEntrega: "2026-11-01T00:00:00.000Z",
      resumen:
        "Sistema de seguimiento de flota y optimización de rutas de despacho.",
    },
  ],

  notas: [
    {
      id: "n1",
      clienteId: "c1",
      autor: "Joaquín",
      texto:
        "Clienta muy participativa, responde rápido. Le interesa mucho el módulo de inventario para V2.",
      fecha: "2026-03-19T10:00:00.000Z",
    },
    {
      id: "n2",
      clienteId: "c2",
      autor: "Juan Pablo",
      texto:
        "Falta que completen el formulario de onboarding. Insistir antes de cerrar la estrategia.",
      fecha: "2026-05-23T09:30:00.000Z",
    },
  ],

  tickets: [
    {
      id: "t1",
      clienteId: "c1",
      codigo: "TK-014",
      asunto: "No puedo agregar un nuevo producto al catálogo",
      categoria: "bug",
      prioridad: "alta",
      estado: "en_proceso",
      fechaCreacion: "2026-07-10T13:20:00.000Z",
      mensajes: [
        {
          id: "m1",
          autor: "María González",
          rol: "cliente",
          texto:
            "Al guardar un producto nuevo me sale un error rojo y no queda guardado.",
          fecha: "2026-07-10T13:20:00.000Z",
        },
        {
          id: "m2",
          autor: "Juan Pablo",
          rol: "admin_koi",
          texto:
            "Gracias María, ya lo estamos revisando. ¿El error aparece con todos los productos o solo con algunos?",
          fecha: "2026-07-10T15:05:00.000Z",
        },
      ],
    },
    {
      id: "t2",
      clienteId: "c1",
      codigo: "TK-011",
      asunto: "¿Se puede exportar el reporte de ventas a Excel?",
      categoria: "consulta",
      prioridad: "baja",
      estado: "resuelto",
      fechaCreacion: "2026-06-28T10:00:00.000Z",
      mensajes: [
        {
          id: "m3",
          autor: "María González",
          rol: "cliente",
          texto: "Me gustaría bajar el reporte mensual a Excel, ¿es posible?",
          fecha: "2026-06-28T10:00:00.000Z",
        },
        {
          id: "m4",
          autor: "Joaquín",
          rol: "admin_koi",
          texto:
            "¡Sí! Lo dejamos habilitado en el botón «Exportar» del reporte. Cualquier cosa nos avisas.",
          fecha: "2026-06-28T12:30:00.000Z",
        },
      ],
    },
    {
      id: "t3",
      clienteId: "c2",
      codigo: "TK-016",
      asunto: "Solicitud de cambio: agregar columna de patente",
      categoria: "cambio",
      prioridad: "media",
      estado: "abierto",
      fechaCreacion: "2026-07-14T09:15:00.000Z",
      mensajes: [
        {
          id: "m5",
          autor: "Rodrigo Fuentes",
          rol: "cliente",
          texto:
            "Necesitamos ver la patente del camión en la tabla de rutas. ¿Se puede agregar?",
          fecha: "2026-07-14T09:15:00.000Z",
        },
      ],
    },
  ],

  mensajes: [
    {
      id: "msg1",
      clienteId: "c1",
      autor: "Joaquín",
      rol: "admin_koi",
      texto:
        "¡Hola María! Ya subimos el reporte de avance de marzo al portal. Cualquier duda nos dices por aquí.",
      fecha: "2026-03-31T12:05:00.000Z",
    },
    {
      id: "msg2",
      clienteId: "c1",
      autor: "María González",
      rol: "cliente",
      texto: "Gracias Joaquín, lo reviso hoy y te comento 🙌",
      fecha: "2026-03-31T14:20:00.000Z",
    },
  ],

  reuniones: [
    {
      id: "r1",
      clienteId: "c1",
      motivo: "Revisión de avance del sprint 3",
      fecha: "2026-07-22T15:00:00.000Z",
      modalidad: "videollamada",
      estado: "confirmada",
      solicitadaPor: "María González",
    },
    {
      id: "r2",
      clienteId: "c2",
      motivo: "Llamada estratégica inicial",
      fecha: "2026-07-24T11:30:00.000Z",
      modalidad: "videollamada",
      estado: "solicitada",
      solicitadaPor: "Rodrigo Fuentes",
    },
  ],

  actividad: [
    {
      id: "a1",
      clienteId: "c1",
      actor: "María González",
      rol: "cliente",
      tipo: "descarga",
      detalle: "Descargó «Estrategia técnica v1.pdf»",
      fecha: "2026-03-19T08:12:00.000Z",
    },
    {
      id: "a2",
      clienteId: "c1",
      actor: "María González",
      rol: "cliente",
      tipo: "formulario",
      detalle: "Completó el formulario de onboarding",
      fecha: "2026-03-05T16:40:00.000Z",
    },
    {
      id: "a3",
      clienteId: "c1",
      actor: "Joaquín",
      rol: "admin_koi",
      tipo: "subida",
      detalle: "Subió «Reporte de avance - Marzo.pdf»",
      fecha: "2026-03-31T12:00:00.000Z",
    },
    {
      id: "a4",
      clienteId: "c2",
      actor: "Rodrigo Fuentes",
      rol: "cliente",
      tipo: "subida",
      detalle: "Subió «Base de datos de rutas.xlsx»",
      fecha: "2026-05-22T08:45:00.000Z",
    },
  ],
};

// Credenciales de demo mostradas en la pantalla de acceso.
export const DEMO_CREDENCIALES = {
  cliente: { email: "maria@sanmiguel.cl", password: "demo1234" },
  studio: { email: "joaquin@koi.cl", password: "koi1234" },
};
