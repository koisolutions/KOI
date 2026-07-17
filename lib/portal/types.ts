// =====================================================================
//  Modelo de datos del portal (basado en la spec de KOI).
//  Estos tipos reflejan lo que en producción vivirá en Django/DRF.
// =====================================================================

export type Rol = "cliente" | "admin_koi";

export type EstadoCliente = "prospecto" | "activo" | "pausado" | "finalizado";

export type CategoriaDoc =
  | "contrato"
  | "welcome_doc"
  | "estrategia"
  | "reporte"
  | "otro";

export type SubidoPor = "KOI" | "cliente";

export type EstadoFactura = "pendiente" | "pagada" | "vencida";

export type FaseProyecto =
  | "Contrato"
  | "Estrategia"
  | "Desarrollo"
  | "Revisión"
  | "Entregado";

export interface Cliente {
  id: string;
  nombreEmpresa: string;
  rut: string;
  contactoPrincipal: string;
  email: string;
  telefono: string;
  estado: EstadoCliente;
  fechaInicio: string; // ISO
}

export interface Usuario {
  id: string;
  clienteId: string | null; // null = usuario interno de KOI
  rol: Rol;
  nombre: string;
  email: string;
  password: string; // ⚠️ ficticio; en prod: hash / magic link
}

export interface Documento {
  id: string;
  clienteId: string;
  nombre: string;
  categoria: CategoriaDoc;
  subidoPor: SubidoPor;
  tamano: string; // ej. "1.2 MB"
  fechaSubida: string; // ISO
  descripcion?: string;
}

export interface Factura {
  id: string;
  clienteId: string;
  numero: string;
  concepto: string;
  monto: number; // CLP
  estado: EstadoFactura;
  fechaEmision: string; // ISO
  fechaVencimiento: string; // ISO
}

export interface Respuesta {
  pregunta: string;
  respuesta: string;
}

export interface FormularioCliente {
  clienteId: string;
  respuestas: Respuesta[];
  enviado: boolean;
  fechaRespuesta: string | null; // ISO
}

export interface Proyecto {
  clienteId: string;
  nombre: string;
  faseActual: FaseProyecto;
  progreso: number; // 0-100
  fechaEstimadaEntrega: string; // ISO
  resumen: string;
}

export interface Nota {
  id: string;
  clienteId: string;
  autor: string;
  texto: string;
  fecha: string; // ISO
}

export type TipoActividad =
  | "login"
  | "descarga"
  | "subida"
  | "formulario"
  | "factura"
  | "pago"
  | "ticket"
  | "reunion"
  | "mensaje"
  | "nota"
  | "estado";

export interface Actividad {
  id: string;
  clienteId: string;
  actor: string; // nombre de quien hizo la acción
  rol: Rol;
  tipo: TipoActividad;
  detalle: string;
  fecha: string; // ISO
}

// ---- Soporte / tickets ------------------------------------------------
export type EstadoTicket = "abierto" | "en_proceso" | "resuelto";
export type PrioridadTicket = "baja" | "media" | "alta";
export type CategoriaTicket = "soporte" | "consulta" | "cambio" | "bug";

export interface MensajeTicket {
  id: string;
  autor: string;
  rol: Rol;
  texto: string;
  fecha: string; // ISO
}

export interface Ticket {
  id: string;
  clienteId: string;
  codigo: string; // ej. TK-014
  asunto: string;
  categoria: CategoriaTicket;
  prioridad: PrioridadTicket;
  estado: EstadoTicket;
  fechaCreacion: string; // ISO
  mensajes: MensajeTicket[];
}

// ---- Reuniones --------------------------------------------------------
export type EstadoReunion = "solicitada" | "confirmada" | "cancelada";
export type ModalidadReunion = "videollamada" | "presencial";

export interface Reunion {
  id: string;
  clienteId: string;
  motivo: string;
  fecha: string; // ISO (fecha + hora)
  modalidad: ModalidadReunion;
  estado: EstadoReunion;
  solicitadaPor: string;
}

// ---- Mensajería directa ----------------------------------------------
export interface MensajeChat {
  id: string;
  clienteId: string;
  autor: string;
  rol: Rol;
  texto: string;
  fecha: string; // ISO
}

export interface PortalState {
  clientes: Cliente[];
  usuarios: Usuario[];
  documentos: Documento[];
  facturas: Factura[];
  formularios: FormularioCliente[];
  proyectos: Proyecto[];
  notas: Nota[];
  actividad: Actividad[];
  tickets: Ticket[];
  reuniones: Reunion[];
  mensajes: MensajeChat[];
}

// Preguntas del formulario de onboarding (antes en Google Forms)
export const PREGUNTAS_ONBOARDING: string[] = [
  "¿A qué se dedica tu empresa y cuál es tu rol en ella?",
  "¿Qué problema concreto esperas resolver con este proyecto?",
  "¿Qué haces hoy para resolverlo (herramientas, planillas, procesos manuales)?",
  "¿Quiénes usarán el sistema y con qué frecuencia?",
  "¿Tienes referencias o ejemplos de algo parecido que te guste?",
  "¿Cuál es tu plazo ideal y hay alguna fecha crítica?",
  "¿Con qué presupuesto aproximado estás trabajando?",
];
